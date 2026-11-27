import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpDown,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  PenTool,
  Plus,
  Search,
  X,
} from 'lucide-react';
import {
  MAlert,
  MAlertVariant,
  MAvatar,
  MBadge,
  MButton,
  MInput,
  MSegmentedTabs,
  MUnderlineTabs,
} from '../ui/MuddledPrimitives';

interface MoleculesSectionProps {
  activeSubSection?: 'cards' | 'modals' | 'tables' | 'alerts' | 'tabs';
  onTriggerToast: (variant: MAlertVariant, title: string, description: string) => void;
}

interface AcademicRow {
  id: string;
  unitCode: string;
  unitTone: 'crimson' | 'cerulean';
  taskTitle: string;
  courseName: string;
  dueDate: string;
  room: string;
  weeklyHours: number;
  status: 'Completed' | 'Due Soon' | 'Overdue';
}

const ACADEMIC_ROWS: AcademicRow[] = [
  {
    id: 'row-1',
    unitCode: 'GRD 379',
    unitTone: 'crimson',
    taskTitle: 'Laboratory',
    courseName: 'App & UX Design',
    dueDate: '25 Mar · 09:30 AM',
    room: '450.2.051',
    weeklyHours: 10,
    status: 'Due Soon',
  },
  {
    id: 'row-2',
    unitCode: 'GRD 338',
    unitTone: 'cerulean',
    taskTitle: 'Assessment 2',
    courseName: 'Advanced Web Design',
    dueDate: '25 Mar · 23:45 PM',
    room: 'A3 · Website Design',
    weeklyHours: 10,
    status: 'Due Soon',
  },
  {
    id: 'row-3',
    unitCode: 'GRD 379',
    unitTone: 'crimson',
    taskTitle: 'User Flow Audit',
    courseName: 'App & UX Design',
    dueDate: '21 Mar · 17:00 PM',
    room: '450.2.051',
    weeklyHours: 4,
    status: 'Completed',
  },
  {
    id: 'row-4',
    unitCode: 'GRD 338',
    unitTone: 'cerulean',
    taskTitle: 'Accessibility Review',
    courseName: 'Advanced Web Design',
    dueDate: '19 Mar · 14:00 PM',
    room: 'B2 · Studio Lab',
    weeklyHours: 6,
    status: 'Overdue',
  },
];

