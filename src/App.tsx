import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { PulseMetrics } from './components/PulseMetrics';
import { CashFlowChart } from './components/CashFlowChart';
import { InvoiceList } from './components/InvoiceList';
import { ChaserModal } from './components/ChaserModal';
import { NewInvoiceModal } from './components/NewInvoiceModal';
import { InvoiceViewModal } from './components/InvoiceViewModal';
import { ClientScorecard } from './components/ClientScorecard';
import { RunwaySettingsModal } from './components/RunwaySettingsModal';
import { PitchDeckView } from './components/PitchDeckView';
import { Invoice, Client, CashFlowSettings, ReminderTone } from './types';
import {
  loadInvoices,
  saveInvoices,
  loadClients,
  saveClients,
  loadSettings,
  saveSettings,
  resetAllToDemo
} from './services/storage';
import { CheckCircle2, Zap, AlertCircle } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'alert';
}

export function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<CashFlowSettings>(loadSettings());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'pitch'>('dashboard');

  // Modals state
  const [selectedInvoiceForChaser, setSelectedInvoiceForChaser] = useState<Invoice | null>(null);
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<Invoice | null>(null);
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isRunwaySettingsOpen, setIsRunwaySettingsOpen] = useState(false);
  const [showPitchBanner, setShowPitchBanner] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    setInvoices(loadInvoices());
    setClients(loadClients());
    setSettings(loadSettings());
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'alert' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const handleSaveInvoice = (newInv: Invoice) => {
    const updated = [newInv, ...invoices];
    setInvoices(updated);
    saveInvoices(updated);

    // Update client stats
    const updatedClients = clients.map(c => {
      if (c.company.toLowerCase() === newInv.clientCompany.toLowerCase()) {
        return {
          ...c,
          totalBilled: c.totalBilled + newInv.amount,
          totalPending: c.totalPending + newInv.amount
        };
      }
      return c;
    });
    setClients(updatedClients);
    saveClients(updatedClients);

    showToast(`Invoice ${newInv.invoiceNumber} created & auto-chaser enabled!`);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    const target = invoices.find(i => i.id === invoiceId);
    if (!target) return;

    const updatedInvoices: Invoice[] = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'paid',
          paidAt: new Date().toISOString()
        };
      }
      return inv;
    });

    // Add amount to liquid cash
    const updatedSettings: CashFlowSettings = {
      ...settings,
      currentCashBalance: settings.currentCashBalance + target.amount
    };

    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    showToast(`Payment recorded! +$${target.amount.toLocaleString()} added to Liquid Cash balance.`);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    const target = invoices.find(i => i.id === invoiceId);
    const updated = invoices.filter(i => i.id !== invoiceId);
    setInvoices(updated);
    saveInvoices(updated);
    showToast(`Invoice ${target?.invoiceNumber || ''} removed.`, 'info');
  };

  const handleSendReminder = (invoiceId: string, tone: ReminderTone) => {
    const updated = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          lastReminderSentAt: new Date().toISOString(),
          reminderTone: tone
        };
      }
      return inv;
    });
    setInvoices(updated);
    saveInvoices(updated);

    const target = invoices.find(i => i.id === invoiceId);
    showToast(
      `Smart ${tone.toUpperCase()} reminder dispatched to ${target?.clientEmail || 'client'}!`,
      'success'
    );
  };

  const handleSaveSettings = (updated: CashFlowSettings) => {
    setSettings(updated);
    saveSettings(updated);
    showToast('Runway & expense settings recalculated successfully!');
  };

  const handleResetDemo = () => {
    resetAllToDemo();
    setInvoices(loadInvoices());
    setClients(loadClients());
    setSettings(loadSettings());
    showToast('Demo data reset to fresh state.', 'info');
  };

  const handleChaseOverdueQuick = () => {
    const firstOverdue = invoices.find(i => i.status === 'overdue');
    if (firstOverdue) {
      setSelectedInvoiceForChaser(firstOverdue);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Main Top Header */}
      <Header
        settings={settings}
        onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
        onOpenRunwaySettings={() => setIsRunwaySettingsOpen(true)}
        onResetDemo={handleResetDemo}
        showPitchBanner={showPitchBanner}
        onTogglePitchBanner={() => setShowPitchBanner(!showPitchBanner)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            {/* Top Metric Cards (Cash in Hand, Pending, Overdue, Runway) */}
            <PulseMetrics
              invoices={invoices}
              settings={settings}
              onSelectOverdueInvoice={handleChaseOverdueQuick}
              onOpenRunwayModal={() => setIsRunwaySettingsOpen(true)}
            />

            {/* Predictive Cash Flow & Runway Pulse SVG Chart */}
            <CashFlowChart invoices={invoices} settings={settings} />

            {/* Invoice Management Table & Action Center */}
            <InvoiceList
              invoices={invoices}
              onOpenChaser={inv => setSelectedInvoiceForChaser(inv)}
              onViewInvoice={inv => setSelectedInvoiceForView(inv)}
              onMarkAsPaid={handleMarkAsPaid}
              onDeleteInvoice={handleDeleteInvoice}
              onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
            />
          </>
        )}

        {activeTab === 'clients' && (
          <ClientScorecard clients={clients} />
        )}

        {activeTab === 'pitch' && (
          <PitchDeckView />
        )}
      </main>

      {/* Modals */}
      {selectedInvoiceForChaser && (
        <ChaserModal
          invoice={selectedInvoiceForChaser}
          onClose={() => setSelectedInvoiceForChaser(null)}
          onSendReminder={handleSendReminder}
        />
      )}

      {isNewInvoiceOpen && (
        <NewInvoiceModal
          clients={clients}
          onClose={() => setIsNewInvoiceOpen(false)}
          onSaveInvoice={handleSaveInvoice}
        />
      )}

      {selectedInvoiceForView && (
        <InvoiceViewModal
          invoice={selectedInvoiceForView}
          onClose={() => setSelectedInvoiceForView(null)}
        />
      )}

      {isRunwaySettingsOpen && (
        <RunwaySettingsModal
          settings={settings}
          onClose={() => setIsRunwaySettingsOpen(false)}
          onSave={handleSaveSettings}
        />
      )}

      {/* Toast Notifications */}
      <div className="toast-container no-print">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            {t.type === 'alert' ? (
              <AlertCircle size={16} color="var(--color-danger)" />
            ) : t.type === 'info' ? (
              <Zap size={16} color="var(--color-primary-light)" />
            ) : (
              <CheckCircle2 size={16} color="var(--color-success)" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
