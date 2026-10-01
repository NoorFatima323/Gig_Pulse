import React from 'react';
import { Zap, Plus, Sliders, RotateCcw, Presentation, TrendingUp } from 'lucide-react';
import { CashFlowSettings } from '../types';

interface HeaderProps {
  settings: CashFlowSettings;
  onOpenNewInvoice: () => void;
  onOpenRunwaySettings: () => void;
  onResetDemo: () => void;
  showPitchBanner: boolean;
  onTogglePitchBanner: () => void;
  activeTab: 'dashboard' | 'clients' | 'pitch';
  setActiveTab: (tab: 'dashboard' | 'clients' | 'pitch') => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onOpenNewInvoice,
  onOpenRunwaySettings,
  onResetDemo,
  showPitchBanner,
  onTogglePitchBanner,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="main-header glass-panel">
      <div className="header-container">
        {/* Left: Brand & Navigation */}
        <div className="brand-group">
          <div className="logo-badge">
            <Zap className="logo-icon" size={22} />
          </div>
          <div>
            <div className="logo-text-row">
              <h1 className="logo-title">GigPulse</h1>
              <span className="badge badge-live">Next Founders '26</span>
            </div>
            <p className="logo-tagline">Financial Co-Pilot & Cash Flow Operating System</p>
          </div>
        </div>

        {/* Middle: Tab Navigation */}
        <nav className="header-nav">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp size={16} />
            <span>Command Center</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'clients' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <span>Client Scorecard</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'pitch' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('pitch')}
          >
            <Presentation size={16} />
            <span>Judge Pitch & Rubric</span>
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenRunwaySettings}
            title="Adjust living expenses & runway calculator"
          >
            <Sliders size={15} />
            <span className="hide-mobile">Runway Settings</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onResetDemo}
            title="Reset to fresh demo data"
          >
            <RotateCcw size={15} />
            <span className="hide-mobile">Reset Demo</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenNewInvoice}
          >
            <Plus size={16} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>
    </header>
  );
};
