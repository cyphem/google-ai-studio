import React, { useCallback, useEffect, useState } from 'react';
import {
  Bell,
  Box,
  CheckSquare,
  ChevronRight,
  Code2,
  CreditCard,
  Layers,
  LayoutGrid,
  Lock,
  Menu,
  Moon,
  Palette,
  PanelLeft,
  Sliders,
  Square,
  Sun,
  Table2,
  Tag,
  Type,
  UserCircle2,
  X,
} from 'lucide-react';
import { MuddledLogo } from './components/MuddledLogo';
import { AtomsSection } from './components/sections/AtomsSection';
import { FoundationsSection } from './components/sections/FoundationsSection';
import { MoleculesSection } from './components/sections/MoleculesSection';
import { OverviewPlaygroundSection } from './components/sections/OverviewPlaygroundSection';
import { PremiumGateSection } from './components/sections/PremiumGateSection';
import { TokenExportModal } from './components/TokenExportModal';
import { MAlert, MAlertVariant, MButton } from './components/ui/MuddledPrimitives';

type NavId =
  | 'overview'
  | 'playground'
  | 'foundations'
  | 'foundations-colors'
  | 'foundations-typography'
  | 'foundations-spacing'
  | 'foundations-elevation'
  | 'atoms'
  | 'atoms-buttons'
  | 'atoms-inputs'
  | 'atoms-toggles'
  | 'atoms-badges'
  | 'atoms-avatars'
  | 'molecules'
  | 'molecules-cards'
  | 'molecules-modals'
  | 'molecules-tables'
  | 'molecules-alerts'
  | 'molecules-tabs'
  | 'screen-premium';

interface NavGroup {
  groupLabel: string;
  items: {
    id: NavId;
    label: string;
    icon: React.ReactNode;
  }[];
}

interface ToastItem {
  id: string;
  variant: MAlertVariant;
  title: string;
  description?: string;
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Start',
    items: [
      { id: 'overview', label: 'Overview', icon: <LayoutGrid className="h-4 w-4" aria-hidden="true" /> },
      { id: 'playground', label: 'Component Playground', icon: <Sliders className="h-4 w-4" aria-hidden="true" /> },
    ],
  },
  {
    groupLabel: '1. Foundations',
    items: [
      { id: 'foundations', label: 'All Foundations', icon: <Layers className="h-4 w-4" aria-hidden="true" /> },
      { id: 'foundations-colors', label: 'Color Swatches', icon: <Palette className="h-4 w-4" aria-hidden="true" /> },
      { id: 'foundations-typography', label: 'Typography Specimen', icon: <Type className="h-4 w-4" aria-hidden="true" /> },
      { id: 'foundations-spacing', label: 'Spacing Scale', icon: <PanelLeft className="h-4 w-4" aria-hidden="true" /> },
      { id: 'foundations-elevation', label: 'Elevation & Borders', icon: <Box className="h-4 w-4" aria-hidden="true" /> },
    ],
  },
  {
    groupLabel: '2. Core Components (Atoms)',
    items: [
      { id: 'atoms', label: 'All Atoms', icon: <Square className="h-4 w-4" aria-hidden="true" /> },
      { id: 'atoms-buttons', label: 'Buttons & FAB', icon: <Square className="h-4 w-4" aria-hidden="true" /> },
      { id: 'atoms-inputs', label: 'Inputs & Selects', icon: <Sliders className="h-4 w-4" aria-hidden="true" /> },
      { id: 'atoms-toggles', label: 'Toggles & Checkboxes', icon: <CheckSquare className="h-4 w-4" aria-hidden="true" /> },
      { id: 'atoms-badges', label: 'Badges & Chips', icon: <Tag className="h-4 w-4" aria-hidden="true" /> },
      { id: 'atoms-avatars', label: 'Avatars', icon: <UserCircle2 className="h-4 w-4" aria-hidden="true" /> },
    ],
  },
  {
    groupLabel: '3. Composite Molecules',
    items: [
      { id: 'molecules', label: 'All Molecules', icon: <CreditCard className="h-4 w-4" aria-hidden="true" /> },
      { id: 'molecules-cards', label: 'Cards & Units', icon: <CreditCard className="h-4 w-4" aria-hidden="true" /> },
      { id: 'molecules-modals', label: 'Modals & Sheets', icon: <Box className="h-4 w-4" aria-hidden="true" /> },
      { id: 'molecules-tables', label: 'Data Tables', icon: <Table2 className="h-4 w-4" aria-hidden="true" /> },
      { id: 'molecules-alerts', label: 'Alerts & Toasts', icon: <Bell className="h-4 w-4" aria-hidden="true" /> },
      { id: 'molecules-tabs', label: 'Navigation Tabs', icon: <LayoutGrid className="h-4 w-4" aria-hidden="true" /> },
    ],
  },
  {
    groupLabel: '4. Screen Templates',
    items: [
      { id: 'screen-premium', label: 'Unlock Premium (Gated)', icon: <Lock className="h-4 w-4" aria-hidden="true" /> },
    ],
  },
];

