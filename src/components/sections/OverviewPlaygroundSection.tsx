import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Download,
  Expand,
  Plus,
  Sliders,
  Trash2,
  X,
} from 'lucide-react';
import { PastelConfettiField } from '../MuddledLogo';
import {
  MAlert,
  MAlertVariant,
  MBadge,
  MBadgeVariant,
  MButton,
  MButtonRadius,
  MButtonSize,
  MButtonVariant,
  MInput,
  MSelect,
  MToggle,
} from '../ui/MuddledPrimitives';

interface OverviewPlaygroundSectionProps {
  onNavigate: (section: string) => void;
  onCopy: (label: string, value: string) => void;
  onNotify: (title: string, desc?: string) => void;
  initialFocusPlayground?: boolean;
}

type PlaygroundComponent = 'button' | 'badge' | 'input' | 'toggle' | 'alert';

export const OverviewPlaygroundSection: React.FC<OverviewPlaygroundSectionProps> = ({
  onNavigate,
  onCopy,
  onNotify,
  initialFocusPlayground = false,
}) => {
  const [anchorLightboxOpen, setAnchorLightboxOpen] = useState(false);

  // Interactive Component Playground state
  const [componentType, setComponentType] = useState<PlaygroundComponent>('button');
  const [btnVariant, setBtnVariant] = useState<MButtonVariant>('primary');
  const [btnSize, setBtnSize] = useState<MButtonSize>('md');
  const [btnRadius, setBtnRadius] = useState<MButtonRadius>('sm');
  const [btnState, setBtnState] = useState<'default' | 'hover' | 'active' | 'disabled' | 'loading'>('default');
  const [showIcon, setShowIcon] = useState(true);
  const [customLabel, setCustomLabel] = useState('Continue');

  const [badgeVariant, setBadgeVariant] = useState<MBadgeVariant>('cyan');
  const [badgeSize, setBadgeSize] = useState<'sm' | 'md'>('md');
  const [badgeShape, setBadgeShape] = useState<'pill' | 'rounded'>('pill');

  const [inputState, setInputState] = useState<'default' | 'focus' | 'error' | 'disabled'>('default');
  const [toggleAccent, setToggleAccent] = useState<'cyan' | 'navy'>('cyan');
  const [toggleChecked, setToggleChecked] = useState(true);
  const [alertVariant, setAlertVariant] = useState<MAlertVariant>('coral-tip');

  const generatedSnippet = useMemo(() => {
    if (componentType === 'button') {
      const iconProp = showIcon ? '\n  leftIcon={<Plus className="h-4 w-4" />}' : '';
      const stateProp =
        btnState === 'disabled'
          ? '\n  disabled'
          : btnState === 'loading'
          ? '\n  loading'
          : '';
      return `<MButton\n  variant="${btnVariant}"\n  size="${btnSize}"\n  radius="${btnRadius}"${stateProp}${iconProp}\n>\n  ${customLabel || 'Continue'}\n</MButton>`;
    }
    if (componentType === 'badge') {
      return `<MBadge\n  variant="${badgeVariant}"\n  size="${badgeSize}"\n  shape="${badgeShape}"\n>\n  ${customLabel || '25 MAR'}\n</MBadge>`;
    }
    if (componentType === 'input') {
      const errProp =
        inputState === 'error'
          ? '\n  errorText="Please enter a valid unit code."'
          : '\n  helperText="Used to organize Today’s Tasks"';
      return `<MInput\n  label="${customLabel || 'Unit Name'}"\n  state="${inputState}"${errProp}\n/>`;
    }
    if (componentType === 'toggle') {
      return `<MToggle\n  checked={${toggleChecked}}\n  accent="${toggleAccent}"\n  label="${customLabel || 'Study Reminders'}"\n  onChange={setChecked}\n/>`;
    }
    return `<MAlert\n  variant="${alertVariant}"\n  title="${customLabel || 'Swipe right to view study tips.'}"\n  description="Consistent Muddled. feedback banner."\n/>`;
  }, [
    componentType,
    btnVariant,
    btnSize,
    btnRadius,
    btnState,
    showIcon,
    customLabel,
    badgeVariant,
    badgeSize,
    badgeShape,
    inputState,
    toggleChecked,
    toggleAccent,
    alertVariant,
  ]);

  return (
    <div className="space-y-10">
      {/* HERO / VISUAL ANCHOR BANNER (hidden when jumping directly to Playground only? Keep clean or show compact when initialFocusPlayground) */}
      {!initialFocusPlayground && (
        <section className="relative overflow-hidden rounded-[20px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] p-6 sm:p-8">
          <PastelConfettiField variant="cyan" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold text-[#4FC0D8]">
                Muddled. Design System
              </p>
              <h1 className="font-display text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[var(--color-text-primary)] [text-wrap:balance]">
                Turn academic overwhelm into calm daily structure.
              </h1>
              <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed max-w-xl">
                Built strictly from the Muddled. mobile concept, pairing playful coral and sky cyan accents with a grounded midnight navy anchor, squircle geometry, and tabular clarity.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <MButton
                  variant="primary"
                  onClick={() => onNavigate('foundations')}
                >
                  Explore Foundations
                </MButton>
                <MButton
                  variant="secondary"
                  onClick={() => onNavigate('playground')}
                >
                  Open Component Playground
                </MButton>
                <a
                  href="/muddled-design-system.zip"
                  download="muddled-design-system.zip"
                  onClick={() =>
                    onNotify('Exporting ZIP', 'Downloading muddled-design-system.zip')
                  }
                  className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium gap-2 rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)] whitespace-nowrap shrink-0 transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Export ZIP</span>
                </a>
              </div>
            </div>

            {/* Concept Image Visual Anchor */}
            <div className="lg:col-span-5">
              <div
                className="rounded-[16px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-3 space-y-2.5"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <button
                  type="button"
                  onClick={() => setAnchorLightboxOpen(true)}
                  className="group relative block w-full overflow-hidden rounded-[12px] border border-[var(--color-border-subtle)] bg-[#F7F9FC] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8]"
                  aria-label="Inspect full concept visual anchor"
                >
                  <img
                    src="/assets/aistudio/Frame_2_a09e36b6.jpg"
                    alt="Muddled. mobile UI concept screens visual anchor"
                    referrerPolicy="no-referrer"
                    className="w-full h-40 object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-[8px] bg-[#25273E]/85 px-2.5 py-1 text-[11px] font-medium text-white">
                    <Expand className="h-3 w-3" aria-hidden="true" />
                    Inspect Reference
                  </span>
                </button>
                <div className="flex items-center justify-between px-1 text-xs text-[var(--color-text-muted)]">
                  <span>Visual Anchor · 6 Mobile Screens</span>
                  <span className="font-mono text-[11px] tabular-nums">Poppins · DM Sans</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUICK NAVIGATION MATRIX */}
      {!initialFocusPlayground && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'foundations',
              title: '01. Foundations',
              desc: '17 color tokens with click-to-copy Hex & CSS variables, Poppins/DM Sans specimen, 4px spacing scale, and elevation shadows.',
              cta: 'View Foundations',
            },
            {
              id: 'atoms',
              title: '02. Core Components (Atoms)',
              desc: 'Buttons across 5 states, Inputs & Selects, Study Goal sliders, Toggles, Checkboxes, Subject Badges, and Avatars.',
              cta: 'Browse Atoms',
            },
            {
              id: 'molecules',
              title: '03. Composite Molecules',
              desc: 'Task & Semester Focus cards, accessible Modals, sortable Data Tables with loading/empty states, Toasts, and Tabs.',
              cta: 'Browse Molecules',
            },
          ].map((card) => (
            <div
              key={card.id}
              className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 flex flex-col justify-between gap-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="space-y-1.5">
                <h2 className="font-display text-[16px] font-semibold text-[var(--color-text-primary)]">
                  {card.title}
                </h2>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div>
                <MButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate(card.id)}
                >
                  {card.cta}
                </MButton>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* INTERACTIVE COMPONENT PLAYGROUND */}
      <section
        id="component-playground"
        aria-labelledby="playground-heading"
        className="space-y-5"
      >
        <div className="border-b border-[var(--color-border-subtle)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4FC0D8]">
              <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
              Interactive Workbench
            </div>
            <h2
              id="playground-heading"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Component Playground
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)]">
              Toggle component props in real time and copy the generated React usage snippet.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-[12px] bg-[var(--color-bg-surface-muted)] p-1 border border-[var(--color-border-subtle)]">
            {(
              [
                { id: 'button', label: 'Button' },
                { id: 'badge', label: 'Badge' },
                { id: 'input', label: 'Input' },
                { id: 'toggle', label: 'Toggle' },
                { id: 'alert', label: 'Alert' },
              ] as { id: PlaygroundComponent; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setComponentType(item.id);
                  if (item.id === 'button') setCustomLabel('Continue');
                  if (item.id === 'badge') setCustomLabel('25 MAR');
                  if (item.id === 'input') setCustomLabel('Semester Unit');
                  if (item.id === 'toggle') setCustomLabel('Study Reminders');
                  if (item.id === 'alert') setCustomLabel('Swipe right to view study tips.');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  componentType === item.id
                    ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
            <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
              Props &amp; Controls
            </h3>

            <MInput
              label="Label / Text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
            />

            {componentType === 'button' && (
              <div className="grid grid-cols-2 gap-3">
                <MSelect
                  label="Variant"
                  value={btnVariant}
                  onChange={(e) => setBtnVariant(e.target.value as MButtonVariant)}
                  options={[
                    { value: 'primary', label: 'Primary (Navy)' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'coral', label: 'Coral Accent' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'destructive', label: 'Destructive' },
                  ]}
                />
                <MSelect
                  label="Size"
                  value={btnSize}
                  onChange={(e) => setBtnSize(e.target.value as MButtonSize)}
                  options={[
                    { value: 'sm', label: 'sm (32px)' },
                    { value: 'md', label: 'md (40px)' },
                    { value: 'lg', label: 'lg (48px)' },
                  ]}
                />
                <MSelect
                  label="Radius"
                  value={btnRadius}
                  onChange={(e) => setBtnRadius(e.target.value as MButtonRadius)}
                  options={[
                    { value: 'sm', label: 'sm (8px)' },
                    { value: 'md', label: 'md (12px)' },
                    { value: 'lg', label: 'lg (20px)' },
                    { value: 'pill', label: 'pill (9999px)' },
                  ]}
                />
                <MSelect
                  label="State"
                  value={btnState}
                  onChange={(e) =>
                    setBtnState(
                      e.target.value as 'default' | 'hover' | 'active' | 'disabled' | 'loading'
                    )
                  }
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'hover', label: 'Hover' },
                    { value: 'active', label: 'Active' },
                    { value: 'disabled', label: 'Disabled' },
                    { value: 'loading', label: 'Loading' },
                  ]}
                />
                <div className="col-span-2 pt-1">
                  <MToggle
                    checked={showIcon}
                    onChange={setShowIcon}
                    label="Show leading icon"
                  />
                </div>
              </div>
            )}

            {componentType === 'badge' && (
              <div className="grid grid-cols-2 gap-3">
                <MSelect
                  label="Variant"
                  value={badgeVariant}
                  onChange={(e) => setBadgeVariant(e.target.value as MBadgeVariant)}
                  options={[
                    { value: 'cyan', label: 'Cyan (Date)' },
                    { value: 'coral', label: 'Coral' },
                    { value: 'navy', label: 'Navy' },
                    { value: 'crimson', label: 'Unit Crimson' },
                    { value: 'cerulean', label: 'Unit Cerulean' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'error', label: 'Error' },
                    { value: 'muted', label: 'Muted' },
                  ]}
                />
                <MSelect
                  label="Size"
                  value={badgeSize}
                  onChange={(e) => setBadgeSize(e.target.value as 'sm' | 'md')}
                  options={[
                    { value: 'sm', label: 'sm' },
                    { value: 'md', label: 'md' },
                  ]}
                />
                <MSelect
                  label="Shape"
                  value={badgeShape}
                  onChange={(e) => setBadgeShape(e.target.value as 'pill' | 'rounded')}
                  options={[
                    { value: 'pill', label: 'Pill (9999px)' },
                    { value: 'rounded', label: 'Rounded (8px)' },
                  ]}
                />
              </div>
            )}

            {componentType === 'input' && (
              <MSelect
                label="Input State"
                value={inputState}
                onChange={(e) =>
                  setInputState(
                    e.target.value as 'default' | 'focus' | 'error' | 'disabled'
                  )
                }
                options={[
                  { value: 'default', label: 'Default' },
                  { value: 'focus', label: 'Focus Ring' },
                  { value: 'error', label: 'Error Validation' },
                  { value: 'disabled', label: 'Disabled' },
                ]}
              />
            )}

            {componentType === 'toggle' && (
              <div className="space-y-3">
                <MSelect
                  label="Active Accent"
                  value={toggleAccent}
                  onChange={(e) => setToggleAccent(e.target.value as 'cyan' | 'navy')}
                  options={[
                    { value: 'cyan', label: 'Sky Cyan (#4FC0D8)' },
                    { value: 'navy', label: 'Midnight Navy (#25273E)' },
                  ]}
                />
                <MToggle
                  checked={toggleChecked}
                  onChange={setToggleChecked}
                  label="Checked state"
                />
              </div>
            )}

            {componentType === 'alert' && (
              <MSelect
                label="Alert Variant"
                value={alertVariant}
                onChange={(e) => setAlertVariant(e.target.value as MAlertVariant)}
                options={[
                  { value: 'coral-tip', label: 'Coral Onboarding Tip' },
                  { value: 'info', label: 'Info (Cyan)' },
                  { value: 'success', label: 'Success' },
                  { value: 'warning', label: 'Warning' },
                  { value: 'error', label: 'Error' },
                ]}
              />
            )}
          </div>

          {/* Live Stage & Code Output */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative flex-1 min-h-[200px] rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] p-8 flex items-center justify-center overflow-hidden">
              <PastelConfettiField variant="cyan" />
              <div className="relative z-10 w-full flex items-center justify-center">
                {componentType === 'button' && (
                  <MButton
                    variant={btnVariant}
                    size={btnSize}
                    radius={btnRadius}
                    forcedState={btnState}
                    leftIcon={
                      showIcon ? (
                        btnVariant === 'destructive' ? (
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        )
                      ) : undefined
                    }
                    onClick={() =>
                      onNotify('Playground Action', `Triggered ${btnVariant} (${btnSize}) button`)
                    }
                  >
                    {customLabel || 'Continue'}
                  </MButton>
                )}
                {componentType === 'badge' && (
                  <MBadge
                    variant={badgeVariant}
                    size={badgeSize}
                    shape={badgeShape}
                    icon={
                      badgeVariant === 'success' ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : undefined
                    }
                  >
                    {customLabel || '25 MAR'}
                  </MBadge>
                )}
                {componentType === 'input' && (
                  <div className="w-full max-w-sm">
                    <MInput
                      label={customLabel || 'Semester Unit'}
                      state={inputState}
                      defaultValue="GRD379 App & UX Design"
                      errorText={
                        inputState === 'error'
                          ? 'Please enter a valid unit code.'
                          : undefined
                      }
                      helperText={
                        inputState !== 'error'
                          ? "Used to organize Today's Tasks"
                          : undefined
                      }
                    />
                  </div>
                )}
                {componentType === 'toggle' && (
                  <MToggle
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                    accent={toggleAccent}
                    label={customLabel || 'Study Reminders'}
                    description="Interactive live preview state"
                  />
                )}
                {componentType === 'alert' && (
                  <div className="w-full max-w-md">
                    <MAlert
                      variant={alertVariant}
                      title={customLabel || 'Swipe right to view study tips.'}
                      description="Consistent Muddled. feedback banner."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[#1A1D32] text-[#F3F5FA] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#9EA6BD]">
                  React Component Snippet
                </span>
                <button
                  type="button"
                  onClick={() => onCopy('Component Snippet', generatedSnippet)}
                  className="inline-flex items-center gap-1.5 rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Copy className="h-3 w-3" aria-hidden="true" />
                  Copy JSX
                </button>
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-[#D2EBF2]">
                <code>{generatedSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCE LIGHTBOX MODAL */}
      {anchorLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#25273E]/70 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Muddled concept screens full preview"
          onClick={() => setAnchorLightboxOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-[20px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)]">
                Muddled. Visual Anchor Screens
              </h3>
              <button
                type="button"
                onClick={() => setAnchorLightboxOpen(false)}
                aria-label="Close reference modal"
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="rounded-[12px] overflow-hidden border border-[var(--color-border-subtle)] bg-[#FFFFFF]">
              <img
                src="/assets/aistudio/Frame_2_a09e36b6.jpg"
                alt="Muddled mobile screens full reference"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
