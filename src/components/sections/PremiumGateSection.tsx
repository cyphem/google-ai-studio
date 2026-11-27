import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Download,
  Infinity as InfinityIcon,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Timer,
  Unlock,
  X,
} from 'lucide-react';
import { exportMobilePremiumZip } from '../../utils/exportMobilePremiumHtml';
import { MuddledIcon, PastelConfettiField } from '../MuddledLogo';
import {
  MBadge,
  MButton,
  MSegmentedTabs,
} from '../ui/MuddledPrimitives';

interface PremiumGateSectionProps {
  onNotify: (title: string, description?: string) => void;
}

type PlanId = '12m' | '6m';
type ViewMode = 'responsive' | 'mobile';
type FeatureKey = 'techniques' | 'unlimited' | 'timer' | 'insights';

interface PremiumFeature {
  id: FeatureKey;
  title: string;
  subtitle: string;
  freeLimit: string;
  premiumValue: string;
  accentBg: string;
  accentText: string;
  icon: React.ReactNode;
}

const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'techniques',
    title: 'All Study Techniques',
    subtitle: 'Active Recall, Spaced Repetition, Feynman & Pomodoro workflows',
    freeLimit: '1 technique on Free',
    premiumValue: 'All 6 techniques',
    accentBg: 'bg-[#F98689]/18 dark:bg-[#F98689]/20',
    accentText: 'text-[#B6242C] dark:text-[#F98689]',
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: 'unlimited',
    title: 'Unlimited Semesters & Tasks',
    subtitle: 'Plan multiple years, courses, labs, and assessments without caps',
    freeLimit: '1 semester · 3 units',
    premiumValue: 'Unlimited',
    accentBg: 'bg-[#4FC0D8]/18 dark:bg-[#4FC0D8]/20',
    accentText: 'text-[#2E98D1] dark:text-[#4FC0D8]',
    icon: <InfinityIcon className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: 'timer',
    title: 'Study Timer',
    subtitle: 'Unit-linked focus timer that auto-logs weekly study hour goals',
    freeLimit: 'Locked on Free',
    premiumValue: 'Full Timer + Breaks',
    accentBg: 'bg-[#25273E]/10 dark:bg-[#4FC0D8]/20',
    accentText: 'text-[#25273E] dark:text-[#4FC0D8]',
    icon: <Timer className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: 'insights',
    title: 'Study Insights',
    subtitle: 'Weekly balance charts, streak velocity, and deadline readiness',
    freeLimit: 'Locked on Free',
    premiumValue: 'Full Analytics',
    accentBg: 'bg-[#3CC496]/18 dark:bg-[#3CC496]/20',
    accentText: 'text-[#177A59] dark:text-[#3CC496]',
    icon: <BarChart3 className="h-4 w-4" aria-hidden="true" />,
  },
];

const PLANS: {
  id: PlanId;
  duration: string;
  tagline: string;
  monthlyPrice: string;
  totalBilled: string;
  savingsLabel?: string;
}[] = [
  {
    id: '12m',
    duration: '12 Months',
    tagline: 'Full academic year coverage',
    monthlyPrice: '$3.99',
    totalBilled: '$47.88 billed annually',
    savingsLabel: 'Save 33%',
  },
  {
    id: '6m',
    duration: '6 Months',
    tagline: 'Single semester pass',
    monthlyPrice: '$5.99',
    totalBilled: '$35.94 billed every 6 months',
  },
];

