import type { Metadata } from 'next';
import { SignupFlow } from '@/components/signup/SignupFlow';

export const metadata: Metadata = {
  title: "أضف علامتك التجارية — موثوق | Inscrivez votre marque — Mawthooq",
  description: "أضف علامتك التجارية المغربية إلى منصة موثوق واحصل على مراجعات موثّقة | Inscrivez votre marque marocaine sur Mawthooq et recevez des avis vérifiés",
};

export default function SignupPage() {
  return <SignupFlow />;
}
