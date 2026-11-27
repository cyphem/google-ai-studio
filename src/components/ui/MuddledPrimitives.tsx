import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Info,
  Loader2,
  Minus,
  Plus,
  X,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* BUTTONS                                                                    */
/* -------------------------------------------------------------------------- */

export type MButtonVariant = 'primary' | 'secondary' | 'coral' | 'ghost' | 'destructive';
export type MButtonSize = 'sm' | 'md' | 'lg';
export type MButtonRadius = 'sm' | 'md' | 'lg' | 'pill';

export interface MButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MButtonVariant;
  size?: MButtonSize;
  radius?: MButtonRadius;
  loading?: boolean;
  forcedState?: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const MButton: React.FC<MButtonProps> = ({
  variant = 'primary',
  size = 'md',
  radius = 'sm',
  loading = false,
  forcedState,
  leftIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || forcedState === 'disabled';
  const isLoading = loading || forcedState === 'loading';
  const isHover = forcedState === 'hover';
  const isActive = forcedState === 'active';

  const sizeMap: Record<MButtonSize, string> = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-5 text-[13px] gap-2',
    lg: 'h-12 px-6 text-sm gap-2',
  };

  const radiusMap: Record<MButtonRadius, string> = {
    sm: 'rounded-[8px]',
    md: 'rounded-[12px]',
    lg: 'rounded-[20px]',
    pill: 'rounded-full',
  };

  const variantClasses: Record<MButtonVariant, string> = {
    primary: [
      'bg-[#25273E] text-white dark:bg-[#4FC0D8] dark:text-[#111322]',
      isHover ? 'bg-[#343757] dark:bg-[#64CBE0]' : 'hover:bg-[#343757] dark:hover:bg-[#64CBE0]',
      isActive ? 'scale-[0.98] bg-[#1C1E31] dark:bg-[#3CB0C8]' : 'active:scale-[0.98]',
    ].join(' '),
    secondary: [
      'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]',
      isHover ? 'bg-[var(--color-bg-surface-muted)]' : 'hover:bg-[var(--color-bg-surface-muted)]',
      isActive ? 'scale-[0.98] bg-[#E2E7F0] dark:bg-[#2E3454]' : 'active:scale-[0.98]',
    ].join(' '),
    coral: [
      'bg-[#F98689] text-[#25273E]',
      isHover ? 'bg-[#F66E72]' : 'hover:bg-[#F66E72]',
      isActive ? 'scale-[0.98] bg-[#E85B5F]' : 'active:scale-[0.98]',
    ].join(' '),
    ghost: [
      'bg-transparent text-[var(--color-text-primary)]',
      isHover ? 'bg-[var(--color-bg-surface-muted)]' : 'hover:bg-[var(--color-bg-surface-muted)]',
      isActive ? 'scale-[0.98] bg-[#E2E7F0] dark:bg-[#2E3454]' : 'active:scale-[0.98]',
    ].join(' '),
    destructive: [
      'bg-[#D93644] text-white',
      isHover ? 'bg-[#C02936]' : 'hover:bg-[#C02936]',
      isActive ? 'scale-[0.98] bg-[#A8202B]' : 'active:scale-[0.98]',
    ].join(' '),
  };

  return (
    <button
      type={props.type ?? 'button'}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      className={[
        'inline-flex items-center justify-center font-medium whitespace-nowrap shrink-0 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)] select-none',
        sizeMap[size],
        radiusMap[radius],
        variantClasses[variant],
        isDisabled ? 'opacity-45 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        isLoading && !isDisabled ? 'cursor-wait' : '',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="shrink-0 inline-flex items-center">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export const MFab: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'md' | 'lg' }
> = ({ size = 'md', className = '', children, ...props }) => {
  const dim = size === 'lg' ? 'h-14 w-14' : 'h-12 w-12';
  return (
    <button
      type={props.type ?? 'button'}
      className={[
        'inline-flex items-center justify-center rounded-full bg-[#25273E] text-white dark:bg-[#4FC0D8] dark:text-[#111322] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] focus-visible:ring-offset-2 cursor-pointer',
        dim,
        className,
      ].join(' ')}
      style={{ boxShadow: 'var(--shadow-floating-navy)' }}
      {...props}
    >
      {children ?? <Plus className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* INPUTS & SELECTS & SLIDER                                                  */
/* -------------------------------------------------------------------------- */

export interface MInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: 'default' | 'focus' | 'error' | 'disabled';
  leftIcon?: React.ReactNode;
}

export const MInput: React.FC<MInputProps> = ({
  label,
  helperText,
  errorText,
  state = 'default',
  leftIcon,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error' || Boolean(errorText);
  const isFocus = state === 'focus';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[var(--color-text-primary)]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 text-[var(--color-text-muted)]">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          className={[
            'w-full rounded-[8px] border bg-[var(--color-bg-surface)] text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-all duration-150 focus:outline-none',
            leftIcon ? 'pl-9 pr-3' : 'px-3',
            'py-[var(--density-input-py)]',
            isError
              ? 'border-[#D93644] ring-2 ring-[#D93644]/20'
              : isFocus
              ? 'border-[#4FC0D8] ring-2 ring-[#4FC0D8]/25'
              : 'border-[var(--color-border-subtle)] focus:border-[#4FC0D8] focus:ring-2 focus:ring-[#4FC0D8]/25',
            isDisabled
              ? 'bg-[var(--color-bg-surface-muted)] text-[var(--color-text-disabled)] cursor-not-allowed'
              : '',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {errorText ? (
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#D93644]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{errorText}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[var(--color-text-muted)]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface MSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  options: { value: string; label: string }[];
}

export const MSelect: React.FC<MSelectProps> = ({
  label,
  helperText,
  errorText,
  options,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const isError = Boolean(errorText);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-[var(--color-text-primary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={isError || undefined}
          className={[
            'w-full appearance-none rounded-[8px] border bg-[var(--color-bg-surface)] pl-3 pr-9 py-[var(--density-input-py)] text-[13px] font-medium text-[var(--color-text-primary)] transition-all duration-150 focus:outline-none',
            isError
              ? 'border-[#D93644] ring-2 ring-[#D93644]/20'
              : 'border-[var(--color-border-subtle)] focus:border-[#4FC0D8] focus:ring-2 focus:ring-[#4FC0D8]/25',
            disabled ? 'bg-[var(--color-bg-surface-muted)] text-[var(--color-text-disabled)] cursor-not-allowed' : 'cursor-pointer',
            className,
          ].join(' ')}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]"
          aria-hidden="true"
        />
      </div>
      {errorText ? (
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#D93644]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{errorText}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[var(--color-text-muted)]">{helperText}</p>
      ) : null}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TOGGLE & CHECKBOX                                                          */
/* -------------------------------------------------------------------------- */

export interface MToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  accent?: 'cyan' | 'navy';
}

export const MToggle: React.FC<MToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  accent = 'cyan',
}) => {
  const activeBg =
    accent === 'cyan'
      ? 'bg-[#4FC0D8]'
      : 'bg-[#25273E] dark:bg-[#4FC0D8]';

  return (
    <label
      className={`inline-flex items-start gap-3 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] focus-visible:ring-offset-2',
          checked ? activeBg : 'bg-[#D5DCE8] dark:bg-[#2E3454]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span className="text-[13px] font-medium text-[var(--color-text-primary)] leading-snug">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-[var(--color-text-muted)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
};

export interface MCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
}

export const MCheckbox: React.FC<MCheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  error = false,
}) => {
  const isActive = checked || indeterminate;
  return (
    <label
      className={`inline-flex items-center gap-2.5 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC0D8] focus-visible:ring-offset-2',
          isActive
            ? 'border-[#25273E] bg-[#25273E] text-white dark:border-[#4FC0D8] dark:bg-[#4FC0D8] dark:text-[#111322]'
            : error
            ? 'border-[#D93644] bg-[var(--color-bg-surface)]'
            : 'border-[#CBD3E1] dark:border-[#3A4166] bg-[var(--color-bg-surface)] hover:border-[#4FC0D8]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        {indeterminate ? (
          <Minus className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
        ) : checked ? (
          <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
        ) : null}
      </button>
      {label && (
        <span
          className={`text-[13px] font-medium ${
            error ? 'text-[#D93644]' : 'text-[var(--color-text-primary)]'
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

/* -------------------------------------------------------------------------- */
/* BADGES & AVATARS                                                           */
/* -------------------------------------------------------------------------- */

export type MBadgeVariant =
  | 'cyan'
  | 'coral'
  | 'navy'
  | 'muted'
  | 'crimson'
  | 'cerulean'
  | 'success'
  | 'warning'
  | 'error';

export interface MBadgeProps {
  variant?: MBadgeVariant;
  size?: 'sm' | 'md';
  shape?: 'pill' | 'rounded';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const MBadge: React.FC<MBadgeProps> = ({
  variant = 'cyan',
  size = 'md',
  shape = 'pill',
  icon,
  children,
  className = '',
}) => {
  const styles: Record<MBadgeVariant, string> = {
    cyan: 'bg-[#4FC0D8] text-white',
    coral: 'bg-[#F98689] text-[#25273E]',
    navy: 'bg-[#25273E] text-white dark:bg-[#4FC0D8] dark:text-[#111322]',
    muted: 'bg-[var(--color-bg-surface-muted)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]',
    crimson: 'bg-[#B6242C] text-white',
    cerulean: 'bg-[#2E98D1] text-white',
    success: 'bg-[#3CC496]/15 text-[#177A59] dark:text-[#5CD9AE] border border-[#3CC496]/30',
    warning: 'bg-[#FBB25C]/20 text-[#9A580B] dark:text-[#FBB25C] border border-[#FBB25C]/40',
    error: 'bg-[#D93644]/15 text-[#B41E2B] dark:text-[#FF7882] border border-[#D93644]/30',
  };

  const sizeCls = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  const shapeCls = shape === 'pill' ? 'rounded-full' : 'rounded-[8px]';

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-semibold whitespace-nowrap shrink-0 tabular-nums',
        styles[variant],
        sizeCls,
        shapeCls,
        className,
      ].join(' ')}
    >
      {icon && <span className="shrink-0 inline-flex">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export interface MAvatarProps {
  initials: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'squircle';
  tone?: 'navy' | 'coral' | 'cyan' | 'crimson' | 'cerulean';
  className?: string;
}

export const MAvatar: React.FC<MAvatarProps> = ({
  initials,
  name,
  size = 'md',
  shape = 'circle',
  tone = 'navy',
  className = '',
}) => {
  const sizeMap = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm',
    xl: 'h-16 w-16 text-lg',
  };

  const shapeMap = {
    circle: 'rounded-full',
    squircle: 'rounded-[14px]',
  };

  const toneMap = {
    navy: 'bg-[#25273E] text-white',
    coral: 'bg-[#F98689] text-[#25273E]',
    cyan: 'bg-[#4FC0D8] text-[#25273E]',
    crimson: 'bg-[#B6242C] text-white',
    cerulean: 'bg-[#2E98D1] text-white',
  };

  return (
    <div
      title={name}
      aria-label={name}
      className={[
        'inline-flex items-center justify-center font-display font-semibold shrink-0 select-none ring-2 ring-[var(--color-bg-surface)]',
        sizeMap[size],
        shapeMap[shape],
        toneMap[tone],
        className,
      ].join(' ')}
    >
      {initials}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ALERTS                                                                     */
/* -------------------------------------------------------------------------- */

export type MAlertVariant = 'info' | 'success' | 'warning' | 'error' | 'coral-tip';

export interface MAlertProps {
  variant?: MAlertVariant;
  title: string;
  description?: string;
  onDismiss?: () => void;
  className?: string;
}

export const MAlert: React.FC<MAlertProps> = ({
  variant = 'info',
  title,
  description,
  onDismiss,
  className = '',
}) => {
  const configs: Record<
    MAlertVariant,
    { wrapper: string; icon: React.ReactNode; titleColor: string; descColor: string }
  > = {
    info: {
      wrapper:
        'bg-[#4FC0D8]/12 border border-[#4FC0D8]/40 dark:bg-[#4FC0D8]/10',
      icon: <Info className="h-4 w-4 text-[#2E98D1] dark:text-[#4FC0D8] shrink-0" />,
      titleColor: 'text-[var(--color-text-primary)]',
      descColor: 'text-[var(--color-text-muted)]',
    },
    success: {
      wrapper:
        'bg-[#3CC496]/12 border border-[#3CC496]/40 dark:bg-[#3CC496]/10',
      icon: <CheckCircle2 className="h-4 w-4 text-[#1E9B70] dark:text-[#3CC496] shrink-0" />,
      titleColor: 'text-[var(--color-text-primary)]',
      descColor: 'text-[var(--color-text-muted)]',
    },
    warning: {
      wrapper:
        'bg-[#FBB25C]/15 border border-[#FBB25C]/50 dark:bg-[#FBB25C]/10',
      icon: <AlertTriangle className="h-4 w-4 text-[#B96A0A] dark:text-[#FBB25C] shrink-0" />,
      titleColor: 'text-[var(--color-text-primary)]',
      descColor: 'text-[var(--color-text-muted)]',
    },
    error: {
      wrapper:
        'bg-[#D93644]/12 border border-[#D93644]/40 dark:bg-[#D93644]/15',
      icon: <AlertCircle className="h-4 w-4 text-[#D93644] dark:text-[#FF7882] shrink-0" />,
      titleColor: 'text-[var(--color-text-primary)]',
      descColor: 'text-[var(--color-text-muted)]',
    },
    'coral-tip': {
      wrapper: 'bg-[#F98689] border border-[#F98689] text-white',
      icon: <Info className="h-4 w-4 text-white shrink-0" />,
      titleColor: 'text-white',
      descColor: 'text-white/90',
    },
  };

  const cfg = configs[variant];

  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-3 rounded-[12px] p-4 ${cfg.wrapper} ${className}`}
      style={variant === 'coral-tip' ? { boxShadow: 'var(--shadow-floating-coral)' } : undefined}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{cfg.icon}</div>
        <div className="space-y-0.5">
          <p className={`text-[13px] font-semibold ${cfg.titleColor}`}>{title}</p>
          {description && (
            <p className={`text-xs leading-relaxed ${cfg.descColor}`}>{description}</p>
          )}
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={`rounded-md p-1 transition-colors cursor-pointer ${
            variant === 'coral-tip'
              ? 'text-white/80 hover:text-white hover:bg-white/15'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-muted)]'
          }`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TABS                                                                       */
/* -------------------------------------------------------------------------- */

export interface TabOption {
  id: string;
  label: string;
}

export const MSegmentedTabs: React.FC<{
  tabs: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
}> = ({ tabs, activeId, onChange }) => (
  <div
    role="tablist"
    className="inline-flex flex-wrap items-center gap-1 rounded-[12px] bg-[var(--color-bg-surface-muted)] p-1 border border-[var(--color-border-subtle)]"
  >
    {tabs.map((t) => {
      const active = t.id === activeId;
      return (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(t.id)}
          className={[
            'px-3.5 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer',
            active
              ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
          ].join(' ')}
        >
          {t.label}
        </button>
      );
    })}
  </div>
);

export const MUnderlineTabs: React.FC<{
  tabs: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
}> = ({ tabs, activeId, onChange }) => (
  <div
    role="tablist"
    className="flex items-center gap-6 border-b border-[var(--color-border-subtle)] overflow-x-auto"
  >
    {tabs.map((t) => {
      const active = t.id === activeId;
      return (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(t.id)}
          className={[
            'relative pb-2.5 text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer',
            active
              ? 'text-[var(--color-text-primary)]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
          ].join(' ')}
        >
          {t.label}
          {active && (
            <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#F98689]" />
          )}
        </button>
      );
    })}
  </div>
);
