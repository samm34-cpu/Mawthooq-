'use client';

import React from 'react';
import { Icon } from './Icon';
import type { Lang } from '@/lib/translations';

export function Verified({ lang }: { lang: Lang }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'var(--trust-soft)',
        color: 'var(--trust)',
        borderRadius: 6,
        padding: '2px 8px',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      <Icon name="BadgeCheck" size={12} />
      {lang === 'ar' ? 'عملية شراء موثّقة' : 'Achat vérifié'}
    </span>
  );
}
