import React from 'react';
import { X, Printer, Download, CheckCircle, Zap } from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceViewModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({ invoice, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content invoice-preview-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Top Actions */}
        <div className="preview-action-bar no-print">
          <div className="action-bar-left">
            <span className="preview-tag">Official Invoice Document</span>
            <span className={`badge badge-${invoice.status}`}>
              {invoice.status.toUpperCase()}
            </span>
          </div>
          <div className="action-bar-right">
            <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Sheet */}
        <div className="invoice-paper" id="printable-invoice">
          {/* Paper Header */}
          <div className="paper-header">
            <div>
              <div className="paper-logo">
                <Zap size={22} className="paper-logo-icon" />
                <span className="paper-brand">GigPulse</span>
              </div>
              <p className="paper-sub">Independent Engineering & Creative Services</p>
            </div>
            <div className="paper-invoice-meta">
              <h2 className="paper-invoice-title font-mono">{invoice.invoiceNumber}</h2>
              <div className="paper-meta-row">
                <span className="meta-lbl">Issue Date:</span>
                <span className="font-mono">{invoice.issueDate}</span>
              </div>
              <div className="paper-meta-row">
                <span className="meta-lbl">Due Date:</span>
                <span className="font-mono">{invoice.dueDate}</span>
              </div>
            </div>
          </div>

          <hr className="paper-divider" />

          {/* Billed To / From Row */}
          <div className="paper-parties-grid">
            <div className="party-box">
              <span className="party-title">BILLED TO</span>
              <h3 className="party-name">{invoice.clientCompany}</h3>
              <p className="party-detail">Attn: {invoice.clientName}</p>
              <p className="party-detail">{invoice.clientEmail}</p>
            </div>
            <div className="party-box party-box-right">
              <span className="party-title">PAYABLE TO</span>
              <h3 className="party-name">Freelance Studio</h3>
              <p className="party-detail">Verified Independent Contractor</p>
              <p className="party-detail">payouts@gigpulse.contractor</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="paper-table">
            <thead>
              <tr>
                <th style={{ width: '55%' }}>Description</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Qty/Hrs</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Rate</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map(item => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td style={{ textAlign: 'center' }} className="font-mono">{item.quantity}</td>
                  <td style={{ textAlign: 'right' }} className="font-mono">${item.unitPrice.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }} className="font-mono">${item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paper Totals */}
          <div className="paper-totals-wrapper">
            <div className="payment-instructions">
              <span className="instructions-title">Payment Instructions</span>
              <p>Direct ACH Bank Wire: Routing: <strong>021000021</strong> | Account: <strong>****8492</strong></p>
              <p>Direct Pay Link: <span className="underline">https://gigpulse.app/pay/{invoice.id}</span></p>
              <p className="notes-italic">{invoice.notes}</p>
            </div>

            <div className="totals-calc">
              <div className="calc-row">
                <span>Subtotal:</span>
                <span className="font-mono">${invoice.amount.toLocaleString()}</span>
              </div>
              <div className="calc-row">
                <span>Tax / VAT:</span>
                <span className="font-mono">$0.00</span>
              </div>
              <div className="calc-row total-row">
                <span>Amount Due:</span>
                <span className="font-mono">${invoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Paid Stamp Watermark */}
          {invoice.status === 'paid' && (
            <div className="paid-watermark">
              PAID IN FULL
            </div>
          )}

          {/* Paper Footer */}
          <div className="paper-footer">
            <span>Powered by GigPulse Financial Operating System</span>
            <span>Questions? Contact billing at {invoice.clientEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
