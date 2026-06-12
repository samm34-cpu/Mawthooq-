'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Monogram } from '@/components/ui/Monogram';
import { Stars } from '@/components/ui/Stars';
import { TrustScore } from '@/components/ui/TrustScore';
import { Avatar } from '@/components/ui/Avatar';
import { Verified } from '@/components/ui/Verified';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { BRANDS, REVIEWERS } from '@/lib/data';
import { t } from '@/lib/translations';
import { formatNumber } from '@/lib/utils';

// Mock brand for the dashboard
const DASHBOARD_BRAND = BRANDS.find(b => b.id === 'jumia')!;
const SHARE_LINK = 'https://mawthooq.ma/r/abc123';

const STATS = [
  { labelAr: 'إجمالي المراجعات', labelFr: 'Total des avis', value: '23,4K', icon: 'Star', color: '#3D82DE' },
  { labelAr: 'متوسط التقييم', labelFr: 'Note moyenne', value: '3.5', icon: 'Sparkles', color: '#1E9E6A' },
  { labelAr: 'هذا الشهر', labelFr: 'Ce mois', value: '+847', icon: 'Plus', color: '#9b59b6' },
  { labelAr: 'معدل الرد', labelFr: 'Taux de réponse', value: '68%', icon: 'BadgeCheck', color: '#e67e22' },
];

const RECENT_REVIEWS = [
  { rating: 5, textAr: "التوصيل وصل في اليوم نفسه! المنتج أصلي 100%.", textFr: "La livraison est arrivée le jour même ! Produit 100% authentique.", rev: 0, helpful: 34, verified: true },
  { rating: 4, textAr: "خدمة ممتازة لكن الشحن استغرق يومين.", textFr: "Service excellent mais la livraison a pris deux jours.", rev: 1, helpful: 21, verified: false },
  { rating: 5, textAr: "أفضل تجربة تسوق إلكتروني في المغرب!", textFr: "Meilleure expérience d'achat en ligne au Maroc !", rev: 2, helpful: 89, verified: true },
  { rating: 3, textAr: "المنتج جيد لكن التغليف كان تالفاً بعض الشيء.", textFr: "Produit correct mais l'emballage était légèrement endommagé.", rev: 3, helpful: 12, verified: false },
  { rating: 2, textAr: "الدعم الفني لا يرد بسرعة كافية. كنت أتوقع أفضل.", textFr: "Le support technique est lent à répondre. Je m'attendais à mieux.", rev: 4, helpful: 7, verified: false },
];

