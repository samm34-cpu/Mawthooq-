'use client';

import React from 'react';

interface MonogramProps {
  letter: string;
  color: string;
  ink?: string;
  size?: number;
  radius?: number;
}

export function Monogram({ letter, color: _color, ink: _ink, size = 48, radius = 12 }: MonogramProps) {
  const fontSize = size * 0.42;

  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#11223A',
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize,
        fontWeight: 700,
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.10)',
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