const NAV_LABELS: Record<NavId, { group: string; label: string }> = {
  overview: { group: 'Start', label: 'Overview & Visual Anchor' },
  playground: { group: 'Start', label: 'Component Playground' },
  foundations: { group: 'Foundations', label: 'All Foundations' },
  'foundations-colors': { group: 'Foundations', label: 'Color Swatches' },
  'foundations-typography': { group: 'Foundations', label: 'Typography Specimen' },
  'foundations-spacing': { group: 'Foundations', label: 'Spacing Scale' },
  'foundations-elevation': { group: 'Foundations', label: 'Elevation & Borders' },
  atoms: { group: 'Core Components', label: 'All Atoms' },
  'atoms-buttons': { group: 'Core Components', label: 'Buttons & FAB' },
  'atoms-inputs': { group: 'Core Components', label: 'Inputs & Selects' },
  'atoms-toggles': { group: 'Core Components', label: 'Toggles & Checkboxes' },
  'atoms-badges': { group: 'Core Components', label: 'Badges & Chips' },
  'atoms-avatars': { group: 'Core Components', label: 'Avatars' },
  molecules: { group: 'Composite Molecules', label: 'All Molecules' },
  'molecules-cards': { group: 'Composite Molecules', label: 'Cards & Units' },
  'molecules-modals': { group: 'Composite Molecules', label: 'Modals & Sheets' },
  'molecules-tables': { group: 'Composite Molecules', label: 'Data Tables' },
  'molecules-alerts': { group: 'Composite Molecules', label: 'Alerts & Toasts' },
  'molecules-tabs': { group: 'Composite Molecules', label: 'Navigation Tabs' },
  'screen-premium': { group: 'Screen Templates', label: 'Unlock Premium (Gated)' },
};

