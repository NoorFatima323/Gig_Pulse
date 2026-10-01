import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare, Mail, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Invoice, ReminderTone } from '../types';

interface ChaserModalProps {
  invoice: Invoice;
  onClose: () => void;
  onSendReminder: (invoiceId: string, tone: ReminderTone) => void;
}

export const ChaserModal: React.FC<ChaserModalProps> = ({ invoice, onClose, onSendReminder }) => {
  const [selectedTone, setSelectedTone] = useState<ReminderTone>(invoice.reminderTone || 'friendly');
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Template generators based on tone
  const getSubject = () => {
    switch (selectedTone) {
      case 'friendly':
        return `Friendly check-in regarding Invoice ${invoice.invoiceNumber} (${invoice.clientCompany})`;
      case 'professional':
        return `Notice: Invoice ${invoice.invoiceNumber} Due Notification - $${invoice.amount.toLocaleString()}`;
      case 'strict':
        return `URGENT / OVERDUE: Payment Required for Invoice ${invoice.invoiceNumber}`;
    }
  };

  const getBody = () => {
    switch (selectedTone) {
      case 'friendly':
        return `Hi ${invoice.clientName},

Hope your week is going great! Just sending a quick, friendly heads-up that Invoice ${invoice.invoiceNumber} ($${invoice.amount.toLocaleString()}) for "${invoice.items[0]?.description || 'Project deliverables'}" is due on ${invoice.dueDate}.

You can view the invoice and pay directly via card or bank transfer here:
https://gigpulse.app/pay/${invoice.id}

Thanks so much for the great collaboration!`;
      case 'professional':
        return `Dear ${invoice.clientName},

This is an automated notification from GigPulse regarding Invoice ${invoice.invoiceNumber}, issued to ${invoice.clientCompany} for the amount of $${invoice.amount.toLocaleString()}.

Due Date: ${invoice.dueDate}
Status: ${invoice.status.toUpperCase()}

Please process payment via the direct link below at your earliest convenience:
https://gigpulse.app/pay/${invoice.id}

If payment has already been initiated, please disregard this notice.`;
      case 'strict':
        return `ATTENTION: ${invoice.clientName} / Accounts Payable (${invoice.clientCompany}),

Please be advised that Invoice ${invoice.invoiceNumber} in the amount of $${invoice.amount.toLocaleString()} is currently past due.

Per our contract terms, payments past due are subject to late fee charges. To avoid service disruption or fee penalties, please remit payment immediately using our secure portal:
https://gigpulse.app/pay/${invoice.id}

Kindly reply with proof of payment once transferred.`;
    }
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onSendReminder(invoice.id, selectedTone);
      setTimeout(() => {
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="chaser-icon-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="modal-title">Smart Payment Chaser</h2>
              <p className="modal-subtitle">
                Automated follow-up for <strong>{invoice.clientCompany}</strong> ({invoice.invoiceNumber})
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Escalation Sequence Visualizer */}
          <div className="escalation-timeline glass-panel">
            <span className="timeline-title">Automated Escalation Sequence</span>
            <div className="timeline-steps">
              <div className="timeline-step step-complete">
                <div className="step-circle">1</div>
                <div className="step-info">
                  <span className="step-label">T-3 Days</span>
                  <span className="step-desc">Friendly Heads-Up</span>
                </div>
              </div>

              <div className={`timeline-step ${invoice.status !== 'draft' ? 'step-active' : ''}`}>
                <div className="step-circle">2</div>
                <div className="step-info">
                  <span className="step-label">Due Date</span>
                  <span className="step-desc">Direct Pay Link</span>
                </div>
              </div>

              <div className={`timeline-step ${invoice.status === 'overdue' ? 'step-urgent' : ''}`}>
                <div className="step-circle">3</div>
                <div className="step-info">
                  <span className="step-label">+3 Days Late</span>
                  <span className="step-desc">Gentle Follow-Up</span>
                </div>
              </div>

              <div className={`timeline-step ${invoice.status === 'overdue' ? 'step-strict' : ''}`}>
                <div className="step-circle">4</div>
                <div className="step-info">
                  <span className="step-label">+7 Days Late</span>
                  <span className="step-desc">Formal Notice</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Tone & Channel */}
          <div className="chaser-controls-grid">
            <div className="control-group">
              <label className="input-label">Tone of Voice</label>
              <div className="tone-selector">
                <button
                  className={`tone-btn ${selectedTone === 'friendly' ? 'tone-btn-active' : ''}`}
                  onClick={() => setSelectedTone('friendly')}
                >
                  😊 Friendly
                </button>
                <button
                  className={`tone-btn ${selectedTone === 'professional' ? 'tone-btn-active' : ''}`}
                  onClick={() => setSelectedTone('professional')}
                >
                  💼 Professional
                </button>
                <button
                  className={`tone-btn ${selectedTone === 'strict' ? 'tone-btn-active tone-btn-strict' : ''}`}
                  onClick={() => setSelectedTone('strict')}
                >
                  ⚡ Strict / Firm
                </button>
              </div>
            </div>

            <div className="control-group">
              <label className="input-label">Dispatch Channel</label>
              <div className="channel-selector">
                <button
                  className={`channel-btn ${channel === 'email' ? 'channel-btn-active' : ''}`}
                  onClick={() => setChannel('email')}
                >
                  <Mail size={14} />
                  <span>Email ({invoice.clientEmail})</span>
                </button>
                <button
                  className={`channel-btn ${channel === 'whatsapp' ? 'channel-btn-active' : ''}`}
                  onClick={() => setChannel('whatsapp')}
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Message Preview Card */}
          <div className="message-preview-card glass-panel">
            <div className="preview-header">
              <div className="preview-meta">
                <span className="meta-tag">TO:</span> {invoice.clientName} &lt;{invoice.clientEmail}&gt;
              </div>
              <div className="preview-meta">
                <span className="meta-tag">SUBJECT:</span> {getSubject()}
              </div>
            </div>
            <pre className="preview-body">{getBody()}</pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="footer-status-text">
            {invoice.lastReminderSentAt ? (
              <span>Last dispatched: {new Date(invoice.lastReminderSentAt).toLocaleDateString()}</span>
            ) : (
              <span>No prior reminders logged for this cycle</span>
            )}
          </div>

          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={onClose} disabled={isSending}>
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleSend}
              disabled={isSending || sentSuccess}
            >
              {isSending ? (
                <>
                  <span className="spinner" />
                  <span>Dispatching...</span>
                </>
              ) : sentSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Reminder Dispatched!</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Dispatch {channel === 'email' ? 'Email' : 'WhatsApp'} Reminder</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
