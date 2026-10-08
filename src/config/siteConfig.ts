/**
 * @license
 * Official Master Configuration for "المصرية للعقارات" (Al Masreya Real Estate)
 * All brand metadata, phones, services, areas, and links are centralized here.
 * In Phase 3+, this can be seamlessly hydrated or overridden from Firestore 'settings'.
 */

export interface PhoneContact {
  number: string;
  display: string;
  labelAr: string;
  labelEn: string;
  whatsappMessageAr?: string;
  whatsappMessageEn?: string;
}

export interface ServiceItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  iconName: string;
  featured: boolean;
}

export interface AreaItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  coordinates: { lat: number; lng: number };
  popularTypesAr: string[];
  popularTypesEn: string[];
  seoLandingKeywordAr: string;
  seoLandingKeywordEn: string;
}

export interface SiteConfig {
  brand: {
    nameAr: string;
    nameEn: string;
    subBrandAr: string;
    subBrandEn: string;
    heroHeadlineAr: string;
    heroHeadlineEn: string;
    heroSubAr: string;
    heroSubEn: string;
    aboutAr: string;
    aboutEn: string;
    verifiedBadgeAr: string;
    verifiedBadgeEn: string;
    officialTagAr: string;
    officialTagEn: string;
  };
  contact: {
    phones: PhoneContact[];
    addressAr: string;
    addressEn: string;
    landmarksAr: string;
    landmarksEn: string;
    coordinates: { lat: number; lng: number; defaultZoom: number };
    getDirectionsUrl: string;
    workingHoursAr: string;
    workingHoursEn: string;
    isAlwaysOpen: boolean;
    email: string;
  };
  social: {
    facebook: string;
    tiktok: string;
  };
  services: ServiceItem[];
  mainAreas: AreaItem[];
  propertyTypes: Array<{
    id: string;
    nameAr: string;
    nameEn: string;
    category: 'residential' | 'commercial' | 'coastal';
    countEstimate: number;
    icon: string;
  }>;
  stats: Array<{
    id: string;
    value: string;
    labelAr: string;
    labelEn: string;
    suffix?: string;
  }>;
  faqs: Array<{
    id: string;
    questionAr: string;
    questionEn: string;
    answerAr: string;
    answerEn: string;
    category: string;
  }>;
}

