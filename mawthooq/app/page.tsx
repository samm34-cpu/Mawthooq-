import type { Metadata } from 'next';
import { HomeClient } from '@/components/feed/HomeClient';

export const metadata: Metadata = {
  title: "موثوق · Mawthooq — مراجعات العلامات التجارية المغربية",
  description: "موثوق — منصة مراجعات مستقلة للعلامات التجارية المغربية. تجارب حقيقية بالصور والفيديو من عملاء موثّقين. | Mawthooq — plateforme d'avis indépendante pour les marques marocaines.",
  keywords: "مراجعات المغرب, تقييم العلامات التجارية, Maroc avis, مراجعات موثوقة, trustpilot maroc",
  openGraph: {
    title: "موثوق · Mawthooq",
    description: "منصة مراجعات مستقلة للعلامات التجارية المغربية | Plateforme d'avis pour les marques marocaines",
    type: "website",
    locale: "ar_MA",
  },
  alternates: {
    languages: {
      'ar-MA': '/?lang=ar',
      'fr-MA': '/?lang=fr',
    }
  }
};

export default function HomePage() {
  return <HomeClient />;
}