export const PremiumGateSection: React.FC<PremiumGateSectionProps> = ({
  onNotify,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('12m');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFeaturePreview, setActiveFeaturePreview] =
    useState<FeatureKey>('timer');

  // Interactive preview states for the gated tools
  const [selectedTechnique, setSelectedTechnique] = useState('Pomodoro');
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [previewUnits, setPreviewUnits] = useState([
    { code: 'GRD 379', name: 'App & UX Design', tone: '#B6242C', hours: '10 hrs/wk' },
    { code: 'GRD 338', name: 'Advanced Web Design', tone: '#2E98D1', hours: '10 hrs/wk' },
    { code: 'DES 210', name: 'Interaction Systems', tone: '#3CC496', hours: '6 hrs/wk' },
  ]);

  useEffect(() => {
    if (!timerRunning || !isUnlocked) return;
    const id = window.setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, isUnlocked]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const activePlanObj = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[0];

  const handleSubscribe = () => {
    setIsProcessing(true);
    window.setTimeout(() => {
      setIsProcessing(false);
      setIsUnlocked(true);
      onNotify(
        'Muddled+ Unlocked',
        `${activePlanObj.duration} plan activated. All study tools are now unlocked.`
      );
    }, 950);
  };

  const handleRestore = () => {
    setIsUnlocked(true);
    onNotify('Purchase Restored', 'Your existing Muddled+ subscription is active.');
  };

  const handleAddUnitPreview = () => {
    if (!isUnlocked) {
      onNotify(
        'Feature Locked',
        'Upgrade to 12 Months or 6 Months to add unlimited semesters and units.'
      );
      return;
    }
    const nextNum = 400 + previewUnits.length * 12;
    setPreviewUnits((prev) => [
      ...prev,
      {
        code: `GRD ${nextNum}`,
        name: 'Design Research Studio',
        tone: '#25273E',
        hours: '8 hrs/wk',
      },
    ]);
    onNotify('Unit Added', `GRD ${nextNum} added to Year 1 Semester 2.`);
  };

  const renderGatedFeaturePreview = () => {
    const feat =
      PREMIUM_FEATURES.find((f) => f.id === activeFeaturePreview) ??
      PREMIUM_FEATURES[0];

    return (
      <div
        className="rounded-[16px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4 relative overflow-hidden"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`h-9 w-9 rounded-[10px] flex items-center justify-center ${feat.accentBg} ${feat.accentText}`}
            >
              {feat.icon}
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                {feat.title}
              </h4>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {isUnlocked ? 'Unlocked preview — interactive' : `Gated Preview · ${feat.freeLimit}`}
              </p>
            </div>
          </div>
          <MBadge
            variant={isUnlocked ? 'success' : 'muted'}
            size="sm"
            icon={
              isUnlocked ? (
                <Unlock className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Lock className="h-3 w-3" aria-hidden="true" />
              )
            }
          >
            {isUnlocked ? 'Unlocked' : 'Locked'}
          </MBadge>
        </div>

        {/* Feature-specific interactive body */}
        <div className="relative rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] p-4">
          {activeFeaturePreview === 'techniques' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {['Pomodoro', 'Active Recall', 'Spaced Repetition', 'Feynman Method'].map(
                  (tech, idx) => {
                    const lockedItem = !isUnlocked && idx > 0;
                    const active = selectedTechnique === tech;
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          if (lockedItem) {
                            onNotify('Premium Technique', `${tech} requires Muddled+.`);
                          } else {
                            setSelectedTechnique(tech);
                          }
                        }}
                        className={[
                          'flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer',
                          active
                            ? 'border-[#4FC0D8] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]'
                            : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/70 text-[var(--color-text-muted)]',
                          lockedItem ? 'opacity-65' : '',
                        ].join(' ')}
                      >
                        <span className="truncate">{tech}</span>
                        {lockedItem ? (
                          <Lock className="h-3.5 w-3.5 shrink-0 text-[#F98689]" aria-hidden="true" />
                        ) : active ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#3CC496]" aria-hidden="true" />
                        ) : null}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {activeFeaturePreview === 'unlimited' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Year 1 Semester 2 · {previewUnits.length} Units
                </span>
                <MButton size="sm" variant="secondary" onClick={handleAddUnitPreview}>
                  + Add Unit
                </MButton>
              </div>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {previewUnits.map((u, i) => (
                  <div
                    key={`${u.code}-${i}`}
                    className="flex items-center justify-between rounded-[10px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="h-6 px-2 rounded-[6px] text-[10px] font-bold text-white inline-flex items-center tabular-nums shrink-0"
                        style={{ backgroundColor: u.tone }}
                      >
                        {u.code}
                      </span>
                      <span className="font-medium text-[var(--color-text-primary)] truncate">
                        {u.name}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--color-text-muted)] tabular-nums shrink-0">
                      {u.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFeaturePreview === 'timer' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-[14px] bg-[#25273E] text-white flex items-center justify-center font-mono text-base font-bold tabular-nums shrink-0">
                  {formatTimer(timerSeconds)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-primary)]">
                    GRD379 Focus Session
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    25 min focus · 5 min break
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MButton
                  size="sm"
                  variant={timerRunning ? 'coral' : 'primary'}
                  disabled={!isUnlocked}
                  leftIcon={
                    timerRunning ? (
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    )
                  }
                  onClick={() => setTimerRunning((r) => !r)}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </MButton>
                <MButton
                  size="sm"
                  variant="secondary"
                  disabled={!isUnlocked}
                  aria-label="Reset timer"
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(25 * 60);
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </MButton>
              </div>
            </div>
          )}

          {activeFeaturePreview === 'insights' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Weekly Study Balance
                </span>
                <span className="font-mono text-[11px] text-[#4FC0D8] font-semibold tabular-nums">
                  14.5 / 20 hrs goal
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 items-end h-20 pt-2">
                {[
                  { day: 'Mon', pct: 85, color: '#B6242C' },
                  { day: 'Tue', pct: 55, color: '#2E98D1' },
                  { day: 'Wed', pct: 70, color: '#4FC0D8' },
                  { day: 'Thu', pct: 40, color: '#F98689' },
                  { day: 'Fri', pct: 90, color: '#3CC496' },
                ].map((bar) => (
                  <div key={bar.day} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full max-w-[28px] bg-[var(--color-bg-surface-muted)] rounded-t-[6px] h-14 flex items-end overflow-hidden">
                      <div
                        className="w-full rounded-t-[6px] transition-all duration-300"
                        style={{
                          height: isUnlocked ? `${bar.pct}%` : '22%',
                          backgroundColor: isUnlocked ? bar.color : '#A3ABC0',
                        }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtle Lock Overlay when gated on Timer & Insights */}
          {!isUnlocked &&
            (activeFeaturePreview === 'timer' || activeFeaturePreview === 'insights') && (
              <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                  <Lock className="h-3.5 w-3.5 text-[#F98689]" aria-hidden="true" />
                  Unlock Muddled+ to interact with {feat.title}.
                </span>
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="font-semibold text-[#2E98D1] dark:text-[#4FC0D8] hover:underline whitespace-nowrap cursor-pointer"
                >
                  Unlock Now
                </button>
              </div>
            )}
        </div>
      </div>
    );
  };

  const renderPlanSelector = (compact = false) => (
    <div className="space-y-3" role="radiogroup" aria-label="Choose subscription plan">
      {PLANS.map((plan) => {
        const selected = selectedPlan === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setSelectedPlan(plan.id)}
            className={[
              'w-full text-left rounded-[16px] transition-all duration-150 cursor-pointer relative',
              compact ? 'p-4' : 'p-5',
              selected
                ? 'border-[4px] border-[#F98689] bg-[var(--color-bg-surface)]'
                : 'border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] hover:border-[#4FC0D8]',
            ].join(' ')}
            style={{
              boxShadow: selected
                ? 'var(--shadow-floating-coral)'
                : 'var(--shadow-card)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className={[
                    'mt-0.5 h-5 w-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors',
                    selected
                      ? 'border-[#25273E] bg-[#25273E] text-white dark:border-[#4FC0D8] dark:bg-[#4FC0D8] dark:text-[#111322]'
                      : 'border-[#CBD3E1] dark:border-[#3A4166]',
                  ].join(' ')}
                >
                  {selected && <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[15px] font-bold text-[var(--color-text-primary)]">
                      {plan.duration}
                    </span>
                    {plan.savingsLabel && (
                      <MBadge variant="cyan" size="sm">
                        {plan.savingsLabel}
                      </MBadge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {plan.tagline}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-display text-[18px] font-bold text-[var(--color-text-primary)] tabular-nums">
                  {plan.monthlyPrice}
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">
                    /mo
                  </span>
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] tabular-nums">
                  {plan.totalBilled}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Template Workbench Header */}
      <div className="border-b border-[var(--color-border-subtle)] pb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h2 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]">
            Unlock Premium Features Screen (Gated)
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
            Built strictly with Muddled. tokens: curved coral splash banner, 12-month &amp; 6-month plans with coral focus halo, and interactive gated feature previews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <MSegmentedTabs
            tabs={[
              { id: 'responsive', label: 'Responsive View' },
              { id: 'mobile', label: 'Mobile Frame (390px)' },
            ]}
            activeId={viewMode}
            onChange={(id) => setViewMode(id as ViewMode)}
          />
          <MButton
            variant={isUnlocked ? 'secondary' : 'coral'}
            size="sm"
            leftIcon={
              isUnlocked ? (
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
              )
            }
            onClick={() => {
              setIsUnlocked((u) => !u);
              setTimerRunning(false);
            }}
          >
            {isUnlocked ? 'Reset to Locked Gate' : 'Simulate Unlocked'}
          </MButton>
          <MButton
            variant="secondary"
            size="sm"
            leftIcon={<Download className="h-3.5 w-3.5" aria-hidden="true" />}
            onClick={() => {
              const isDark = document.documentElement.classList.contains('dark');
              exportMobilePremiumZip({
                initialPlan: selectedPlan,
                initialUnlocked: isUnlocked,
                darkTheme: isDark,
              });
              onNotify(
                'Exported Mobile HTML/CSS ZIP',
                'Downloaded muddled-unlock-premium-mobile.zip (index.html + styles.css + tokens.css).'
              );
            }}
          >
            Export Mobile HTML/CSS ZIP
          </MButton>
        </div>
      </div>

      {/* RESPONSIVE DESKTOP/WEB SCREEN LAYOUT */}
      {viewMode === 'responsive' ? (
        <div className="rounded-[20px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] overflow-hidden">
          {/* Signature Curved Coral Header matching Screen 1 */}
          <div className="relative bg-[#F98689] px-6 sm:px-10 pt-8 pb-14 text-white overflow-hidden">
            <PastelConfettiField variant="coral" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <MuddledIcon size={56} className="shrink-0 shadow-md" />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/90">
                    <span>Muddled+</span>
                    <span aria-hidden="true">·</span>
                    <span>Student Pro Access</span>
                  </div>
                  <h1 className="font-display text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] leading-tight text-white [text-wrap:balance]">
                    Unlock Premium Features
                  </h1>
                  <p className="text-[13px] text-white/95 max-w-lg">
                    Master every semester with all study techniques, unlimited units, focused session timers, and personalized study insights.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25273E] px-3.5 py-1.5 text-xs font-semibold text-white">
                  {isUnlocked ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#3CC496]" aria-hidden="true" />
                      Muddled+ Active
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 text-[#F98689]" aria-hidden="true" />
                      Free Plan · 4 Features Gated
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Curved bottom wave separator */}
            <svg
              className="pointer-events-none absolute bottom-0 left-0 w-full h-7 text-[var(--color-bg-canvas-subtle)]"
              viewBox="0 0 1200 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,10 Q600,48 1200,10 L1200,40 L0,40 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* 2-Column Main Paywall Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Gated Feature List + Interactive Tool Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-[16px] font-semibold text-[var(--color-text-primary)]">
                  What&apos;s Included in Muddled+
                </h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Select any gated feature below to preview its free limit versus unlocked capability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PREMIUM_FEATURES.map((feat) => {
                  const isFocused = activeFeaturePreview === feat.id;
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => setActiveFeaturePreview(feat.id)}
                      className={[
                        'text-left rounded-[12px] border p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3',
                        isFocused
                          ? 'border-[#4FC0D8] bg-[var(--color-bg-surface)] ring-2 ring-[#4FC0D8]/20'
                          : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] hover:border-[#4FC0D8]/60',
                      ].join(' ')}
                      style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`h-9 w-9 rounded-[10px] flex items-center justify-center shrink-0 ${feat.accentBg} ${feat.accentText}`}
                        >
                          {feat.icon}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-muted)]">
                          {isUnlocked ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#3CC496]" aria-hidden="true" />
                              <span className="text-[#177A59] dark:text-[#3CC496]">
                                {feat.premiumValue}
                              </span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3 text-[#F98689]" aria-hidden="true" />
                              <span>{feat.freeLimit}</span>
                            </>
                          )}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-[14px] font-bold text-[var(--color-text-primary)]">
                          {feat.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] leading-snug">
                          {feat.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Preview of Selected Gated Feature */}
              {renderGatedFeaturePreview()}
            </div>

            {/* Right Column: 12-Month & 6-Month Pricing + Primary Navy CTA */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1">
                <h2 className="font-display text-[16px] font-semibold text-[var(--color-text-primary)]">
                  Choose Your Plan
                </h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Cancel anytime. Includes 7-day free student trial.
                </p>
              </div>

              {renderPlanSelector(false)}

              {/* Summary & Action Box */}
              <div
                className="rounded-[16px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">Selected plan</span>
                  <span className="font-semibold text-[var(--color-text-primary)] tabular-nums">
                    {activePlanObj.duration} · {activePlanObj.monthlyPrice}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-text-muted)]">First 7 days</span>
                  <span className="font-semibold text-[#3CC496] tabular-nums">$0.00 due today</span>
                </div>

                <MButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isProcessing}
                  onClick={handleSubscribe}
                >
                  {isUnlocked
                    ? `Active: ${activePlanObj.duration} Plan`
                    : `Unlock with ${activePlanObj.duration} Plan`}
                </MButton>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleRestore}
                    className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    Restore Purchase
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUnlocked(false);
                      onNotify('Free Tier Active', 'Continuing with 1 semester and 3 units.');
                    }}
                    className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    Continue Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE DEVICE FRAME (390px) MATCHING FRAME_2 CONCEPT SCREENS */
        <div className="flex justify-center py-4">
          <div
            className="w-full max-w-[390px] rounded-[28px] border-[6px] border-[#25273E] bg-[var(--color-bg-canvas)] overflow-hidden"
            style={{ boxShadow: 'var(--shadow-floating-navy)' }}
          >
            {/* Mobile Coral Splash Header */}
            <div className="relative bg-[#F98689] px-5 pt-6 pb-10 text-white overflow-hidden">
              <PastelConfettiField variant="coral" />
              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-white/90">Muddled+</span>
                <button
                  type="button"
                  onClick={() =>
                    onNotify('Closed Paywall', 'Returned to Today’s Tasks dashboard.')
                  }
                  aria-label="Close upgrade screen"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center gap-2.5">
                <MuddledIcon size={54} className="shadow-md" />
                <h2 className="font-display text-[22px] font-bold leading-tight text-white">
                  Unlock Premium
                </h2>
                <p className="text-xs text-white/95 max-w-[260px]">
                  Turn semester chaos into calm focus with every Muddled. tool unlocked.
                </p>
              </div>
              <svg
                className="pointer-events-none absolute bottom-0 left-0 w-full h-6 text-[var(--color-bg-canvas)]"
                viewBox="0 0 390 28"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,4 Q195,34 390,4 L390,28 L0,28 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Mobile Scrollable Body */}
            <div className="p-5 space-y-5">
              {/* 4 Gated Features Compact Rows */}
              <div className="space-y-2.5">
                {PREMIUM_FEATURES.map((feat) => (
                  <div
                    key={feat.id}
                    className="flex items-center justify-between gap-3 rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3.5 py-3"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-9 w-9 rounded-[10px] flex items-center justify-center shrink-0 ${feat.accentBg} ${feat.accentText}`}
                      >
                        {feat.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[var(--color-text-primary)] truncate">
                          {feat.title}
                        </p>
                        <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                          {isUnlocked ? feat.premiumValue : feat.freeLimit}
                        </p>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <CheckCircle2 className="h-4 w-4 text-[#3CC496] shrink-0" aria-hidden="true" />
                    ) : (
                      <Lock className="h-4 w-4 text-[#F98689] shrink-0" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              {/* 12 Months & 6 Months Cards */}
              {renderPlanSelector(true)}

              {/* Thumb-Zone Primary CTA */}
              <div className="space-y-2.5 pt-1">
                <MButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isProcessing}
                  onClick={handleSubscribe}
                >
                  {isUnlocked
                    ? `${activePlanObj.duration} Unlocked`
                    : `Start 7-Day Free Trial · ${activePlanObj.monthlyPrice}/mo`}
                </MButton>
                <div className="flex items-center justify-center gap-5 text-[11px] font-medium text-[var(--color-text-muted)]">
                  <button
                    type="button"
                    onClick={handleRestore}
                    className="py-1.5 hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    Restore Purchase
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setIsUnlocked(false)}
                    className="py-1.5 hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    Continue Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
