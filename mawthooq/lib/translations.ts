export type Lang = 'ar' | 'fr';

export const T = {
  HERO_TITLE: {
    ar: "اعرف رأي الناس قبل ما تشتري",
    fr: "Consultez les avis avant d'acheter",
  },
  HERO_SUB: {
    ar: "تجارب حقيقية بالصور والفيديو من عملاء موثّقين",
    fr: "Avis vérifiés avec photos et vidéos de clients authentiques",
  },
  HERO_BADGE: {
    ar: "مراجعات موثّقة لأكثر من ١٢٠٠ علامة تجارية مغربية",
    fr: "Avis vérifiés pour plus de 1200 marques marocaines",
  },
  SEARCH_PLACEHOLDER: {
    ar: "ابحث عن علامة تجارية...",
    fr: "Rechercher une marque...",
  },
  WRITE_REVIEW: {
    ar: "اكتب مراجعة",
    fr: "Écrire un avis",
  },
  CATEGORIES_TITLE: {
    ar: "التصنيفات",
    fr: "Catégories",
  },
  SORT_TOP_RATED: {
    ar: "الأعلى تقييمًا",
    fr: "Mieux notés",
  },
  SORT_MOST_REVIEWED: {
    ar: "الأكثر مراجعةً",
    fr: "Plus d'avis",
  },
  SORT_NEWEST: {
    ar: "الأحدث",
    fr: "Récents",
  },
  SCORE_EXCELLENT: {
    ar: "ممتاز",
    fr: "Excellent",
  },
  SCORE_VERY_GOOD: {
    ar: "جيد جدًا",
    fr: "Très bien",
  },
  SCORE_GOOD: {
    ar: "جيد",
    fr: "Bien",
  },
  SCORE_AVERAGE: {
    ar: "مقبول",
    fr: "Passable",
  },
  SCORE_POOR: {
    ar: "ضعيف",
    fr: "Mauvais",
  },
  VERIFIED_PURCHASE: {
    ar: "عملية شراء موثّقة",
    fr: "Achat vérifié",
  },
  HELPFUL: {
    ar: "مفيد",
    fr: "Utile",
  },
  VIEW_PROFILE: {
    ar: "عرض الصفحة",
    fr: "Voir le profil",
  },
  BRAND_SIGNUP_TITLE: {
    ar: "أضف علامتك التجارية",
    fr: "Inscrivez votre marque",
  },
  DASHBOARD_TITLE: {
    ar: "لوحة التحكم",
    fr: "Tableau de bord",
  },
  SHARE_LINK_TITLE: {
    ar: "رابط المراجعة للعملاء",
    fr: "Lien d'avis pour vos clients",
  },
  FOOTER_TEXT: {
    ar: "موثوق منصة مستقلة لمراجعات العلامات التجارية المغربية — كل مراجعة تمر بالتحقق قبل النشر.",
    fr: "Mawthooq est une plateforme indépendante d'avis sur les marques marocaines — chaque avis est vérifié avant publication.",
  },
  REVIEWS_COUNT: {
    ar: (n: number) => `${n.toLocaleString('ar-MA')} مراجعة`,
    fr: (n: number) => `${n.toLocaleString('fr-FR')} avis`,
  },
  TYPEWRITER_AR: [
    "ابحث عن متجر موثوق في المغرب",
    "تجربتي مع مرجان",
    "هل غلوفو سريع؟",
    "أفضل بنك رقمي في ٢٠٢٦",
    "هل جوميا موثوقة؟",
  ],
  TYPEWRITER_FR: [
    "Trouvez une marque de confiance",
    "Mon expérience avec Jumia",
    "Glovo est-il rapide ?",
    "Meilleure banque digitale",
    "Maroc Telecom fiable ?",
  ],
} as const;

export function t(key: keyof typeof T, lang: Lang): string {
  const val = T[key];
  if (typeof val === 'object' && 'ar' in val && 'fr' in val) {
    const result = val[lang];
    if (typeof result === 'string') return result;
  }
  return key;
}
