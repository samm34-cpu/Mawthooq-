'use client';

import React from 'react';

interface AvatarProps {
  initial: string;
  color: string;
  size?: number;
}

export function Avatar({ initial, color, size = 36 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        fontSize: size * 0.42,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-ar)',
        userSelect: 'none',
      }}
    >
      {initial}
    </div>
  );
}
