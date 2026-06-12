'use client';

import React from 'react';
import { Backdrop } from './Backdrop';
import { Stars } from '@/components/ui/Stars';
import { Avatar } from '@/components/ui/Avatar';
import { Verified } from '@/components/ui/Verified';
import { Monogram } from '@/components/ui/Monogram';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Icon } from '@/components/ui/Icon';
import { REVIEWERS } from '@/lib/data';
import type { Brand } from '@/lib/data';
import type { Lang } from '@/lib/translations';

interface ReviewDetailProps {
  brand: Brand;
  revIdx: number;
  rating: number;
  textAr: string;
  textFr: string;
  helpful: number;
  verified?: boolean;
  hasMedia?: boolean;
  ratio?: number;
  hue?: number;
  isVideo?: boolean;
  label?: string;
  lang: Lang;
  onClose: () => void;
}

export function ReviewDetail({
  brand, revIdx, rating, textAr, textFr, helpful, verified,
  hasMedia, ratio, hue, isVideo, label, lang, onClose
}: ReviewDetailProps) {
  const reviewer = REVIEWERS[revIdx % REVIEWERS.length];

  return (
    <Backdrop onClose={onClose}>
      <div
        className="modal-enter"
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 32px 64px rgba(17,49,93,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={36} radius={9} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
                {lang === 'ar' ? brand.ar : brand.fr}
              </div>
              <Stars score={rating} size={14} />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
            }}
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Media */}
        {hasMedia && (
          <div style={{ padding: '16px 20px 0' }}>
            <MediaSlot ratio={ratio || 1} hue={hue || 200} isVideo={isVideo} label={label} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Avatar initial={reviewer.i} color={reviewer.c} size={36} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                {lang === 'ar' ? reviewer.n_ar : reviewer.n_fr}
              </div>
              {verified && <Verified lang={lang} />}
            </div>
          </div>

          <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            {lang === 'ar' ? textAr : textFr}
          </p>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(61,130,222,0.08)',
                border: '1px solid rgba(61,130,222,0.2)',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                color: 'var(--accent)',
                fontSize: 13,
              }}
            >
              <Icon name="ThumbsUp" size={14} />
              {lang === 'ar' ? 'مفيد' : 'Utile'} ({helpful})
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: 13,
              }}
            >
              <Icon name="Flag" size={14} />
              {lang === 'ar' ? 'إبلاغ' : 'Signaler'}
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
