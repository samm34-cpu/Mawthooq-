'use client';

import React, { useState } from 'react';
import { BrandCard } from '@/components/cards/BrandCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { MediaCard } from '@/components/cards/MediaCard';
import { BrandDetail } from '@/components/lightbox/BrandDetail';
import { ReviewDetail } from '@/components/lightbox/ReviewDetail';
import { BRANDS, FEED, getBrandById } from '@/lib/data';
import type { Brand } from '@/lib/data';
import type { Lang } from '@/lib/translations';

interface FeedProps {
  lang: Lang;
  category: string;
}

type LightboxState =
  | { type: 'brand'; brand: Brand }
  | { type: 'review'; brand: Brand; revIdx: number; rating: number; textAr: string; textFr: string; helpful: number; verified?: boolean; hasMedia?: boolean; ratio?: number; hue?: number; isVideo?: boolean; label?: string }
  | null;

export function Feed({ lang, category }: FeedProps) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const items = category === 'all'
    ? FEED
    : FEED.filter(item => {
        const brand = getBrandById(item.brand);
        return brand?.cat === category;
      });

  return (
    <>
      <div className="masonry-grid">
        {items.map((item, idx) => {
          const brand = getBrandById(item.brand);
          if (!brand) return null;

          if (item.kind === 'brand') {
            return (
              <BrandCard
                key={`brand-${idx}`}
                brand={brand}
                lang={lang}
                onClick={() => setLightbox({ type: 'brand', brand })}
              />
            );
          }

          if (item.kind === 'review') {
            const ri = item as typeof FEED[2];
            return (
              <ReviewCard
                key={`review-${idx}`}
                brand={brand}
                revIdx={ri.rev ?? 0}
                rating={ri.rating ?? 4}
                textAr={ri.text_ar ?? ''}
                textFr={ri.text_fr ?? ''}
                helpful={ri.helpful ?? 0}
                verified={'verified' in ri ? ri.verified as boolean : false}
                lang={lang}
                onClick={() => setLightbox({
                  type: 'review',
                  brand,
                  revIdx: ri.rev ?? 0,
                  rating: ri.rating ?? 4,
                  textAr: ri.text_ar ?? '',
                  textFr: ri.text_fr ?? '',
                  helpful: ri.helpful ?? 0,
                  verified: 'verified' in ri ? ri.verified as boolean : false,
                })}
              />
            );
          }

          if (item.kind === 'media') {
            const mi = item as typeof FEED[0];
            return (
              <MediaCard
                key={`media-${idx}`}
                brand={brand}
                revIdx={mi.rev ?? 0}
                rating={mi.rating ?? 4}
                ratio={mi.ratio ?? 1}
                hue={mi.hue ?? 200}
                isVideo={mi.video ?? false}
                label={mi.label ?? ''}
                textAr={mi.text_ar ?? ''}
                textFr={mi.text_fr ?? ''}
                helpful={mi.helpful ?? 0}
                lang={lang}
                onClick={() => setLightbox({
                  type: 'review',
                  brand,
                  revIdx: mi.rev ?? 0,
                  rating: mi.rating ?? 4,
                  textAr: mi.text_ar ?? '',
                  textFr: mi.text_fr ?? '',
                  helpful: mi.helpful ?? 0,
                  hasMedia: true,
                  ratio: mi.ratio,
                  hue: mi.hue,
                  isVideo: mi.video,
                  label: mi.label,
                })}
              />
            );
          }

          return null;
        })}
      </div>

      {/* Lightboxes */}
      {lightbox?.type === 'brand' && (
        <BrandDetail
          brand={lightbox.brand}
          lang={lang}
          onClose={() => setLightbox(null)}
        />
      )}
      {lightbox?.type === 'review' && (
        <ReviewDetail
          brand={lightbox.brand}
          revIdx={lightbox.revIdx}
          rating={lightbox.rating}
          textAr={lightbox.textAr}
          textFr={lightbox.textFr}
          helpful={lightbox.helpful}
          verified={lightbox.verified}
          hasMedia={lightbox.hasMedia}
          ratio={lightbox.ratio}
          hue={lightbox.hue}
          isVideo={lightbox.isVideo}
          label={lightbox.label}
          lang={lang}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
