import React, { useState } from 'react';
import { Copy, Download, X } from 'lucide-react';
import { RAW_TOKENS_CSS } from '../data/tokens';
import { MButton, MSegmentedTabs } from './ui/MuddledPrimitives';

interface TokenExportModalProps {
  open: boolean;
  onClose: () => void;
  onCopy: (label: string, value: string) => void;
}

const RAW_TOKENS_JSON = `{
  "color": {
    "bg": { "canvas": "#FFFFFF", "canvas-subtle": "#F7F9FC", "surface": "#FFFFFF", "surface-muted": "#EEF2F7" },
    "text": { "primary": "#25273E", "muted": "#788096", "disabled": "#A3ABC0" },
    "border": { "subtle": "#E2E7F0", "accent-bg": "#D2EBF2" },
    "accent": { "navy": "#25273E", "coral": "#F98689", "cyan": "#4FC0D8" },
    "unit": { "crimson": "#B6242C", "cerulean": "#2E98D1" },
    "status": { "success": "#3CC496", "warning": "#FBB25C", "error": "#D93644" }
  },
  "spacing": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "5": "20px", "6": "24px" },
  "radius": { "sm": "8px", "md": "12px", "lg": "20px", "pill": "9999px" }
}`;

export const TokenExportModal: React.FC<TokenExportModalProps> = ({
  open,
  onClose,
  onCopy,
}) => {
  const [format, setFormat] = useState<'css' | 'json'>('css');

  if (!open) return null;

  const content = format === 'css' ? RAW_TOKENS_CSS : RAW_TOKENS_JSON;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#25273E]/55 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-tokens-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[20px] bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-6 space-y-4"
        style={{ boxShadow: 'var(--shadow-floating-navy)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3
              id="export-tokens-title"
              className="font-display text-[18px] font-semibold text-[var(--color-text-primary)]"
            >
              Muddled. Design Tokens &amp; Export
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Copy CSS custom properties, W3C JSON, or download the full project archive.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close tokens modal"
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-muted)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <MSegmentedTabs
            tabs={[
              { id: 'css', label: 'tokens.css' },
              { id: 'json', label: 'tokens.json' },
            ]}
            activeId={format}
            onChange={(id) => setFormat(id as 'css' | 'json')}
          />
          <div className="flex items-center gap-2">
            <a
              href="/muddled-design-system.zip"
              download="muddled-design-system.zip"
              onClick={() => onCopy('ZIP Archive', 'Downloading muddled-design-system.zip')}
              className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium gap-1.5 rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)] whitespace-nowrap shrink-0 transition-colors"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Export ZIP</span>
            </a>
            <MButton
              variant="primary"
              size="sm"
              leftIcon={<Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              onClick={() => onCopy(`Muddled ${format.toUpperCase()}`, content)}
            >
              Copy All
            </MButton>
          </div>
        </div>

        <pre className="max-h-[52vh] overflow-auto rounded-[12px] bg-[#1A1D32] p-4 font-mono text-xs leading-relaxed text-[#D2EBF2]">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};
