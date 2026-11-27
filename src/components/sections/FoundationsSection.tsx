import React, { useState } from 'react';
import { Check, Copy, Maximize2 } from 'lucide-react';
import {
  COLOR_TOKENS,
  ColorTokenItem,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SPACING_TOKENS,
  TYPOGRAPHY_SCALE,
} from '../../data/tokens';
import { MSegmentedTabs } from '../ui/MuddledPrimitives';

interface FoundationsSectionProps {
  activeSubSection?: 'colors' | 'typography' | 'spacing' | 'elevation';
  onCopy: (label: string, value: string) => void;
  density: 'airy' | 'compact';
  theme: 'light' | 'dark';
}

export const FoundationsSection: React.FC<FoundationsSectionProps> = ({
  activeSubSection,
  onCopy,
  density,
  theme,
}) => {
  const [copyMode, setCopyMode] = useState<'hex' | 'css' | 'token'>('hex');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [specimenText, setSpecimenText] = useState(
    'Turn academic overwhelm into calm daily structure.'
  );

  const handleSwatchClick = (token: ColorTokenItem) => {
    const activeHex = theme === 'dark' && token.darkHex ? token.darkHex : token.hex;
    const value =
      copyMode === 'hex'
        ? activeHex
        : copyMode === 'css'
        ? `var(${token.cssVar})`
        : token.name;

    onCopy(`${token.name} (${copyMode.toUpperCase()})`, value);
    setCopiedId(token.id);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === token.id ? null : prev));
    }, 1500);
  };

  const categories: ColorTokenItem['category'][] = [
    'Core Semantic Palette',
    'Brand & Interactive Accents',
    'Subject Swatches & Status',
  ];

  const showAll = !activeSubSection;

  return (
    <div className="space-y-12">
      {/* 1. COLOR TOKENS */}
      {(showAll || activeSubSection === 'colors') && (
        <section aria-labelledby="foundations-colors" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--color-border-subtle)] pb-5">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="foundations-colors"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Color Tokens
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                Click any swatch to copy its value. Grounded midnight navy anchors pastel coral and sky cyan accents across a crisp high-legibility canvas.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-medium text-[var(--color-text-muted)] whitespace-nowrap">
                Click copies:
              </span>
              <MSegmentedTabs
                tabs={[
                  { id: 'hex', label: 'Hex Value' },
                  { id: 'css', label: 'CSS Variable' },
                  { id: 'token', label: 'Token Name' },
                ]}
                activeId={copyMode}
                onChange={(id) => setCopyMode(id as 'hex' | 'css' | 'token')}
              />
            </div>
          </div>

          <div className="space-y-8">
            {categories.map((cat) => {
              const items = COLOR_TOKENS.filter((t) => t.category === cat);
              return (
                <div key={cat} className="space-y-3">
                  <h3 className="font-display text-[15px] font-semibold text-[var(--color-text-primary)]">
                    {cat}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((token) => {
                      const displayHex =
                        theme === 'dark' && token.darkHex ? token.darkHex : token.hex;
                      const isCopied = copiedId === token.id;

                      return (
                        <button
                          key={token.id}
                          type="button"
                          onClick={() => handleSwatchClick(token)}
                          className="group text-left rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] cursor-pointer"
                          style={{ boxShadow: 'var(--shadow-card)' }}
                        >
                          <div
                            className="h-20 w-full relative flex items-end justify-between p-3 border-b border-[var(--color-border-subtle)]"
                            style={{ backgroundColor: displayHex }}
                          >
                            <span
                              className={`font-mono text-xs font-semibold tabular-nums px-2 py-0.5 rounded-[6px] ${
                                token.textOnColor === 'light' ||
                                (theme === 'dark' && token.darkHex)
                                  ? 'bg-black/25 text-white'
                                  : 'bg-white/85 text-[#25273E]'
                              }`}
                            >
                              {displayHex}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-[11px] font-medium transition-opacity ${
                                isCopied
                                  ? 'bg-[#3CC496] text-white opacity-100'
                                  : 'bg-white/90 text-[#25273E] opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" aria-hidden="true" />
                                  Copy
                                </>
                              )}
                            </span>
                          </div>
                          <div className="p-3.5 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-display text-[13px] font-semibold text-[var(--color-text-primary)] truncate">
                                {token.name}
                              </span>
                              <code className="font-mono text-[11px] text-[var(--color-text-muted)] shrink-0">
                                {token.cssVar}
                              </code>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] leading-snug">
                              {token.usage}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. TYPOGRAPHY SPECIMEN */}
      {(showAll || activeSubSection === 'typography') && (
        <section aria-labelledby="foundations-typography" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--color-border-subtle)] pb-5">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="foundations-typography"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Typography Specimen
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                Friendly geometric-humanist pairing: Poppins for display headings and DM Sans for scannable body controls and metadata.
              </p>
            </div>
            <div className="w-full sm:w-80">
              <label
                htmlFor="specimen-live-input"
                className="block text-[11px] font-medium text-[var(--color-text-muted)] mb-1"
              >
                Live Specimen Preview Text
              </label>
              <input
                id="specimen-live-input"
                type="text"
                value={specimenText}
                onChange={(e) => setSpecimenText(e.target.value)}
                className="w-full rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2 text-[13px] text-[var(--color-text-primary)] focus:border-[#4FC0D8] focus:outline-none focus:ring-2 focus:ring-[#4FC0D8]/25"
              />
            </div>
          </div>

          {/* Font Pairing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-2"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>Display &amp; Headings</span>
                <span className="font-mono">--font-display</span>
              </div>
              <p className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Poppins
              </p>
              <p className="font-display text-sm text-[var(--color-text-muted)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789
              </p>
            </div>
            <div
              className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-2"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>Body &amp; UI Controls</span>
                <span className="font-mono">--font-body</span>
              </div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                DM Sans
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789
              </p>
            </div>
          </div>

          {/* Type Scale Specimen List */}
          <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
            {TYPOGRAPHY_SCALE.map((item) => {
              const isDisplay = item.fontFamily === 'Poppins';
              const numericSize = item.size;
              const fontWeight = item.weight.startsWith('700')
                ? 700
                : item.weight.startsWith('600')
                ? 600
                : item.weight.startsWith('500')
                ? 500
                : 400;

              return (
                <div
                  key={item.role}
                  className="p-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"
                >
                  <div className="lg:w-64 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-[var(--color-text-primary)]">
                        {item.role}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        · {item.fontFamily}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] text-[var(--color-text-muted)] tabular-nums">
                      <span>{item.size}</span>
                      <span aria-hidden="true">/</span>
                      <span>LH {item.lineHeight.split(' ')[0]}</span>
                      <span aria-hidden="true">/</span>
                      <span>{item.weight.split(' ')[0]}</span>
                      <span aria-hidden="true">/</span>
                      <span>{item.tracking}</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-disabled)]">
                      {item.exampleUsage}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${
                        isDisplay ? 'font-display' : ''
                      } text-[var(--color-text-primary)] break-words`}
                      style={{
                        fontSize: numericSize,
                        fontWeight,
                        letterSpacing: item.tracking,
                        lineHeight: item.lineHeight.split(' ')[0],
                      }}
                    >
                      {specimenText.trim() ? specimenText : item.sampleText}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopy(item.role, `var(${item.token})`)}
                    className="self-start lg:self-center inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--color-border-subtle)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)] transition-colors cursor-pointer shrink-0"
                  >
                    <Copy className="h-3 w-3" aria-hidden="true" />
                    {item.token}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. SPACING SCALE */}
      {(showAll || activeSubSection === 'spacing') && (
        <section aria-labelledby="foundations-spacing" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--color-border-subtle)] pb-5">
            <div className="space-y-1 max-w-2xl">
              <h2
                id="foundations-spacing"
                className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
              >
                Spacing Scale &amp; Dual-Density Rhythm
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                4px micro-unit base with an 8px macro structural rhythm. Current workspace density is set to{' '}
                <strong className="font-semibold text-[var(--color-text-primary)]">
                  {density === 'airy' ? 'Airy (Onboarding / Overview)' : 'Compact (Task Cards / Tables)'}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
            {SPACING_TOKENS.map((sp) => (
              <div
                key={sp.name}
                className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
              >
                <button
                  type="button"
                  onClick={() => onCopy(sp.name, `var(${sp.cssVar})`)}
                  className="sm:w-44 shrink-0 text-left group cursor-pointer"
                >
                  <div className="font-mono text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[#4FC0D8] transition-colors">
                    {sp.cssVar}
                  </div>
                  {sp.alias && (
                    <div className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {sp.alias}
                    </div>
                  )}
                </button>
                <div className="w-16 shrink-0 font-mono text-xs font-semibold text-[var(--color-text-primary)] tabular-nums">
                  {sp.px}px
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className="h-5 rounded-[4px] bg-[#4FC0D8]"
                    style={{ width: `${sp.px * 6}px` }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {sp.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. ELEVATION, BORDERS & RADIUS */}
      {(showAll || activeSubSection === 'elevation') && (
        <section aria-labelledby="foundations-elevation" className="space-y-8">
          <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-1 max-w-2xl">
            <h2
              id="foundations-elevation"
              className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]"
            >
              Elevation, Borders &amp; Geometry
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Soft squircle radii paired with tinted midnight-navy and coral elevations. Click any token card to copy its CSS variable.
            </p>
          </div>

          {/* Elevation Cards */}
          <div className="space-y-3">
            <h3 className="font-display text-[15px] font-semibold text-[var(--color-text-primary)]">
              Shadow &amp; Elevation Levels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SHADOW_TOKENS.map((sh) => (
                <button
                  key={sh.id}
                  type="button"
                  onClick={() => onCopy(sh.name, `var(${sh.cssVar})`)}
                  className="text-left rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)] p-5 space-y-4 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div
                    className={`h-20 rounded-[12px] flex items-center justify-center text-xs font-semibold ${
                      sh.id === 'none'
                        ? 'bg-[var(--color-bg-surface-muted)] text-[var(--color-text-muted)]'
                        : sh.id === 'floating-navy'
                        ? 'bg-[#25273E] text-white'
                        : sh.id === 'floating-coral'
                        ? 'bg-[#F98689] text-white'
                        : 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]'
                    }`}
                    style={{ boxShadow: `var(${sh.cssVar})` }}
                  >
                    {sh.level}
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">
                      {sh.cssVar}
                    </div>
                    <p className="font-mono text-[10px] text-[var(--color-text-muted)] break-all">
                      {sh.value}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] pt-1">
                      {sh.usage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius & Border Widths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-display text-[15px] font-semibold text-[var(--color-text-primary)]">
                Border Radius Scale
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {RADIUS_TOKENS.map((rad) => (
                  <button
                    key={rad.name}
                    type="button"
                    onClick={() => onCopy(rad.name, `var(${rad.cssVar})`)}
                    className="text-left rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-4 space-y-3 hover:border-[#4FC0D8] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="h-10 w-14 border-2 border-[#4FC0D8] bg-[#D2EBF2]/40 dark:bg-[#4FC0D8]/15"
                        style={{ borderRadius: rad.value }}
                      />
                      <span className="font-mono text-xs font-semibold text-[var(--color-text-primary)] tabular-nums">
                        {rad.value}
                      </span>
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">
                        {rad.cssVar}
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 leading-snug">
                        {rad.usage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-[15px] font-semibold text-[var(--color-text-primary)]">
                Border Widths &amp; Focus Rings
              </h3>
              <div className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 space-y-4">
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border-subtle)]">
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                      Thin Hairline
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Unit cards &amp; form inputs (`--border-width-thin: 1px`)
                    </p>
                  </div>
                  <div className="h-10 w-24 rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas-subtle)]" />
                </div>

                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border-subtle)]">
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                      Active Calendar Day Ring
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Selected date indicator (`--border-width-medium: 1.5px`)
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full border-[1.5px] border-[#25273E] dark:border-[#4FC0D8] flex items-center justify-center font-display text-xs font-semibold text-[var(--color-text-primary)] tabular-nums">
                    25
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                      Semester Focus Halo
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Active edit container (`--border-width-halo: 4px`)
                    </p>
                  </div>
                  <div className="rounded-[12px] border-[4px] border-[#F98689] bg-[var(--color-bg-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-[#F98689]" aria-hidden="true" />
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
