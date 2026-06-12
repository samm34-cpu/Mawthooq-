import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-lang="ar">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
