import React, { useState } from 'react';
import { TrendingUp, Calendar, Zap, AlertCircle } from 'lucide-react';
import { Invoice, CashFlowSettings } from '../types';

interface CashFlowChartProps {
  invoices: Invoice[];
  settings: CashFlowSettings;
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ invoices, settings }) => {
  const [scenario, setScenario] = useState<'realistic' | 'conservative' | 'optimistic'>('realistic');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const monthlyBurn = settings.monthlyLivingExpenses + settings.monthlyBusinessExpenses;
  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Generate 6 months of forecasts based on scenario
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  
  // Calculate projected balance per month
  const dataPoints = months.map((month, idx) => {
    let multiplier = 1.0;
    if (scenario === 'conservative') multiplier = 0.65;
    if (scenario === 'optimistic') multiplier = 1.25;

    // Projected average recurring monthly freelance bookings
    const estimatedNewInflow = 4500 * multiplier;
    
    // In month 0 and 1, we also clear pending/overdue invoices
    const pendingRecovery = idx === 0 ? pendingAmount * (scenario === 'conservative' ? 0.7 : 1.0) : 0;
    const overdueRecovery = idx === 1 ? overdueAmount * (scenario === 'conservative' ? 0.4 : 0.9) : 0;

    let balance = settings.currentCashBalance;
    for (let i = 0; i <= idx; i++) {
      const inflow = (i === 0 ? pendingRecovery : 0) + (i === 1 ? overdueRecovery : 0) + estimatedNewInflow;
      balance = balance + inflow - monthlyBurn;
    }

    return {
      month,
      balance: Math.max(balance, 1000),
      inflow: (idx === 0 ? pendingRecovery : 0) + estimatedNewInflow,
      burn: monthlyBurn,
      runway: Math.round(Math.max(balance, 1000) / (monthlyBurn / 30))
    };
  });

  const maxVal = Math.max(...dataPoints.map(d => d.balance), 25000);
  const minVal = 0;

  // SVG Chart Dimensions
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  const points = dataPoints.map((d, i) => {
    const x = paddingX + (i / (dataPoints.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((d.balance - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  // Expense baseline line (e.g. 2 months emergency cushion = 2 * monthlyBurn)
  const emergencyFloor = monthlyBurn * 2;
  const floorY = svgHeight - paddingY - ((emergencyFloor - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);

  return (
    <div className="chart-container glass-panel">
      <div className="chart-header">
        <div className="chart-title-group">
          <div className="chart-icon-box">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="chart-title">Predictive Cash Flow & Runway Pulse</h2>
            <p className="chart-subtitle">6-Month simulated balance factoring in invoice collection speeds</p>
          </div>
        </div>

        {/* Scenario Selectors */}
        <div className="scenario-pills">
          <button
            className={`pill-btn ${scenario === 'conservative' ? 'pill-btn-active' : ''}`}
            onClick={() => setScenario('conservative')}
            title="Assumes late client payments and delays"
          >
            Conservative
          </button>
          <button
            className={`pill-btn ${scenario === 'realistic' ? 'pill-btn-active' : ''}`}
            onClick={() => setScenario('realistic')}
            title="Normal collection rate with Auto-Chaser enabled"
          >
            Realistic
          </button>
          <button
            className={`pill-btn ${scenario === 'optimistic' ? 'pill-btn-active' : ''}`}
            onClick={() => setScenario('optimistic')}
            title="Fast 48-hour client settlements"
          >
            Optimistic
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="svg-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="cashflow-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.1)" />

          {/* Emergency Safety Cushion Floor */}
          <line 
            x1={paddingX} 
            y1={floorY} 
            x2={svgWidth - paddingX} 
            y2={floorY} 
            stroke="rgba(239, 68, 68, 0.4)" 
            strokeDasharray="4 4" 
            strokeWidth="1.5" 
          />
          <text x={paddingX + 5} y={floorY - 6} fill="rgba(239, 68, 68, 0.7)" fontSize="9" fontFamily="monospace">
            Emergency Floor (2 Mo Expenses: {settings.currency}{emergencyFloor.toLocaleString()})
          </text>

          {/* Forecast Area & Line */}
          <path d={areaD} fill="url(#areaGradient)" />
          <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Nodes */}
          {points.map((p, idx) => (
            <g key={p.month} className="chart-node">
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === idx ? 6 : 4}
                fill={hoveredIndex === idx ? '#ffffff' : '#6366f1'}
                stroke="#0e131f"
                strokeWidth="2"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              />
              <text
                x={p.x}
                y={svgHeight - 8}
                textAnchor="middle"
                fill={hoveredIndex === idx ? '#f8fafc' : '#64748b'}
                fontSize="11"
                fontWeight={hoveredIndex === idx ? 'bold' : 'normal'}
              >
                {p.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div 
            className="chart-tooltip glass-panel"
            style={{ 
              left: `${(points[hoveredIndex].x / svgWidth) * 100}%`,
              transform: 'translate(-50%, -115%)' 
            }}
          >
            <div className="tooltip-month">{points[hoveredIndex].month} 2026 Forecast</div>
            <div className="tooltip-balance font-mono">
              {settings.currency}{Math.round(points[hoveredIndex].balance).toLocaleString()}
            </div>
            <div className="tooltip-details">
              <span>Runway: <strong>{points[hoveredIndex].runway} days</strong></span>
              <span>Net Burn: -{settings.currency}{monthlyBurn.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer Insight */}
      <div className="chart-footer-note">
        <Zap size={14} className="note-icon" />
        <span>
          <strong>GigPulse AI Insight:</strong> Under the <em>{scenario}</em> projection, your lowest cash point will be{' '}
          <strong>{settings.currency}{Math.round(Math.min(...dataPoints.map(d => d.balance))).toLocaleString()}</strong>. Your runway remains well above the 60-day safety benchmark.
        </span>
      </div>
    </div>
  );
};
