export const BRANDS = [
  { id: "marjane", en: "Marjane", ar: "مرجان", fr: "Marjane", mono: "M", cat: "retail", color: "#E8001D", ink: "#fff", score: 3.8, reviews: 14200, verified: true, dist: [48, 24, 12, 8, 8], tag_ar: "أكبر سلسلة هايبرماركت في المغرب", tag_fr: "La plus grande chaîne d'hypermarchés au Maroc" },
  { id: "attijariwafa", en: "Attijariwafa Bank", ar: "التجاري وفا بنك", fr: "Attijariwafa Bank", mono: "A", cat: "banking", color: "#C8102E", ink: "#fff", score: 4.1, reviews: 21000, verified: true, dist: [58, 22, 10, 5, 5], tag_ar: "أكبر بنك في المغرب", tag_fr: "La plus grande banque du Maroc" },
  { id: "iam", en: "Maroc Telecom", ar: "اتصالات المغرب", fr: "Maroc Telecom", mono: "ا", cat: "telecom", color: "#009900", ink: "#fff", score: 3.6, reviews: 18500, verified: true, dist: [44, 22, 16, 9, 9], tag_ar: "المشغّل الوطني للاتصالات", tag_fr: "Opérateur national de télécommunications" },
  { id: "inwi", en: "inwi", ar: "إنوي", fr: "inwi", mono: "i", cat: "telecom", color: "#6B0089", ink: "#fff", score: 3.9, reviews: 12300, verified: true, dist: [52, 21, 13, 7, 7], tag_ar: "شبكة الجيل الخامس", tag_fr: "Réseau 5G au Maroc" },
  { id: "orange", en: "Orange Maroc", ar: "أورنج المغرب", fr: "Orange Maroc", mono: "O", cat: "telecom", color: "#FF7900", ink: "#fff", score: 4.0, reviews: 15800, verified: true, dist: [55, 23, 11, 6, 5], tag_ar: "اتصالات وإنترنت وحلول رقمية", tag_fr: "Télécoms, internet et solutions numériques" },
  { id: "bmce", en: "Bank of Africa", ar: "بنك أفريقيا", fr: "Bank of Africa", mono: "B", cat: "banking", color: "#003087", ink: "#fff", score: 3.9, reviews: 9800, verified: true, dist: [52, 22, 12, 7, 7], tag_ar: "بنك أفريقيا للأعمال والأفراد", tag_fr: "Banque pour particuliers et entreprises" },
  { id: "cih", en: "CIH Bank", ar: "بنك سي آي اش", fr: "CIH Bank", mono: "C", cat: "banking", color: "#00A0DC", ink: "#fff", score: 4.2, reviews: 8200, verified: true, dist: [60, 21, 9, 5, 5], tag_ar: "البنك الرقمي الأول في المغرب", tag_fr: "La banque digitale numéro 1 au Maroc" },
  { id: "jumia", en: "Jumia Maroc", ar: "جوميا المغرب", fr: "Jumia Maroc", mono: "J", cat: "ecommerce", color: "#F68B1E", ink: "#fff", score: 3.5, reviews: 23400, verified: true, dist: [42, 22, 16, 10, 10], tag_ar: "أكبر منصة تجارة إلكترونية في أفريقيا", tag_fr: "La plus grande plateforme e-commerce d'Afrique" },
  { id: "avito", en: "Avito.ma", ar: "أفيتو", fr: "Avito.ma", mono: "a", cat: "ecommerce", color: "#00A651", ink: "#fff", score: 4.0, reviews: 17600, verified: true, dist: [56, 23, 11, 5, 5], tag_ar: "إعلانات البيع والشراء في المغرب", tag_fr: "Petites annonces au Maroc" },
  { id: "glovo", en: "Glovo Maroc", ar: "غلوفو المغرب", fr: "Glovo Maroc", mono: "G", cat: "food", color: "#FFC244", ink: "#1a1a1a", score: 3.7, reviews: 19200, verified: true, dist: [47, 23, 14, 8, 8], tag_ar: "توصيل الطعام والبضائع في دقائق", tag_fr: "Livraison de repas et courses en quelques minutes" },
  { id: "carrefour", en: "Carrefour Maroc", ar: "كارفور المغرب", fr: "Carrefour Maroc", mono: "C", cat: "retail", color: "#004B98", ink: "#fff", score: 4.1, reviews: 11400, verified: true, dist: [58, 22, 10, 5, 5], tag_ar: "تسوق في أكبر المراكز التجارية", tag_fr: "Courses dans les plus grands centres commerciaux" },
  { id: "ram", en: "Royal Air Maroc", ar: "الخطوط الملكية المغربية", fr: "Royal Air Maroc", mono: "R", cat: "travel", color: "#CC0000", ink: "#fff", score: 3.4, reviews: 28700, verified: true, dist: [38, 22, 18, 11, 11], tag_ar: "الناقل الوطني المغربي", tag_fr: "La compagnie nationale marocaine" },
  { id: "lydec", en: "Lydec", ar: "ليديك", fr: "Lydec", mono: "L", cat: "utilities", color: "#0066CC", ink: "#fff", score: 2.9, reviews: 8900, verified: true, dist: [30, 20, 18, 16, 16], tag_ar: "الكهرباء والماء والتطهير في الدار البيضاء", tag_fr: "Électricité, eau et assainissement à Casablanca" },
  { id: "aswak", en: "Aswak Assalam", ar: "أسواق السلام", fr: "Aswak Assalam", mono: "أ", cat: "retail", color: "#00843D", ink: "#fff", score: 4.3, reviews: 7600, verified: true, dist: [64, 20, 8, 4, 4], tag_ar: "تسوق بأسعار منافسة في كل أحياء المغرب", tag_fr: "Shopping à prix compétitifs dans tout le Maroc" },
];

