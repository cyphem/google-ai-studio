import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import {
  MAvatar,
  MBadge,
  MButton,
  MButtonVariant,
  MCheckbox,
  MFab,
  MInput,
  MSelect,
  MToggle,
} from '../ui/MuddledPrimitives';

interface AtomsSectionProps {
  activeSubSection?: 'buttons' | 'inputs' | 'toggles' | 'badges' | 'avatars';
  onNotify: (title: string, description?: string) => void;
}

export const AtomsSection: React.FC<AtomsSectionProps> = ({
  activeSubSection,
  onNotify,
}) => {
  const showAll = !activeSubSection;

  // Interactive button loading demo
  const [savingDemo, setSavingDemo] = useState(false);

  // Interactive Inputs & Slider state
  const [unitName, setUnitName] = useState('GRD379 App & UX Design');
  const [priority, setPriority] = useState('high');
  const [currentHours, setCurrentHours] = useState(4);
  const [targetHours, setTargetHours] = useState(10);

  // Interactive Toggles & Checkboxes
  const [remindersOn, setRemindersOn] = useState(true);
  const [autoBreaksOn, setAutoBreaksOn] = useState(false);
  const [syncCalendarOn, setSyncCalendarOn] = useState(true);
  const [checkLab, setCheckLab] = useState(true);
  const [checkAssessment, setCheckAssessment] = useState(false);
  const [checkIndeterminate, setCheckIndeterminate] = useState(true);

  const buttonVariants: { id: MButtonVariant; label: string; note: string }[] = [
    { id: 'primary', label: 'Primary (Navy)', note: 'Primary CTAs such as Continue and Create Account' },
    { id: 'secondary', label: 'Secondary', note: 'Outlined surface actions & cancel buttons' },
    { id: 'coral', label: 'Coral Accent', note: 'High-visibility semester Update actions' },
    { id: 'ghost', label: 'Ghost', note: 'Low-emphasis toolbar and inline actions' },
    { id: 'destructive', label: 'Destructive', note: 'Irreversible removal of units or tasks' },
  ];

  const buttonStates: ('default' | 'hover' | 'active' | 'disabled' | 'loading')[] = [
    'default',
    'hover',
    'active',
    'disabled',
    'loading',
  ];

  const triggerLoadingTest = () => {
    setSavingDemo(true);
    window.setTimeout(() => {
      setSavingDemo(false);
      onNotify('Schedule updated', 'Your study goals were saved.');
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {/* 1. BUTTONS */}
      {(showAll || activeSubSection === 'buttons') && (
        <section aria-labelledby="atoms-buttons" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="atoms-buttons"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Buttons &amp; Floating Action
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                Complete variant and interaction state matrix using 8px sm radius and midnight navy / coral brand anchors.
              </p>
            </div>
            <MButton
              variant="primary"
              loading={savingDemo}
              onClick={triggerLoadingTest}
            >
              {savingDemo ? 'Saving Goals...' : 'Test Live Loading State'}
            </MButton>
          </div>

          {/* State Matrix */}
          <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)]">
                  <th className="py-3 px-4 text-xs font-semibold text-[var(--color-text-primary)]">
                    Variant
                  </th>
                  {buttonStates.map((st) => (
                    <th
                      key={st}
                      className="py-3 px-4 text-xs font-semibold text-[var(--color-text-muted)] capitalize"
                    >
                      {st}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {buttonVariants.map((variant) => (
                  <tr key={variant.id}>
                    <td className="py-4 px-4 align-middle min-w-[200px]">
                      <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                        {variant.label}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {variant.note}
                      </div>
                    </td>
                    {buttonStates.map((st) => (
                      <td key={st} className="py-4 px-4 align-middle">
                        <MButton
                          variant={variant.id}
                          forcedState={st}
                          leftIcon={
                            variant.id === 'destructive' && st !== 'loading' ? (
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : undefined
                          }
                          onClick={() =>
                            onNotify(`${variant.label}`, `Clicked ${st} state button`)
                          }
                        >
                          {st === 'loading'
                            ? 'Saving'
                            : variant.id === 'coral'
                            ? 'Update'
                            : variant.id === 'destructive'
                            ? 'Delete'
                            : 'Continue'}
                        </MButton>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Floating Action Button & Size Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 flex items-center justify-between gap-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                  Size Scale (sm · md · lg)
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Standard 32px, 40px, and 48px control heights.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <MButton size="sm">Small</MButton>
                <MButton size="md">Medium</MButton>
                <MButton size="lg">Large</MButton>
              </div>
            </div>

            <div
              className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 flex items-center justify-between gap-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                  Primary Floating Action Button
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Uses Level 2 Navy Elevation (`--shadow-floating-navy`).
                </p>
              </div>
              <div className="flex items-center gap-4">
                <MFab
                  size="md"
                  aria-label="Add task"
                  onClick={() => onNotify('FAB Clicked', 'Create new task action triggered')}
                />
                <MFab
                  size="lg"
                  aria-label="Add semester unit"
                  onClick={() => onNotify('Large FAB Clicked', 'Create new unit action triggered')}
                >
                  <Plus className="h-6 w-6" aria-hidden="true" />
                </MFab>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. INPUTS & SELECTS */}
      {(showAll || activeSubSection === 'inputs') && (
        <section aria-labelledby="atoms-inputs" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="atoms-inputs"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Inputs, Selects &amp; Study Goal Sliders
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              1px subtle borders (`#E2E7F0`), sky-cyan focus rings, explicit error icons with helper prose, and the Muddled. weekly study hours slider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <MInput
                label="Default Input (Interactive)"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
                helperText="Enter unit code and subject title (e.g. GRD379)."
              />
              <MInput
                label="Focused State"
                state="focus"
                defaultValue="Year 1 Semester 1"
                leftIcon={<Calendar className="h-4 w-4" aria-hidden="true" />}
                helperText="Active sky-cyan ring (#4FC0D8) on focus."
              />
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <MInput
                label="Validation Error State"
                state="error"
                defaultValue="31 Feb 22"
                errorText="Please enter a valid semester end date."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MSelect
                  label="Priority Select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  options={[
                    { value: 'high', label: 'Priority: High' },
                    { value: 'medium', label: 'Priority: Medium' },
                    { value: 'low', label: 'Priority: Low' },
                  ]}
                  helperText="Filters Today's Tasks"
                />
                <MInput
                  label="Disabled Field"
                  state="disabled"
                  defaultValue="20 Jul 22"
                  helperText="Locked once semester ends"
                />
              </div>
            </div>
          </div>

          {/* Weekly Study Goal Sliders from Frame 2 */}
          <div
            className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="slider-current-hours"
                  className="text-[13px] text-[var(--color-text-primary)]"
                >
                  Hours you <strong className="font-bold">currently</strong> spend studying per week
                </label>
                <span className="rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-text-primary)] tabular-nums shrink-0">
                  {currentHours} hrs
                </span>
              </div>
              <input
                id="slider-current-hours"
                type="range"
                min={0}
                max={20}
                value={currentHours}
                onChange={(e) => setCurrentHours(Number(e.target.value))}
                className="muddled-slider w-full"
                style={{
                  background: `linear-gradient(to right, #4FC0D8 ${(currentHours / 20) * 100}%, var(--color-bg-surface-muted) ${(currentHours / 20) * 100}%)`,
                }}
              />
              <div className="flex justify-between font-mono text-[11px] text-[var(--color-text-muted)] tabular-nums">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="slider-target-hours"
                  className="text-[13px] text-[var(--color-text-primary)]"
                >
                  Hours you would <strong className="font-bold">like to</strong> spend per week
                </label>
                <span className="rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-text-primary)] tabular-nums shrink-0">
                  {targetHours} hrs
                </span>
              </div>
              <input
                id="slider-target-hours"
                type="range"
                min={0}
                max={20}
                value={targetHours}
                onChange={(e) => setTargetHours(Number(e.target.value))}
                className="muddled-slider w-full"
                style={{
                  background: `linear-gradient(to right, #4FC0D8 ${(targetHours / 20) * 100}%, var(--color-bg-surface-muted) ${(targetHours / 20) * 100}%)`,
                }}
              />
              <div className="flex justify-between font-mono text-[11px] text-[var(--color-text-muted)] tabular-nums">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. TOGGLES & CHECKBOXES */}
      {(showAll || activeSubSection === 'toggles') && (
        <section aria-labelledby="atoms-toggles" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="atoms-toggles"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Toggles &amp; Checkboxes
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Accessible switch and selection controls with crisp keyboard focus rings and explicit state indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-5">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Switch Toggles
              </h3>
              <div className="flex flex-col gap-4">
                <MToggle
                  checked={remindersOn}
                  onChange={setRemindersOn}
                  accent="cyan"
                  label="Assessment reminders (Cyan accent)"
                  description="Notify 24 hours before due time"
                />
                <MToggle
                  checked={autoBreaksOn}
                  onChange={setAutoBreaksOn}
                  accent="navy"
                  label="Pomodoro break intervals (Navy accent)"
                  description="Insert 5-minute rest blocks after study sessions"
                />
                <MToggle
                  checked={syncCalendarOn}
                  onChange={setSyncCalendarOn}
                  disabled
                  label="Disabled active switch"
                  description="Managed by university timetable sync"
                />
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-5">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Checkboxes
              </h3>
              <div className="flex flex-col gap-3.5">
                <MCheckbox
                  checked={checkLab}
                  onChange={setCheckLab}
                  label="GRD379 Laboratory task completed"
                />
                <MCheckbox
                  checked={checkAssessment}
                  onChange={setCheckAssessment}
                  label="GRD338 Assessment draft review"
                />
                <MCheckbox
                  checked={false}
                  indeterminate={checkIndeterminate}
                  onChange={() => setCheckIndeterminate((v) => !v)}
                  label="Select all semester units (Indeterminate)"
                />
                <MCheckbox
                  checked={false}
                  onChange={() => {}}
                  error
                  label="Required syllabus confirmation (Error state)"
                />
                <MCheckbox
                  checked={true}
                  onChange={() => {}}
                  disabled
                  label="Archived unit lock (Disabled)"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. BADGES */}
      {(showAll || activeSubSection === 'badges') && (
        <section aria-labelledby="atoms-badges" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="atoms-badges"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Badges &amp; Subject Chips
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Subject unit blocks (`GRD379`, `GRD338`), sky-cyan date pills (`25 MAR`), and accessible semantic status badges paired with icons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-3">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Subject &amp; Date Chips
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <MBadge variant="cyan" shape="rounded">25 MAR</MBadge>
                <MBadge variant="crimson" shape="rounded">GRD 379</MBadge>
                <MBadge variant="cerulean" shape="rounded">GRD 338</MBadge>
                <MBadge variant="navy">10 Hours</MBadge>
                <MBadge variant="muted">Mondays</MBadge>
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-3">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Accessible Status Badges
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <MBadge variant="success" icon={<CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}>
                  Completed
                </MBadge>
                <MBadge variant="warning" icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}>
                  Due Soon
                </MBadge>
                <MBadge variant="error" icon={<AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />}>
                  Overdue
                </MBadge>
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-3">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Coral Onboarding &amp; Small Size
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <MBadge variant="coral">New Tip</MBadge>
                <MBadge variant="cyan" size="sm">15 Min</MBadge>
                <MBadge variant="muted" size="sm">450.2.051</MBadge>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. AVATARS */}
      {(showAll || activeSubSection === 'avatars') && (
        <section aria-labelledby="atoms-avatars" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="atoms-avatars"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Avatars
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Student &amp; tutor profile tokens supporting circular pill geometry and Muddled. 14px squircle containers across five sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Sizes &amp; Brand Tones (Circle)
              </h3>
              <div className="flex flex-wrap items-end gap-3">
                <MAvatar initials="AL" name="Ava Lin" size="xs" tone="navy" />
                <MAvatar initials="MK" name="Maya Kim" size="sm" tone="coral" />
                <MAvatar initials="JR" name="Jordan Reed" size="md" tone="cyan" />
                <MAvatar initials="ST" name="Samira Tariq" size="lg" tone="crimson" />
                <MAvatar initials="DW" name="Devon Wu" size="xl" tone="cerulean" />
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Squircle Geometry &amp; Study Group Stack
              </h3>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MAvatar initials="AL" name="Ava Lin" size="md" shape="squircle" tone="navy" />
                  <MAvatar initials="MK" name="Maya Kim" size="md" shape="squircle" tone="coral" />
                  <MAvatar initials="JR" name="Jordan Reed" size="md" shape="squircle" tone="cyan" />
                </div>
                <div className="flex items-center -space-x-2.5">
                  <MAvatar initials="AL" name="Ava Lin" size="md" tone="navy" />
                  <MAvatar initials="MK" name="Maya Kim" size="md" tone="coral" />
                  <MAvatar initials="JR" name="Jordan Reed" size="md" tone="cyan" />
                  <MAvatar initials="+4" name="4 more classmates" size="md" tone="cerulean" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
