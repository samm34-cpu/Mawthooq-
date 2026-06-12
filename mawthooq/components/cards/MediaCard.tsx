'use client';

import React from 'react';
import { Hoverable } from './Hoverable';
import { Stars } from '@/components/ui/Stars';
import { Avatar } from '@/components/ui/Avatar';
import { Monogram } from '@/components/ui/Monogram';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Icon } from '@/components/ui/Icon';
import type { Brand } from '@/lib/data';
import { REVIEWERS } from '@/lib/data';
import type { Lang } from '@/lib/translations';

interface MediaCardProps {
  brand: Brand;
  revIdx: number;
  rating: number;
  ratio: number;
  hue: number;
  isVideo: boolean;
  label: string;
  textAr: string;
  textFr: string;
  helpful: number;
  lang: Lang;
  onClick?: () => void;
}

export function MediaCard({ brand, revIdx, rating, ratio, hue, isVideo, label, textAr, textFr, helpful, lang, onClick }: MediaCardProps) {
  const reviewer = REVIEWERS[revIdx % REVIEWERS.length];

  return (
    <Hoverable
      onClick={onClick}
      className="glass-card masonry-item stagger-item"
      style={{ padding: 0, overflow: 'hidden' }}
    >
      {/* Media */}
      <div style={{ padding: '12px 12px 0' }}>
        <MediaSlot ratio={ratio} hue={hue} isVideo={isVideo} label={label} />
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
          <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={24} radius={6} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>
            {lang === 'ar' ? brand.ar : brand.fr}
          </span>
          <div style={{ marginInlineStart: 'auto' }}>
            <Stars score={rating} size={13} />
          </div>
        </div>

        {/* Text */}
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
          {lang === 'ar' ? textAr : textFr}
        </p>

        {/* Reviewer */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Avatar initial={reviewer.i} color={reviewer.c} size={26} />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
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
              padding: '2px 7px',
              fontSize: 11,
              color: 'var(--muted)',
              cursor: 'pointer',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Icon name="ThumbsUp" size={11} />
            {helpful}
          </button>
        </div>
      </div>
    </Hoverable>
  );
}
