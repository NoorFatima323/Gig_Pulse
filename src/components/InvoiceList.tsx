import React, { useState } from 'react';
import { Search, Filter, Zap, FileText, CheckCircle, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Invoice, InvoiceStatus } from '../types';
import confetti from 'canvas-confetti';

interface InvoiceListProps {
  invoices: Invoice[];
  onOpenChaser: (invoice: Invoice) => void;
  onViewInvoice: (invoice: Invoice) => void;
  onMarkAsPaid: (invoiceId: string) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onOpenNewInvoice: () => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onOpenChaser,
  onViewInvoice,
  onMarkAsPaid,
  onDeleteInvoice,
  onOpenNewInvoice
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | InvoiceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    const matchesFilter = activeFilter === 'all' ? true : inv.status === activeFilter;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePaidClick = (invoiceId: string) => {
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
    onMarkAsPaid(invoiceId);
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="badge badge-paid">
            <span className="pulse-dot pulse-dot-green" />
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="badge badge-pending">
            <span className="pulse-dot pulse-dot-indigo" />
            Pending
          </span>
        );
      case 'overdue':
        return (
          <span className="badge badge-overdue">
            <span className="pulse-dot pulse-dot-red" />
            Overdue
          </span>
        );
      default:
        return <span className="badge badge-draft">Draft</span>;
    }
  };

  const getDueBadge = (inv: Invoice) => {
    if (inv.status === 'paid') {
      return <span className="due-tag due-paid">Cleared</span>;
    }

    const today = new Date();
    const dueDate = new Date(inv.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="due-tag due-overdue">
          <AlertCircle size={11} /> {Math.abs(diffDays)}d overdue
        </span>
      );
    }
    if (diffDays === 0) {
      return <span className="due-tag due-today">Due Today</span>;
    }
    return <span className="due-tag due-soon">Due in {diffDays}d</span>;
  };

  return (
    <div className="invoice-section glass-panel">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        {/* Filter Pills */}
        <div className="filter-group">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Invoices ({invoices.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'pending' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({invoices.filter(i => i.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'overdue' ? 'filter-btn-active filter-btn-overdue' : ''}`}
            onClick={() => setActiveFilter('overdue')}
          >
            Overdue ({invoices.filter(i => i.status === 'overdue').length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'paid' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('paid')}
          >
            Paid ({invoices.filter(i => i.status === 'paid').length})
          </button>
        </div>

        {/* Search & Actions */}
        <div className="search-group">
          <div className="search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client, invoice #..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Invoices List / Table */}
      {filteredInvoices.length === 0 ? (
        <div className="empty-state">
          <FileText size={36} className="empty-icon" />
          <h3 className="empty-title">No matching invoices</h3>
          <p className="empty-desc">Create your first client invoice or adjust your search filters.</p>
          <button className="btn btn-primary btn-sm" onClick={onOpenNewInvoice}>
            Create New Invoice
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className={`invoice-row ${inv.status === 'overdue' ? 'row-overdue' : ''}`}>
                  {/* Invoice # */}
                  <td>
                    <div className="invoice-num-cell">
                      <span className="font-mono inv-num">{inv.invoiceNumber}</span>
                      <span className="inv-date">Issued {inv.issueDate}</span>
                    </div>
                  </td>

                  {/* Client */}
                  <td>
                    <div className="client-cell">
                      <span className="client-name">{inv.clientCompany}</span>
                      <span className="client-contact">{inv.clientName}</span>
                    </div>
                  </td>

                  {/* Due Date & relative badge */}
                  <td>
                    <div className="due-cell">
                      <span className="font-mono">{inv.dueDate}</span>
                      {getDueBadge(inv)}
                    </div>
                  </td>

                  {/* Amount */}
                  <td>
                    <span className="inv-amount font-mono">${inv.amount.toLocaleString()}</span>
                  </td>

                  {/* Status Badge */}
                  <td>{getStatusBadge(inv.status)}</td>

                  {/* Quick Action Buttons */}
                  <td style={{ textAlign: 'right' }}>
                    <div className="actions-cell">
                      {/* Chaser Trigger */}
                      {inv.status !== 'paid' && (
                        <button
                          className="btn-action btn-action-chase"
                          onClick={() => onOpenChaser(inv)}
                          title="Open Smart Chaser & Dispatch Reminder"
                        >
                          <Zap size={14} />
                          <span className="hide-mobile">Auto-Chase</span>
                        </button>
                      )}

                      {/* View & PDF */}
                      <button
                        className="btn-action"
                        onClick={() => onViewInvoice(inv)}
                        title="View Official Invoice & Export PDF"
                      >
                        <FileText size={14} />
                      </button>

                      {/* Mark Paid */}
                      {inv.status !== 'paid' && (
                        <button
                          className="btn-action btn-action-pay"
                          onClick={() => handlePaidClick(inv.id)}
                          title="Mark Invoice as Paid"
                        >
                          <CheckCircle size={14} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        className="btn-action btn-action-del"
                        onClick={() => onDeleteInvoice(inv.id)}
                        title="Delete Invoice"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
