import React from 'react';

interface MuddledLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export const MuddledIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="18" fill="#FFFFFF" />
    <rect
      x="0.5"
      y="0.5"
      width="63"
      height="63"
      rx="17.5"
      stroke="#E2E7F0"
      strokeWidth="1"
    />
    {/* Stylized student profile silhouette */}
    <path
      d="M24 50C24 44.5 23.5 41 21 37.5C19.5 35.3 20.8 31.5 22.5 29.2C24 27.1 26.5 26 30 26C35 26 40 28.5 42 33.5C43.2 36.5 41.2 40.5 39.2 41.8C37.5 42.9 36.5 45 36.5 50"
      stroke="#25273E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tangled mind thread in coral/amber */}
    <path
      d="M25.5 23C24 20.5 27.5 18.2 30.2 19.6C32.4 20.8 30.6 24.4 28.2 23.8C25.8 23.2 26.6 19.6 30.4 18.8C33.8 18 37.2 20.2 36.4 23C35.8 25.1 32.5 24.8 32.8 22.4C33 20.8 35.8 20.5 37.8 22.2"
      stroke="#F98689"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Graduation cap */}
    <path
      d="M15 21.5L32 14L49 21.5L32 28.5L15 21.5Z"
      fill="#FFFFFF"
      stroke="#25273E"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Tassel */}
    <path
      d="M46 23V32"
      stroke="#25273E"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="46" cy="33.5" r="1.8" fill="#F98689" />
  </svg>
);

export const MuddledLogo: React.FC<MuddledLogoProps> = ({
  size = 36,
  showWordmark = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <MuddledIcon size={size} className="shrink-0 shadow-sm" />
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-[var(--color-text-primary)] whitespace-nowrap shrink-0">
          Muddled<span className="text-[var(--color-accent-coral)]">.</span>
        </span>
      )}
    </div>
  );
};

export const PastelConfettiField: React.FC<{ variant?: 'coral' | 'cyan' }> = ({
  variant = 'cyan',
}) => {
  const shapeColor = variant === 'coral' ? '#FFFFFF' : '#D2EBF2';
  const secondaryColor = variant === 'coral' ? '#FFFFFF' : '#4FC0D8';

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 dark:opacity-20"
      viewBox="0 0 600 220"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="46" cy="48" r="14" fill={shapeColor} fillOpacity="0.65" />
      <circle cx="536" cy="168" r="22" fill={shapeColor} fillOpacity="0.55" />
      <circle cx="430" cy="34" r="10" fill={secondaryColor} fillOpacity="0.22" />
      <path
        d="M118 158L128 168M128 158L118 168"
        stroke={secondaryColor}
        strokeOpacity="0.4"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M522 52L534 64M534 52L522 64"
        stroke={shapeColor}
        strokeOpacity="0.85"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="290" cy="190" r="7" fill={secondaryColor} fillOpacity="0.2" />
    </svg>
  );
};
