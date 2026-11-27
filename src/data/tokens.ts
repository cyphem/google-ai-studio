export interface ColorTokenItem {
  id: string;
  name: string;
  cssVar: string;
  hex: string;
  darkHex?: string;
  category: 'Core Semantic Palette' | 'Brand & Interactive Accents' | 'Subject Swatches & Status';
  usage: string;
  textOnColor: 'light' | 'dark';
}

export const COLOR_TOKENS: ColorTokenItem[] = [
  // Core Semantic Palette
  {
    id: 'bg-canvas',
    name: 'bg-canvas',
    cssVar: '--color-bg-canvas',
    hex: '#FFFFFF',
    darkHex: '#111322',
    category: 'Core Semantic Palette',
    usage: 'Primary screen background',
    textOnColor: 'dark',
  },
  {
    id: 'bg-canvas-subtle',
    name: 'bg-canvas-subtle',
    cssVar: '--color-bg-canvas-subtle',
    hex: '#F7F9FC',
    darkHex: '#171A2E',
    category: 'Core Semantic Palette',
    usage: 'Tinted backing on lower dashboard sheets',
    textOnColor: 'dark',
  },
  {
    id: 'bg-surface',
    name: 'bg-surface',
    cssVar: '--color-bg-surface',
    hex: '#FFFFFF',
    darkHex: '#1D2138',
    category: 'Core Semantic Palette',
    usage: 'Elevated task cards and active form inputs',
    textOnColor: 'dark',
  },
  {
    id: 'bg-surface-muted',
    name: 'bg-surface-muted',
    cssVar: '--color-bg-surface-muted',
    hex: '#EEF2F7',
    darkHex: '#262B47',
    category: 'Core Semantic Palette',
    usage: 'Empty-state placeholders, secondary pills, slider tracks',
    textOnColor: 'dark',
  },
  {
    id: 'text-primary',
    name: 'text-primary',
    cssVar: '--color-text-primary',
    hex: '#25273E',
    darkHex: '#F3F5FA',
    category: 'Core Semantic Palette',
    usage: 'Headings, body copy, active date rings',
    textOnColor: 'light',
  },
  {
    id: 'text-muted',
    name: 'text-muted',
    cssVar: '--color-text-muted',
    hex: '#788096',
    darkHex: '#A1AAC2',
    category: 'Core Semantic Palette',
    usage: 'Task metadata, subtitles, inactive calendar days',
    textOnColor: 'light',
  },
  {
    id: 'text-disabled',
    name: 'text-disabled',
    cssVar: '--color-text-disabled',
    hex: '#A3ABC0',
    darkHex: '#6B7390',
    category: 'Core Semantic Palette',
    usage: 'Disabled buttons, duration labels, placeholders',
    textOnColor: 'dark',
  },
  {
    id: 'border-subtle',
    name: 'border-subtle',
    cssVar: '--color-border-subtle',
    hex: '#E2E7F0',
    darkHex: '#2E3454',
    category: 'Core Semantic Palette',
    usage: 'Hairline strokes on unit cards and form inputs',
    textOnColor: 'dark',
  },
  {
    id: 'border-accent-bg',
    name: 'border-accent-bg',
    cssVar: '--color-border-accent-bg',
    hex: '#D2EBF2',
    darkHex: '#223B48',
    category: 'Core Semantic Palette',
    usage: 'Pastel background decorative shapes',
    textOnColor: 'dark',
  },

  // Brand & Interactive Accents
  {
    id: 'accent-navy',
    name: 'accent-navy',
    cssVar: '--color-accent-navy',
    hex: '#25273E',
    category: 'Brand & Interactive Accents',
    usage: 'Primary CTAs (Continue) and + FAB',
    textOnColor: 'light',
  },
  {
    id: 'accent-coral',
    name: 'accent-coral',
    cssVar: '--color-accent-coral',
    hex: '#F98689',
    category: 'Brand & Interactive Accents',
    usage: 'Splash wave, semester focus frame, onboarding tooltips',
    textOnColor: 'dark',
  },
  {
    id: 'accent-cyan',
    name: 'accent-cyan',
    cssVar: '--color-accent-cyan',
    hex: '#4FC0D8',
    category: 'Brand & Interactive Accents',
    usage: 'Date pills (25 MAR), active sliders, step highlights',
    textOnColor: 'dark',
  },

  // Subject Swatches & Status
  {
    id: 'unit-crimson',
    name: 'unit-crimson',
    cssVar: '--color-unit-crimson',
    hex: '#B6242C',
    category: 'Subject Swatches & Status',
    usage: 'Subject badge (e.g., GRD379)',
    textOnColor: 'light',
  },
  {
    id: 'unit-cerulean',
    name: 'unit-cerulean',
    cssVar: '--color-unit-cerulean',
    hex: '#2E98D1',
    category: 'Subject Swatches & Status',
    usage: 'Subject badge (e.g., GRD338)',
    textOnColor: 'light',
  },
  {
    id: 'status-success',
    name: 'status-success',
    cssVar: '--color-status-success',
    hex: '#3CC496',
    category: 'Subject Swatches & Status',
    usage: 'Completed tasks and goal milestones',
    textOnColor: 'dark',
  },
  {
    id: 'status-warning',
    name: 'status-warning',
    cssVar: '--color-status-warning',
    hex: '#FBB25C',
    category: 'Subject Swatches & Status',
    usage: 'Upcoming deadlines and reminders',
    textOnColor: 'dark',
  },
  {
    id: 'status-error',
    name: 'status-error',
    cssVar: '--color-status-error',
    hex: '#D93644',
    category: 'Subject Swatches & Status',
    usage: 'Overdue items and validation errors',
    textOnColor: 'light',
  },
];

