'use client';

import React from 'react';
import Link from 'next/link';
import { Backdrop } from './Backdrop';
import { Monogram } from '@/components/ui/Monogram';
import { TrustScore } from '@/components/ui/TrustScore';
import { Stars } from '@/components/ui/Stars';
import { Distribution } from '@/components/ui/Distribution';
import { Verified } from '@/components/ui/Verified';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { REVIEWERS } from '@/lib/data';
import type { Brand } from '@/lib/data';
import type { Lang } from '@/lib/translations';
import { t } from '@/lib/translations';
import { formatNumber } from '@/lib/utils';

interface BrandDetailProps {
  brand: Brand;
  lang: Lang;
  onClose: () => void;
}

const MOCK_REVIEWS = [
  { rating: 5, textAr: "تجربة رائعة جداً! الخدمة سريعة والموظفون متعاونون. سأعود مرة أخرى بالتأكيد.", textFr: "Expérience formidable ! Service rapide et personnel coopératif. Je reviendrai certainement.", rev: 0, helpful: 42, verified: true },
  { rating: 4, textAr: "جيد بشكل عام، لكن يمكن تحسين بعض النقاط. التواصل مع فريق الدعم كان سلساً.", textFr: "Bon en général, mais quelques points à améliorer. La communication avec l'équipe d'assistance était fluide.", rev: 1, helpful: 28, verified: false },
  { rating: 3, textAr: "تجربة متوسطة. الخدمة جيدة لكن الأسعار مرتفعة نسبياً مقارنة بالمنافسين.", textFr: "Expérience moyenne. Le service est correct mais les prix sont relativement élevés.", rev: 2, helpful: 15, verified: true },
];

export function BrandDetail({ brand, lang, onClose }: BrandDetailProps) {
  return (
    <Backdrop onClose={onClose}>
      <div
        className="modal-enter"
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 32px 64px rgba(17,49,93,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Hero banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${brand.color}22 0%, ${brand.color}44 100%)`,
            padding: '28px 28px 24px',
            borderBottom: '1px solid var(--line)',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              insetInlineEnd: 16,
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

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={64} radius={16} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                  {lang === 'ar' ? brand.ar : brand.fr}
                </h2>
                {brand.verified && <Icon name="BadgeCheck" size={20} style={{ color: 'var(--trust)' }} />}
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '4px 0 0' }}>
                {lang === 'ar' ? brand.tag_ar : brand.tag_fr}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          {/* Score + distribution */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 24, flexWrap: 'wrap' }}>
            <div>
              <TrustScore score={brand.score} lang={lang} size="lg" />
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Stars score={brand.score} size={18} />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                  {formatNumber(brand.reviews, lang)} {lang === 'ar' ? 'مراجعة' : 'avis'}
                </span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <Distribution dist={brand.dist} />
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/brands/${brand.id}/review`}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '12px 20px',
              borderRadius: 12,
              fontSize: 15,
              marginBottom: 24,
              textDecoration: 'none',
            }}
            onClick={onClose}
          >
            <Icon name="PenLine" size={16} />
            {t('WRITE_REVIEW', lang)}
          </Link>

          {/* Recent reviews */}
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
            {lang === 'ar' ? 'آخر المراجعات' : 'Avis récents'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MOCK_REVIEWS.map((review, idx) => {
              const reviewer = REVIEWERS[review.rev];
              return (
                <div
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: 12,
                    border: '1px solid var(--line)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar initial={reviewer.i} color={reviewer.c} size={28} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                        {lang === 'ar' ? reviewer.n_ar : reviewer.n_fr}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Stars score={review.rating} size={14} />
                      {review.verified && <Verified lang={lang} />}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'ar' ? review.textAr : review.textFr}
                  </p>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="ThumbsUp" size={12} style={{ color: 'var(--muted)' }} />
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{review.helpful}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View full profile */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link
              href={`/brands/${brand.id}`}
              style={{
                fontSize: 14,
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              onClick={onClose}
            >
              {t('VIEW_PROFILE', lang)}
              <Icon name="ExternalLink" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
