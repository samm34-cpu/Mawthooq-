import type { Metadata } from 'next';
import { BrandSelectClient } from './BrandSelectClient';

export const metadata: Metadata = {
  title: "اكتب مراجعة · Écrire un avis — موثوق Mawthooq",
  description: "اختر العلامة التجارية التي تريد تقييمها | Choisissez la marque que vous souhaitez évaluer",
  robots: { index: false },
};

export default function ReviewSelectPage() {
  return <BrandSelectClient />;
}