export default function App() {
  const [activeNav, setActiveNav] = useState<NavId>('screen-premium');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [density, setDensity] = useState<'airy' | 'compact'>('airy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tokensModalOpen, setTokensModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density);
  }, [density]);

  const pushToast = useCallback(
    (variant: MAlertVariant, title: string, description?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, variant, title, description }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    },
    []
  );

  const handleCopy = useCallback(
    (label: string, value: string) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).catch(() => {});
      }
      pushToast('success', `Copied ${label}`, value.length > 60 ? `${value.slice(0, 60)}...` : value);
    },
    [pushToast]
  );

  const handleSelectNav = (id: NavId) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const crumb = NAV_LABELS[activeNav];

  const renderSidebarContent = () => (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 pt-1">
          <button
            type="button"
            onClick={() => handleSelectNav('overview')}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] rounded-lg cursor-pointer"
          >
            <MuddledLogo size={34} />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Design system sections" className="space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupLabel} className="space-y-1">
              <div className="px-3 pb-1 text-[11px] font-semibold text-[var(--color-text-muted)]">
                {group.groupLabel}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectNav(item.id)}
                        className={[
                          'w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer text-left',
                          isActive
                            ? 'bg-[#25273E] text-white dark:bg-[#4FC0D8] dark:text-[#111322]'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)]',
                        ].join(' ')}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="pt-6 mt-6 border-t border-[var(--color-border-subtle)] px-2 text-[11px] text-[var(--color-text-muted)]">
        Muddled. UI Specification · 4px Grid
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (activeNav === 'screen-premium') {
      return (
        <PremiumGateSection
          onNotify={(title, desc) => pushToast('info', title, desc)}
        />
      );
    }
    if (activeNav === 'overview') {
      return (
        <OverviewPlaygroundSection
          onNavigate={(sec) => handleSelectNav(sec as NavId)}
          onCopy={handleCopy}
          onNotify={(title, desc) => pushToast('info', title, desc)}
        />
      );
    }
    if (activeNav === 'playground') {
      return (
        <OverviewPlaygroundSection
          onNavigate={(sec) => handleSelectNav(sec as NavId)}
          onCopy={handleCopy}
          onNotify={(title, desc) => pushToast('info', title, desc)}
          initialFocusPlayground
        />
      );
    }
    if (activeNav.startsWith('foundations')) {
      const subMap: Record<string, 'colors' | 'typography' | 'spacing' | 'elevation' | undefined> = {
        foundations: undefined,
        'foundations-colors': 'colors',
        'foundations-typography': 'typography',
        'foundations-spacing': 'spacing',
        'foundations-elevation': 'elevation',
      };
      return (
        <FoundationsSection
          activeSubSection={subMap[activeNav]}
          onCopy={handleCopy}
          density={density}
          theme={theme}
        />
      );
    }
    if (activeNav.startsWith('atoms')) {
      const subMap: Record<string, 'buttons' | 'inputs' | 'toggles' | 'badges' | 'avatars' | undefined> = {
        atoms: undefined,
        'atoms-buttons': 'buttons',
        'atoms-inputs': 'inputs',
        'atoms-toggles': 'toggles',
        'atoms-badges': 'badges',
        'atoms-avatars': 'avatars',
      };
      return (
        <AtomsSection
          activeSubSection={subMap[activeNav]}
          onNotify={(title, desc) => pushToast('info', title, desc)}
        />
      );
    }
    const molMap: Record<string, 'cards' | 'modals' | 'tables' | 'alerts' | 'tabs' | undefined> = {
      molecules: undefined,
      'molecules-cards': 'cards',
      'molecules-modals': 'modals',
      'molecules-tables': 'tables',
      'molecules-alerts': 'alerts',
      'molecules-tabs': 'tabs',
    };
    return (
      <MoleculesSection
        activeSubSection={molMap[activeNav]}
        onTriggerToast={(variant, title, desc) => pushToast(variant, title, desc)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-canvas)] text-[var(--color-text-primary)] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] p-4 sticky top-0 h-screen overflow-y-auto">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-[#25273E]/50 backdrop-blur-[2px]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="w-72 max-w-[85vw] h-full bg-[var(--color-bg-canvas-subtle)] border-r border-[var(--color-border-subtle)] p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Workspace Header */}
        <header className="sticky top-0 z-30 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)]/95 backdrop-blur-sm px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation sidebar"
              className="lg:hidden p-2 rounded-[8px] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer shrink-0"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-[13px] min-w-0">
              <span className="text-[var(--color-text-muted)] whitespace-nowrap hidden sm:inline">
                Muddled. Design System
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0 hidden sm:inline" aria-hidden="true" />
              <span className="text-[var(--color-text-muted)] whitespace-nowrap hidden md:inline">
                {crumb.group}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0 hidden md:inline" aria-hidden="true" />
              <span className="font-semibold text-[var(--color-text-primary)] truncate">
                {crumb.label}
              </span>
            </nav>
          </div>

          {/* Live Global Controls: Theme Switcher, Density Toggle, Export Tokens */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Density Segmented Switch */}
            <div
              role="group"
              aria-label="Workspace density"
              className="hidden sm:inline-flex items-center rounded-[8px] bg-[var(--color-bg-surface-muted)] p-0.5 border border-[var(--color-border-subtle)]"
            >
              <button
                type="button"
                onClick={() => setDensity('airy')}
                className={`px-2.5 py-1 text-xs font-medium rounded-[6px] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  density === 'airy'
                    ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Airy
              </button>
              <button
                type="button"
                onClick={() => setDensity('compact')}
                className={`px-2.5 py-1 text-xs font-medium rounded-[6px] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  density === 'compact'
                    ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Compact
              </button>
            </div>

            {/* Theme Light/Dark Toggle */}
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#25273E]" aria-hidden="true" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-[#FBB25C]" aria-hidden="true" />
                  <span>Light</span>
                </>
              )}
            </button>

            <MButton
              variant="primary"
              size="sm"
              leftIcon={<Code2 className="h-3.5 w-3.5" aria-hidden="true" />}
              onClick={() => setTokensModalOpen(true)}
            >
              Tokens
            </MButton>
          </div>
        </header>

        {/* Viewport Container */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-[1160px] w-full mx-auto">
          {renderMainContent()}
        </main>
      </div>

      {/* Tokens Export Modal */}
      <TokenExportModal
        open={tokensModalOpen}
        onClose={() => setTokensModalOpen(false)}
        onCopy={handleCopy}
      />

      {/* Floating Toast Stack */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] max-w-sm pointer-events-none"
        >
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <MAlert
                variant={toast.variant}
                title={toast.title}
                description={toast.description}
                onDismiss={() =>
                  setToasts((prev) => prev.filter((item) => item.id !== toast.id))
                }
                className={`shadow-lg ${
                  toast.variant === 'coral-tip' ? '' : 'bg-[var(--color-bg-surface)]'
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
