import { notFound } from 'next/navigation';
import { getBrandBySlug, BRANDS } from '@/lib/data';
import { WriteReviewFlow } from '@/components/review/WriteReviewFlow';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  return {
    title: `اكتب مراجعة · ${brand.ar} — موثوق`,
    description: `شارك تجربتك مع ${brand.ar} | Partagez votre expérience avec ${brand.fr}`,
  };
}

export function generateStaticParams() {
  return BRANDS.map(b => ({ slug: b.id }));
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return <WriteReviewFlow brand={brand} />;
}
