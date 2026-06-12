/* ====== Mawthooq — mock data ====== */
/* Real Arabic/regional brand NAMES are used as listings (the actual job of a
   reviews aggregator). Logos are monogram tiles, media are honest placeholders. */

const CATEGORIES = [
  { id: "all",        ar: "الكل",            icon: "LayoutGrid" },
  { id: "ecommerce",  ar: "متاجر إلكترونية",  icon: "ShoppingBag" },
  { id: "banking",    ar: "خدمات بنكية",      icon: "Landmark" },
  { id: "telecom",    ar: "اتصالات",          icon: "RadioTower" },
  { id: "fashion",    ar: "أزياء وجمال",       icon: "Sparkles" },
  { id: "electronics",ar: "إلكترونيات",        icon: "Smartphone" },
];

const CAT_AR = Object.fromEntries(CATEGORIES.map(c => [c.id, c.ar]));

// distribution helper: [5★,4★,3★,2★,1★] as percentages summing ~100
const BRANDS = [
  { id:"noon",   en:"noon",          ar:"نون",            mono:"n", cat:"ecommerce",   color:"#FEEE00", ink:"#1a1a1a", score:4.3, reviews:18420, verified:true,  dist:[63,19,8,4,6],  tag:"أكبر متجر إلكتروني في المنطقة" },
  { id:"jarir",  en:"Jarir",         ar:"جرير",           mono:"ج", cat:"electronics", color:"#0a3d91", ink:"#fff",    score:4.6, reviews:9240,  verified:true,  dist:[74,16,5,2,3],  tag:"إلكترونيات وكتب وأجهزة" },
  { id:"namshi", en:"Namshi",        ar:"نمشي",           mono:"N", cat:"fashion",     color:"#111111", ink:"#fff",    score:4.1, reviews:12660, verified:true,  dist:[58,21,9,5,7],  tag:"أزياء وأحذية عالمية" },
  { id:"extra",  en:"eXtra",         ar:"اكسترا",         mono:"X", cat:"electronics", color:"#e4002b", ink:"#fff",    score:3.9, reviews:6810,  verified:true,  dist:[52,22,11,6,9],  tag:"متجر الإلكترونيات والأجهزة" },
  { id:"rajhi",  en:"Al Rajhi Bank", ar:"مصرف الراجحي",   mono:"R", cat:"banking",     color:"#005c2e", ink:"#fff",    score:4.4, reviews:21030, verified:true,  dist:[66,20,7,3,4],  tag:"أكبر بنك إسلامي" },
  { id:"zain",   en:"Zain",          ar:"زين",            mono:"Z", cat:"telecom",     color:"#7a3b9b", ink:"#fff",    score:3.6, reviews:8950,  verified:true,  dist:[44,23,14,8,11], tag:"شبكة اتصالات الجيل الخامس" },
  { id:"stc",    en:"stc",           ar:"إس تي سي",       mono:"s", cat:"telecom",     color:"#4f008c", ink:"#fff",    score:3.8, reviews:15240, verified:true,  dist:[49,24,12,7,8],  tag:"حلول الاتصال والإنترنت" },
  { id:"sivvi",  en:"SIVVI",         ar:"سيفي",           mono:"S", cat:"fashion",     color:"#d4a23b", ink:"#1a1a1a", score:4.0, reviews:4380,  verified:true,  dist:[55,22,10,6,7],  tag:"موضة وجمال للجميع" },
  { id:"alinma", en:"Alinma",        ar:"بنك الإنماء",    mono:"إ", cat:"banking",     color:"#84368f", ink:"#fff",    score:4.2, reviews:9870,  verified:true,  dist:[60,21,9,4,6],   tag:"تجربة مصرفية رقمية" },
  { id:"qurashi",en:"A. Al Qurashi", ar:"عبدالصمد القرشي",mono:"ع", cat:"fashion",     color:"#1b1b3a", ink:"#d9b65f", score:4.7, reviews:5210,  verified:true,  dist:[78,14,4,2,2],   tag:"عطور وبخور فاخر" },
  { id:"shein",  en:"SHEIN",         ar:"شي إن",          mono:"ش", cat:"fashion",     color:"#000000", ink:"#fff",    score:3.4, reviews:23110, verified:false, dist:[40,22,15,10,13],tag:"أزياء سريعة بأسعار مناسبة" },
  { id:"mobily", en:"Mobily",        ar:"موبايلي",        mono:"m", cat:"telecom",     color:"#00a99d", ink:"#fff",    score:3.7, reviews:7420,  verified:true,  dist:[47,24,13,7,9],  tag:"اتصالات وبيانات" },
  { id:"amazon", en:"Amazon.sa",     ar:"أمازون السعودية",mono:"a", cat:"ecommerce",   color:"#232f3e", ink:"#ff9900", score:4.2, reviews:31200, verified:true,  dist:[61,22,8,4,5],   tag:"كل شيء يصل لباب بيتك" },
  { id:"voga",   en:"VogaCloset",    ar:"فوغا كلوسيت",    mono:"V", cat:"fashion",     color:"#c2185b", ink:"#fff",    score:3.9, reviews:3960,  verified:true,  dist:[53,23,11,6,7],  tag:"أزياء نسائية عصرية" },
];

const BR = Object.fromEntries(BRANDS.map(b => [b.id, b]));