export type Brand = typeof BRANDS[0];

export const CATEGORIES = [
  { id: "all", ar: "الكل", fr: "Tout", icon: "LayoutGrid" },
  { id: "ecommerce", ar: "تجارة إلكترونية", fr: "E-commerce", icon: "ShoppingBag" },
  { id: "banking", ar: "خدمات بنكية", fr: "Banques", icon: "Landmark" },
  { id: "telecom", ar: "اتصالات", fr: "Télécoms", icon: "RadioTower" },
  { id: "retail", ar: "تجزئة", fr: "Distribution", icon: "Store" },
  { id: "food", ar: "طعام وتوصيل", fr: "Restauration", icon: "UtensilsCrossed" },
  { id: "travel", ar: "سفر وطيران", fr: "Voyages", icon: "Plane" },
  { id: "utilities", ar: "خدمات عامة", fr: "Services publics", icon: "Zap" },
];

export const REVIEWERS = [
  { n_ar: "ياسمين بنعلي", n_fr: "Yasmine Benali", i: "ي", c: "#3D82DE" },
  { n_ar: "كريم الإدريسي", n_fr: "Karim El Idrissi", i: "ك", c: "#1E9E6A" },
  { n_ar: "سارة المنصوري", n_fr: "Sara El Mansouri", i: "س", c: "#9b59b6" },
  { n_ar: "عمر بوزيد", n_fr: "Omar Bouzid", i: "ع", c: "#e67e22" },
  { n_ar: "نورا التازي", n_fr: "Nora Tazi", i: "ن", c: "#e84393" },
  { n_ar: "أمين الشرقي", n_fr: "Amine Chraibi", i: "أ", c: "#2d98da" },
  { n_ar: "لمياء حجاج", n_fr: "Lamia Hajjaj", i: "ل", c: "#16a085" },
  { n_ar: "يوسف مرابط", n_fr: "Youssef Mrabet", i: "ي", c: "#8e44ad" },
  { n_ar: "هند بوطالب", n_fr: "Hind Boutaleb", i: "ه", c: "#d35400" },
  { n_ar: "زكرياء القادري", n_fr: "Zakaria El Kadiri", i: "ز", c: "#3D82DE" },
];

