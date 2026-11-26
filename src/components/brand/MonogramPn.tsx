import React from 'react';

type MonogramVariant = 'tricolor' | 'pink' | 'sage' | 'sand' | 'blue' | 'white';

interface MonogramPnProps {
  className?: string;
  variant?: MonogramVariant;
  showText?: boolean;
}

const VARIANT_COLORS: Record<
  MonogramVariant,
  { p: string; n: string; detail: string; text: string }
> = {
  tricolor: {
    p: '#C7D5B8',
    n: '#E5C0C8',
    detail: '#E0C9A6',
    text: '#3D4A45',
  },
  pink: {
    p: '#E5C0C8',
    n: '#E5C0C8',
    detail: '#E5C0C8',
    text: '#E5C0C8',
  },
  sage: {
    p: '#C7D5B8',
    n: '#C7D5B8',
    detail: '#C7D5B8',
    text: '#C7D5B8',
  },
  sand: {
    p: '#E0C9A6',
    n: '#E0C9A6',
    detail: '#E0C9A6',
    text: '#E0C9A6',
  },
  blue: {
    p: '#A1B9C0',
    n: '#A1B9C0',
    detail: '#A1B9C0',
    text: '#A1B9C0',
  },
  white: {
    p: '#FAF9F6',
    n: '#FAF9F6',
    detail: '#FAF9F6',
    text: '#FAF9F6',
  },
};

/**
 * Isotipo oficial "Pn" de la Dra. Perla Yareli Núñez García.
 * P en verde salvia (#C7D5B8), n en rosa pastel (#E5C0C8) y detalle minimalista en beige arena (#E0C9A6).
 */
export function MonogramPn({
  className = 'w-12 h-12',
  variant = 'tricolor',
  showText = false,
}: MonogramPnProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <div className="inline-flex items-center gap-3">
      <svg
        viewBox="0 0 120 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Monograma Pn Dra. Perla Núñez"
      >
        {/* Trazo caligráfico de la P */}
        <path
          d="M36 82C36 62 41 34 45 20C32 23 18 33 18 46C18 54 25 58 34 55C48 50 62 35 61 21C60 11 47 8 33 15"
          stroke={colors.p}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trazo caligráfico de la n */}
        <path
          d="M52 86C53 72 56 56 58 49C62 56 68 47 72 47C76 47 75 63 72 76C70 85 73 91 79 90C85 89 91 82 95 76"
          stroke={colors.n}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Detalle minimalista de erizo / bebé */}
        <g
          stroke={colors.detail}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Silueta superior y orejas */}
          <path d="M68 33C69 27 74 25 78 28" />
          <path d="M98 33C104 33 107 39 103 44C101 46 98 46 97 44" />
          {/* Púas minimalistas */}
          <path d="M74 22L73 18" />
          <path d="M81 20L82 15" />
          <path d="M88 21L91 16" />
          <path d="M94 25L98 21" />
          <path d="M99 30L104 27" />
          {/* Ojitos y nariz */}
          <circle cx="82" cy="36" r="1.4" fill={colors.detail} stroke="none" />
          <circle cx="91" cy="38" r="1.4" fill={colors.detail} stroke="none" />
          <circle cx="85" cy="42" r="1.6" fill={colors.detail} stroke="none" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-serif text-base font-medium tracking-tight"
            style={{ color: colors.text }}
          >
            Dra. Perla Yareli Núñez García
          </span>
          <span
            className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] opacity-80"
            style={{ color: colors.text }}
          >
            Pediatra
          </span>
        </div>
      )}
    </div>
  );
}
