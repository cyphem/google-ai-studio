import { RAW_TOKENS_CSS } from '../data/tokens';
import { createZipBlob, triggerBlobDownload } from './zipBuilder';

export interface MobileExportOptions {
  initialPlan: '12m' | '6m';
  initialUnlocked: boolean;
  darkTheme: boolean;
}

function buildMobileCss(): string {
  return `/* Muddled. Mobile Unlock Premium Screen Styles */
@import url("./tokens.css");

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: var(--font-body);
  background-color: var(--color-bg-canvas-subtle);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
}

html.dark {
  --color-bg-canvas: #111322;
  --color-bg-canvas-subtle: #171A2E;
  --color-bg-surface: #1D2138;
  --color-bg-surface-muted: #262B47;
  --color-text-primary: #F3F5FA;
  --color-text-muted: #A1AAC2;
  --color-text-disabled: #6B7390;
  --color-border-subtle: #2E3454;
  --color-border-accent-bg: #223B48;
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.32);
  --shadow-floating-navy: 0 6px 18px rgba(0, 0, 0, 0.45);
  --shadow-floating-coral: 0 8px 24px rgba(249, 134, 137, 0.25);
}

.viewport-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.phone-frame {
  width: 100%;
  max-width: 390px;
  border-radius: 28px;
  border: 6px solid var(--color-accent-navy);
  background-color: var(--color-bg-canvas);
  box-shadow: var(--shadow-floating-navy);
  overflow: hidden;
}

@media (max-width: 430px) {
  .viewport-shell {
    padding: 0;
    align-items: stretch;
  }
  .phone-frame {
    max-width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
}

/* Curved Coral Splash Header */
.splash-header {
  position: relative;
  background-color: var(--color-accent-coral);
  color: #ffffff;
  padding: 24px 20px 42px;
  overflow: hidden;
}

.confetti-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.55;
  pointer-events: none;
}

.header-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.brand-tag {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 150ms ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.34);
}

.hero-center {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.hero-subtitle {
  margin: 0;
  max-width: 270px;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.95);
}

.wave-divider {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 24px;
  color: var(--color-bg-canvas);
  pointer-events: none;
}

/* Main Content */
.screen-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-surface);
  box-shadow: var(--shadow-card);
}

.feature-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.feature-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tone-coral {
  background: rgba(249, 134, 137, 0.18);
  color: #b6242c;
}
html.dark .tone-coral {
  color: #f98689;
}

.tone-cyan {
  background: rgba(79, 192, 216, 0.18);
  color: #2e98d1;
}
html.dark .tone-cyan {
  color: #4fc0d8;
}

.tone-navy {
  background: rgba(37, 39, 62, 0.1);
  color: #25273e;
}
html.dark .tone-navy {
  background: rgba(79, 192, 216, 0.18);
  color: #4fc0d8;
}

.tone-success {
  background: rgba(60, 196, 150, 0.18);
  color: #177a59;
}
html.dark .tone-success {
  color: #3cc496;
}

.feature-text {
  min-width: 0;
}

.feature-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.feature-limit {
  margin: 2px 0 0;
  font-size: 11px;
  color: var(--color-text-muted);
}

.status-icon {
  flex-shrink: 0;
  color: var(--color-accent-coral);
}

.is-unlocked .status-icon {
  color: var(--color-status-success);
}

/* Plans */
.plans-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-card {
  width: 100%;
  text-align: left;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-surface);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  font-family: inherit;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.plan-card.selected {
  border: 4px solid var(--color-accent-coral);
  box-shadow: var(--shadow-floating-coral);
  padding: 13px;
}

.plan-left {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.radio-circle {
  margin-top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: 1.5px solid #cbd3e1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ffffff;
}

.plan-card.selected .radio-circle {
  border-color: var(--color-accent-navy);
  background-color: var(--color-accent-navy);
}

html.dark .plan-card.selected .radio-circle {
  border-color: var(--color-accent-cyan);
  background-color: var(--color-accent-cyan);
  color: #111322;
}

.plan-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.plan-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.save-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  background-color: var(--color-accent-cyan);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
}

.plan-tagline {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-text-muted);
}

.plan-price-col {
  text-align: right;
  flex-shrink: 0;
}

.plan-monthly {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.plan-mo-unit {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.plan-billed {
  font-size: 11px;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

/* Primary CTA */
.cta-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.primary-cta {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: var(--radius-sm);
  background-color: var(--color-accent-navy);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms ease, background-color 150ms ease;
}

html.dark .primary-cta {
  background-color: var(--color-accent-cyan);
  color: #111322;
}

.primary-cta:hover {
  opacity: 0.94;
}

.primary-cta:active {
  transform: scale(0.98);
}

.secondary-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.text-link {
  border: none;
  background: transparent;
  padding: 6px 2px;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
}

.text-link:hover {
  color: var(--color-text-primary);
}

.status-banner {
  display: none;
  border-radius: var(--radius-md);
  padding: 10px 12px;
  background: rgba(60, 196, 150, 0.14);
  border: 1px solid rgba(60, 196, 150, 0.35);
  color: #177a59;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

html.dark .status-banner {
  color: #5cd9ae;
}

.is-unlocked .status-banner {
  display: block;
}
`;
}

