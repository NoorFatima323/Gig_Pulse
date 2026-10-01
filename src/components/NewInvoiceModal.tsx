import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, DollarSign, UserCheck, Sparkles } from 'lucide-react';
import { Invoice, InvoiceItem, Client, ReminderTone } from '../types';

interface NewInvoiceModalProps {
  clients: Client[];
  onClose: () => void;
  onSaveInvoice: (invoice: Invoice) => void;
}

export const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ clients, onClose, onSaveInvoice }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Default due date Net 14
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 14);
  const defaultDueStr = defaultDueDate.toISOString().split('T')[0];

  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || 'custom');
  const [clientName, setClientName] = useState(clients[0]?.name || '');
  const [clientCompany, setClientCompany] = useState(clients[0]?.company || '');
  const [clientEmail, setClientEmail] = useState(clients[0]?.email || '');

  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [issueDate, setIssueDate] = useState(todayStr);
  const [dueDate, setDueDate] = useState(defaultDueStr);
  const [reminderTone, setReminderTone] = useState<ReminderTone>('friendly');
  const [notes, setNotes] = useState('Payment due within terms. Direct ACH or Wire transfer accepted.');

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      description: 'Web Application Frontend Engineering',
      quantity: 20,
      unitPrice: 100,
      total: 2000
    }
  ]);

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    if (clientId === 'custom') {
      setClientName('');
      setClientCompany('');
      setClientEmail('');
    } else {
      const match = clients.find(c => c.id === clientId);
      if (match) {
        setClientName(match.name);
        setClientCompany(match.company);
        setClientEmail(match.email);
      }
    }
  };

  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 500,
        total: 500
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, val: string | number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = Number(updated.quantity || 0) * Number(updated.unitPrice || 0);
        }
        return updated;
      })
    );
  };

  const setTerms = (days: number) => {
    const d = new Date(issueDate || todayStr);
    d.setDate(d.getDate() + days);
    setDueDate(d.toISOString().split('T')[0]);
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCompany || !clientEmail || grandTotal <= 0) return;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      clientName: clientName || clientCompany,
      clientCompany,
      clientEmail,
      issueDate,
      dueDate,
      amount: grandTotal,
      status: 'pending',
      reminderTone,
      items,
      notes
    };

    onSaveInvoice(newInvoice);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-wide" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Plus size={18} />
            </div>
            <div>
              <h2 className="modal-title">Create New Client Invoice</h2>
              <p className="modal-subtitle">Auto-tracked with cash runway and smart reminder scheduling</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-grid">
            {/* Client Selection */}
            <div className="form-section">
              <span className="section-title">Client Information</span>
              <div className="input-row">
                <div className="form-field flex-1">
                  <label className="input-label">Select Client</label>
                  <select
                    className="form-select"
                    value={selectedClientId}
                    onChange={e => handleClientChange(e.target.value)}
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.company} — Grade {c.ratingGrade} ({c.name})
                      </option>
                    ))}
                    <option value="custom">+ New Client / Custom</option>
                  </select>
                </div>

                <div className="form-field flex-1">
                  <label className="input-label">Company Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Acme Corp"
                    value={clientCompany}
                    onChange={e => setClientCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-field flex-1">
                  <label className="input-label">Client Contact Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                  />
                </div>
                <div className="form-field flex-1">
                  <label className="input-label">Client Email (for Chaser) *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="billing@acme.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Dates & Terms */}
            <div className="form-section">
              <span className="section-title">Invoice Details & Payment Terms</span>
              <div className="input-row">
                <div className="form-field flex-1">
                  <label className="input-label">Invoice Number</label>
                  <input
                    type="text"
                    required
                    className="form-input font-mono"
                    value={invoiceNumber}
                    onChange={e => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div className="form-field flex-1">
                  <label className="input-label">Issue Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={issueDate}
                    onChange={e => setIssueDate(e.target.value)}
                  />
                </div>
                <div className="form-field flex-1">
                  <label className="input-label">Due Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Quick term shortcut buttons */}
              <div className="terms-row">
                <span className="terms-label">Quick Terms:</span>
                <button type="button" className="term-btn" onClick={() => setTerms(7)}>Net 7</button>
                <button type="button" className="term-btn" onClick={() => setTerms(14)}>Net 14 (Standard)</button>
                <button type="button" className="term-btn" onClick={() => setTerms(30)}>Net 30</button>
              </div>
            </div>

            {/* Line Items */}
            <div className="form-section">
              <div className="line-items-header">
                <span className="section-title">Line Items & Deliverables</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddItem}>
                  <Plus size={14} /> Add Item
                </button>
              </div>

              <div className="items-list">
                {items.map(item => (
                  <div key={item.id} className="item-row">
                    <div className="form-field item-desc">
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="Description of work or milestone"
                        value={item.description}
                        onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="form-field item-qty">
                      <input
                        type="number"
                        min="1"
                        className="form-input font-mono"
                        placeholder="Qty/Hrs"
                        value={item.quantity}
                        onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                      />
                    </div>
                    <div className="form-field item-price">
                      <input
                        type="number"
                        min="0"
                        className="form-input font-mono"
                        placeholder="Rate ($)"
                        value={item.unitPrice}
                        onChange={e => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                      />
                    </div>
                    <div className="item-total font-mono">
                      ${item.total.toLocaleString()}
                    </div>
                    <button
                      type="button"
                      className="item-del-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className="invoice-grand-total">
                <span className="total-label">Invoice Total:</span>
                <span className="total-amount font-mono">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Reminder Tone Default */}
            <div className="form-section">
              <span className="section-title">Default Chaser Tone for this Invoice</span>
              <div className="tone-selector">
                <button
                  type="button"
                  className={`tone-btn ${reminderTone === 'friendly' ? 'tone-btn-active' : ''}`}
                  onClick={() => setReminderTone('friendly')}
                >
                  😊 Friendly
                </button>
                <button
                  type="button"
                  className={`tone-btn ${reminderTone === 'professional' ? 'tone-btn-active' : ''}`}
                  onClick={() => setReminderTone('professional')}
                >
                  💼 Professional
                </button>
                <button
                  type="button"
                  className={`tone-btn ${reminderTone === 'strict' ? 'tone-btn-active tone-btn-strict' : ''}`}
                  onClick={() => setReminderTone('strict')}
                >
                  ⚡ Strict / Firm
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Generate & Track Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
