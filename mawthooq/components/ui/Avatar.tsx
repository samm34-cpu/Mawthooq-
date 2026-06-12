'use client';

import React from 'react';

interface AvatarProps {
  initial: string;
  color: string;
  size?: number;
}

export function Avatar({ initial, color: _color, size = 36 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(17,34,58,0.10)',
        color: 'var(--ink)',
        fontSize: size * 0.42,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-ar)',
        userSelect: 'none',
        border: '1px solid rgba(17,34,58,0.08)',
      }}
    >
      {initial}
    </div>
  );
}
