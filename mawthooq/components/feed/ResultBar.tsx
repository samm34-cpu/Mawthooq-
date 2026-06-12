'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';

interface ResultBarProps {
  count: number;
  sort: string;
  onSort: (s: string) => void;
}

export function ResultBar({ count, sort, onSort }: ResultBarProps) {
  const { lang } = useLanguage();

  const sorts = [
    { id: 'top', label: t('SORT_TOP_RATED', lang) },
    { id: 'most', label: t('SORT_MOST_REVIEWED', lang) },
    { id: 'new', label: t('SORT_NEWEST', lang) },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <p style={{ fontSize: 14, color: 'var(--muted)' }}>
        {lang === 'ar' ? `${count} نتيجة` : `${count} résultats`}
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        {sorts.map(s => (
          <button
            key={s.id}
            onClick={() => onSort(s.id)}
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              border: sort === s.id ? '1px solid var(--accent)' : '1px solid var(--line)',
              background: sort === s.id ? 'rgba(61,130,222,0.1)' : 'transparent',
              color: sort === s.id ? 'var(--accent)' : 'var(--muted)',
              fontSize: 13,
              fontWeight: sort === s.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
