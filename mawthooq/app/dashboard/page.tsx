import type { Metadata } from 'next';
import { DashboardView } from '@/components/dashboard/DashboardView';

export const metadata: Metadata = {
  title: "لوحة التحكم — موثوق | Tableau de bord — Mawthooq",
  description: "إدارة صفحة علامتك التجارية ومراجعاتها | Gérez votre profil marque et vos avis",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardView />;
}
