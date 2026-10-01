import React from 'react';
import { Award, Target, DollarSign, Layers, Video, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const PitchDeckView: React.FC = () => {
  return (
    <div className="pitch-view-container">
      {/* Hero Pitch Banner */}
      <div className="pitch-hero glass-panel">
        <div className="hero-tag">
          <Award size={16} />
          <span>Next Founders 2026 Hackathon Master Pitch</span>
        </div>
        <h2 className="pitch-hero-title">
          GigPulse: The Financial Co-Pilot for the 73 Million Freelancer Economy
        </h2>
        <p className="pitch-hero-desc">
          Turning irregular freelance chaos into predictable financial runway through automated client chasing and smart cash forecasting.
        </p>

        <div className="rubric-badge-grid">
          <div className="rubric-pill">
            <span className="pill-score">25%</span>
            <span className="pill-name">Technical Execution</span>
          </div>
          <div className="rubric-pill">
            <span className="pill-score">25%</span>
            <span className="pill-name">Innovation & UX</span>
          </div>
          <div className="rubric-pill">
            <span className="pill-score">25%</span>
            <span className="pill-name">Business & Finance</span>
          </div>
          <div className="rubric-pill">
            <span className="pill-score">25%</span>
            <span className="pill-name">Communication</span>
          </div>
        </div>
      </div>

      {/* 4 Rubric Breakdown Cards */}
      <div className="rubric-cards-grid">
        {/* Card 1: Problem & Innovation */}
        <div className="pitch-card glass-panel">
          <div className="pitch-card-header">
            <div className="icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary-light)' }}>
              <Target size={20} />
            </div>
            <div>
              <h3 className="card-title">1. The Problem & Target Market</h3>
              <span className="card-sub">Innovation & UX (25%)</span>
            </div>
          </div>
          <ul className="pitch-list">
            <li><strong>73 Million Freelancers in the US</strong> alone (over 1.5 Billion globally).</li>
            <li><strong>$6,000 lost per freelancer annually</strong> due to delayed, forgotten, or uncollected invoices.</li>
            <li><strong>The Awkwardness Barrier:</strong> Creatives dread sending awkward WhatsApp/email payment reminders, leading to severe cash crunches.</li>
            <li><strong>The GigPulse Solution:</strong> Automated, polite, escalating chaser engine + instant runway calculator.</li>
          </ul>
        </div>

        {/* Card 2: Business & Monetization */}
        <div className="pitch-card glass-panel">
          <div className="pitch-card-header">
            <div className="icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <h3 className="card-title">2. Business Model & Unit Economics</h3>
              <span className="card-sub">Business & Finance (25%)</span>
            </div>
          </div>
          <div className="pricing-tiers">
            <div className="tier-box">
              <span className="tier-name">Free Starter ($0)</span>
              <p className="tier-desc">Up to 3 active clients, manual invoicing, core cash runway metric.</p>
            </div>
            <div className="tier-box tier-pro">
              <span className="tier-name">GigPulse Pro ($9 / mo)</span>
              <p className="tier-desc">Unlimited clients, automated multi-channel chaser, custom branding, predictive tax reserves.</p>
            </div>
          </div>
          <div className="economics-summary font-mono">
            <span>Target: 10,000 Pro Subscribers = $1,080,000 ARR</span>
            <span>Gross Margins: 88% | CAC Payback: &lt; 3 Months</span>
          </div>
        </div>

        {/* Card 3: Technical Execution */}
        <div className="pitch-card glass-panel">
          <div className="pitch-card-header">
            <div className="icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-warning)' }}>
              <Layers size={20} />
            </div>
            <div>
              <h3 className="card-title">3. Technical Architecture & Stack</h3>
              <span className="card-sub">Technical Execution (25%)</span>
            </div>
          </div>
          <ul className="pitch-list">
            <li><strong>Frontend:</strong> React 18 + Vite + TypeScript for ultra-fast, type-safe execution.</li>
            <li><strong>Custom FinTech UI:</strong> Bespoke dark-mode glassmorphic design system with zero external UI bloat.</li>
            <li><strong>Interactive SVG Engine:</strong> Dynamic cash-flow forecast modeling with real-time scenario simulation.</li>
            <li><strong>Zero-Failure Storage:</strong> LocalStorage persistence with instant demo data resets for seamless live judge evaluation.</li>
          </ul>
        </div>

        {/* Card 4: 5-Minute Video Pitch Script */}
        <div className="pitch-card glass-panel">
          <div className="pitch-card-header">
            <div className="icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)' }}>
              <Video size={20} />
            </div>
            <div>
              <h3 className="card-title">4. Five-Minute Video Blueprint</h3>
              <span className="card-sub">Communication (25%)</span>
            </div>
          </div>
          <div className="timeline-script">
            <div className="script-row">
              <span className="time-badge font-mono">0:00 - 0:45</span>
              <span><strong>Hook & Problem:</strong> Why freelancers lose thousands to late payments.</span>
            </div>
            <div className="script-row">
              <span className="time-badge font-mono">0:45 - 1:30</span>
              <span><strong>The Architecture:</strong> Show the clean React/Vite/TS codebase and modular design.</span>
            </div>
            <div className="script-row">
              <span className="time-badge font-mono">1:30 - 3:30</span>
              <span><strong>Live Working Demo:</strong> Create an invoice, trigger Auto-Chaser, review Client Scorecard.</span>
            </div>
            <div className="script-row">
              <span className="time-badge font-mono">3:30 - 4:15</span>
              <span><strong>Business & Unit Economics:</strong> $9/mo SaaS model, 73M TAM, path to $1M ARR.</span>
            </div>
            <div className="script-row">
              <span className="time-badge font-mono">4:15 - 5:00</span>
              <span><strong>Scalability & Future:</strong> Instant invoice factoring and mobile app packaging.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
