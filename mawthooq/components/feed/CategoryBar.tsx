'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@/components/ui/Icon';
import { CATEGORIES } from '@/lib/data';

interface CategoryBarProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function CategoryBar({ selected, onSelect }: CategoryBarProps) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 90,
        background: 'rgba(238,241,247,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
        padding: '0 20px',
      }}
    >
      <div
        ref={scrollRef}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          padding: '10px 0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {CATEGORIES.map(cat => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 100,
                border: isActive ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                background: isActive
                  ? 'linear-gradient(180deg, #70A8F2 0%, #3D82DE 100%)'
                  : 'rgba(255,255,255,0.72)',
                color: isActive ? '#fff' : 'var(--ink)',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s',
                boxShadow: isActive ? 'var(--shadow-float)' : 'none',
              }}
            >
              <Icon name={cat.icon} size={14} />
              {lang === 'ar' ? cat.ar : cat.fr}
            </button>
          );
        })}
      </div>
    </div>
  );
}
