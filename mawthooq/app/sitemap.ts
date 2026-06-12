import type { MetadataRoute } from 'next';
import { BRANDS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mawthooq.ma';

  const brandPages = BRANDS.map(brand => ({
    url: `${base}/brands/${brand.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...brandPages,
  ];
}
