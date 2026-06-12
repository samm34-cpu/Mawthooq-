'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from './Hero';
import { CategoryBar } from './CategoryBar';
import { ResultBar } from './ResultBar';
import { Feed } from './Feed';
import { useLanguage } from '@/contexts/LanguageContext';
import { FEED, getBrandById } from '@/lib/data';

export function HomeClient() {
  const { lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('top');

  const count = category === 'all'
    ? FEED.length
    : FEED.filter(item => getBrandById(item.brand)?.cat === category).length;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryBar selected={category} onSelect={setCategory} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <ResultBar count={count} sort={sort} onSort={setSort} />
          <Feed lang={lang} category={category} />
        </div>
      </main>
      <Footer />
    </>
  );
}
