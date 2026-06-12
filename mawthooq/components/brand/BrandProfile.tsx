'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Monogram } from '@/components/ui/Monogram';
import { Stars } from '@/components/ui/Stars';
import { TrustScore } from '@/components/ui/TrustScore';
import { Distribution } from '@/components/ui/Distribution';
import { Verified } from '@/components/ui/Verified';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { REVIEWERS } from '@/lib/data';
import type { Brand } from '@/lib/data';
import { CATEGORIES } from '@/lib/data';
import { t } from '@/lib/translations';
import { formatNumber } from '@/lib/utils';

interface BrandProfileProps {
  brand: Brand;
}

const MOCK_REVIEWS = [
  { rating: 5, textAr: "تجربة رائعة جداً! الخدمة سريعة والموظفون متعاونون للغاية. أنصح الجميع بالتعامل معهم. سأعود مرة أخرى بالتأكيد.", textFr: "Expérience formidable ! Service rapide et personnel très coopératif. Je recommande à tout le monde. Je reviendrai certainement.", rev: 0, helpful: 142, verified: true },
  { rating: 4, textAr: "جيد بشكل عام، لكن يمكن تحسين بعض النقاط الخاصة بالتوصيل. التواصل مع فريق الدعم كان سلساً ومريحاً.", textFr: "Bon en général, mais livraison à améliorer. Communication avec le support fluide.", rev: 1, helpful: 87, verified: false },
  { rating: 5, textAr: "أفضل تجربة حتى الآن في المغرب. التطبيق سهل الاستخدام والأسعار تنافسية جداً. شكراً على الخدمة الممتازة!", textFr: "Meilleure expérience au Maroc. L'appli est intuitive et les prix très compétitifs. Merci !", rev: 2, helpful: 203, verified: true },
  { rating: 2, textAr: "كانت التجربة مخيبة للآمال بعض الشيء. الانتظار كان طويلاً وخدمة العملاء لم ترد بسرعة كافية.", textFr: "Expérience décevante. Attente trop longue et service client lent à répondre.", rev: 3, helpful: 34, verified: false },
  { rating: 5, textAr: "ممتاز من كل النواحي! التوصيل في الوقت المحدد والمنتج بحالة ممتازة. خدمة ما شاء الله!", textFr: "Excellent sur tous les points ! Livraison ponctuelle, produit en parfait état. Service impeccable !", rev: 4, helpful: 178, verified: true },
];