export const FEED = [
  { kind: "media", brand: "jumia", rev: 0, rating: 5, ratio: 1.3, hue: 35, video: false, label: "unboxing · commande", text_ar: "الطلب وصل في اليوم نفسه! التغليف ممتاز والمنتج أصلي 📦", text_fr: "La commande est arrivée le jour même ! Emballage parfait et produit authentique", helpful: 184 },
  { kind: "brand", brand: "attijariwafa" },
  { kind: "review", brand: "orange", rev: 2, rating: 4, text_ar: "التغطية ممتازة في الدار البيضاء والرباط، والتطبيق سهل الاستخدام. خدمة العملاء ردّت عليّ خلال دقيقتين.", text_fr: "Excellente couverture à Casablanca et Rabat, l'application est facile à utiliser. Le service client m'a répondu en deux minutes.", helpful: 76, verified: true },
  { kind: "media", brand: "glovo", rev: 3, rating: 4, ratio: 1.0, hue: 40, video: true, label: "video · livraison", text_ar: "الطلب وصل ساخن وفي وقت قياسي 🍕", text_fr: "La commande est arrivée chaude et en un temps record", helpful: 53 },
  { kind: "brand", brand: "cih" },
  { kind: "media", brand: "marjane", rev: 4, rating: 5, ratio: 1.5, hue: 0, video: false, label: "photo · courses", text_ar: "الأسعار منافسة جدًا والمتجر نظيف ومنظم 🛒", text_fr: "Prix très compétitifs, magasin propre et bien organisé", helpful: 45 },
  { kind: "review", brand: "ram", rev: 5, rating: 2, text_ar: "الرحلة تأخرت ساعتين بدون أي إشعار مسبق. المقاعد مريحة لكن الخدمة على متن الطائرة دون المستوى.", text_fr: "Le vol a été retardé de deux heures sans aucun préavis. Les sièges sont confortables mais le service à bord est décevant.", helpful: 112, verified: true },
  { kind: "media", brand: "avito", rev: 6, rating: 5, ratio: 0.85, hue: 120, video: false, label: "photo · vente réussie", text_ar: "بعت سيارتي في يومين! الموقع سهل ومشترين جادين 🚗", text_fr: "J'ai vendu ma voiture en deux jours ! Site facile et acheteurs sérieux", helpful: 198 },
  { kind: "brand", brand: "inwi" },
  { kind: "media", brand: "carrefour", rev: 7, rating: 4, ratio: 1.2, hue: 210, video: true, label: "video · soldes", text_ar: "تخفيضات رهيبة في التصفية! وفّرت المال الكثير 💰", text_fr: "Incroyables promotions en période de soldes ! J'ai économisé beaucoup", helpful: 38 },
  { kind: "review", brand: "cih", rev: 8, rating: 5, text_ar: "أفضل تجربة مصرفية في المغرب. التطبيق سلس وفتح الحساب الرقمي ما أخذ إلا ١٠ دقائق. عمولات منخفضة وخدمة عملاء ممتازة.", text_fr: "Meilleure expérience bancaire au Maroc. L'appli est fluide, ouverture de compte digital en 10 min seulement. Frais bas et excellent service.", helpful: 89, verified: true },
  { kind: "brand", brand: "jumia" },
  { kind: "media", brand: "aswak", rev: 9, rating: 5, ratio: 1.4, hue: 145, video: false, label: "photo · produits frais", text_ar: "الخضروات طازجة والأسعار تحت الجمال! 🥦", text_fr: "Légumes frais et prix imbattables !", helpful: 41 },
  { kind: "review", brand: "lydec", rev: 0, rating: 1, text_ar: "انقطع الكهرباء ٣ مرات في أسبوع واحد! و عند الاتصال بخدمة العملاء ما كانش أي رد. فواتير مرتفعة بدون تفسير.", text_fr: "Coupure d'électricité 3 fois en une semaine ! Et le service client est injoignable. Factures élevées sans explication.", helpful: 156, verified: false },
  { kind: "brand", brand: "marjane" },
  { kind: "media", brand: "iam", rev: 1, rating: 3, ratio: 0.9, hue: 130, video: false, label: "photo · fibre optique", text_ar: "الفيبر سريع لكن التركيب تأخر ثلاثة أسابيع 😤", text_fr: "La fibre est rapide mais l'installation a pris trois semaines", helpful: 67 },
  { kind: "brand", brand: "glovo" },
  { kind: "review", brand: "attijariwafa", rev: 2, rating: 4, text_ar: "خدمات التحويل الدولي ممتازة والتطبيق يعمل بسلاسة. لكن طابور الانتظار في الفروع طويل أحيانًا.", text_fr: "Excellents services de virement international et appli fluide. Mais les files d'attente en agence peuvent être longues.", helpful: 58, verified: true },
  { kind: "brand", brand: "ram" },
];

export type FeedItem = typeof FEED[0];

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find(b => b.id === id);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find(b => b.id === slug);
}

export function getScoreLabel(score: number, lang: 'ar' | 'fr'): string {
  if (score >= 4.5) return lang === 'ar' ? 'ممتاز' : 'Excellent';
  if (score >= 4.0) return lang === 'ar' ? 'جيد جدًا' : 'Très bien';
  if (score >= 3.5) return lang === 'ar' ? 'جيد' : 'Bien';
  if (score >= 3.0) return lang === 'ar' ? 'مقبول' : 'Passable';
  return lang === 'ar' ? 'ضعيف' : 'Mauvais';
}

export function getScoreColor(score: number): string {
  if (score >= 4.0) return '#1E9E6A';
  if (score >= 3.5) return '#2DA46F';
  if (score >= 3.0) return '#F0A500';
  if (score >= 2.5) return '#E07000';
  return '#CC2200';
}
