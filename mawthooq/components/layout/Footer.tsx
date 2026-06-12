'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';

export function Footer() {
  const { lang } = useLanguage();

  const links = lang === 'ar'
    ? [
        { label: 'من نحن', href: '#' },
        { label: 'سياسة الخصوصية', href: '#' },
        { label: 'شروط الاستخدام', href: '#' },
        { label: 'اتصل بنا', href: '#' },
        { label: 'للعلامات التجارية', href: '/signup' },
      ]
    : [
        { label: 'À propos', href: '#' },
        { label: 'Confidentialité', href: '#' },
        { label: "Conditions d'utilisation", href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Pour les marques', href: '/signup' },
      ];

  return (
    <footer
      style={{
        marginTop: 80,
        background: 'rgba(17,49,93,0.03)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 20px 32px',
        }}
      >
        {/* Logo + description */}
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #3D82DE 0%, #1E9E6A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 14,
                fontWeight: 800,
                fontFamily: 'var(--font-ar)',
              }}
            >
              م
            </div>
            <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: 16 }}>
              {lang === 'ar' ? 'موثوق' : 'Mawthooq'}
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            {t('FOOTER_TEXT', lang)}
          </p>
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 24px',
            marginBottom: 32,
            paddingBottom: 32,
            borderBottom: '1px solid var(--line)',
          }}
        >
          {links.map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--muted-2)' }}>
            © 2026 Mawthooq · موثوق
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted-2)' }}>
            {lang === 'ar' ? 'صُنع بـ ❤️ في المغرب' : 'Fait avec ❤️ au Maroc'}
          </p>
        </div>
      </div>
    </footer>
  );
}