export function BrandProfile({ brand }: BrandProfileProps) {
  const { lang } = useLanguage();
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const category = CATEGORIES.find(c => c.id === brand.cat);
  const shareLink = `https://mawthooq.ma/r/${brand.id}abc`;

  const filteredReviews = filterRating
    ? MOCK_REVIEWS.filter(r => r.rating === filterRating)
    : MOCK_REVIEWS;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": lang === 'ar' ? brand.ar : brand.fr,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": brand.score.toString(),
      "reviewCount": brand.reviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', marginBottom: 20, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            {lang === 'ar' ? 'موثوق' : 'Mawthooq'}
          </Link>
          <Icon name="ChevronRight" size={12} />
          <span>{category ? (lang === 'ar' ? category.ar : category.fr) : brand.cat}</span>
          <Icon name="ChevronRight" size={12} />
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{lang === 'ar' ? brand.ar : brand.fr}</span>
        </nav>

        {/* Hero banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${brand.color}15 0%, ${brand.color}35 100%)`,
            borderRadius: 'var(--radius-lg)',
            padding: '32px 32px 28px',
            marginBottom: 28,
            border: `1px solid ${brand.color}25`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              insetInlineEnd: -40,
              width: 200,
              height: 200,
              background: brand.color,
              opacity: 0.06,
              borderRadius: '50%',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={80} radius={20} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>
                  {lang === 'ar' ? brand.ar : brand.fr}
                </h1>
                {brand.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--trust-soft)', color: 'var(--trust)', borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 600 }}>
                    <Icon name="BadgeCheck" size={14} />
                    {lang === 'ar' ? 'موثّق' : 'Vérifié'}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                {category && (
                  <span style={{ background: `${brand.color}20`, color: brand.color, borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>
                    {lang === 'ar' ? category.ar : category.fr}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0, lineHeight: 1.6, maxWidth: 600 }}>
                {lang === 'ar' ? brand.tag_ar : brand.tag_fr}
              </p>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(240px, 30%, 300px) 1fr', gap: 24 }}>
          {/* Left: Stats */}
          <div>
            {/* Trust score card */}
            <div
              className="glass-card"
              style={{ padding: 24, marginBottom: 16 }}
            >
              <TrustScore score={brand.score} lang={lang} size="lg" />
              <div style={{ marginTop: 10, marginBottom: 16 }}>
                <Stars score={brand.score} size={20} />
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                  {formatNumber(brand.reviews, lang)} {lang === 'ar' ? 'مراجعة' : 'avis'}
                </p>
              </div>
              <Distribution dist={brand.dist} />
              <Link
                href={`/brands/${brand.id}/review`}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  marginTop: 20,
                  padding: '12px 16px',
                  borderRadius: 12,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                <Icon name="PenLine" size={16} />
                {t('WRITE_REVIEW', lang)}
              </Link>
            </div>

            {/* Share link */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                {t('SHARE_LINK_TITLE', lang)}
              </h3>
              <div
                style={{
                  background: 'rgba(238,241,247,0.8)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 12,
                  color: 'var(--muted)',
                  marginBottom: 8,
                  wordBreak: 'break-all',
                }}
              >
                {shareLink}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: copied ? 'var(--trust-soft)' : 'rgba(61,130,222,0.08)',
                  border: `1px solid ${copied ? 'rgba(30,158,106,0.3)' : 'rgba(61,130,222,0.2)'}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: copied ? 'var(--trust)' : 'var(--accent)',
                  fontWeight: 600,
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <Icon name={copied ? 'Check' : 'Copy'} size={14} />
                {copied
                  ? (lang === 'ar' ? 'تم النسخ!' : 'Copié !')
                  : (lang === 'ar' ? 'نسخ الرابط' : 'Copier le lien')}
              </button>
            </div>
          </div>

          {/* Right: Reviews */}
          <div>
            {/* Filter tabs */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 16,
                overflowX: 'auto',
                paddingBottom: 4,
              }}
            >
              {[null, 5, 4, 3, 2, 1].map(r => (
                <button
                  key={r ?? 'all'}
                  onClick={() => setFilterRating(r)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: filterRating === r ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                    background: filterRating === r ? 'rgba(61,130,222,0.1)' : 'rgba(255,255,255,0.72)',
                    color: filterRating === r ? 'var(--accent)' : 'var(--muted)',
                    fontSize: 13,
                    fontWeight: filterRating === r ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {r === null ? (lang === 'ar' ? 'الكل' : 'Tout') : (
                    <>
                      {r}
                      <Icon name="Star" size={11} className="text-green-600" />
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Review list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                  <Icon name="SearchX" size={40} />
                  <p style={{ marginTop: 12 }}>{lang === 'ar' ? 'لا توجد مراجعات لهذا التقييم' : 'Aucun avis pour cette note'}</p>
                </div>
              ) : filteredReviews.map((review, idx) => {
                const reviewer = REVIEWERS[review.rev];
                return (
                  <div
                    key={idx}
                    className="glass-card stagger-item"
                    style={{ padding: 20 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initial={reviewer.i} color={reviewer.c} size={40} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                            {lang === 'ar' ? reviewer.n_ar : reviewer.n_fr}
                          </div>
                          <Stars score={review.rating} size={14} />
                        </div>
                      </div>
                      {review.verified && <Verified lang={lang} />}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
                      {lang === 'ar' ? review.textAr : review.textFr}
                    </p>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: '1px solid var(--line)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>
                        <Icon name="ThumbsUp" size={12} />
                        {lang === 'ar' ? 'مفيد' : 'Utile'} ({review.helpful})
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', fontSize: 12, color: 'var(--muted)', cursor: 'pointer', padding: '4px 8px' }}>
                        <Icon name="Flag" size={12} />
                        {lang === 'ar' ? 'إبلاغ' : 'Signaler'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
