'use client';

import React from 'react';

interface MonogramProps {
  letter: string;
  color: string;
  ink?: string;
  size?: number;
  radius?: number;
}

export function Monogram({ letter, color, ink = '#fff', size = 48, radius = 12 }: MonogramProps) {
  const fontSize = size * 0.42;

  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ink,
        fontSize,
        fontWeight: 700,
        flexShrink: 0,
        boxShadow: `0 4px 12px ${color}44`,
        letterSpacing: '-0.01em',
        fontFamily: 'var(--font-ar)',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}
