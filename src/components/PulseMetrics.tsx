import React from 'react';
import { DollarSign, Clock, AlertTriangle, ShieldCheck, ArrowUpRight, Flame } from 'lucide-react';
import { Invoice, CashFlowSettings } from '../types';

interface PulseMetricsProps {
  invoices: Invoice[];
  settings: CashFlowSettings;
  onSelectOverdueInvoice: () => void;
  onOpenRunwayModal: () => void;
}

export const PulseMetrics: React.FC<PulseMetricsProps> = ({
  invoices,
  settings,
  onSelectOverdueInvoice,
  onOpenRunwayModal
}) => {
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  const monthlyBurn = settings.monthlyLivingExpenses + settings.monthlyBusinessExpenses;
  const dailyBurn = monthlyBurn / 30;
  const runwayDays = dailyBurn > 0 ? Math.round(settings.currentCashBalance / dailyBurn) : 999;
  const runwayMonths = (runwayDays / 30).toFixed(1);

  // Health Status
  let healthLabel = 'Comfortable Buffer';
  let healthColor = 'var(--color-success)';
  let healthClass = 'pulse-dot-green';

  if (runwayDays < 45) {
    healthLabel = 'Critical Runway';
    healthColor = 'var(--color-danger)';
    healthClass = 'pulse-dot-red';
  } else if (runwayDays < 90) {
    healthLabel = 'Moderate Cushion';
    healthColor = 'var(--color-warning)';
    healthClass = 'pulse-dot-indigo';
  }

  return (
    <div className="metrics-grid">
      {/* 1. Cash in Hand */}
      <div className="metric-card glass-panel">
        <div className="metric-header">
          <span className="metric-label">Liquid Cash Balance</span>
          <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)' }}>
            <DollarSign size={18} />
          </div>
        </div>
        <div className="metric-value font-mono">
          {settings.currency}{settings.currentCashBalance.toLocaleString()}
        </div>
        <div className="metric-footer">
          <span className="badge badge-paid">
            <span className="pulse-dot pulse-dot-green" />
            Immediate Access
          </span>
          <span className="metric-subtext">Tax reserved: ~{settings.taxReserveRate}%</span>
        </div>
      </div>

      {/* 2. Pending Inflows */}
      <div className="metric-card glass-panel">
        <div className="metric-header">
          <span className="metric-label">Pending Clearances</span>
          <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-warning)' }}>
            <Clock size={18} />
          </div>
        </div>
        <div className="metric-value font-mono">
          {settings.currency}{pendingAmount.toLocaleString()}
        </div>
        <div className="metric-footer">
          <span className="badge badge-pending">
            {pendingInvoices.length} {pendingInvoices.length === 1 ? 'Invoice' : 'Invoices'}
          </span>
          <span className="metric-subtext">Expected in &lt; 14 days</span>
        </div>
      </div>

      {/* 3. Overdue / At Risk */}
      <div className={`metric-card glass-panel ${overdueAmount > 0 ? 'metric-card-alert' : ''}`}>
        <div className="metric-header">
          <span className="metric-label">Overdue / At Risk</span>
          <div className="metric-icon-box" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)' }}>
            <AlertTriangle size={18} />
          </div>
        </div>
        <div className="metric-value font-mono" style={{ color: overdueAmount > 0 ? 'var(--color-danger)' : 'inherit' }}>
          {settings.currency}{overdueAmount.toLocaleString()}
        </div>
        <div className="metric-footer">
          {overdueAmount > 0 ? (
            <button 
              className="btn btn-danger btn-sm"
              onClick={onSelectOverdueInvoice}
              style={{ padding: '3px 8px', fontSize: '0.75rem' }}
            >
              <Flame size={12} />
              <span>Chase Overdue ({overdueInvoices.length})</span>
            </button>
          ) : (
            <span className="badge badge-paid">0 Invoices Overdue</span>
          )}
          <span className="metric-subtext">Zero lost revenue goal</span>
        </div>
      </div>

      {/* 4. Runway Health Score */}
      <div className="metric-card glass-panel" onClick={onOpenRunwayModal} style={{ cursor: 'pointer' }}>
        <div className="metric-header">
          <span className="metric-label">Financial Runway</span>
          <div className="metric-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary-light)' }}>
            <ShieldCheck size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <div className="metric-value font-mono" style={{ color: healthColor }}>
            {runwayDays} <span className="metric-unit">Days</span>
          </div>
          <span className="metric-secondary-val font-mono">({runwayMonths} mo)</span>
        </div>
        <div className="metric-footer">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: healthColor }}>
            <span className={`pulse-dot ${healthClass}`} />
            {healthLabel}
          </span>
          <span className="metric-subtext hover-link">
            Burn: {settings.currency}{monthlyBurn.toLocaleString()}/mo
            <ArrowUpRight size={12} style={{ display: 'inline', marginLeft: 2 }} />
          </span>
        </div>
      </div>
    </div>
  );
};
