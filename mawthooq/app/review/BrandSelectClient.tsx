'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Monogram } from '@/components/ui/Monogram';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { BRANDS, CATEGORIES } from '@/lib/data';
import type { Brand } from '@/lib/data';

export function BrandSelectClient() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = BRANDS.filter(b => {
    const matchesCat = selectedCat === 'all' || b.cat === selectedCat;
    const q = query.toLowerCase();
    const matchesQuery = !q || b.ar.includes(query) || b.fr.toLowerCase().includes(q) || b.en.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleSelect = (brand: Brand) => {
    router.push(`/brands/${brand.id}/review`);
  };

  const scoreColor = (s: number) => s >= 4.0 ? 'var(--trust)' : s >= 3.0 ? '#C79A2E' : '#D0473C';

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(17,34,58,0.06)', border: '1px solid var(--line)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 16,
            fontSize: 13, fontWeight: 600, color: 'var(--muted)',
          }}>
            <Icon name="PenLine" size={13} />
            {lang === 'ar' ? 'كتابة مراجعة' : 'Écrire un avis'}
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {lang === 'ar' ? 'عن أي علامة تجارية تريد الكتابة؟' : 'Quelle marque souhaitez-vous évaluer ?'}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0 }}>
            {lang === 'ar' ? 'ابحث أو اختر من القائمة أدناه' : 'Recherchez ou choisissez dans la liste ci-dessous'}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <div style={{ position: 'absolute', insetInlineStart: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>
            <Icon name="Search" size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            placeholder={lang === 'ar' ? 'ابحث عن علامة تجارية...' : 'Rechercher une marque...'}
            style={{
              width: '100%', height: 52,
              background: 'rgba(255,255,255,0.85)',
              border: '1.5px solid var(--line)',
              borderRadius: 14,
              paddingInlineStart: 48, paddingInlineEnd: 16,
              fontSize: 15, color: 'var(--ink)',
              outline: 'none', fontFamily: 'inherit',
              boxShadow: 'var(--shadow-card)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(17,34,58,0.35)';
              e.target.style.boxShadow = '0 0 0 3px rgba(17,34,58,0.07)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--line)';
              e.target.style.boxShadow = 'var(--shadow-card)';
            }}
          />
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', marginBottom: 24 }}>
          {CATEGORIES.map(cat => {
            const active = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px', borderRadius: 100, flexShrink: 0,
                  background: active ? '#11223A' : 'rgba(255,255,255,0.72)',
                  color: active ? '#fff' : 'var(--ink)',
                  border: '1px solid var(--line)',
                  fontSize: 12, fontWeight: active ? 600 : 500,
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  boxShadow: active ? '0 4px 14px rgba(0,0,0,0.18)' : 'none',
                }}
              >
                <Icon name={cat.icon} size={12} />
                {lang === 'ar' ? cat.ar : cat.fr}
              </button>
            );
          })}
        </div>

        {/* Brand list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <Icon name="SearchX" size={36} style={{ margin: '0 auto 12px', display: 'block' }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
              {lang === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
            </div>
            <div style={{ fontSize: 13 }}>
              {lang === 'ar' ? 'جرّب كلمة بحث أخرى' : 'Essayez un autre terme de recherche'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(brand => (
              <button
                key={brand.id}
                onClick={() => handleSelect(brand)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px',
                  background: 'rgba(255,255,255,0.82)',
                  border: '1px solid var(--line)',
                  borderRadius: 14, cursor: 'pointer',
                  textAlign: 'start', width: '100%',
                  transition: 'all 0.2s',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lift)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(17,34,58,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.82)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={44} radius={12} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>
                    {lang === 'ar' ? brand.ar : brand.fr}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lang === 'ar' ? brand.tag_ar : brand.tag_fr}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: scoreColor(brand.score) }}>{brand.score.toFixed(1)}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>/ 5</span>
                </div>
                <Icon name="ChevronRight" size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
