import type { Metadata } from 'next';
import { BRANDS } from '@/lib/data';
import { WriteReviewFlow } from '@/components/review/WriteReviewFlow';

interface Props {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "اترك مراجعتك — موثوق | Laissez votre avis — Mawthooq",
  description: "شارك تجربتك الحقيقية | Partagez votre expérience réelle",
};

function getBrandFromToken(token: string) {
  const idx = token.charCodeAt(0) % BRANDS.length;
  return BRANDS[idx];
}

export default async function ShareableLinkPage({ params }: Props) {
  const { token } = await params;
  const brand = getBrandFromToken(token);

  return <WriteReviewFlow brand={brand} invitedBy={brand.en} />;
}