export function DashboardView() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(SHARE_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Welcome header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
            <Monogram letter={DASHBOARD_BRAND.mono} color={DASHBOARD_BRAND.color} ink={DASHBOARD_BRAND.ink} size={52} radius={14} />
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                {lang === 'ar'
                  ? `مرحبًا، ${DASHBOARD_BRAND.ar} 👋`
                  : `Bienvenue, ${DASHBOARD_BRAND.fr} 👋`}
              </h1>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '4px 0 0' }}>
                {t('DASHBOARD_TITLE', lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card stagger-item"
              style={{ padding: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
                  {lang === 'ar' ? stat.labelAr : stat.labelFr}
                </span>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${stat.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                  }}
                >
                  <Icon name={stat.icon} size={16} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
          {/* Main: Recent reviews */}
          <div>
            <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  {lang === 'ar' ? 'آخر المراجعات' : 'Avis récents'}
                </h2>
                <Link
                  href={`/brands/${DASHBOARD_BRAND.id}`}
                  style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
                >
                  {lang === 'ar' ? 'عرض الكل' : 'Voir tout'}
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RECENT_REVIEWS.map((review, idx) => {
                  const reviewer = REVIEWERS[review.rev];
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 16px',
                        background: 'rgba(238,241,247,0.6)',
                        borderRadius: 12,
                        border: '1px solid var(--line)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar initial={reviewer.i} color={reviewer.c} size={32} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                              {lang === 'ar' ? reviewer.n_ar : reviewer.n_fr}
                            </div>
                            <Stars score={review.rating} size={12} />
                          </div>
                        </div>
                        {review.verified && <Verified lang={lang} />}
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                        {lang === 'ar' ? review.textAr : review.textFr}
                      </p>
                      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            fontSize: 12,
                            color: 'var(--accent)',
                            background: 'rgba(61,130,222,0.08)',
                            border: '1px solid rgba(61,130,222,0.2)',
                            borderRadius: 6,
                            padding: '4px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          {lang === 'ar' ? 'رد' : 'Répondre'}
                        </button>
                        <button
                          style={{
                            fontSize: 12,
                            color: 'var(--muted)',
                            background: 'none',
                            border: '1px solid var(--line)',
                            borderRadius: 6,
                            padding: '4px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          {lang === 'ar' ? 'إبلاغ' : 'Signaler'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Complete profile prompt */}
            <div
              style={{
                padding: 20,
                background: 'linear-gradient(135deg, rgba(61,130,222,0.08) 0%, rgba(30,158,106,0.08) 100%)',
                border: '1px solid rgba(61,130,222,0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                  {lang === 'ar' ? 'أكمل ملفك التجاري 🚀' : 'Complétez votre profil 🚀'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                  {lang === 'ar' ? 'أضف صورة وشعار لزيادة المصداقية' : 'Ajoutez une photo et un logo pour plus de crédibilité'}
                </div>
              </div>
              <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13 }}>
                {lang === 'ar' ? 'إكمال الملف' : 'Compléter'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Brand profile preview */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                {lang === 'ar' ? 'معاينة الصفحة' : 'Aperçu du profil'}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Monogram letter={DASHBOARD_BRAND.mono} color={DASHBOARD_BRAND.color} ink={DASHBOARD_BRAND.ink} size={44} radius={11} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                    {lang === 'ar' ? DASHBOARD_BRAND.ar : DASHBOARD_BRAND.fr}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {lang === 'ar' ? DASHBOARD_BRAND.tag_ar : DASHBOARD_BRAND.tag_fr}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <TrustScore score={DASHBOARD_BRAND.score} lang={lang} size="sm" />
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Stars score={DASHBOARD_BRAND.score} size={13} />
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {formatNumber(DASHBOARD_BRAND.reviews, lang)} {lang === 'ar' ? 'مراجعة' : 'avis'}
                  </span>
                </div>
              </div>
              <Link
                href={`/brands/${DASHBOARD_BRAND.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  fontSize: 13,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  background: 'rgba(61,130,222,0.05)',
                }}
              >
                <Icon name="ExternalLink" size={13} />
                {lang === 'ar' ? 'عرض الصفحة العامة' : 'Voir page publique'}
              </Link>
            </div>

            {/* Shareable link */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                {t('SHARE_LINK_TITLE', lang)}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
                {lang === 'ar'
                  ? 'شارك هذا الرابط مع عملائك لجمع المراجعات'
                  : 'Partagez ce lien avec vos clients pour collecter des avis'}
              </p>
              <div
                style={{
                  background: 'rgba(238,241,247,0.8)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 12,
                  color: 'var(--muted)',
                  marginBottom: 10,
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                }}
              >
                {SHARE_LINK}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleCopy}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '8px 12px',
                    background: copied ? 'var(--trust-soft)' : 'rgba(61,130,222,0.08)',
                    border: `1px solid ${copied ? 'rgba(30,158,106,0.3)' : 'rgba(61,130,222,0.2)'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    color: copied ? 'var(--trust)' : 'var(--accent)',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon name={copied ? 'Check' : 'Copy'} size={13} />
                  {copied ? (lang === 'ar' ? 'تم!' : 'Copié!') : (lang === 'ar' ? 'نسخ' : 'Copier')}
                </button>
                <button
                  onClick={() => setShowQR(!showQR)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 12px',
                    background: showQR ? 'rgba(61,130,222,0.1)' : 'rgba(238,241,247,0.8)',
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    color: 'var(--ink)',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon name="QrCode" size={13} />
                  QR
                </button>
              </div>

              {/* QR placeholder */}
              {showQR && (
                <div
                  style={{
                    marginTop: 14,
                    padding: 16,
                    background: 'rgba(238,241,247,0.8)',
                    borderRadius: 12,
                    border: '1px solid var(--line)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      margin: '0 auto 10px',
                      background: `
                        repeating-linear-gradient(0deg, #11315D 0, #11315D 4px, transparent 4px, transparent 8px),
                        repeating-linear-gradient(90deg, #11315D 0, #11315D 4px, transparent 4px, transparent 8px)
                      `,
                      backgroundSize: '8px 8px',
                      opacity: 0.15,
                      borderRadius: 8,
                      position: 'relative',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 1,
                    }}>
                      <Icon name="QrCode" size={64} style={{ color: 'var(--ink)', opacity: 0.5 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {lang === 'ar' ? 'رمز QR لرابط المراجعة' : 'QR Code du lien d\'avis'}
                  </div>
                  <button
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      color: 'var(--accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {lang === 'ar' ? 'تنزيل PNG' : 'Télécharger PNG'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                {lang === 'ar' ? 'روابط سريعة' : 'Raccourcis'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: 'Share2', labelAr: 'دعوة عملاء', labelFr: 'Inviter des clients', href: '#' },
                  { icon: 'PenLine', labelAr: 'تعديل الملف', labelFr: 'Modifier le profil', href: '/signup' },
                  { icon: 'ExternalLink', labelAr: 'الصفحة العامة', labelFr: 'Page publique', href: `/brands/${DASHBOARD_BRAND.id}` },
                ].map(link => (
                  <Link
                    key={link.labelAr}
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 13,
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      background: 'rgba(238,241,247,0.5)',
                      border: '1px solid var(--line)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(61,130,222,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(238,241,247,0.5)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                  >
                    <Icon name={link.icon} size={14} />
                    {lang === 'ar' ? link.labelAr : link.labelFr}
                    <Icon name="ChevronRight" size={12} style={{ marginInlineStart: 'auto', color: 'var(--muted)' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
