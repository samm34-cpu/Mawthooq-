'use client';

import React from 'react';
import { Hoverable } from './Hoverable';
import { Monogram } from '@/components/ui/Monogram';
import { Stars } from '@/components/ui/Stars';
import { TrustScore } from '@/components/ui/TrustScore';
import { Distribution } from '@/components/ui/Distribution';
import { Icon } from '@/components/ui/Icon';
import type { Brand } from '@/lib/data';
import type { Lang } from '@/lib/translations';
import { t } from '@/lib/translations';
import { formatNumber } from '@/lib/utils';

interface BrandCardProps {
  brand: Brand;
  lang: Lang;
  onClick?: () => void;
}

export function BrandCard({ brand, lang, onClick }: BrandCardProps) {
  return (
    <Hoverable
      onClick={onClick}
      className="glass-card masonry-item stagger-item"
      style={{ padding: 20 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
        <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={52} radius={14} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {lang === 'ar' ? brand.ar : brand.fr}
            </h3>
            {brand.verified && (
              <Icon name="BadgeCheck" size={16} className="text-[var(--trust)] flex-shrink-0" style={{ color: 'var(--trust)' }} />
            )}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '3px 0 0', lineHeight: 1.4 }}>
            {lang === 'ar' ? brand.tag_ar : brand.tag_fr}
          </p>
        </div>
      </div>

      {/* Score */}
      <div style={{ marginBottom: 12 }}>
        <TrustScore score={brand.score} lang={lang} size="sm" />
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Stars score={brand.score} size={14} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {formatNumber(brand.reviews, lang)} {lang === 'ar' ? 'مراجعة' : 'avis'}
          </span>
        </div>
      </div>

      {/* Distribution */}
      <Distribution dist={brand.dist} />

      {/* Footer */}
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {lang === 'ar' ? brand.ar : brand.fr}
        </span>
        <span style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, opacity: 0.7 }}>
          {t('VIEW_PROFILE', lang)}
          <Icon name="ChevronRight" size={12} />
        </span>
      </div>
    </Hoverable>
  );
}