export const MoleculesSection: React.FC<MoleculesSectionProps> = ({
  activeSubSection,
  onTriggerToast,
}) => {
  const showAll = !activeSubSection;

  // Task Card interactive completion state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Semester focus card editable state
  const [semesterTitle, setSemesterTitle] = useState('Year 1 Semester 1');
  const [semesterUpdated, setSemesterUpdated] = useState(false);

  // Modals state
  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Data Table state
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completed' | 'Due Soon' | 'Overdue'>('all');
  const [tableViewState, setTableViewState] = useState<'populated' | 'loading' | 'empty'>('populated');
  const [sortAsc, setSortAsc] = useState(true);

  // Onboarding swipe tip dismissible preview
  const [showInlineTip, setShowInlineTip] = useState(true);

  // Tabs demos
  const [studyToolTab, setStudyToolTab] = useState('scheduler');
  const [unitTab, setUnitTab] = useState('overview');

  const filteredRows = useMemo(() => {
    const q = tableSearch.trim().toLowerCase();
    const list = ACADEMIC_ROWS.filter((r) => {
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      const matchesQuery =
        !q ||
        r.unitCode.toLowerCase().includes(q) ||
        r.taskTitle.toLowerCase().includes(q) ||
        r.courseName.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
    return [...list].sort((a, b) =>
      sortAsc ? a.weeklyHours - b.weeklyHours : b.weeklyHours - a.weeklyHours
    );
  }, [tableSearch, statusFilter, sortAsc]);

  return (
    <div className="space-y-12">
      {/* 1. CARDS */}
      {(showAll || activeSubSection === 'cards') && (
        <section aria-labelledby="molecules-cards" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="molecules-cards"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Cards &amp; Academic Containers
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Faithful translations of Muddled. Task Cards, Unit Setup Cards, the Coral Halo Semester Focus container, and Level 0 empty-state placeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Cards matching screen 5 */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Today&apos;s Tasks (Level 1 Card Lift)
              </h3>
              <div className="space-y-3">
                {[
                  {
                    id: 't1',
                    codeLine1: 'GRD',
                    codeLine2: '379',
                    color: '#B6242C',
                    title: 'Laboratory',
                    subject: 'App & UX Design',
                    time: 'Mondays - 09:30 AM - 11:30 AM',
                    location: '450.2.051',
                    duration: '15 Min',
                  },
                  {
                    id: 't2',
                    codeLine1: 'GRD',
                    codeLine2: '338',
                    color: '#2E98D1',
                    title: 'Assessment',
                    subject: 'Advanced Web Design',
                    time: 'Due 23:45 PM',
                    location: 'A3 - Website Design',
                    duration: '10 Hours',
                  },
                ].map((task) => {
                  const done = Boolean(completedTasks[task.id]);
                  return (
                    <div
                      key={task.id}
                      className="rounded-[12px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-stretch gap-3.5 transition-all duration-150"
                      style={{
                        padding: 'var(--density-card-pad)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setCompletedTasks((prev) => ({
                            ...prev,
                            [task.id]: !prev[task.id],
                          }))
                        }
                        aria-label={`Toggle ${task.title} completion`}
                        className="w-14 shrink-0 rounded-[10px] flex flex-col items-center justify-center text-white font-display font-bold leading-tight cursor-pointer transition-opacity hover:opacity-90"
                        style={{ backgroundColor: done ? '#3CC496' : task.color }}
                      >
                        <span className="text-[11px] tracking-wider">{task.codeLine1}</span>
                        <span className="text-sm tabular-nums">{task.codeLine2}</span>
                      </button>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4
                              className={`text-[14px] font-bold text-[var(--color-text-primary)] ${
                                done ? 'line-through opacity-60' : ''
                              }`}
                            >
                              {task.title}
                            </h4>
                            <p className="text-xs font-medium text-[var(--color-text-primary)] opacity-85">
                              {task.subject}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onTriggerToast('info', `${task.codeLine1}${task.codeLine2}`, `Opened options for ${task.title}`)
                            }
                            aria-label={`More options for ${task.title}`}
                            className="p-1 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
                          >
                            <MoreVertical className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-end justify-between gap-2">
                          <div className="text-[11px] text-[var(--color-text-muted)] leading-snug tabular-nums">
                            <div>{task.time}</div>
                            <div>{task.location}</div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#4FC0D8] whitespace-nowrap shrink-0 tabular-nums">
                            {done ? 'Done' : task.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Semester Halo Card + Unit Card + Empty State */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Semester Focus Container &amp; Unit Builder
              </h3>

              {/* Coral Halo Container matching screen 4 */}
              <div className="rounded-[20px] border-[5px] border-[#F98689] bg-[#F98689]/25 p-2 space-y-2">
                <input
                  type="text"
                  value={semesterTitle}
                  onChange={(e) => setSemesterTitle(e.target.value)}
                  aria-label="Semester title"
                  className="w-full rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2 text-[13px] font-semibold text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#25273E]"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-[8px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] tabular-nums">
                    01 Mar 22
                  </span>
                  <span className="rounded-[8px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] tabular-nums">
                    20 Jul 22
                  </span>
                  <MButton
                    variant="coral"
                    size="sm"
                    className="ml-auto border border-[#25273E]/20"
                    onClick={() => {
                      setSemesterUpdated(true);
                      onTriggerToast('success', 'Semester updated', `${semesterTitle} dates saved.`);
                      window.setTimeout(() => setSemesterUpdated(false), 1800);
                    }}
                  >
                    {semesterUpdated ? 'Updated' : 'Update'}
                  </MButton>
                </div>
              </div>

              {/* Unit Setup Card matching screen 4 */}
              <div
                className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-4 space-y-3"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-[10px] bg-[#B6242C] flex items-center justify-center text-white">
                    <PenTool className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="rounded-[8px] bg-[var(--color-bg-surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)]">
                      GRD379 App &amp; UX Design
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-[var(--color-text-muted)]">Weekly Study Hours</span>
                      <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1 font-medium text-[var(--color-text-primary)] tabular-nums">
                        10 Hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[var(--color-text-muted)]">Class Times</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[8px] border border-[var(--color-border-subtle)] px-2.5 py-1 font-medium text-[var(--color-text-primary)]">
                      Mondays
                    </span>
                    <span className="rounded-[8px] border border-[var(--color-border-subtle)] px-2.5 py-1 text-[var(--color-text-muted)]">
                      Time
                    </span>
                  </div>
                </div>
              </div>

              {/* Empty State Placeholder matching screen 3 */}
              <div className="rounded-[12px] bg-[var(--color-bg-surface-muted)] p-5 text-center">
                <p className="text-xs font-medium text-[var(--color-text-muted)]">
                  Finish setting up your semester to update your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. MODALS */}
      {(showAll || activeSubSection === 'modals') && (
        <section aria-labelledby="molecules-modals" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="molecules-modals"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Modals &amp; Dialog Sheets
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Extrapolated from Muddled.&apos;s Your Semester sheet using 20px outer squircle geometry, crisp close controls, and clear primary/destructive actions.
            </p>
          </div>

          <div
            className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="space-y-1">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Interactive Modal Triggers
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Launch live dialogs with backdrop scrim and keyboard close support.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <MButton
                variant="primary"
                leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setSemesterModalOpen(true)}
              >
                Open Add Unit Modal
              </MButton>
              <MButton
                variant="destructive"
                onClick={() => setConfirmModalOpen(true)}
              >
                Open Destructive Modal
              </MButton>
            </div>
          </div>
        </section>
      )}

      {/* 3. DATA TABLES */}
      {(showAll || activeSubSection === 'tables') && (
        <section aria-labelledby="molecules-tables" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="molecules-tables"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Data Tables
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                Extrapolated academic task ledger with tabular numerals, live filtering, column sorting, skeleton loading state, and empty state.
              </p>
            </div>
            <MSegmentedTabs
              tabs={[
                { id: 'populated', label: 'Populated' },
                { id: 'loading', label: 'Loading Skeleton' },
                { id: 'empty', label: 'Empty State' },
              ]}
              activeId={tableViewState}
              onChange={(id) => setTableViewState(id as 'populated' | 'loading' | 'empty')}
            />
          </div>

          <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] overflow-hidden">
            {/* Table Toolbar */}
            <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--color-bg-canvas-subtle)]">
              <div className="w-full sm:w-64">
                <MInput
                  placeholder="Filter by unit or task..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
                />
              </div>
              <MSegmentedTabs
                tabs={[
                  { id: 'all', label: 'All Tasks' },
                  { id: 'Due Soon', label: 'Due Soon' },
                  { id: 'Completed', label: 'Completed' },
                  { id: 'Overdue', label: 'Overdue' },
                ]}
                activeId={statusFilter}
                onChange={(id) =>
                  setStatusFilter(id as 'all' | 'Completed' | 'Due Soon' | 'Overdue')
                }
              />
            </div>

            {/* Table Content */}
            {tableViewState === 'loading' ? (
              <div className="p-5 space-y-3" aria-busy="true" aria-label="Loading tasks">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="h-10 rounded-[8px] bg-[var(--color-bg-surface-muted)] animate-pulse"
                  />
                ))}
              </div>
            ) : tableViewState === 'empty' || filteredRows.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <div className="mx-auto h-11 w-11 rounded-[12px] bg-[var(--color-bg-surface-muted)] flex items-center justify-center text-[var(--color-text-muted)]">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                    No matching tasks found
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Adjust your filters or add a new study task to populate your semester schedule.
                  </p>
                </div>
                <MButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTableViewState('populated');
                    setTableSearch('');
                    setStatusFilter('all');
                  }}
                >
                  Reset Table View
                </MButton>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] text-[11px] font-semibold text-[var(--color-text-muted)]">
                      <th className="py-3 px-4">Unit</th>
                      <th className="py-3 px-4">Task &amp; Course</th>
                      <th className="py-3 px-4">Schedule / Due</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSortAsc((s) => !s)}
                          className="inline-flex items-center gap-1 hover:text-[var(--color-text-primary)] cursor-pointer"
                        >
                          Weekly Hours
                          <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)] text-[13px]">
                    {filteredRows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[var(--color-bg-canvas-subtle)] transition-colors"
                        style={{ height: 'var(--density-row-height)' }}
                      >
                        <td className="py-2.5 px-4 whitespace-nowrap">
                          <MBadge variant={row.unitTone} size="sm" shape="rounded">
                            {row.unitCode}
                          </MBadge>
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="font-semibold text-[var(--color-text-primary)]">
                            {row.taskTitle}
                          </div>
                          <div className="text-[11px] text-[var(--color-text-muted)]">
                            {row.courseName}
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-xs text-[var(--color-text-muted)] tabular-nums whitespace-nowrap">
                          {row.dueDate}
                        </td>
                        <td className="py-2.5 px-4 text-xs text-[var(--color-text-muted)] tabular-nums whitespace-nowrap">
                          {row.room}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs font-semibold text-[var(--color-text-primary)] tabular-nums whitespace-nowrap">
                          {row.weeklyHours} hrs
                        </td>
                        <td className="py-2.5 px-4 whitespace-nowrap">
                          <MBadge
                            variant={
                              row.status === 'Completed'
                                ? 'success'
                                : row.status === 'Overdue'
                                ? 'error'
                                : 'warning'
                            }
                            size="sm"
                            icon={
                              row.status === 'Completed' ? (
                                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                              ) : (
                                <Clock className="h-3 w-3" aria-hidden="true" />
                              )
                            }
                          >
                            {row.status}
                          </MBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. ALERTS & TOASTS */}
      {(showAll || activeSubSection === 'alerts') && (
        <section aria-labelledby="molecules-alerts" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="molecules-alerts"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Alerts &amp; Onboarding Toasts
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                Includes the signature Coral Onboarding Swipe-Tip Toast (`--shadow-floating-coral`) alongside semantic feedback banners.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MButton
                variant="coral"
                size="sm"
                onClick={() =>
                  onTriggerToast(
                    'coral-tip',
                    'Swipe right to view study tips.',
                    'Try swiping right on any unit card for quick study techniques.'
                  )
                }
              >
                Spawn Coral Toast
              </MButton>
              <MButton
                variant="secondary"
                size="sm"
                onClick={() =>
                  onTriggerToast(
                    'success',
                    'Goals synchronized',
                    'Weekly target set to 10 hours across 2 units.'
                  )
                }
              >
                Spawn Success Toast
              </MButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {showInlineTip ? (
              <div
                className="rounded-[12px] bg-[#F98689] p-5 text-white flex items-center justify-between gap-4"
                style={{ boxShadow: 'var(--shadow-floating-coral)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold">
                      Swipe right to view study tips.
                    </p>
                    <p className="text-xs text-white/90">
                      Onboarding swipe-tip toast with Level 2 Coral Elevation.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInlineTip(false)}
                  aria-label="Dismiss tip"
                  className="p-1.5 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="rounded-[12px] border border-dashed border-[var(--color-border-subtle)] p-5 flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">
                  Onboarding swipe tip dismissed.
                </span>
                <MButton size="sm" variant="secondary" onClick={() => setShowInlineTip(true)}>
                  Restore Tip
                </MButton>
              </div>
            )}

            <MAlert
              variant="info"
              title="Study Insights Ready"
              description="Your Monday lab sessions leave 2 open study blocks on Tuesday."
            />
            <MAlert
              variant="success"
              title="Semester Schedule Saved"
              description="All GRD379 and GRD338 assessments have been synced."
            />
            <MAlert
              variant="warning"
              title="Upcoming Deadline"
              description="GRD338 Assessment is due at 23:45 PM."
            />
            <MAlert
              variant="error"
              title="Overdue Task"
              description="Accessibility Review passed its scheduled completion window."
            />
          </div>
        </section>
      )}

      {/* 5. NAVIGATION TABS */}
      {(showAll || activeSubSection === 'tabs') && (
        <section aria-labelledby="molecules-tabs" className="space-y-6">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="molecules-tabs"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Navigation Tabs
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Derived directly from Muddled.&apos;s menu hierarchy (Scheduler, Timer, Study Tools, Reminders, Study Insights) in segmented and underline variants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Segmented Workspace Switcher
              </h3>
              <MSegmentedTabs
                tabs={[
                  { id: 'scheduler', label: 'Scheduler' },
                  { id: 'timer', label: 'Timer' },
                  { id: 'tools', label: 'Study Tools' },
                  { id: 'reminders', label: 'Reminders' },
                  { id: 'insights', label: 'Study Insights' },
                ]}
                activeId={studyToolTab}
                onChange={setStudyToolTab}
              />
              <div className="rounded-[8px] bg-[var(--color-bg-canvas-subtle)] p-4 text-xs text-[var(--color-text-muted)]">
                Active view:{' '}
                <strong className="font-semibold text-[var(--color-text-primary)] capitalize">
                  {studyToolTab}
                </strong>{' '}
                — Smooth 150ms cubic-bezier surface transition.
              </div>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                Underline Section Tabs (Coral Indicator)
              </h3>
              <MUnderlineTabs
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'units', label: 'Your Units' },
                  { id: 'calendar', label: 'March Calendar' },
                  { id: 'goals', label: 'Study Goals' },
                ]}
                activeId={unitTab}
                onChange={setUnitTab}
              />
              <div className="rounded-[8px] bg-[var(--color-bg-canvas-subtle)] p-4 text-xs text-[var(--color-text-muted)] flex items-center justify-between">
                <span>
                  Selected tab:{' '}
                  <strong className="font-semibold text-[var(--color-text-primary)] capitalize">
                    {unitTab}
                  </strong>
                </span>
                <div className="flex items-center gap-2">
                  <MAvatar initials="AL" name="Ava Lin" size="xs" tone="coral" />
                  <span>2 Active Units</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LIVE MODAL: ADD UNIT */}
      {semesterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#25273E]/45 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-add-unit-title"
          onClick={() => setSemesterModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[20px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-6 space-y-5"
            style={{ boxShadow: 'var(--shadow-floating-navy)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-[10px] bg-[#D2EBF2] dark:bg-[#223B48] flex items-center justify-center text-[#25273E] dark:text-[#4FC0D8]">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3
                  id="modal-add-unit-title"
                  className="font-display text-[18px] font-semibold text-[var(--color-text-primary)]"
                >
                  Add Semester Unit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSemesterModalOpen(false)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              <MInput label="Unit Code & Title" defaultValue="GRD379 App & UX Design" />
              <div className="grid grid-cols-2 gap-3">
                <MInput label="Weekly Study Hours" defaultValue="10 Hours" />
                <MInput label="Class Day" defaultValue="Mondays" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <MButton variant="secondary" onClick={() => setSemesterModalOpen(false)}>
                Cancel
              </MButton>
              <MButton
                variant="primary"
                onClick={() => {
                  setSemesterModalOpen(false);
                  onTriggerToast('success', 'Unit added', 'GRD379 App & UX Design added to Your Units.');
                }}
              >
                Save Unit
              </MButton>
            </div>
          </div>
        </div>
      )}

      {/* LIVE MODAL: DESTRUCTIVE CONFIRMATION */}
      {confirmModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#25273E]/45 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-confirm-delete-title"
          onClick={() => setConfirmModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-[20px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-6 space-y-4"
            style={{ boxShadow: 'var(--shadow-floating-navy)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3
                id="modal-confirm-delete-title"
                className="font-display text-[17px] font-semibold text-[var(--color-text-primary)]"
              >
                Remove GRD338 Assessment?
              </h3>
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                aria-label="Close modal"
                className="p-1 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              This removes the scheduled assessment and its 10-hour weekly study allocation from March 25.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <MButton variant="secondary" onClick={() => setConfirmModalOpen(false)}>
                Keep Task
              </MButton>
              <MButton
                variant="destructive"
                onClick={() => {
                  setConfirmModalOpen(false);
                  onTriggerToast('error', 'Task removed', 'GRD338 Assessment was removed from Today’s Tasks.');
                }}
              >
                Remove
              </MButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
