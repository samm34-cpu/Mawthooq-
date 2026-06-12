import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBrandBySlug, BRANDS } from '@/lib/data';
import { BrandProfile } from '@/components/brand/BrandProfile';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found' };

  return {
    title: `${brand.ar} · ${brand.fr} — موثوق`,
    description: `${brand.reviews.toLocaleString()} مراجعة · تقييم ${brand.score}/5 — ${brand.tag_ar} | ${brand.tag_fr}`,
    openGraph: {
      title: `${brand.fr} sur Mawthooq`,
      description: `Note: ${brand.score}/5 · ${brand.reviews} avis vérifiés`,
    },
  };
}

export function generateStaticParams() {
  return BRANDS.map(brand => ({ slug: brand.id }));
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return <BrandProfile brand={brand} />;
}
