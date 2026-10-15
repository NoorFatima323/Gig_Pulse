/**
 * GigPulse Sovereign Session & Financial Telemetry Synchronizer
 * Automatically hydrates active registered founder, studio profile, 
 * liquid cash reserves, monthly burn rate, and ledger display mode across all screens.
 */
(function() {
  function getActiveUser() {
    try {
      const s = sessionStorage.getItem('gigpulse_active_user');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed && (parsed.founderName || parsed.email)) return parsed;
      }
    } catch (e) {}
    try {
      const l = localStorage.getItem('gigpulse_active_user');
      if (l) {
        const parsed = JSON.parse(l);
        if (parsed && (parsed.founderName || parsed.email)) return parsed;
      }
    } catch (e) {}
    
    // Check registered studios registry for the most recently registered studio
    try {
      const studios = localStorage.getItem('gigpulse_registered_studios');
      if (studios) {
        const list = JSON.parse(studios);
        if (Array.isArray(list) && list.length > 0) {
          const latest = list[list.length - 1];
          if (latest && (latest.founderName || latest.email)) return latest;
        }
      }
    } catch (e) {}

    return {
      founderName: 'Alex Mercer',
      studioName: 'Mercer Design Co.',
      email: 'alex.mercer@studiomercer.design',
      runwayGoal: 90,
      liquidCash: 14850,
      monthlyBurn: 3850,
      primaryBank: 'Mercury Checking ···4891',
      ledgerMode: 'demo'
    };
  }

  const currencySymbols = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', JPY: '¥', CHF: 'CHF ',
    PKR: 'Rs ', INR: '₹', AED: 'AED ', SAR: 'SAR ', QAR: 'QAR ', BDT: '৳',
    SGD: 'S$', HKD: 'HK$', NZD: 'NZ$', CNY: '¥', KRW: '₩', MYR: 'RM ',
    IDR: 'Rp ', PHP: '₱', THB: '฿', VND: '₫', SEK: 'kr ', NOK: 'kr ',
    DKK: 'kr ', PLN: 'zł ', TRY: '₺', BRL: 'R$', MXN: 'Mex$', ARS: 'ARS $',
    CLP: 'CLP $', COP: 'COP $', ZAR: 'R ', NGN: '₦', KES: 'KSh ', EGP: 'E£ ',
    ILS: '₪', USDC: 'USDC ', USDT: 'USDT ', ETH: 'Ξ ', BTC: '₿ '
  };

  function getCurrencySymbol() {
    const user = getActiveUser();
    const code = (user && user.currency) ? user.currency.toUpperCase() : 'USD';
    return currencySymbols[code] || '$';
  }

  function formatCurrency(val) {
    const sym = getCurrencySymbol();
    const num = Math.round(val || 0);
    return sym + num.toLocaleString('en-US') + '.00';
  }

  function formatShort(val) {
    const sym = getCurrencySymbol();
    const num = Math.round(val || 0);
    return sym + num.toLocaleString('en-US');
  }

  function getInitials(name) {
    if (!name) return 'GP';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function syncProfile() {
    const user = getActiveUser();
    if (!user) return;

    const fullName = user.founderName ? user.founderName.trim() : 'Alex Mercer';
    const firstName = fullName.split(' ')[0] || fullName;
    const studioName = user.studioName ? user.studioName.trim() : (fullName + ' Studio');
    const runwayGoal = parseInt(user.runwayGoal) || 90;
    const initials = getInitials(fullName);
    const isCustomUser = fullName.toLowerCase() !== 'alex mercer';

    // Financial core metrics
    const liquidCash = (user.liquidCash !== undefined && user.liquidCash !== null) ? parseFloat(user.liquidCash) : 14850;
    const monthlyBurn = (user.monthlyBurn !== undefined && user.monthlyBurn !== null) ? parseFloat(user.monthlyBurn) : 3850;
    const primaryBank = user.primaryBank || 'Mercury Checking ···4891';
    const ledgerMode = user.ledgerMode || 'demo';

    // Computed financial runway
    const dailyBurn = Math.max(1, monthlyBurn / 30);
    const runwayDays = Math.max(1, Math.round(liquidCash / dailyBurn));
    const runwayMo = (runwayDays / 30).toFixed(1);
    const requiredReserve = monthlyBurn * (runwayGoal / 30);
    const safeToSpend = Math.max(0, Math.round(liquidCash - requiredReserve));
    const runwayPct = Math.round((runwayDays / runwayGoal) * 100);

    // Calculate zero-runway date
    const zeroDateObj = new Date(Date.now() + runwayDays * 86400000);
    const zeroMonthYear = zeroDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const zeroMonthFullYear = zeroDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // 1. Sidebar Profile Badges (across all screens: 02, 03, 04, 05, 06, 07)
    document.querySelectorAll('.profile-name, [data-user-name]').forEach(el => {
      el.textContent = fullName;
    });

    document.querySelectorAll('.profile-role, [data-user-role]').forEach(el => {
      el.textContent = studioName;
    });

    // Dynamic Avatar with Initials
    if (isCustomUser) {
      document.querySelectorAll('img[src*="alex_m_founder_headshot"], .sidebar-profile-avatar').forEach(img => {
        const parent = img.parentElement;
        if (parent) {
          img.style.display = 'none';
          let avatarDiv = parent.querySelector('.dynamic-user-avatar');
          if (!avatarDiv) {
            avatarDiv = document.createElement('div');
            avatarDiv.className = 'dynamic-user-avatar w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white font-mono font-bold text-xs flex items-center justify-center ring-1 ring-white/20 shadow-md select-none shrink-0 cursor-pointer';
            parent.insertBefore(avatarDiv, img);
          }
          avatarDiv.textContent = initials;
          avatarDiv.title = `${fullName} · ${studioName}`;
        }
      });
    }

    // 2. Top Header Breadcrumb Studio Name (e.g. in 02_pulse_cockpit_dashboard.html line 470)
    const headerBreadcrumbStudio = document.querySelector('header span.text-slate-500.font-medium, .header-studio-name');
    if (headerBreadcrumbStudio && !headerBreadcrumbStudio.textContent.includes('Synced')) {
      headerBreadcrumbStudio.textContent = studioName;
    }

    // 3. Cockpit Hero Greeting Headline (02_pulse_cockpit_dashboard.html)
    const heroH1 = document.querySelector('.cockpit-greeting') || Array.from(document.querySelectorAll('main h1')).find(h => h.textContent.includes('cash runway'));
    if (heroH1) {
      const hour = new Date().getHours();
      let timeGreeting = 'Good morning';
      if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
      else if (hour >= 17) timeGreeting = 'Good evening';

      let greetingSpan = heroH1.querySelector('.greeting-founder-name');
      if (!greetingSpan) {
        heroH1.innerHTML = `<span class="greeting-founder-name">${timeGreeting}, ${firstName}.</span> <span class="gradient-text-iris">Your cash runway is in great shape.</span>`;
      } else {
        greetingSpan.textContent = `${timeGreeting}, ${firstName}.`;
      }
    }

    // 4. Hero Greeting Paragraph Text (Runway Days, Cash, Zero Date)
    const heroDescP = document.querySelector('main h1 ~ p, .cockpit-greeting ~ p');
    if (heroDescP && heroDescP.textContent.includes('Studio treasury holds')) {
      heroDescP.innerHTML = `Studio treasury holds <strong class="text-slate-900 font-semibold">${runwayDays} Days of Runway</strong> (<strong class="text-emerald-700 font-semibold">${formatCurrency(liquidCash)}</strong> liquid cash), comfortably funding operations through <strong class="text-slate-900 font-semibold">${zeroMonthFullYear}</strong> without closing new deals.`;
    }

    // 5. Target Days Metric Gauge & Badge (02_pulse_cockpit_dashboard.html)
    const runwayPercentBadge = document.getElementById('hero-runway-percent-badge');
    if (runwayPercentBadge) {
      runwayPercentBadge.textContent = `${runwayPct}% OF TARGET`;
      if (runwayPct >= 100) {
        runwayPercentBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider tabular-nums shadow-[0_0_10px_rgba(16,185,129,0.25)]';
      } else {
        runwayPercentBadge.className = 'px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider tabular-nums shadow-[0_0_10px_rgba(245,158,11,0.25)]';
      }
    }

    // Hero Runway Number and Gauge
    const heroRunwayNum = document.getElementById('hero-runway-num');
    if (heroRunwayNum) heroRunwayNum.textContent = runwayDays;

    const heroBurnVal = document.getElementById('hero-burn-val');
    if (heroBurnVal) heroBurnVal.textContent = formatShort(monthlyBurn);

    const heroZeroDate = document.getElementById('hero-zero-date');
    if (heroZeroDate) heroZeroDate.textContent = zeroMonthYear;

    const heroStatusPill = document.getElementById('hero-status-pill');
    if (heroStatusPill) heroStatusPill.textContent = `~${runwayMo} Mo Buffer`;

    const heroRunwayBar = document.getElementById('hero-runway-bar');
    if (heroRunwayBar) {
      const barPct = Math.min(100, Math.max(15, Math.round((runwayDays / (runwayGoal * 1.4)) * 100)));
      heroRunwayBar.style.width = barPct + '%';
    }

    // Target label in hero card (e.g., Target: 60 Days / Target: 90 Days)
    document.querySelectorAll('.hero-target-runway').forEach(el => {
      el.textContent = `Target: ${runwayGoal} Days`;
    });
    document.querySelectorAll('span, div, p').forEach(el => {
      if (el.children.length === 0 && /^Target:\s*\d+\s*Days$/i.test(el.textContent.trim())) {
        el.textContent = `Target: ${runwayGoal} Days`;
      }
    });

    // 6. Bento Card 1: Available Cash
    const tileTreasury = document.getElementById('tile-treasury-val');
    if (tileTreasury) {
      tileTreasury.innerHTML = `${formatShort(liquidCash)}<span class="text-lg text-slate-400 font-normal">.00</span>`;
    }
    const modalTreasury = document.getElementById('modal-treasury-val');
    if (modalTreasury) modalTreasury.textContent = formatCurrency(liquidCash);
    const dashCash = document.getElementById('dash-cash-val');
    if (dashCash) dashCash.textContent = formatCurrency(liquidCash);

    // Section 2 Available Cash text
    document.querySelectorAll('span, div, p').forEach(el => {
      if (el.textContent.includes('Available Balance') && el.children.length === 0) {
        el.textContent = `${formatShort(liquidCash)} Available Balance`;
      }
    });

    // 7. Bento Card 2: Cash Runway
    const tileRunway = document.getElementById('tile-runway-val');
    if (tileRunway) {
      tileRunway.innerHTML = `${runwayDays} <span class="text-xl font-bold text-slate-700">Days</span> <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 ml-1">~${runwayMo} Mo</span>`;
    }

    // Tile 2 burn subtitle
    document.querySelectorAll('span, div, p').forEach(el => {
      if (/^Burn:\s*\$[\d,]+(\/mo)?$/i.test(el.textContent.trim()) && el.children.length === 0) {
        el.textContent = `Burn: ${formatShort(monthlyBurn)}/mo`;
      }
    });

    // 8. Bento Card 4: Safe to Spend
    const tileSafe = document.querySelector('.glass-card:nth-of-type(4) p.font-sans, #tile-safe-to-spend');
    if (tileSafe && tileSafe.textContent.includes('$')) {
      tileSafe.innerHTML = `${formatShort(safeToSpend)}<span class="text-lg text-slate-400 font-normal">.00</span>`;
    }

    // 9. Forecaster Metrics (Screen 03)
    const headerRunway = document.getElementById('header-runway');
    if (headerRunway) headerRunway.textContent = `${runwayDays} Days`;
    const headerBurn = document.getElementById('header-burn');
    if (headerBurn) headerBurn.textContent = formatShort(monthlyBurn);

    // 10. Primary Bank Account text
    document.querySelectorAll('span, div, p').forEach(el => {
      if (el.children.length === 0 && (el.textContent.includes('Mercury Checking') || el.textContent.includes('Mercury Checking ···4891'))) {
        el.textContent = primaryBank;
      }
    });

    // 10b. Dynamic Freelance Escrow Vault Telemetry (Screen 02 Cockpit)
    let totalEscrowInflow = 0;
    if (user.integrations && typeof user.integrations === 'object') {
      Object.values(user.integrations).forEach(integ => {
        if (integ && integ.connected && integ.balance) {
          totalEscrowInflow += parseFloat(integ.balance) || 0;
        }
      });
    } else {
      if (user.upworkConnected) totalEscrowInflow += parseFloat(user.upworkBalance || 4500);
      if (user.fiverrConnected) totalEscrowInflow += parseFloat(user.fiverrBalance || 1800);
    }
    const dashShield = document.getElementById('dash-shield-val');
    if (dashShield && totalEscrowInflow > 0) {
      dashShield.textContent = `+${formatCurrency(totalEscrowInflow)}`;
    }

    // 11. Clean Slate vs Demo Invoices Mode
    if (ledgerMode === 'clean') {
      // In Screen 02 Cockpit:
      // Tile 3 (Unpaid Invoices)
      const unpaidCard = document.querySelector('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div:nth-child(3)');
      if (unpaidCard) {
        const valEl = unpaidCard.querySelector('p.font-sans');
        if (valEl) valEl.innerHTML = `$0<span class="text-lg text-slate-400 font-normal">.00</span>`;
        const subEl = unpaidCard.querySelector('.text-slate-400');
        if (subEl) subEl.textContent = '0 Active Receivables';
        const actionEl = unpaidCard.querySelector('.mt-3.pt-2\\.5');
        if (actionEl) {
          actionEl.innerHTML = `<span class="text-emerald-600 font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">verified</span><span>All Invoices Settled</span></span><span class="text-xs text-slate-400 font-medium">Clean Slate</span>`;
        }
      }

      // Hero Overdue Action Banner
      const heroActionBanner = document.querySelector('.p-3\\.5.rounded-xl.bg-rose-50\\/80, .hero-overdue-banner');
      if (heroActionBanner) {
        heroActionBanner.className = 'p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs';
        heroActionBanner.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold text-emerald-300">Clean Receivables Ledger:</span>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Optimal Health</span>
              </div>
              <p class="text-xs text-slate-300 truncate mt-0.5">
                Zero overdue client invoices for <strong class="text-white">${studioName}</strong>. Ready to issue your first milestone contract.
              </p>
            </div>
          </div>
          <a href="05_dynamic_milestone_invoice_builder.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-bold transition-all shadow-xs shrink-0 self-end sm:self-center">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>+ Create Invoice</span>
          </a>
        `;
      }

      // Urgent Overdue Card in Screen 02
      const overdueCard = document.getElementById('urgent-overdue-card');
      if (overdueCard) {
        overdueCard.innerHTML = `
          <div class="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span class="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <h4 class="text-base font-bold text-white">No Overdue Invoices</h4>
            <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
              Studio treasury is in optimal balance with 100% on-time counterparty status. Use the invoice builder to deploy milestones with automated escrow protection.
            </p>
            <div class="pt-2">
              <a href="05_dynamic_milestone_invoice_builder.html" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-sm">
                <span class="material-symbols-outlined text-sm">add</span>
                <span>Issue First Studio Milestone</span>
              </a>
            </div>
          </div>
        `;
      }

      // Screen 04 Invoices & Receivables Manager clean slate handling
      const invoicesListContainer = document.getElementById('invoices-list-container');
      if (invoicesListContainer) {
        let customInvoices = [];
        try {
          customInvoices = JSON.parse(localStorage.getItem('gigpulse_custom_invoices') || '[]');
        } catch (e) {}

        if (customInvoices.length === 0) {
          invoicesListContainer.innerHTML = `
            <div class="rounded-2xl bg-white border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <span class="material-symbols-outlined text-3xl">receipt_long</span>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900">Clean Receivables Ledger</h3>
                <p class="text-xs text-slate-500 max-w-sm mt-1">Zero overdue client receivables found for ${studioName}. Ready to deploy your first milestone invoice.</p>
              </div>
              <a href="05_dynamic_milestone_invoice_builder.html" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all">
                <span class="material-symbols-outlined text-sm">add</span>
                <span>Create Your First Milestone Invoice</span>
              </a>
            </div>
          `;
          const totalOutCard = document.querySelector('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div:first-child');
          if (totalOutCard) {
            const num = totalOutCard.querySelector('.text-3xl.font-extrabold');
            if (num) num.textContent = '$0.00';
            const sub = totalOutCard.querySelector('.text-slate-500');
            if (sub) sub.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>0 open client invoices</span>';
          }
          const overdueCard04 = document.querySelector('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div:nth-child(2)');
          if (overdueCard04) {
            const num = overdueCard04.querySelector('.text-3xl.font-extrabold');
            if (num) num.textContent = '$0.00';
            const sub = overdueCard04.querySelector('.text-rose-600');
            if (sub) sub.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>0 invoices require follow-up</span>';
          }
        }
      }
    }

    // 12. Invoice Builder (05_dynamic_milestone_invoice_builder.html)
    document.querySelectorAll('div, span, p').forEach(el => {
      if (el.textContent.trim() === 'Alex Mercer LLC' && el.children.length === 0) {
        el.textContent = studioName;
      }
    });

    // 13. Payment Chaser (06_autonomous_smart_payment_chaser.html)
    document.querySelectorAll('div, span, p').forEach(el => {
      if (el.textContent.includes('Alex Mercer · Alex Mercer LLC')) {
        el.innerHTML = el.innerHTML.replace('Alex Mercer · Alex Mercer LLC', `${fullName} · ${studioName}`);
      }
      if (el.textContent.includes('Hi Marcus, this is Alex')) {
        el.innerHTML = el.innerHTML.replace('this is Alex', `this is ${firstName}`);
      }
      if (el.textContent.includes('alex@gigpulse.io')) {
        el.innerHTML = el.innerHTML.replace('alex@gigpulse.io', user.email || (firstName.toLowerCase() + '@' + studioName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.io'));
      }
    });

    // Dispatch custom event for any listening reactive components
    window.dispatchEvent(new CustomEvent('gigpulse:user_hydrated', { detail: user }));
  }

  // Hook into document load events
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncProfile);
  } else {
    syncProfile();
  }

  window.addEventListener('load', syncProfile);

  // Expose global calibration routine
  window.calibrateStudioTreasury = function(params) {
    const current = getActiveUser();
    const updated = {
      ...current,
      liquidCash: params.liquidCash !== undefined ? params.liquidCash : current.liquidCash,
      monthlyBurn: params.monthlyBurn !== undefined ? params.monthlyBurn : current.monthlyBurn,
      runwayGoal: params.runwayGoal !== undefined ? params.runwayGoal : current.runwayGoal,
      primaryBank: params.primaryBank || current.primaryBank,
      ledgerMode: params.ledgerMode || current.ledgerMode
    };

    try {
      sessionStorage.setItem('gigpulse_active_user', JSON.stringify(updated));
      localStorage.setItem('gigpulse_active_user', JSON.stringify(updated));

      // Also update in registered studios list
      const studios = localStorage.getItem('gigpulse_registered_studios');
      if (studios) {
        const list = JSON.parse(studios);
        const idx = list.findIndex(a => a && a.email && a.email.toLowerCase() === (updated.email || '').toLowerCase());
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...updated };
          localStorage.setItem('gigpulse_registered_studios', JSON.stringify(list));
        }
      }
    } catch (e) {
      console.error('Error saving calibrated treasury:', e);
    }

    syncProfile();
    return updated;
  };

  // Expose helpers globally
  window.getActiveGigPulseUser = getActiveUser;
  window.syncGigPulseUserProfile = syncProfile;
})();
