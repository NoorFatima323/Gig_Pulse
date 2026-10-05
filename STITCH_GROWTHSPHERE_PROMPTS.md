# 🎨 GrowthSphere Stitch UI Prompts Master Guide
**Product:** GigPulse — Autonomous Financial OS for Independent Founders & Creators  
**Design Reference:** [GrowthSphere Mockup](https://growth-sphere-gules.vercel.app/mockup.html)  
**Theme:** Dark Luxury Obsidian & Electric Iris (`#020202` / `#5B5EE0` / `#10B981`)  
**Target:** Responsive Web Application (Desktop-First + Mobile Bottom Navigation Dock)

---

## 🌿 Global Design System Guidelines (Include in Every Prompt)

- **Canvas Background:** Deep Void Obsidian (`#020202`)
- **Card Surfaces:** Dark Glassmorphic Charcoal (`#0A0A0F`) with subtle gradient overlay (`linear-gradient(155deg, rgba(255,255,255,0.045) 0%, transparent 40%, rgba(91,94,224,0.08) 90%)`)
- **Card Borders:** 1px Architectural Slate (`#1D1D24`), illuminating to `#33334A` or `#5B5EE0/40` on hover
- **Primary Typography:** `Plus Jakarta Sans`, system-ui, sans-serif
- **Headlines Contrast:** Weight 300 Light titles paired with Weight 800 Bold Italic gradient text-fill:
  `linear-gradient(120deg, #FFFFFF 30%, #7B78F2 100%)`
- **Numbers & Financial Telemetry:** Monospace `JetBrains Mono` with tabular digits
- **Primary Accent:** Electric Iris Indigo (`#5B5EE0`, Soft: `#7B78F2`, Deep: `#3F3CB8`)
- **Positive Cash Flow / Runway:** Mint Glow (`#10B981`, Subtle: `#DCFCE7/10`)
- **Alert / Overdue Accent:** Crimson Rose (`#E11D48`, Subtle: `#FFE4E6/10`)
- **Signature UI Elements:**
  1. **Pill Button with Rotating Arrow:** High-gloss gradient pill with a circular arrow badge that rotates 45° on hover.
  2. **Dotted Grid Corner Accent:** Subtle radial dotted pattern in bottom-right card corners with circular fade mask.
  3. **Ambient Background Glows:** 60vw radial mesh blur (`rgba(91,94,224,0.25)`) floating behind hero elements.
  4. **Mobile Navigation Dock:** Fixed glassmorphic bottom bar (`md:hidden`) with 5 thumb-friendly tabs and elevated center action button.

---

## 🚀 Screen 0: Public Marketing Landing Page (`landing_page.html`)

### Stitch Prompt:
```text
Create a world-class, high-converting startup marketing landing page for "GigPulse — The Autonomous Financial OS for Freelancers & Independent Creators".

Aesthetic & Color Palette:
- Exact GrowthSphere Dark Luxury theme: Background #020202, glassmorphic cards #0A0A0F, borders #1D1D24, accent Electric Iris #5B5EE0 & #7B78F2, positive financial indicators in Mint #10B981.
- Typography: Plus Jakarta Sans with dual-weight headings (Weight 300 paired with Weight 800 italic gradient: "Stop Chasing Clients. Run on Autonomous Cash Runway.").
- Atmosphere: Radial ambient glows, subtle dotted grid accents, and watermark typography in background.

Sections Required (Top to Bottom):

1. Sticky Glassmorphic Header (z-50):
   - Left: Logo "GIGPULSE" with glowing iris dot and subtext "AUTONOMOUS FINANCIAL OS".
   - Center: Nav links with smooth hover underline: "Features", "How It Works", "Agents", "Pricing", "Testimonials".
   - Right: "98d Runway Demo" badge + Signature Pill CTA: "Launch Live App ↗" (links to web app dashboard).

2. Hero Section (100svh):
   - Eyebrow: "REPLACE INVOICE ANXIETY WITH AUTONOMOUS FINANCIAL INTELLIGENCE" (13px, uppercase, letter-spacing: 0.3em).
   - Massive Headline: "Never Run Out of Cash. The Autonomous Financial OS for Independent Founders." (Weight 300 for main words, Weight 800 Italic with Iris gradient for key phrases).
   - Subheadline: "GigPulse deploys 4 autonomous AI agents that predict cash flow gaps, secure upfront deposits, and chase overdue invoices automatically — without awkward client emails."
   - Dual Action Cluster:
     - Primary: "Launch Live Demo ↗" (pill button with rotating circular arrow badge).
     - Secondary: "Watch 2-Min Walkthrough" (ghost pill with play icon).
   - Live Stats Strip:
     - "98.2%" AI Recovery Rate
     - "3.8x" Faster Invoice Settlement
     - "0" Awkward Client Conversations
     - "$4.2M+" Independent Cash Flow Protected

3. Numbers Strip (4 Columns with vertical line dividers):
   - Cell 1: 4.8 Days (Average Settlement vs 24d freelance standard)
   - Cell 2: 98 Days (Average Protected Runway)
   - Cell 3: 100% Zero-Dispute Deposit Shielding
   - Cell 4: 4 Autonomous Agents Working 24/7

4. The Autonomous Multi-Agent Fleet (Interactive Expandable Rail):
   - Section Title: "Meet Your Financial Syndicate" with subtitle "4 specialized autonomous AI agents running your finance department."
   - Agent 1: The Sentinel (Runway Guard & Burn Rate Analyzer)
   - Agent 2: The Chaser (Autonomous Multi-Tone Invoice Recovery via WhatsApp & Email)
   - Agent 3: The Underwriter (Client Credit Scorer & Net-Terms Gatekeeper)
   - Agent 4: Pulse Conductor (Executive Cash Cushion & Factor Liquidity Allocator)
   - Each card features step numbering ("01", "02"), micro-features list, and active glowing hover effect.

5. How It Works (Bento Step Grid):
   - Step 01: Connect Mercury, Stripe, or Bank (Zero-friction sync in 30 seconds).
   - Step 02: Real-time Cash Runway Scoring (Dynamic 90-day survival forecast).
   - Step 03: Milestone-Shielded Invoicing (Enforce 30-50% deposits upfront).
   - Step 04: Hands-Off Autonomous Recovery (AI negotiates and settles overdue fees).

6. Interactive Pricing & Business Model:
   - Monthly / Annual toggle (with "Save 20%" badge).
   - Tier 1: "Solo Creator" — $0/mo (Free forever: 3 active invoices, 30-day runway radar, manual chaser).
   - Tier 2: "Pro Independent" — $19/mo (Most Popular, highlighted in glowing Iris border: Unlimited invoices, Autonomous AI Chaser, Net terms underwriting, WhatsApp integration).
   - Tier 3: "Studio / Agency" — $49/mo (Multi-client scoring, instant invoice factoring advance, custom domain payment links).

7. FAQ Accordion & Social Proof:
   - 4 collapsible questions with smooth '+' to '×' rotation.
   - Quote carousel featuring real freelance engineers and agency founders.

8. High-Impact Call-to-Action & Footer:
   - Full-width card with radial glow: "Ready to never worry about late payments again?"
   - Big Pill CTA: "Enter GigPulse Web App ↗".
   - Minimalist 4-column footer with copyright, security badges, and API status indicator.
```

---

## ⚡ Screen 1: Web App Core Dashboard — Pulse Cockpit (`01_pulse_dashboard.html`)

### Stitch Prompt:
```text
Create the central executive dashboard view for "GigPulse — Autonomous Financial OS".

Layout & Style:
- Dark Luxury Bento Grid layout (12 columns).
- Background #020202, cards in #0A0A0F with #1D1D24 borders.
- Responsive Web App with Desktop Top Bar and Mobile Floating Bottom Navigation Dock (md:hidden).

Components to Build:

1. Top Navigation Bar:
   - Logo + "GigPulse" with pulsing green indicator dot.
   - Desktop Navigation Links: Pulse (Active), Cash Flow, Invoices, Scorecard, Smart Chaser.
   - Quick Runway Pill: "⚡ 98d Runway" in mint tint.
   - Primary CTA: "+ New Invoice ↗" gradient pill.
   - Profile avatar "AL" (Alex M.).

2. Bento Row 1 (Hero Row):
   - Card 1 (7 Columns - Capital Runway Gauge):
     - Large number "01" top-left, dotted pattern bottom-right.
     - Headline: "Operating Runway with 3.2 Months Cushion".
     - Circular SVG progress meter (98 Days bold in center, 82% colored in mint-to-iris gradient).
     - 3-column financial breakdown: Monthly Burn ($3,850/mo), Liquid Cash ($14,850), Runway Safety Buffer (+42d).
     - Scenario Simulator Pills: "Worst-Case (74d)", "Current (98d)", "After Recovery (123d)".
   - Card 2 (5 Columns - Priority Action Console):
     - Rose/coral tinted border and dotted pattern.
     - Number "02", badge: "16d Overdue • Step 2 Escalation".
     - Client: Veloce Motors Inc. — Balance: $3,200.00.
     - AI probability: "94.2% Autonomous Recovery Probability".
     - Primary Action: "Execute Smart Dispatch ↗" (pill button).
     - Secondary Action: "Instant Cash Advance ($3,152)" (factoring ghost button).

3. Bento Row 2 (4 High-Impact Metric Cards):
   - Card 04: Liquid Capital ($14,850.00 • Immediate available).
   - Card 05: Pending Inflows ($6,200.00 • 2 invoices due in 10 days).
   - Card 06: 30-Day Safe-to-Spend ($4,120.00 • Buffer after tax vault).
   - Card 07: Client Reliability Index (94/100 • Grade A average).

4. Bento Row 3:
   - Left (8 Columns): Live Receivables Aging Radar & Client Feed.
   - Right (4 Columns): Autonomous Agent Fleet Thought Stream (live rotating terminal ticker showing Sentinel, Chaser, and Underwriter reasoning in real time).

5. Mobile Bottom Navigation Dock (Fixed bottom-0, md:hidden):
   - 5 thumb-friendly items: Pulse (Active), Runway, center elevated "+ New" button, Invoices, Chaser.
```

---

## 📊 Screen 2: Web App — Cash Flow & Runway Forecaster (`02_cash_flow_forecaster.html`)

### Stitch Prompt:
```text
Create the interactive "Cash Flow & Financial Runway Forecaster" screen for GigPulse.

Layout & Style:
- Dark Luxury GrowthSphere Bento architecture.
- Real-time interactive calculation sliders and dynamic runway curve visualizer.

Components to Build:

1. Top Screen Header:
   - Icon badge with ssid_chart icon.
   - Title: "Cash Flow & Runway Forecaster" with "Live Model" pill.
   - Subtitle: "Simulate operational burn, delayed client settlements, and tax withholding reserves."

2. Hero Forecaster Cockpit (Split Grid):
   - Left (7 Columns): Dynamic Runway Curve Chart (SVG/Canvas showing 90-day cash projection with a dashed 'Insolvency Threshold' red line and green 'Protected Buffer' zone).
   - Right (5 Columns): "Safe-to-Spend Compass":
     - Big Metric: "$4,120.00 Safe to Discretionary Spend".
     - Tax Vault Allocation: "$3,150.00 (25% Auto-Locked)".
     - Emergency Runway Floor: "60 Days Enforced Minimum".

3. Interactive Scenario Sliders Console:
   - Slider 1: Liquid Capital Balance ($5,000 to $50,000, default $14,850).
   - Slider 2: Monthly Living Expenses ($1,500 to $8,000, default $3,200).
   - Slider 3: Software & SaaS Burn ($100 to $2,000, default $650).
   - Slider 4: Tax Withholding Rate (15% to 35%, default 25%).
   - Sliders must have luxury glowing thumb handles that update metrics in real time.

4. Stress Test Sensitivity Matrix (3 Scenario Cards):
   - Scenario A: "Client Delays by 30 Days" (Runway drops to 68 days — Safe).
   - Scenario B: "Zero Inflow for 60 Days" (Runway drops to 41 days — Warning).
   - Scenario C: "Instant Factoring Payout" (Runway extends to 123 days — Optimal).

5. Mobile Bottom Navigation Bar included.
```

---

## 📄 Screen 3: Web App — Autonomous Invoice Manager (`03_invoice_manager.html`)

### Stitch Prompt:
```text
Create the modern, decluttered "Invoice & Receivables Manager" screen for GigPulse.

Layout & Style:
- GrowthSphere Dark Luxury theme.
- Focus: Spacious, airy, decluttered cards with zero awkward text breaks. No crowded multi-badge stacking.

Components to Build:

1. Header & Summary Stats:
   - 4 summary pills: Total Outstanding ($6,200), Overdue ($3,200), Settled This Month ($6,300), Avg Pay Time (4.8d).

2. Segmented Search & Filter Controls:
   - Search input with ⌘K hotkey badge.
   - Segmented Filter Tabs: All (5), Pending (2), Overdue (1), Paid (2).
   - View Switcher: Cards View vs Spreadsheet Table View.

3. Decluttered Invoice Cards List (Feed):
   - Card 1 (Overdue): Veloce Motors Inc.
     - Top row: 44px Initial squircle 'VM', client title, single status pill '16d Overdue' in soft rose tint, big amount '$3,200.00'.
     - Inline Metadata line (No wrapping): "INV-2026-085 • Due Sep 15, 2026 • Marcus Thorne • Grade D (High Risk)".
     - Scope & Schedule Strip: Light tinted horizontal box showing project scope + Step 2 Auto-Escalation Armed note.
     - Compact Action Footer: "Auto-Chase ↗" button, "Tone" settings, "Copy Link", "PDF".
   - Card 2 (Pending): Apex Digital Labs ($3,000.00 • Due in 2 Days • Grade A Fast Payer).
   - Card 3 (Pending): HyperGrowth Media ($2,400.00 • Due in 10 Days • Grade B Standard).
   - Card 4 (Paid): Aura Health App ($4,800.00 • Settled via Stripe • Grade A+ Instant).
   - Card 5 (Paid): NorthStar Analytics ($1,500.00 • Settled via ACH Direct • Grade A Reliable).

4. Right Sidebar Widget (Receivables Aging Spectrum):
   - Horizontal segmented progress bar showing 0-14d (48%) and 15-30d overdue (52%).
   - Direct Factoring Advance Simulator.

5. Mobile Bottom Navigation Bar included.
```

---

## 👥 Screen 4: Web App — Client Reliability Scorecard (`04_client_scorecard.html`)

### Stitch Prompt:
```text
Create the "Client Reliability & Risk Scorecard" screen for GigPulse.

Layout & Style:
- Dark Luxury GrowthSphere layout.
- Provides deep B2B underwriter intelligence to help freelancers evaluate clients before signing contracts.

Components to Build:

1. Header Ribbon:
   - Verified user shield badge.
   - Title: "Client Reliability & Credit Scorecards".
   - Subtitle: "Algorithmic payment reliability scoring based on historical payment velocity, invoice disputes, and contract terms."

2. Overall Portfolio Health Banner:
   - Grade Distribution Gauge: 60% Grade A (Safe), 25% Grade B (Standard), 15% Grade D (High Risk).
   - Recommended Action: "Enforce 50% upfront deposits on Grade C/D clients to protect operating cushion."

3. Client Scorecards Grid (3 Columns):
   - Card 1: Apex Digital Labs — Grade A (Score: 96/100)
     - Average Payment Speed: 2.4 Days (Super Fast).
     - Dispute Rate: 0.0%. Total Billed: $18,500.
     - Recommendation: "Approved for Net 30 terms. Low risk."
   - Card 2: HyperGrowth Media — Grade B (Score: 82/100)
     - Average Payment Speed: 9.1 Days. Total Billed: $12,400.
     - Recommendation: "Standard Net 14 terms. Schedule courtesy reminder 2 days before due date."
   - Card 3: Veloce Motors Inc. — Grade D (Score: 42/100)
     - Average Payment Speed: 24.8 Days. Late Invoices: 2.
     - Recommendation: "HIGH RISK. Do not start work without 50% upfront milestone deposit."

4. Contract Terms Calculator:
   - Input contract value to auto-generate recommended payment schedule (e.g. 50% deposit, 25% milestone 1, 25% delivery).

5. Mobile Bottom Navigation Bar included.
```

---

## 🤖 Screen 5: Web App — Smart Payment Chaser (`05_smart_chaser.html`)

### Stitch Prompt:
```text
Create the "Autonomous Smart Payment Chaser" screen for GigPulse.

Layout & Style:
- Dark Luxury GrowthSphere theme.
- Features real-time AI tone calibration and multi-channel escalation preview.

Components to Build:

1. Top Screen Header:
   - Lightning bolt icon.
   - Title: "Smart Payment Chaser — Autonomous Escalation Engine".
   - Subtitle: "Auto-calibrated follow-ups tailored to client reliability grades without burning bridge relationships."

2. Split Layout Workspace:
   - Left Column (Tone Calibrator & Channel Routing):
     - Interactive Tone Selector:
       - 1. "Gentle & Friendly" (for Grade A clients due in 2 days).
       - 2. "Professional Statement" (for standard Net 14 invoices).
       - 3. "Firm Executive Escalation" (for overdue accounts past 15 days).
     - Multi-channel delivery checkboxes: Email, SMS, WhatsApp Direct.
     - Autonomous Schedule: "Send automatically Friday at 9:00 AM".
   - Right Column (Live Message Preview Box):
     - Render an authentic glassmorphic email/message preview card.
     - Subject Line, Recipient, Body Copy with bold dynamic variables: [#INV-2026-089, $3,000.00, Due Date].
     - Embedded 1-Click Stripe Payment Link button in the email preview.
     - Quick Action Buttons: "Copy Draft", "Send Now ↗", "Schedule Auto-Chase".

3. Escalation Sequence Timeline (Visual Stepper):
   - Step 1: Pre-due friendly nudge (T-2 days).
   - Step 2: Due date morning receipt (T-0 days).
   - Step 3: Gentle overdue reminder (T+5 days).
   - Step 4: Formal executive statement + Late fee warning (T+15 days).

4. Mobile Bottom Navigation Bar included.
```

---

## ✍️ Screen 6: Web App — Dynamic Milestone Invoice Builder (`06_create_invoice.html`)

### Stitch Prompt:
```text
Create the "Dynamic Milestone Invoice Builder" screen for GigPulse.

Layout & Style:
- Dark Luxury GrowthSphere layout.
- Focus: Modern form on the left, real-time luxury invoice preview on the right.

Components to Build:

1. Top Header:
   - Title: "Draft Smart Milestone Invoice".
   - Back button: "← Back to Ledger".

2. Left Form Column:
   - Client Selector dropdown (with live Grade badge preview: e.g. Apex Digital Labs - Grade A).
   - Project Name & Scope input.
   - Milestone Deposit Splitter (Interactive buttons: "100% On Delivery", "50% Upfront / 50% Final", "30% / 30% / 40% Milestones").
   - Payment Terms Selector: Net 7, Net 14, Net 30, Due On Receipt.
   - Late Fee Clause toggle ("Enforce 1.5% monthly late interest after grace period").
   - Line Items Table with "+ Add Item", Quantity, Unit Price, and Auto-Calculation.

3. Right Sticky Live Preview Card:
   - Clean, publication-grade dark invoice preview with GigPulse watermark.
   - Dynamic Subtotal, Tax Vault calculation (25%), and Total Due.
   - Big Action Bar:
     - "Issue & Arm Auto-Chaser ↗" (Primary gradient pill button).
     - "Save Draft" & "Download PDF" (Ghost buttons).

4. Mobile Bottom Navigation Bar included.
```