export interface TypographySpec {
  role: string;
  token: string;
  fontFamily: string;
  size: string;
  weight: string;
  lineHeight: string;
  tracking: string;
  exampleUsage: string;
  sampleText: string;
}

export const TYPOGRAPHY_SCALE: TypographySpec[] = [
  {
    role: 'H1',
    token: '--text-h1-size',
    fontFamily: 'Poppins',
    size: '26px',
    weight: '700 (Bold)',
    lineHeight: '1.2 (32px)',
    tracking: '-0.02em',
    exampleUsage: 'Brand wordmark, year header (2022)',
    sampleText: 'Muddled. Academic Planner 2022',
  },
  {
    role: 'H2',
    token: '--text-h2-size',
    fontFamily: 'Poppins',
    size: '20px',
    weight: '600 (SemiBold)',
    lineHeight: '1.25 (26px)',
    tracking: '-0.015em',
    exampleUsage: 'Screen titles (Your Semester, First,)',
    sampleText: "First, Let's Set Up Your Goals",
  },
  {
    role: 'H3',
    token: '--text-h3-size',
    fontFamily: 'Poppins',
    size: '16px',
    weight: '600 (SemiBold)',
    lineHeight: '1.35 (22px)',
    tracking: '-0.01em',
    exampleUsage: "Section headers (Today's Tasks)",
    sampleText: "Today's Tasks · Your Units",
  },
  {
    role: 'H4',
    token: '--text-h4-size',
    fontFamily: 'DM Sans',
    size: '14px',
    weight: '700 (Bold)',
    lineHeight: '1.35 (20px)',
    tracking: '0em',
    exampleUsage: 'Task card titles (Laboratory, Assessment)',
    sampleText: 'GRD379 Laboratory — App & UX Design',
  },
  {
    role: 'Body',
    token: '--text-body-size',
    fontFamily: 'DM Sans',
    size: '13px',
    weight: '400 (Regular)',
    lineHeight: '1.45 (19px)',
    tracking: '0em',
    exampleUsage: 'Prompts, subtitles, primary CTA labels',
    sampleText: 'Finish setting up your semester to update your dashboard.',
  },
  {
    role: 'Caption',
    token: '--text-caption-size',
    fontFamily: 'DM Sans',
    size: '11px',
    weight: '500 (Medium)',
    lineHeight: '1.3 (14px)',
    tracking: '+0.02em',
    exampleUsage: 'Calendar grid, unit codes, month labels (MARCH)',
    sampleText: 'MARCH · 09:30 AM - 11:30 AM · 450.2.051',
  },
];

export interface SpacingTokenItem {
  name: string;
  cssVar: string;
  px: number;
  alias?: string;
  usage: string;
}

export const SPACING_TOKENS: SpacingTokenItem[] = [
  { name: 'space-1', cssVar: '--space-1', px: 4, usage: 'Micro-unit baseline, tight icon-to-label gap' },
  { name: 'space-2', cssVar: '--space-2', px: 8, usage: 'Macro rhythm step, compact button & chip gap' },
  { name: 'space-3', cssVar: '--space-3', px: 12, alias: '--space-card-gap', usage: 'Task card vertical gap & unit builder inner spacing' },
  { name: 'space-4', cssVar: '--space-4', px: 16, alias: '--space-card-padding', usage: 'Internal padding for cards & unit containers' },
  { name: 'space-5', cssVar: '--space-5', px: 20, alias: '--space-gutter / --space-section', usage: 'Screen horizontal margins & vertical section rhythm' },
  { name: 'space-6', cssVar: '--space-6', px: 24, usage: 'Airy onboarding separation & generous sheet breathing room' },
];

