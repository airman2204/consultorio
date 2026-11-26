import React from 'react';

interface ScallopedDividerProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

/**
 * Divisor orgánico con bordes festoneados (scalloped edges) del Brandbook.
 */
export function ScallopedDivider({
  fillColor = '#FAF9F6',
  className = 'w-full h-8 md:h-12',
  flip = false,
}: ScallopedDividerProps) {
  return (
    <div
      className={`overflow-hidden leading-none pointer-events-none select-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          d="M0,30 C30,55 60,55 90,30 C120,5 150,5 180,30 C210,55 240,55 270,30 C300,5 330,5 360,30 C390,55 420,55 450,30 C480,5 510,5 540,30 C570,55 600,55 630,30 C660,5 690,5 720,30 C750,55 780,55 810,30 C840,5 870,5 900,30 C930,55 960,55 990,30 C1020,5 1050,5 1080,30 C1110,55 1140,55 1170,30 C1185,18 1195,18 1200,30 L1200,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
