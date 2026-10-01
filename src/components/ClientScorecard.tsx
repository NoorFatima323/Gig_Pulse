import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import { Client } from '../types';

interface ClientScorecardProps {
  clients: Client[];
}

export const ClientScorecard: React.FC<ClientScorecardProps> = ({ clients }) => {
  const getGradeBadge = (grade: Client['ratingGrade']) => {
    switch (grade) {
      case 'A':
        return <span className="grade-badge grade-a">Grade A (Fast Payer)</span>;
      case 'B':
        return <span className="grade-badge grade-b">Grade B (Standard)</span>;
      case 'C':
        return <span className="grade-badge grade-c">Grade C (Lagging)</span>;
      case 'D':
        return <span className="grade-badge grade-d">Grade D (High Risk)</span>;
    }
  };

  return (
    <div className="clients-section glass-panel">
      <div className="section-header-box">
        <div className="header-icon-badge">
          <Users size={20} />
        </div>
        <div>
          <h2 className="section-title-large">Client Reliability & Risk Scorecard</h2>
          <p className="section-subtitle">
            Historical settlement speeds and deposit recommendations to protect your freelance cash flow
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client / Company</th>
              <th>Reliability Grade</th>
              <th>Avg Days to Settle</th>
              <th>Total Billed</th>
              <th>Pending Inflows</th>
              <th>Contract Risk Advisory</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="client-row">
                {/* Name */}
                <td>
                  <div className="client-info-cell">
                    <span className="client-comp-name">{client.company}</span>
                    <span className="client-email-text">{client.email}</span>
                  </div>
                </td>

                {/* Grade */}
                <td>{getGradeBadge(client.ratingGrade)}</td>

                {/* Speed */}
                <td>
                  <div className="speed-cell font-mono">
                    <Clock size={13} className="speed-icon" />
                    <span>{client.avgPaymentDays} Days avg</span>
                  </div>
                </td>

                {/* Billed */}
                <td>
                  <span className="font-mono">${client.totalBilled.toLocaleString()}</span>
                </td>

                {/* Pending */}
                <td>
                  <span className="font-mono" style={{ color: client.totalPending > 0 ? 'var(--color-warning)' : 'var(--text-muted)' }}>
                    ${client.totalPending.toLocaleString()}
                  </span>
                </td>

                {/* Advisory */}
                <td>
                  <div className="advisory-pill">
                    {client.ratingGrade === 'D' ? (
                      <ShieldAlert size={14} className="advisory-icon-danger" />
                    ) : (
                      <ShieldCheck size={14} className="advisory-icon-safe" />
                    )}
                    <span>{client.riskNotice}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="clients-summary-banner">
        <ShieldCheck size={18} className="summary-icon" />
        <div>
          <strong>GigPulse Underwriting Insight:</strong> 82% of your receivables come from Grade A & B clients. Your high-risk exposure is limited to <strong>$3,200</strong> with Veloce Motors Inc.
        </div>
      </div>
    </div>
  );
};