export interface RadiusTokenItem {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

export const RADIUS_TOKENS: RadiusTokenItem[] = [
  { name: 'radius-sm', cssVar: '--radius-sm', value: '8px', usage: 'Full-width CTA buttons, nested date pills, Update button' },
  { name: 'radius-md', cssVar: '--radius-md', value: '12px', usage: 'Task cards, skeleton placeholders, unit color blocks, tooltips' },
  { name: 'radius-lg', cssVar: '--radius-lg', value: '20px', usage: 'App icon squircle, curved header/sheet edges, semester wrapper' },
  { name: 'radius-pill', cssVar: '--radius-pill', value: '9999px', usage: 'Date/priority chips, hour badges, slider thumbs, + FAB' },
];

export interface ShadowTokenItem {
  id: string;
  level: string;
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

export const SHADOW_TOKENS: ShadowTokenItem[] = [
  {
    id: 'none',
    level: 'Level 0 (Flat)',
    name: 'shadow-none',
    cssVar: '--shadow-none',
    value: 'none',
    usage: 'Empty-state placeholders and muted grey pills (#EEF2F7)',
  },
  {
    id: 'card',
    level: 'Level 1 (Card Lift)',
    name: 'shadow-card',
    cssVar: '--shadow-card',
    value: '0 4px 16px rgba(37, 39, 62, 0.06)',
    usage: 'Task cards and unit setup containers',
  },
  {
    id: 'floating-navy',
    level: 'Level 2 (Floating Navy)',
    name: 'shadow-floating-navy',
    cssVar: '--shadow-floating-navy',
    value: '0 6px 16px rgba(37, 39, 62, 0.24)',
    usage: 'Primary + FAB and header edge separation',
  },
  {
    id: 'floating-coral',
    level: 'Level 2 (Floating Coral)',
    name: 'shadow-floating-coral',
    cssVar: '--shadow-floating-coral',
    value: '0 8px 24px rgba(249, 134, 137, 0.35)',
    usage: 'Onboarding swipe-tip toast',
  },
];

export const RAW_TOKENS_CSS = `:root {
  /* Colors: Surfaces & Text */
  --color-bg-canvas: #FFFFFF;
  --color-bg-canvas-subtle: #F7F9FC;
  --color-bg-surface: #FFFFFF;
  --color-bg-surface-muted: #EEF2F7;
  --color-text-primary: #25273E;
  --color-text-muted: #788096;
  --color-text-disabled: #A3ABC0;
  --color-border-subtle: #E2E7F0;
  --color-border-accent-bg: #D2EBF2;

  /* Colors: Brand & Interactive Accents */
  --color-accent-navy: #25273E;
  --color-accent-coral: #F98689;
  --color-accent-cyan: #4FC0D8;

  /* Colors: Subject Swatches & Status */
  --color-unit-crimson: #B6242C;
  --color-unit-cerulean: #2E98D1;
  --color-status-success: #3CC496;
  --color-status-warning: #FBB25C;
  --color-status-error: #D93644;

  /* Spacing Scale (4px base / 8px macro rhythm) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-gutter: var(--space-5);
  --space-section: var(--space-5);
  --space-card-padding: var(--space-4);
  --space-card-gap: var(--space-3);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 9999px;

  /* Border Widths */
  --border-width-thin: 1px;
  --border-width-medium: 1.5px;
  --border-width-halo: 4px;

  /* Shadows & Elevation */
  --shadow-none: none;
  --shadow-card: 0 4px 16px rgba(37, 39, 62, 0.06);
  --shadow-floating-navy: 0 6px 16px rgba(37, 39, 62, 0.24);
  --shadow-floating-coral: 0 8px 24px rgba(249, 134, 137, 0.35);

  /* Typography */
  --font-display: "Poppins", sans-serif;
  --font-body: "DM Sans", "Plus Jakarta Sans", sans-serif;
  --text-h1-size: 26px;
  --text-h2-size: 20px;
  --text-h3-size: 16px;
  --text-h4-size: 14px;
  --text-body-size: 13px;
  --text-caption-size: 11px;
}`;
