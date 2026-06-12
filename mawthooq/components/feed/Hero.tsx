'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@/components/ui/Icon';
import { t, T } from '@/lib/translations';

const QUICK_CHIPS_AR = ['مرجان', 'جوميا', 'اتصالات المغرب', 'CIH بنك', 'غلوفو'];
const QUICK_CHIPS_FR = ['Marjane', 'Jumia', 'Maroc Telecom', 'CIH Bank', 'Glovo'];

export function Hero() {
  const { lang } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = lang === 'ar' ? T.TYPEWRITER_AR : T.TYPEWRITER_FR;

  useEffect(() => {
    setDisplayText('');
    setCharIdx(0);
    setPhraseIdx(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === phrase.length) {
      delay = 2000;
    } else if (isDeleting && charIdx === 0) {
      delay = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < phrase.length) {
        setDisplayText(phrase.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!isDeleting && charIdx === phrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx > 0) {
        setDisplayText(phrase.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setPhraseIdx(i => (i + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, phrases]);

  const chips = lang === 'ar' ? QUICK_CHIPS_AR : QUICK_CHIPS_FR;

  return (
    <section
      style={{
        textAlign: 'center',
        padding: '64px 20px 48px',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--trust-soft)',
          border: '1px solid rgba(30,158,106,0.2)',
          borderRadius: 100,
          padding: '6px 16px',
          marginBottom: 28,
          fontSize: 13,
          color: 'var(--trust)',
          fontWeight: 600,
        }}
      >
        <Icon name="ShieldCheck" size={14} />
        {t('HERO_BADGE', lang)}
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 800,
          color: 'var(--ink)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}
      >
        {t('HERO_TITLE', lang)}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(15px, 2.5vw, 18px)',
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: 40,
          maxWidth: 480,
          marginInline: 'auto',
        }}
      >
        {t('HERO_SUB', lang)}
      </p>

      {/* Typewriter search */}
      <div
        style={{
          maxWidth: 560,
          margin: '0 auto 24px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            insetInlineStart: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted)',
            pointerEvents: 'none',
          }}
        >
          <Icon name="Search" size={20} />
        </div>
        <div
          style={{
            width: '100%',
            height: 56,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(61,130,222,0.3)',
            borderRadius: 16,
            paddingInlineStart: 52,
            paddingInlineEnd: 20,
            fontSize: 16,
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 24px rgba(61,130,222,0.12)',
          }}
        >
          <span style={{ opacity: displayText ? 1 : 0.4 }}>
            {displayText || t('SEARCH_PLACEHOLDER', lang)}
          </span>
          <span className="typewriter-cursor" style={{ marginInlineStart: 2 }} />
        </div>
      </div>

      {/* Quick chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--muted)', alignSelf: 'center' }}>
          {lang === 'ar' ? 'الأكثر بحثاً:' : 'Tendances:'}
        </span>
        {chips.map(chip => (
          <button
            key={chip}
            style={{
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid var(--line)',
              borderRadius: 100,
              padding: '5px 14px',
              fontSize: 13,
              color: 'var(--ink)',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(17,34,58,0.06)';
              el.style.borderColor = 'rgba(17,34,58,0.2)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.72)';
              el.style.borderColor = 'var(--line)';
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Brand CTA */}
      <div style={{
        marginTop: 40,
        padding: '18px 24px',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-card)',
        maxWidth: 560,
        marginInline: 'auto',
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>
            {lang === 'ar' ? '🏢 أنت صاحب علامة تجارية؟' : '🏢 Vous êtes une marque ?'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {lang === 'ar' ? 'أضف نشاطك واجمع آراء عملائك' : 'Inscrivez votre marque et collectez des avis clients'}
          </div>
        </div>
        <Link
          href="/signup"
          className="btn-primary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 10, fontSize: 13,
            fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          <Icon name="Store" size={14} />
          {lang === 'ar' ? 'أضف علامتك' : 'Inscrire ma marque'}
        </Link>
      </div>
    </section>
  );
}
