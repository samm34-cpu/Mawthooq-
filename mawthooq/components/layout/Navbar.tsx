'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@/components/ui/Icon';
import { t } from '@/lib/translations';

export function Navbar() {
  const { lang, toggle, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        borderBottom: `1px solid ${scrolled ? 'rgba(34,106,205,0.12)' : 'rgba(255,255,255,0.5)'}`,
        boxShadow: scrolled ? '0 2px 20px rgba(17,49,93,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: '#11223A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 16,
              fontWeight: 800,
              fontFamily: 'var(--font-ar)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            م
          </div>
          <span
            style={{
              color: 'var(--ink)',
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: '-0.02em',
              fontFamily: lang === 'ar' ? 'var(--font-ar)' : 'var(--font-fr)',
            }}
          >
            {lang === 'ar' ? 'موثوق' : 'Mawthooq'}
          </span>
        </Link>

        {/* Search */}
        <div
          style={{
            flex: 1,
            maxWidth: 420,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              insetInlineStart: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
              pointerEvents: 'none',
            }}
          >
            <Icon name="Search" size={16} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('SEARCH_PLACEHOLDER', lang)}
            style={{
              width: '100%',
              height: 38,
              background: 'rgba(238,241,247,0.8)',
              border: '1px solid var(--line)',
              borderRadius: 10,
              paddingInlineStart: 38,
              paddingInlineEnd: 12,
              fontSize: 14,
              color: 'var(--ink)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(17,34,58,0.35)';
              e.target.style.boxShadow = '0 0 0 3px rgba(17,34,58,0.07)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--line)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Language toggle */}
        <button
          onClick={toggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(17,34,58,0.06)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: '6px 12px',
            cursor: 'pointer',
            color: 'var(--ink)',
            fontSize: 13,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(17,34,58,0.10)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(17,34,58,0.06)';
          }}
        >
          <Icon name="Languages" size={14} />
          {lang === 'ar' ? 'FR' : 'AR'}
        </button>

        {/* Write review */}
        <Link
          href="/review"
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="PenLine" size={14} />
          <span className="hidden sm:inline">{t('WRITE_REVIEW', lang)}</span>
        </Link>

        {/* Brand login */}
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(17,34,58,0.06)',
            border: '1px solid var(--line)',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            color: 'var(--ink)',
            flexShrink: 0,
          }}
        >
          <Icon name="Store" size={14} />
          <span className="hidden md:inline">{lang === 'ar' ? 'للعلامات التجارية' : 'Marques'}</span>
        </Link>
      </div>
    </header>
  );
}
