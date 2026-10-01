import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  FileText, 
  Users, 
  Smartphone, 
  Monitor, 
  Bell, 
  ShieldCheck, 
  Flame,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export type NavTab = 'pulse' | 'flow' | 'invoices' | 'clients';

interface MobileAppShellProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  children: React.ReactNode;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  activeTab,
  setActiveTab,
  children
}) => {
  // Toggle between simulated Mobile Device Frame and Full Responsive Layout
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'phone'>('responsive');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className={`app-shell-root ${deviceMode === 'phone' ? 'mode-phone-simulator' : 'mode-responsive'}`}>
      {/* Top Utility Bar (Shows Hackathon & Cross-Device Controls) */}
      <div className="top-utility-bar">
        <div className="utility-left">
          <div className="hackathon-tag">
            <span className="pulse-indicator">
              <span className="pulse-dot" />
              <span className="pulse-ring" />
            </span>
            <span className="font-display tag-text">NEXT FOUNDERS '26</span>
          </div>
          <span className="tag-divider">/</span>
          <span className="module-status-badge">Module 1: Design System & Mobile Shell</span>
        </div>

        {/* Device Switcher for Demo / Video recording */}
        <div className="device-switcher">
          <button
            className={`device-btn ${deviceMode === 'responsive' ? 'device-btn-active' : ''}`}
            onClick={() => setDeviceMode('responsive')}
            title="Full Responsive Desktop View"
          >
            <Monitor size={14} />
            <span>Responsive View</span>
          </button>
          <button
            className={`device-btn ${deviceMode === 'phone' ? 'device-btn-active' : ''}`}
            onClick={() => setDeviceMode('phone')}
            title="Simulated Smartphone Device Frame"
          >
            <Smartphone size={14} />
            <span>Mobile Device Mode</span>
          </button>
        </div>
      </div>

      {/* Main Wrapper (Scales to phone frame if phone mode is selected) */}
      <div className={`device-container ${deviceMode === 'phone' ? 'phone-frame' : 'responsive-frame'}`}>
        
        {/* Mobile Header */}
        <header className="mobile-header">
          <div className="user-profile-row">
            <div className="avatar-box">
              <span className="avatar-initials font-display">GP</span>
              <span className="avatar-status-dot" />
            </div>
            <div className="header-greeting">
              <span className="greeting-small">FINANCIAL CO-PILOT</span>
              <h1 className="header-brand-title font-display">
                GigPulse <span className="brand-dot">.</span>
              </h1>
            </div>
          </div>

          <div className="header-right-actions">
            <div className="runway-chip">
              <Flame size={13} className="chip-fire-icon" />
              <span className="font-mono chip-days">98 Days</span>
              <span className="chip-label">Runway</span>
            </div>

            <button 
              className="icon-circle-btn"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="Notifications"
            >
              <Bell size={16} />
              <span className="notif-badge-dot" />
            </button>
          </div>
        </header>

        {/* Notifications Slide-Down Drawer */}
        {notificationsOpen && (
          <div className="notifications-drawer cyber-card">
            <div className="drawer-header">
              <span className="drawer-title font-display">Live Pulse Alerts</span>
              <button className="close-link" onClick={() => setNotificationsOpen(false)}>Dismiss</button>
            </div>
            <div className="drawer-item">
              <div className="drawer-item-icon icon-overdue">
                <Flame size={14} />
              </div>
              <div className="drawer-item-content">
                <p className="item-title">Overdue Alert (16 Days)</p>
                <p className="item-sub">Veloce Motors Inc. invoice is due for auto-chase.</p>
              </div>
            </div>
            <div className="drawer-item">
              <div className="drawer-item-icon icon-cleared">
                <CheckCircle2 size={14} />
              </div>
              <div className="drawer-item-content">
                <p className="item-title">Deposit Received</p>
                <p className="item-sub">Apex Digital Labs cleared $4,800 into liquid balance.</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main className="mobile-main-viewport">
          {children}
        </main>

        {/* Mobile-First Bottom Floating Dock Navigation */}
        <nav className="mobile-dock-nav">
          <button
            className={`dock-tab ${activeTab === 'pulse' ? 'dock-tab-active' : ''}`}
            onClick={() => setActiveTab('pulse')}
          >
            <Zap size={18} />
            <span className="dock-label">Pulse</span>
            {activeTab === 'pulse' && <span className="dock-active-glow" />}
          </button>

          <button
            className={`dock-tab ${activeTab === 'flow' ? 'dock-tab-active' : ''}`}
            onClick={() => setActiveTab('flow')}
          >
            <TrendingUp size={18} />
            <span className="dock-label">Cash Flow</span>
            {activeTab === 'flow' && <span className="dock-active-glow" />}
          </button>

          <button
            className={`dock-tab ${activeTab === 'invoices' ? 'dock-tab-active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            <FileText size={18} />
            <span className="dock-label">Invoices</span>
            {activeTab === 'invoices' && <span className="dock-active-glow" />}
          </button>

          <button
            className={`dock-tab ${activeTab === 'clients' ? 'dock-tab-active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users size={18} />
            <span className="dock-label">Clients</span>
            {activeTab === 'clients' && <span className="dock-active-glow" />}
          </button>
        </nav>

      </div>
    </div>
  );
};
