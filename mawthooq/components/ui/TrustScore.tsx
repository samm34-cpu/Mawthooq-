'use client';

import React from 'react';
import { getScoreLabel, getScoreColor } from '@/lib/data';
import type { Lang } from '@/lib/translations';

interface TrustScoreProps {
  score: number;
  lang: Lang;
  size?: 'sm' | 'md' | 'lg';
}

export function TrustScore({ score, lang, size = 'md' }: TrustScoreProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score, lang);

  const sizes = {
    sm: { score: 20, label: 11, px: 8, py: 4, gap: 4, radius: 8 },
    md: { score: 28, label: 13, px: 12, py: 6, gap: 6, radius: 10 },
    lg: { score: 48, label: 16, px: 16, py: 8, gap: 8, radius: 14 },
  };

  const s = sizes[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap }}>
      <div
        style={{
          background: color,
          borderRadius: s.radius,
          padding: `${s.py}px ${s.px}px`,
          color: '#fff',
          fontWeight: 700,
          fontSize: s.score,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {score.toFixed(1)}
      </div>
      <span
        style={{
          color,
          fontWeight: 600,
          fontSize: s.label,
        }}
      >
        {label}
      </span>
    </div>
  );
}
