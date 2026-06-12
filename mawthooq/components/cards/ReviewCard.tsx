'use client';

import React from 'react';
import { Hoverable } from './Hoverable';
import { Stars } from '@/components/ui/Stars';
import { Avatar } from '@/components/ui/Avatar';
import { Verified } from '@/components/ui/Verified';
import { Monogram } from '@/components/ui/Monogram';
import { Icon } from '@/components/ui/Icon';
import type { Brand } from '@/lib/data';
import { REVIEWERS } from '@/lib/data';
import type { Lang } from '@/lib/translations';
import { t } from '@/lib/translations';

interface ReviewCardProps {
  brand: Brand;
  revIdx: number;
  rating: number;
  textAr: string;
  textFr: string;
  helpful: number;
  verified?: boolean;
  lang: Lang;
  onClick?: () => void;
}

export function ReviewCard({ brand, revIdx, rating, textAr, textFr, helpful, verified, lang, onClick }: ReviewCardProps) {
  const reviewer = REVIEWERS[revIdx % REVIEWERS.length];

  return (
    <Hoverable
      onClick={onClick}
      className="glass-card masonry-item stagger-item"
      style={{ padding: 20 }}
    >
      {/* Brand mini header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={28} radius={7} />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
          {lang === 'ar' ? brand.ar : brand.fr}
        </span>
      </div>

      {/* Stars + verified */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <Stars score={rating} size={16} />
        {verified && <Verified lang={lang} />}
      </div>

      {/* Review text */}
      <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
        {lang === 'ar' ? textAr : textFr}
      </p>

      {/* Reviewer + helpful */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar initial={reviewer.i} color={reviewer.c} size={28} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {lang === 'ar' ? reviewer.n_ar : reviewer.n_fr}
          </span>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: '1px solid var(--line)',
            borderRadius: 6,
            padding: '3px 8px',
            fontSize: 11,
            color: 'var(--muted)',
            cursor: 'pointer',
          }}
          onClick={e => e.stopPropagation()}
        >
          <Icon name="ThumbsUp" size={12} />
          {helpful}
        </button>
      </div>
    </Hoverable>
  );
}
