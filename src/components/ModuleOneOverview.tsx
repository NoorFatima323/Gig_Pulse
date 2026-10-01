import React from 'react';
import { Sparkles, Layers, Palette, Type, Smartphone, CheckCircle, ArrowRight, Zap, Shield, Flame } from 'lucide-react';

interface ModuleOneOverviewProps {
  onProceedToModuleTwo?: () => void;
}

export const ModuleOneOverview: React.FC<ModuleOneOverviewProps> = ({ onProceedToModuleTwo }) => {
  return (
    <div className="module-one-container">
      {/* Hero Welcome Card */}
      <div className="cyber-card hero-highlight-card">
        <div className="highlight-tag">
          <Sparkles size={14} className="tag-sparkle" />
          <span className="font-display">MODULE 1 COMPLETE</span>
        </div>
        <h2 className="hero-headline font-display">
          Mobile-First Shell &amp; Cyber-Volt Identity
        </h2>
        <p className="hero-desc">
          We replaced generic SaaS aesthetics with a distinct, attention-grabbing cyber-fintech palette built for rapid touch interactions and widescreen scaling.
        </p>
      </div>

      {/* Differentiated Color Palette Showcase */}
      <div className="cyber-card section-card">
        <div className="card-header-row">
          <div className="icon-pill volt-pill">
            <Palette size={16} />
          </div>
          <div>
            <h3 className="section-heading font-display">Unique Color Architecture</h3>
            <span className="section-subheading">High-contrast, non-traditional neon-on-obsidian palette</span>
          </div>
        </div>

        <div className="swatch-grid">
          {/* Swatch 1: Cyber Volt */}
          <div className="swatch-card">
            <div className="swatch-color" style={{ background: '#CCFF00', color: '#06080D' }}>
              <span className="font-mono">#CCFF00</span>
            </div>
            <div className="swatch-details">
              <span className="swatch-name font-display">Cyber Volt</span>
              <span className="swatch-role">Primary Action & Brand Glow</span>
            </div>
          </div>

          {/* Swatch 2: Deep Obsidian */}
          <div className="swatch-card">
            <div className="swatch-color" style={{ background: '#0C1019', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="font-mono">#0C1019</span>
            </div>
            <div className="swatch-details">
              <span className="swatch-name font-display">Deep Obsidian</span>
              <span className="swatch-role">Void Canvas & Glass Panels</span>
            </div>
          </div>

          {/* Swatch 3: Hyper Cyan */}
          <div className="swatch-card">
            <div className="swatch-color" style={{ background: '#00F2FE', color: '#06080D' }}>
              <span className="font-mono">#00F2FE</span>
            </div>
            <div className="swatch-details">
              <span className="swatch-name font-display">Hyper Cyan</span>
              <span className="swatch-role">Liquid Cash & Paid Clearances</span>
            </div>
          </div>

          {/* Swatch 4: Ultraviolet */}
          <div className="swatch-card">
            <div className="swatch-color" style={{ background: '#A855F7', color: '#FFFFFF' }}>
              <span className="font-mono">#A855F7</span>
            </div>
            <div className="swatch-details">
              <span className="swatch-name font-display">Ultraviolet</span>
              <span className="swatch-role">Runway Projections & AI Forecasts</span>
            </div>
          </div>

          {/* Swatch 5: Vivid Crimson */}
          <div className="swatch-card">
            <div className="swatch-color" style={{ background: '#FF2A6D', color: '#FFFFFF' }}>
              <span className="font-mono">#FF2A6D</span>
            </div>
            <div className="swatch-details">
              <span className="swatch-name font-display">Vivid Crimson</span>
              <span className="swatch-role">Overdue Invoices & High-Risk Alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Showcase */}
      <div className="cyber-card section-card">
        <div className="card-header-row">
          <div className="icon-pill cyan-pill">
            <Type size={16} />
          </div>
          <div>
            <h3 className="section-heading font-display">Modern Typography Pairings</h3>
            <span className="section-subheading">Tech-forward geometric display combined with clean data mono</span>
          </div>
        </div>

        <div className="type-specimen-grid">
          <div className="specimen-box">
            <span className="specimen-label">Display Font: Space Grotesk</span>
            <h4 className="font-display specimen-sample">Financial Freedom for Solo Founders.</h4>
            <span className="specimen-note">Geometric, sharp, high visual personality for headlines & badges.</span>
          </div>

          <div className="specimen-box">
            <span className="specimen-label">Number Font: JetBrains Mono</span>
            <div className="font-mono specimen-sample" style={{ color: 'var(--color-volt)', fontSize: '1.4rem' }}>
              $14,850.00 <span style={{ fontSize: '0.85rem', color: 'var(--color-cyan)' }}>(+98d Runway)</span>
            </div>
            <span className="specimen-note">Monospaced tabular digits for financial alignment and ticker feel.</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Implementation Roadmap */}
      <div className="cyber-card section-card">
        <div className="card-header-row">
          <div className="icon-pill violet-pill">
            <Layers size={16} />
          </div>
          <div>
            <h3 className="section-heading font-display">Step-by-Step Development Plan</h3>
            <span className="section-subheading">Building modularly and pushing to GitHub after every milestone</span>
          </div>
        </div>

        <div className="roadmap-milestones">
          <div className="milestone-item milestone-done">
            <div className="milestone-status">
              <CheckCircle size={18} />
            </div>
            <div className="milestone-content">
              <span className="milestone-badge">MODULE 1 (ACTIVE)</span>
              <h4 className="milestone-title font-display">Mobile-First App Shell &amp; Cyber-Volt Identity</h4>
              <p className="milestone-desc">PWA meta-ready, device simulator, floating dock navigation, custom color & font tokens.</p>
            </div>
          </div>

          <div className="milestone-item milestone-next">
            <div className="milestone-status">
              <span className="step-num font-mono">02</span>
            </div>
            <div className="milestone-content">
              <span className="milestone-badge badge-pending">NEXT STEP</span>
              <h4 className="milestone-title font-display">Module 2: Pulse Command Center &amp; Runway Calculator</h4>
              <p className="milestone-desc">Liquid cash metrics, burn rate sliders, and real-time days-of-survival calculation.</p>
            </div>
          </div>

          <div className="milestone-item">
            <div className="milestone-status">
              <span className="step-num font-mono">03</span>
            </div>
            <div className="milestone-content">
              <span className="milestone-badge">MODULE 3</span>
              <h4 className="milestone-title font-display">Predictive 6-Month Cash-Flow Curve</h4>
              <p className="milestone-desc">Dynamic SVG forecast curve with Conservative vs Optimistic client payout scenarios.</p>
            </div>
          </div>

          <div className="milestone-item">
            <div className="milestone-status">
              <span className="step-num font-mono">04</span>
            </div>
            <div className="milestone-content">
              <span className="milestone-badge">MODULE 4</span>
              <h4 className="milestone-title font-display">Smart Invoice Generator &amp; Auto-Chaser Engine</h4>
              <p className="milestone-desc">4-stage escalating reminders, tone-of-voice selector, and instant PDF invoice export.</p>
            </div>
          </div>

          <div className="milestone-item">
            <div className="milestone-status">
              <span className="step-num font-mono">05</span>
            </div>
            <div className="milestone-content">
              <span className="milestone-badge">MODULE 5</span>
              <h4 className="milestone-title font-display">Client Risk Scorecard &amp; Hackathon Judge Pitch Mode</h4>
              <p className="milestone-desc">Client settlement speed ratings (Grades A-D) and full rubric presentation video script.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