function buildMobileHtml(opts: MobileExportOptions): string {
  const htmlClass = opts.darkTheme ? ' class="dark"' : '';
  const bodyClass = opts.initialUnlocked ? ' class="is-unlocked"' : '';
  const plan12Selected = opts.initialPlan === '12m' ? ' selected' : '';
  const plan6Selected = opts.initialPlan === '6m' ? ' selected' : '';
  const ctaInitialText = opts.initialUnlocked
    ? `${opts.initialPlan === '12m' ? '12 Months' : '6 Months'} Unlocked`
    : `Start 7-Day Free Trial · ${opts.initialPlan === '12m' ? '$3.99' : '$5.99'}/mo`;

  return `<!doctype html>
<html lang="en"${htmlClass}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Muddled. — Unlock Premium Features (Mobile 390px)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body${bodyClass}>
    <main class="viewport-shell">
      <section class="phone-frame" aria-label="Unlock Premium Features">
        <header class="splash-header">
          <svg class="confetti-bg" viewBox="0 0 600 220" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <circle cx="46" cy="48" r="14" fill="#FFFFFF" fill-opacity="0.65" />
            <circle cx="536" cy="168" r="22" fill="#FFFFFF" fill-opacity="0.55" />
            <path d="M118 158L128 168M128 158L118 168" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="3.5" stroke-linecap="round" />
            <path d="M522 52L534 64M534 52L522 64" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="4" stroke-linecap="round" />
          </svg>

          <div class="header-top">
            <span class="brand-tag">Muddled+</span>
            <button type="button" class="icon-btn" id="themeToggle" aria-label="Toggle light or dark theme" title="Toggle theme">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            </button>
          </div>

          <div class="hero-center">
            <svg width="54" height="54" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect width="64" height="64" rx="18" fill="#FFFFFF" />
              <rect x="0.5" y="0.5" width="63" height="63" rx="17.5" stroke="#E2E7F0" stroke-width="1" />
              <path d="M24 50C24 44.5 23.5 41 21 37.5C19.5 35.3 20.8 31.5 22.5 29.2C24 27.1 26.5 26 30 26C35 26 40 28.5 42 33.5C43.2 36.5 41.2 40.5 39.2 41.8C37.5 42.9 36.5 45 36.5 50" stroke="#25273E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M25.5 23C24 20.5 27.5 18.2 30.2 19.6C32.4 20.8 30.6 24.4 28.2 23.8C25.8 23.2 26.6 19.6 30.4 18.8C33.8 18 37.2 20.2 36.4 23C35.8 25.1 32.5 24.8 32.8 22.4C33 20.8 35.8 20.5 37.8 22.2" stroke="#F98689" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15 21.5L32 14L49 21.5L32 28.5L15 21.5Z" fill="#FFFFFF" stroke="#25273E" stroke-width="2.5" stroke-linejoin="round" />
              <path d="M46 23V32" stroke="#25273E" stroke-width="2.2" stroke-linecap="round" />
              <circle cx="46" cy="33.5" r="1.8" fill="#F98689" />
            </svg>
            <h1 class="hero-title">Unlock Premium</h1>
            <p class="hero-subtitle">
              Turn semester chaos into calm focus with every Muddled. tool unlocked.
            </p>
          </div>

          <svg class="wave-divider" viewBox="0 0 390 28" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,4 Q195,34 390,4 L390,28 L0,28 Z" fill="currentColor" />
          </svg>
        </header>

        <div class="screen-body">
          <div class="status-banner" id="unlockedBanner">
            Muddled+ Active — All 4 premium features unlocked
          </div>

          <div class="feature-list">
            <div class="feature-row">
              <div class="feature-left">
                <div class="feature-icon-box tone-coral">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <div class="feature-text">
                  <p class="feature-title">All Study Techniques</p>
                  <p class="feature-limit" data-locked="1 technique on Free" data-unlocked="All 6 techniques">
                    ${opts.initialUnlocked ? 'All 6 techniques' : '1 technique on Free'}
                  </p>
                </div>
              </div>
              <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
                  opts.initialUnlocked
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                    : '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
                }
              </svg>
            </div>

            <div class="feature-row">
              <div class="feature-left">
                <div class="feature-icon-box tone-cyan">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/></svg>
                </div>
                <div class="feature-text">
                  <p class="feature-title">Unlimited Semesters &amp; Tasks</p>
                  <p class="feature-limit" data-locked="1 semester · 3 units" data-unlocked="Unlimited">
                    ${opts.initialUnlocked ? 'Unlimited' : '1 semester · 3 units'}
                  </p>
                </div>
              </div>
              <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
                  opts.initialUnlocked
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                    : '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
                }
              </svg>
            </div>

            <div class="feature-row">
              <div class="feature-left">
                <div class="feature-icon-box tone-navy">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
                </div>
                <div class="feature-text">
                  <p class="feature-title">Study Timer</p>
                  <p class="feature-limit" data-locked="Locked on Free" data-unlocked="Full Timer + Breaks">
                    ${opts.initialUnlocked ? 'Full Timer + Breaks' : 'Locked on Free'}
                  </p>
                </div>
              </div>
              <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
                  opts.initialUnlocked
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                    : '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
                }
              </svg>
            </div>

            <div class="feature-row">
              <div class="feature-left">
                <div class="feature-icon-box tone-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                </div>
                <div class="feature-text">
                  <p class="feature-title">Study Insights</p>
                  <p class="feature-limit" data-locked="Locked on Free" data-unlocked="Full Analytics">
                    ${opts.initialUnlocked ? 'Full Analytics' : 'Locked on Free'}
                  </p>
                </div>
              </div>
              <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
                  opts.initialUnlocked
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                    : '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
                }
              </svg>
            </div>
          </div>

          <div class="plans-group" role="radiogroup" aria-label="Choose subscription plan">
            <button type="button" class="plan-card${plan12Selected}" data-plan="12m" data-price="$3.99" data-label="12 Months" aria-checked="${opts.initialPlan === '12m'}">
              <div class="plan-left">
                <span class="radio-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <div class="plan-title-row">
                    <span class="plan-name">12 Months</span>
                    <span class="save-badge">Save 33%</span>
                  </div>
                  <p class="plan-tagline">Full academic year coverage</p>
                </div>
              </div>
              <div class="plan-price-col">
                <div class="plan-monthly">$3.99<span class="plan-mo-unit">/mo</span></div>
                <div class="plan-billed">$47.88 billed annually</div>
              </div>
            </button>

            <button type="button" class="plan-card${plan6Selected}" data-plan="6m" data-price="$5.99" data-label="6 Months" aria-checked="${opts.initialPlan === '6m'}">
              <div class="plan-left">
                <span class="radio-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <div class="plan-title-row">
                    <span class="plan-name">6 Months</span>
                  </div>
                  <p class="plan-tagline">Single semester pass</p>
                </div>
              </div>
              <div class="plan-price-col">
                <div class="plan-monthly">$5.99<span class="plan-mo-unit">/mo</span></div>
                <div class="plan-billed">$35.94 billed every 6 months</div>
              </div>
            </button>
          </div>

          <div class="cta-stack">
            <button type="button" class="primary-cta" id="primaryCta">${ctaInitialText}</button>
            <div class="secondary-links">
              <button type="button" class="text-link" id="restoreBtn">Restore Purchase</button>
              <span aria-hidden="true">&middot;</span>
              <button type="button" class="text-link" id="freeBtn">Continue Free</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <script>
      (function () {
        var selectedPlan = "${opts.initialPlan}";
        var unlocked = ${opts.initialUnlocked};
        var planCards = document.querySelectorAll(".plan-card");
        var primaryCta = document.getElementById("primaryCta");
        var restoreBtn = document.getElementById("restoreBtn");
        var freeBtn = document.getElementById("freeBtn");
        var themeToggle = document.getElementById("themeToggle");

        var lockSvg = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
        var checkSvg = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';

        function syncUI() {
          document.body.classList.toggle("is-unlocked", unlocked);
          var activeCard = document.querySelector('.plan-card[data-plan="' + selectedPlan + '"]');
          var price = activeCard ? activeCard.getAttribute("data-price") : "$3.99";
          var label = activeCard ? activeCard.getAttribute("data-label") : "12 Months";
          primaryCta.textContent = unlocked
            ? label + " Unlocked"
            : "Start 7-Day Free Trial · " + price + "/mo";

          document.querySelectorAll(".feature-limit").forEach(function (el) {
            el.textContent = unlocked
              ? el.getAttribute("data-unlocked")
              : el.getAttribute("data-locked");
          });
          document.querySelectorAll(".status-icon").forEach(function (svg) {
            svg.innerHTML = unlocked ? checkSvg : lockSvg;
          });
        }

        planCards.forEach(function (card) {
          card.addEventListener("click", function () {
            selectedPlan = card.getAttribute("data-plan");
            planCards.forEach(function (c) {
              var match = c === card;
              c.classList.toggle("selected", match);
              c.setAttribute("aria-checked", String(match));
            });
            syncUI();
          });
        });

        primaryCta.addEventListener("click", function () {
          unlocked = true;
          syncUI();
        });

        restoreBtn.addEventListener("click", function () {
          unlocked = true;
          syncUI();
        });

        freeBtn.addEventListener("click", function () {
          unlocked = false;
          syncUI();
        });

        themeToggle.addEventListener("click", function () {
          document.documentElement.classList.toggle("dark");
        });
      })();
    </script>
  </body>
</html>
`;
}

export function exportMobilePremiumZip(options: MobileExportOptions): void {
  const readme = `Muddled. — Unlock Premium Features (Mobile 390px Standalone HTML/CSS Export)

Files included:
- index.html  : Open directly in any web browser (no server or Node.js required)
- styles.css  : Mobile screen layout and component styles
- tokens.css  : Muddled. design token CSS custom properties
`;

  const blob = createZipBlob([
    { name: 'index.html', content: buildMobileHtml(options) },
    { name: 'styles.css', content: buildMobileCss() },
    { name: 'tokens.css', content: RAW_TOKENS_CSS },
    { name: 'README.txt', content: readme },
  ]);

  triggerBlobDownload(blob, 'muddled-unlock-premium-mobile.zip');
}