const REVIEWERS = [
  { n:"نورة الحربي",     i:"ن", c:"#3D82DE" },
  { n:"خالد المطيري",    i:"خ", c:"#1E9E6A" },
  { n:"سارة القحطاني",   i:"س", c:"#9b59b6" },
  { n:"عبدالله الزهراني",i:"ع", c:"#e67e22" },
  { n:"ريم الشمري",      i:"ر", c:"#e84393" },
  { n:"فهد الدوسري",     i:"ف", c:"#2d98da" },
  { n:"لطيفة العنزي",    i:"ل", c:"#16a085" },
  { n:"يوسف الغامدي",    i:"ي", c:"#8e44ad" },
  { n:"مها السبيعي",     i:"م", c:"#d35400" },
  { n:"أحمد العتيبي",    i:"أ", c:"#3D82DE" },
];

// Pinterest feed: mix of brand cards, text reviews, and media (photo/video) reviews.
// `kind`: "brand" | "review" | "media"
// media items carry placeholder spec: ratio (h/w), hue, label, video(bool)
const FEED = [
  { kind:"media",  brand:"qurashi", rev:0, rating:5, ratio:1.32, hue:268, video:false, label:"unboxing · عطر",
    text:"التغليف فخم جدًا والعطر ثباته رهيب طول اليوم 🌿", helpful:142 },
  { kind:"brand",  brand:"noon" },
  { kind:"review", brand:"rajhi", rev:3, rating:5,
    text:"تجربة التطبيق سلسة وتحويل الأموال صار أسرع بكثير بعد آخر تحديث. خدمة العملاء ردّت عليّ خلال دقيقتين.", helpful:88, verified:true },
  { kind:"media",  brand:"namshi", rev:4, rating:4, ratio:1.0, hue:210, video:true, label:"video · مراجعة حذاء",
    text:"المقاس مظبوط والتوصيل وصل قبل الموعد بيومين", helpful:63 },
  { kind:"brand",  brand:"jarir" },
  { kind:"media",  brand:"sivvi", rev:5, rating:5, ratio:1.5, hue:38, video:false, label:"photo · الطلب وصل",
    text:"الألوان طابقت الصور تمامًا، جودة الأقمشة ممتازة 👗", helpful:51 },
  { kind:"review", brand:"shein", rev:6, rating:2,
    text:"بعض القطع مقاساتها أصغر من المتوقع، والإرجاع أخذ وقت طويل. الأسعار حلوة بس الجودة متفاوتة.", helpful:120, verified:true },
  { kind:"media",  brand:"amazon", rev:7, rating:5, ratio:0.78, hue:30, video:false, label:"photo · التوصيل",
    text:"وصل نفس اليوم! التغليف ممتاز والمنتج أصلي 100%", helpful:204 },
  { kind:"brand",  brand:"zain" },
  { kind:"media",  brand:"extra", rev:8, rating:3, ratio:1.18, hue:355, video:true, label:"video · تركيب الجهاز",
    text:"المنتج جيد لكن خدمة التركيب تأخرت أسبوع كامل", helpful:37 },
  { kind:"review", brand:"qurashi", rev:1, rating:5,
    text:"أطلب من القرشي من سنوات، الجودة ثابتة والبخور أصلي. أنصح فيه بقوة لأي مناسبة.", helpful:95, verified:true },
  { kind:"brand",  brand:"namshi" },
  { kind:"media",  brand:"voga", rev:2, rating:4, ratio:1.4, hue:330, video:false, label:"photo · فستان",
    text:"الفستان أجمل بالواقع من الصورة، بس التوصيل أخذ ٦ أيام", helpful:44 },
  { kind:"review", brand:"stc", rev:9, rating:3,
    text:"السرعة ممتازة في المدن الكبيرة، لكن التغطية ضعيفة في الأطراف. الفواتير واضحة على الأقل.", helpful:58, verified:true },
  { kind:"brand",  brand:"rajhi" },
  { kind:"media",  brand:"jarir", rev:0, rating:5, ratio:0.92, hue:220, video:false, label:"photo · لابتوب جديد",
    text:"اشتريت اللابتوب من جرير، ضمان محلي وخدمة ما بعد البيع ممتازة 💻", helpful:77 },
  { kind:"brand",  brand:"alinma" },
  { kind:"review", brand:"mobily", rev:4, rating:4,
    text:"باقة البيانات وفّرت عليّ كثير، والتطبيق سهل لإدارة الاشتراك. أتمنى يحسنون مراكز الخدمة.", helpful:33, verified:false },
  { kind:"media",  brand:"shein", rev:5, rating:4, ratio:1.25, hue:280, video:false, label:"haul · تجميعة",
    text:"طلبية كاملة بسعر ممتاز، أغلب القطع حلوة والباقي رجّعته بسهولة", helpful:66 },
  { kind:"brand",  brand:"extra" },
  { kind:"media",  brand:"amazon", rev:6, rating:5, ratio:1.1, hue:200, video:true, label:"video · المراجعة",
    text:"المنتج وصل بحالة ممتازة، شغّلته على طول وكل شي تمام 👌", helpful:89 },
];

Object.assign(window, { CATEGORIES, CAT_AR, BRANDS, BR, REVIEWERS, FEED });