export const SITE_CONFIG: SiteConfig = {
  brand: {
    nameAr: 'المصرية للعقارات',
    nameEn: 'Al Masreya Real Estate',
    subBrandAr: 'مساكن شيراتون',
    subBrandEn: 'Masaken Sheraton',
    heroHeadlineAr: 'اعثر على عقار أحلامك مع المصرية للعقارات',
    heroHeadlineEn: 'Find Your Dream Property with Al Masreya Real Estate',
    heroSubAr: 'منظومة عقارية متكاملة: إيجار، بيع، تمليك، إداري، تجاري، مفروش، ومحلات بأعلى معايير المصداقية في مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر.',
    heroSubEn: 'Comprehensive real estate ecosystem: Rent, Sale, Ownership, Administrative, Commercial, Furnished, and Retail with trusted exclusivity across Masaken Sheraton, Heliopolis, El Nozha, and Nasr City.',
    aboutAr: 'المصرية للعقارات (مساكن شيراتون) — يوفر المكتب مجموعة متنوعة من الخدمات: إيجار، بيع، تمليك، إداري، تجاري، مفروش، محلات، وجميع خدمات العقارات في مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر.',
    aboutEn: 'Al Masreya Real Estate (Masaken Sheraton) — Offers a comprehensive range of prime services: rent, sale, ownership, administrative, commercial, furnished luxury apartments, shops, and full real estate consulting across Masaken Sheraton, Heliopolis, El Nozha, and Nasr City.',
    verifiedBadgeAr: 'موثّق من المصرية للعقارات',
    verifiedBadgeEn: 'Verified by Al Masreya',
    officialTagAr: 'المكتب الرسمي المعتمد',
    officialTagEn: 'Official Authorized Broker',
  },

  contact: {
    phones: [
      {
        number: '01286429815',
        display: '01286429815',
        labelAr: 'المبيعات والتمليك والفرص الاستثمارية',
        labelEn: 'Sales & Capital Ownership',
        whatsappMessageAr: 'مرحباً المصرية للعقارات (مساكن شيراتون)، أود الاستفسار عن عروض التمليك والمبيعات المتاحة.',
        whatsappMessageEn: 'Hello Al Masreya Real Estate, I am inquiring about available properties for sale.',
      },
      {
        number: '01032599331',
        display: '01032599331',
        labelAr: 'المقرات الإدارية والمحلات والمفروش',
        labelEn: 'Commercial, Retail & Furnished',
        whatsappMessageAr: 'مرحباً المصرية للعقارات، أود الاستفسار عن المقرات الإدارية / المحلات / الشقق المفروشة.',
        whatsappMessageEn: 'Hello Al Masreya Real Estate, I am inquiring about commercial/furnished listings.',
      },
      {
        number: '01280822224',
        display: '01280822224',
        labelAr: 'عقود الإيجار الجديد والمعاينات الفورية',
        labelEn: 'Residential Rent & Inspections',
        whatsappMessageAr: 'مرحباً المصرية للعقارات، أود تحديد موعد معاينة فورية لوحدة معروضة للإيجار أو البيع.',
        whatsappMessageEn: 'Hello Al Masreya Real Estate, I would like to schedule an immediate property visit.',
      },
    ],
    addressAr: 'شارع خالد بن الوليد، بجوار مسجد الصديق وكنيسة الملاك، مساكن شيراتون، المطار، القاهرة، مصر',
    addressEn: 'Khaled Ibn El Walid St., next to El Seddiq Mosque & Church of the Archangel, Masaken Sheraton, Cairo Airport, Egypt',
    landmarksAr: 'بجوار مسجد الصديق وكنيسة الملاك، بالقرب من طريق النصر ومطار القاهرة الدولي',
    landmarksEn: 'Beside El Seddiq Mosque & Church of Archangel, near El Nasr Rd & Cairo International Airport',
    coordinates: {
      lat: 30.1065,
      lng: 31.3789,
      defaultZoom: 15,
    },
    getDirectionsUrl: 'https://maps.google.com/?q=30.1065,31.3789',
    workingHoursAr: 'متاح على مدار الساعة (24/7)',
    workingHoursEn: 'Available 24/7',
    isAlwaysOpen: true,
    email: 'info@almasreya-realestate.com',
  },

  social: {
    facebook: 'https://www.facebook.com/share/19S5KjWQ17/',
    tiktok: 'https://www.tiktok.com/@elmasria_real_estate22',
  },

  services: [
    {
      id: 'sale',
      nameAr: 'بيع وتمليك',
      nameEn: 'Sale & Ownership',
      descAr: 'شقق فاخرة، دوبلكس، وفيلات مسجلة شهر عقاري وحصص بالأرض مع تسهيلات سداد.',
      descEn: 'Luxury apartments, duplexes, and villas registered with land share and payment terms.',
      iconName: 'Building',
      featured: true,
    },
    {
      id: 'rent',
      nameAr: 'إيجار سكني وتجاري',
      nameEn: 'Rental Services',
      descAr: 'عقود إيجار موثقة لمدد قصيرة وطويلة بمساكن شيراتون ومصر الجديدة مع تسليم فوري.',
      descEn: 'Verified short and long-term rental contracts in Sheraton and Heliopolis with instant handover.',
      iconName: 'Key',
      featured: true,
    },
    {
      id: 'furnished',
      nameAr: 'شقق مفروشة فندقية',
      nameEn: 'Furnished Apartments',
      descAr: 'فرش راقي متكامل، تكييفات وأجهزة حديثة لرجال الأعمال والدبلوماسيين قرب المطار.',
      descEn: 'High-end furnished units with full modern appliances, ideal for expats near Cairo Airport.',
      iconName: 'Bed',
      featured: true,
    },
    {
      id: 'administrative',
      nameAr: 'مقرات إدارية ومكاتب',
      nameEn: 'Administrative Offices',
      descAr: 'مقرات مرخصة ومجهزة للشركات الكبرى والبنوك والعيادات في أهم الشوارع التجارية.',
      descEn: 'Licensed corporate headquarters, clinic suites, and offices along prominent avenues.',
      iconName: 'Briefcase',
      featured: true,
    },
    {
      id: 'commercial',
      nameAr: 'تجاري واستثماري',
      nameEn: 'Commercial Investments',
      descAr: 'أصول تجارية مميزة بعوائد إيجارية سنوية مضمونة تبدأ من 12% وحتى 18%.',
      descEn: 'Prime commercial assets generating guaranteed annual rental returns of 12% to 18%.',
      iconName: 'TrendingUp',
      featured: true,
    },
    {
      id: 'retail',
      nameAr: 'محلات ومساحات تجارية',
      nameEn: 'Retail & Shops',
      descAr: 'محلات واجهات زجاجية عريضة بكثافة حركة مشاة فائقة للمطاعم والتوكيلات.',
      descEn: 'Wide glass storefronts on high-footfall avenues suitable for retail brands and restaurants.',
      iconName: 'Store',
      featured: true,
    },
    {
      id: 'consulting',
      nameAr: 'استشارات وتثمين عقاري',
      nameEn: 'Valuation & Advisory',
      descAr: 'تقييم عقاري احترافي وإدارة أملاك موثقة للمغتربين والمستثمرين.',
      descEn: 'Accurate market valuation, portfolio management, and property care for investors.',
      iconName: 'Award',
      featured: false,
    },
    {
      id: 'all_services',
      nameAr: 'جميع خدمات العقارات',
      nameEn: 'All Real Estate Solutions',
      descAr: 'صياغة العقود، تسجيل الشهر العقاري، إنهاء التراخيص، وإدارة المعاينات خطوة بخطوة.',
      descEn: 'Drafting legal deeds, title registrations, permits, and end-to-end inspection handling.',
      iconName: 'ShieldCheck',
      featured: false,
    },
  ],

  mainAreas: [
    {
      id: 'sheraton',
      slug: 'masaken-sheraton',
      nameAr: 'مساكن شيراتون',
      nameEn: 'Masaken Sheraton',
      subtitleAr: 'المقر الرئيسي للمكتب · قرب المطار ومجمع الكافيهات وشارع النصر',
      subtitleEn: 'Company HQ · Near Cairo Airport, Sun City & El Nasr Rd',
      coordinates: { lat: 30.1065, lng: 31.3789 },
      popularTypesAr: ['شقق تمليك فاخرة', 'مفروش فندقي', 'مقرات شركات طيران'],
      popularTypesEn: ['Luxury apartments', 'Hotel-grade furnished', 'Corporate offices'],
      seoLandingKeywordAr: 'شقق للبيع في مساكن شيراتون',
      seoLandingKeywordEn: 'Apartments for sale in Masaken Sheraton',
    },
    {
      id: 'heliopolis',
      slug: 'heliopolis',
      nameAr: 'مصر الجديدة',
      nameEn: 'Heliopolis',
      subtitleAr: 'الكوربة، الميرغني، العروبة، وتريومف · العراقة والمراكز الإدارية',
      subtitleEn: 'Korba, Merghany, Orouba & Triumph · Classic prestige & hubs',
      coordinates: { lat: 30.0894, lng: 31.3285 },
      popularTypesAr: ['مقرات إدارية رئيسية', 'شقق كلاسيكية بمساحات واسعة', 'عيادات طبية'],
      popularTypesEn: ['Executive headquarters', 'Spacious heritage flats', 'Medical clinics'],
      seoLandingKeywordAr: 'شقق للإيجار في مصر الجديدة',
      seoLandingKeywordEn: 'Apartments for rent in Heliopolis',
    },
    {
      id: 'nozha',
      slug: 'el-nozha',
      nameAr: 'النزهة والنزهة الجديدة',
      nameEn: 'El Nozha & New Nozha',
      subtitleAr: 'محور جوزيف تيتو، سانت فاتيما، وقرب محطة المترو · حيوية تجارية',
      subtitleEn: 'Joseph Tito axis, Saint Fatima & Metro · High commercial velocity',
      coordinates: { lat: 30.1218, lng: 31.3654 },
      popularTypesAr: ['محلات تجارية حيوية', 'شقق عائلية سريعة التسليم', 'مكاتب خدمية'],
      popularTypesEn: ['High-traffic shops', 'Immediate delivery apartments', 'Service offices'],
      seoLandingKeywordAr: 'عقارات للبيع في النزهة الجديدة',
      seoLandingKeywordEn: 'Properties for sale in New Nozha',
    },
    {
      id: 'nasr-city',
      slug: 'nasr-city',
      nameAr: 'مدينة نصر',
      nameEn: 'Nasr City',
      subtitleAr: 'عباس العقاد، مكرم عبيد، سيتي ستارز، والمنطقة الأولى · القلب التجاري',
      subtitleEn: 'Abbas El Akkad, Makram Ebeid & Citystars · Commercial epicenter',
      coordinates: { lat: 30.0531, lng: 31.3412 },
      popularTypesAr: ['محلات شوارع رئيسية', 'شقق دوبلكس وبنتهاوس', 'مقرات معارض'],
      popularTypesEn: ['Avenue retail shops', 'Duplex & penthouses', 'Showroom headquarters'],
      seoLandingKeywordAr: 'محلات للإيجار في مدينة نصر',
      seoLandingKeywordEn: 'Shops for rent in Nasr City',
    },
  ],

  propertyTypes: [
    { id: 'apartments', nameAr: 'شقق سكنية', nameEn: 'Apartments', category: 'residential', countEstimate: 124, icon: 'Home' },
    { id: 'villas', nameAr: 'فيلات مستقلة', nameEn: 'Villas', category: 'residential', countEstimate: 38, icon: 'Castle' },
    { id: 'chalets', nameAr: 'شاليهات ساحلية', nameEn: 'Chalets', category: 'coastal', countEstimate: 29, icon: 'Palmtree' },
    { id: 'duplex', nameAr: 'دوبلكس', nameEn: 'Duplex', category: 'residential', countEstimate: 42, icon: 'Layers' },
    { id: 'penthouse', nameAr: 'بنتهاوس فاخر', nameEn: 'Penthouse', category: 'residential', countEstimate: 19, icon: 'Sun' },
    { id: 'studios', nameAr: 'استوديو', nameEn: 'Studios', category: 'residential', countEstimate: 31, icon: 'Maximize2' },
    { id: 'townhouse', nameAr: 'تاون هاوس', nameEn: 'Townhouse', category: 'residential', countEstimate: 24, icon: 'Grid' },
    { id: 'twinhouse', nameAr: 'توين هاوس', nameEn: 'Twin House', category: 'residential', countEstimate: 21, icon: 'Columns' },
    { id: 'land', nameAr: 'أراضي ومواقع', nameEn: 'Land Plots', category: 'commercial', countEstimate: 16, icon: 'Compass' },
    { id: 'shops', nameAr: 'محلات ومطاعم', nameEn: 'Shops & Retail', category: 'commercial', countEstimate: 57, icon: 'Store' },
    { id: 'offices', nameAr: 'مقرات إدارية ومكاتب', nameEn: 'Offices & HQs', category: 'commercial', countEstimate: 63, icon: 'Briefcase' },
    { id: 'clinics', nameAr: 'عيادات ومراكز طبية', nameEn: 'Clinics & Medical', category: 'commercial', countEstimate: 28, icon: 'Cross' },
    { id: 'warehouses', nameAr: 'مخازن ومستودعات', nameEn: 'Warehouses', category: 'commercial', countEstimate: 14, icon: 'Box' },
    { id: 'buildings', nameAr: 'عمارات ومباني كاملة', nameEn: 'Full Buildings', category: 'residential', countEstimate: 11, icon: 'Building2' },
    { id: 'furnished', nameAr: 'مفروش فندقي سوبر لوكس', nameEn: 'Luxury Furnished', category: 'residential', countEstimate: 49, icon: 'Bed' },
  ],

  stats: [
    { id: 'units', value: '+520', labelAr: 'وحدة عقارية مسجلة ومعتمدة', labelEn: 'Verified Active Properties', suffix: '' },
    { id: 'deals', value: '98%', labelAr: 'نسبة رضا المستأجرين والملاك', labelEn: 'Client Satisfaction Rate', suffix: '' },
    { id: 'years', value: '+16', labelAr: 'عاماً من الخبرة في شرق القاهرة', labelEn: 'Years Serving East Cairo', suffix: 'سنة' },
    { id: 'hours', value: '24/7', labelAr: 'معاينات واستشارات على مدار الساعة', labelEn: 'Around the Clock Availability', suffix: '' },
  ],

  faqs: [
    {
      id: 'faq-1',
      questionAr: 'كيف تضمن المصرية للعقارات سلامة الأوراق والتسجيل؟',
      questionEn: 'How does Al Masreya ensure legal validity of property titles?',
      answerAr: 'يقوم فريقنا القانوني بمراجعة تسلسل الملكية وتوكيلات الشهر العقاري وبراءات الذمة وعدادات المرافق قبل إتمام أي تعاقد لضمان أمان أموالك بنسبة 100%.',
      answerEn: 'Our legal department conducts comprehensive title searches, power-of-attorney audits, and utility clearance checks before closing any transaction.',
      category: 'legal',
    },
    {
      id: 'faq-2',
      questionAr: 'هل يمكنني حجز معاينة في نفس اليوم بمساكن شيراتون؟',
      questionEn: 'Can I book a same-day property inspection in Sheraton?',
      answerAr: 'نعم بالتأكيد! مندوبو مكتبنا متواجدون بمساكن شيراتون ومصر الجديدة على مدار الساعة، ويمكنك الضغط على زر الاتصال أو الواتساب للترتيب الفوري.',
      answerEn: 'Absolutely. Our field agents operate in Masaken Sheraton and Heliopolis 24/7. Just click Call or WhatsApp to inspect immediately.',
      category: 'inspection',
    },
    {
      id: 'faq-3',
      questionAr: 'ما هي عمولة الوساطة المعتمدة لدى المكتب؟',
      questionEn: 'What is the standard brokerage commission?',
      answerAr: 'نلتزم بالعرف التجاري المصري المعتمد: 2.5% من إجمالي قيمة البيع للتمليك، وإيجار شهر واحد لعقود الإيجار السنوية.',
      answerEn: 'We adhere strictly to official market standards: 2.5% for property purchase transactions, and one month rent for annual leases.',
      category: 'commission',
    },
    {
      id: 'faq-4',
      questionAr: 'هل توفرون مقرات إدارية مرخصة للشركات الأجنبية وسفارات؟',
      questionEn: 'Do you offer licensed executive spaces for international companies?',
      answerAr: 'نوفر مقرات إدارية كبرى بتراخيص تجارية وإدارية معتمدة على شوارع رئيسية (الميرغني، العروبة، طريق النصر، ومساكن شيراتون) مجهزة بكافة شبكات الاتصالات وأنظمة الحريق.',
      answerEn: 'Yes, we specialize in high-end administrative hubs with official commercial licenses on prime avenues, equipped with central HVAC and certified fire systems.',
      category: 'corporate',
    },
  ],
};

// Helper for phone URL formatting
export const getTelUrl = (phone: string) => `tel:${phone}`;
export const getWhatsAppUrl = (phone: string, msg?: string) => {
  const cleanNumber = phone.startsWith('0') ? `20${phone.substring(1)}` : phone;
  const encodedMsg = encodeURIComponent(msg || 'مرحباً المصرية للعقارات (مساكن شيراتون)');
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};
