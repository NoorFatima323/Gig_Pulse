import React, { useState } from 'react';
import { X, Sliders, DollarSign, Shield, Check, Flame } from 'lucide-react';
import { CashFlowSettings } from '../types';

interface RunwaySettingsModalProps {
  settings: CashFlowSettings;
  onClose: () => void;
  onSave: (updated: CashFlowSettings) => void;
}

export const RunwaySettingsModal: React.FC<RunwaySettingsModalProps> = ({ settings, onClose, onSave }) => {
  const [cashBalance, setCashBalance] = useState(settings.currentCashBalance);
  const [livingExpenses, setLivingExpenses] = useState(settings.monthlyLivingExpenses);
  const [bizExpenses, setBizExpenses] = useState(settings.monthlyBusinessExpenses);
  const [taxRate, setTaxRate] = useState(settings.taxReserveRate);

  const totalMonthlyBurn = Number(livingExpenses) + Number(bizExpenses);
  const dailyBurn = totalMonthlyBurn / 30;
  const newRunwayDays = dailyBurn > 0 ? Math.round(Number(cashBalance) / dailyBurn) : 999;
  const newRunwayMonths = (newRunwayDays / 30).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...settings,
      currentCashBalance: Number(cashBalance),
      monthlyLivingExpenses: Number(livingExpenses),
      monthlyBusinessExpenses: Number(bizExpenses),
      taxReserveRate: Number(taxRate)
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="modal-title">Runway Calculator & Financial Burn</h2>
              <p className="modal-subtitle">Calibrate your living expenses to forecast accurate cash survival</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-grid">
            {/* Live Runway Preview Banner */}
            <div className="runway-preview-banner glass-panel">
              <div className="preview-metric-box">
                <span className="lbl">Calculated Runway</span>
                <span className="val font-mono">
                  {newRunwayDays} <small>Days</small>
                </span>
                <span className="sub font-mono">({newRunwayMonths} Months Safe)</span>
              </div>
              <div className="preview-metric-box">
                <span className="lbl">Total Monthly Burn</span>
                <span className="val font-mono" style={{ color: 'var(--color-warning)' }}>
                  ${totalMonthlyBurn.toLocaleString()}/mo
                </span>
                <span className="sub font-mono">(${Math.round(dailyBurn)}/day)</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="form-field">
              <label className="input-label">Current Liquid Cash in Bank ($)</label>
              <input
                type="number"
                min="0"
                step="100"
                required
                className="form-input font-mono"
                value={cashBalance}
                onChange={e => setCashBalance(Number(e.target.value))}
              />
              <span className="field-hint">Actual checking or business operating account balance.</span>
            </div>

            <div className="input-row">
              <div className="form-field flex-1">
                <label className="input-label">Personal Living Costs ($/mo)</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  required
                  className="form-input font-mono"
                  value={livingExpenses}
                  onChange={e => setLivingExpenses(Number(e.target.value))}
                />
                <span className="field-hint">Rent, food, healthcare, utilities.</span>
              </div>

              <div className="form-field flex-1">
                <label className="input-label">Business Subscriptions ($/mo)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  required
                  className="form-input font-mono"
                  value={bizExpenses}
                  onChange={e => setBizExpenses(Number(e.target.value))}
                />
                <span className="field-hint">Figma, GitHub, Adobe, domain hosting.</span>
              </div>
            </div>

            <div className="form-field">
              <div className="range-header">
                <label className="input-label">Automatic Tax Reserve Rate: {taxRate}%</label>
                <span className="font-mono text-muted">
                  Reserve: ${Math.round((cashBalance * taxRate) / 100).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                className="form-range"
                value={taxRate}
                onChange={e => setTaxRate(Number(e.target.value))}
              />
              <div className="range-labels font-mono">
                <span>10%</span>
                <span>25% (Standard)</span>
                <span>40%</span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Apply Financial Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
