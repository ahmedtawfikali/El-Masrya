import React, { useState } from 'react';
import { 
  X, Sparkles, Check, Building, MapPin, DollarSign, 
  Home, Bed, Bath, Layers, Image as ImageIcon, Phone, 
  MessageSquare, ShieldCheck, CheckCircle2, ChevronRight, 
  Plus, ArrowLeft, Info, Eye
} from 'lucide-react';
import { Property, PropertyCategory, PropertyPurpose, RegionArea, ListingSource } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { PROPERTY_CLASSIFICATIONS, getClassificationForCategory, getCategoryIcon } from '../config/propertyCategories';
import { savePropertyToFirestore } from '../services/propertyService';

// Default preset luxury imagery matching the 12 categories
import heroSheratonImg from '../assets/images/hero_sheraton_luxury_1791387800905.jpg';
import furnishedImg from '../assets/images/property_interior_furnished_1791387814128.jpg';
import commercialOfficeImg from '../assets/images/commercial_administrative_office_1791387825243.jpg';
import retailStorefrontImg from '../assets/images/retail_storefront_heliopolis_1791387836933.jpg';
import compoundLuxuryImg from '../assets/images/compound_luxury_east_cairo_1791450949443.jpg';
import businessParkImg from '../assets/images/business_park_hub_1791450965506.jpg';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyCreated: (newProperty: Property) => void;
  initialCategory?: string;
}

const PRESET_IMAGES: Record<string, string[]> = {
  hotel_apartment: [
    heroSheratonImg,
    furnishedImg,
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
  ],
  villa: [
    compoundLuxuryImg,
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  ],
  studio: [
    furnishedImg,
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  ],
  apartment: [
    heroSheratonImg,
    compoundLuxuryImg,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  ],
  duplex: [
    compoundLuxuryImg,
    heroSheratonImg,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  ],
  administrative: [
    commercialOfficeImg,
    businessParkImg,
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  ],
  retail: [
    retailStorefrontImg,
    businessParkImg,
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  ],
  chalet: [
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ],
  clinic: [
    commercialOfficeImg,
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  ],
  land: [
    businessParkImg,
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  ],
  building: [
    compoundLuxuryImg,
    heroSheratonImg,
  ],
  warehouse: [
    businessParkImg,
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  ],
};

const COMMON_FEATURES = [
  'مصعد كهربائي (أسانسير)',
  'أمن وحراسة 24 ساعة',
  'جراج خاص / باكية سيارة',
  'تكييف مركزي',
  'مسجل شهر عقاري',
  'حديقة خاصة',
  'حمام سباحة',
  'خدمة فندقية وهاوس كيبنج',
  'قفل ذكي بالبصمة سمارت هوم',
  'خط ألياف ضوئية إنترنت سريع',
  'عداد كهرباء وغاز ومياه رسمي',
  'إطلالة بحري مفتوحة',
  'مولد كهربائي للطوارئ',
  'كاميرات مراقبة حديثة',
];

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onPropertyCreated,
  initialCategory,
}) => {
  const { t, isRtl } = useLanguage();
  const { user, isAdmin } = useAuth();

  // Active step/section for multi-step navigation (or view all)
  const [activeTab, setActiveTab] = useState<'all_sections' | 'category' | 'financial' | 'location' | 'specs' | 'features' | 'media' | 'owner'>('all_sections');

  // Form Fields
  const [category, setCategory] = useState<PropertyCategory>(
    (initialCategory && initialCategory !== 'all' ? (initialCategory as PropertyCategory) : 'hotel_apartment')
  );
  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [area, setArea] = useState<RegionArea>('sheraton');
  const [subLocation, setSubLocation] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [spaceM2, setSpaceM2] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [floor, setFloor] = useState('الدور الثالث');
  const [finishing, setFinishing] = useState('الترا سوبر لوكس');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'installments' | 'both'>('cash');
  const [downPayment, setDownPayment] = useState<number | ''>('');
  const [installmentYears, setInstallmentYears] = useState<number | ''>('');
  const [deliveryStatus, setDeliveryStatus] = useState<'ready' | 'under_construction'>('ready');
  const [description, setDescription] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'مصعد كهربائي (أسانسير)',
    'أمن وحراسة 24 ساعة',
    'إطلالة بحري مفتوحة',
  ]);
  const [imageUrl, setImageUrl] = useState<string>(heroSheratonImg);
  const [ownerType, setOwnerType] = useState<ListingSource>('owner');
  const [publisherName, setPublisherName] = useState('');
  const [publisherPhone, setPublisherPhone] = useState('');
  const [publisherWhatsApp, setPublisherWhatsApp] = useState('');

  const [loading, setLoading] = useState(false);
  const [successProperty, setSuccessProperty] = useState<Property | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Toggle feature chip
  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Select a preset image
  const handleSelectPresetImage = (img: string) => {
    setImageUrl(img);
  };

  const handleSelectCategory = (cat: PropertyCategory) => {
    setCategory(cat);
    // Pick first preset image of this category
    const presets = PRESET_IMAGES[cat] || [heroSheratonImg];
    setImageUrl(presets[0]);

    // Suggest default title if empty
    if (!titleAr) {
      if (cat === 'hotel_apartment') {
        setTitleAr('شقة فندقية فاخرة مفروشة بالكامل بمساكن شيراتون قرب المطار');
      } else if (cat === 'villa') {
        setTitleAr('فيلا مستقلة فاخرة بحمام سباحة وحديقة خاصة');
      } else if (cat === 'studio') {
        setTitleAr('استوديو سمارت ديلوكس مفروش بالكامل تشطيب ألترا سوبر لوكس');
      } else if (cat === 'apartment') {
        setTitleAr('شقة سكنية راقية بحري في موقع مميز بمساكن شيراتون');
      } else if (cat === 'chalet') {
        setTitleAr('شاليه فاخر صف أول على البحر بحمام سباحة ولاجون');
      } else if (cat === 'administrative') {
        setTitleAr('مقر إداري مرخص مجهز للشركات الكبرى بموقع استراتيجي');
      } else if (cat === 'retail') {
        setTitleAr('محل تجاري واجهة عريضة على شارع رئيسي حيوي بكثافة مارة');
      }
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic validation
    if (!titleAr.trim()) {
      setValidationError('يرجى إدخال عنوان العقار بوضوح.');
      return;
    }
    if (!price || Number(price) <= 0) {
      setValidationError('يرجى تحديد السعر الإجمالي أو القيمة الإيجارية.');
      return;
    }
    if (!spaceM2 || Number(spaceM2) <= 0) {
      setValidationError('يرجى إدخال المساحة بالمتر المربع.');
      return;
    }

    setLoading(true);

    try {
      const areaNames: Record<RegionArea, { ar: string; en: string }> = {
        sheraton: { ar: 'مساكن شيراتون', en: 'Masaken Sheraton' },
        heliopolis: { ar: 'مصر الجديدة', en: 'Heliopolis' },
        nozha: { ar: 'النزهة الجديدة', en: 'El Nozha' },
        'nasr-city': { ar: 'مدينة نصر', en: 'Nasr City' },
        'new-cairo': { ar: 'القاهرة الجديدة', en: 'New Cairo' },
        other: { ar: 'أخرى', en: 'Other Areas' },
      };

      const selectedAreaInfo = areaNames[area] || areaNames.sheraton;
      const numPrice = Number(price);
      const formattedPrice = numPrice.toLocaleString('en-US');
      const priceUnit = purpose === 'rent' ? 'ج.م / شهرياً' : 'ج.م';
      const priceUnitEn = purpose === 'rent' ? 'EGP / month' : 'EGP';

      const newPropertyId = `prop-user-${Date.now()}`;

      const newProperty: Property = {
        id: newPropertyId,
        title: titleAr.trim(),
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim() || titleAr.trim(),
        purpose,
        category,
        area,
        areaNameArabic: selectedAreaInfo.ar,
        areaNameEnglish: selectedAreaInfo.en,
        subLocation: subLocation.trim() || `${selectedAreaInfo.ar} - موقع رئيسي`,
        subLocationEn: subLocation.trim() || `${selectedAreaInfo.en} - Prime location`,
        price: numPrice,
        priceFormatted: formattedPrice,
        priceUnit,
        priceUnitEn,
        spaceM2: Number(spaceM2),
        rooms: bedrooms,
        bedrooms,
        bathrooms,
        floor: floor.trim() || 'الدور الثالث',
        finishing,
        featured: true,
        verifiedByAlMasreya: true,
        ownerType,
        image: imageUrl || heroSheratonImg,
        additionalImages: PRESET_IMAGES[category]?.filter((img) => img !== imageUrl) || [],
        description: description.trim() || `${titleAr.trim()} - بمساحة ${spaceM2} م²، تشطيب ${finishing}، في أرقى مناطق ${selectedAreaInfo.ar}.`,
        features: selectedFeatures.length > 0 ? selectedFeatures : ['موقع حيوي', 'تشطيب فاخر', 'أمن وحراسة'],
        coordinates: { lat: 30.1072, lng: 31.3768 },
        paymentMethod,
        downPayment: downPayment ? Number(downPayment) : undefined,
        installmentYears: installmentYears ? Number(installmentYears) : undefined,
        deliveryStatus,
        viewsCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
        agentId: 'agent-1',
      };

      // Try saving to Firestore if Firebase is active
      const creatorUid = user?.uid || 'guest-publisher';
      try {
        await savePropertyToFirestore(newProperty, creatorUid);
      } catch (firestoreErr) {
        console.warn('Firestore optional write (proceeding locally):', firestoreErr);
      }

      // Persist in localStorage so it stays across refreshes
      try {
        const stored = localStorage.getItem('almasreya_user_properties');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newProperty);
        localStorage.setItem('almasreya_user_properties', JSON.stringify(list));
      } catch (storageErr) {
        console.warn('Local storage write warning:', storageErr);
      }

      setSuccessProperty(newProperty);
      onPropertyCreated(newProperty);
    } catch (err: any) {
      console.error('Error creating property:', err);
      setValidationError(err.message || 'حدث خطأ أثناء حفظ العقار، يرجى المحاولة ثانية.');
    } finally {
      setLoading(false);
    }
  };

  const currentClassification = getClassificationForCategory(category);
  const currentCategoryPresets = PRESET_IMAGES[category] || [heroSheratonImg];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#090C15] border border-amber-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col text-right font-['Cairo',sans-serif]"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0E17]/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(212,160,23,0.4)]">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {t('إضافة عقار جديد - كافة الأقسام والمواصفات', 'Add New Property - All Sections')}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {t('نشر مباشر فوري', 'Instant Live')}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t('شبكة المصرية للعقارات - مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر', 'Al Masreya Real Estate Network - Sheraton, Heliopolis & East Cairo')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-8">

          {/* SUCCESS SCREEN */}
          {successProperty ? (
            <div className="py-8 px-4 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {t('تم إضافة ونشر العقار بنجاح!', 'Property Published Successfully!')}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t(
                    `تم إدراج عقارك "${successProperty.title}" بنجاح في قسم (${currentClassification.nameAr}) ويمكن للعملاء والزوار استعراضه والتواصل بشأنه فوراً.`,
                    `Your property has been listed in (${currentClassification.nameEn}). It is now live for all visitors.`
                  )}
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-right flex items-center gap-4">
                <img 
                  src={successProperty.image} 
                  alt={successProperty.title} 
                  className="w-20 h-20 rounded-xl object-cover border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${currentClassification.badgeBg} ${currentClassification.iconColor}`}>
                    {currentClassification.nameAr}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">{successProperty.title}</h4>
                  <div className="text-xs font-bold text-amber-400 mt-1">
                    {successProperty.priceFormatted} {successProperty.priceUnit}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(212,160,23,0.4)] hover:brightness-110 cursor-pointer"
                >
                  {t('استعراض العقار في القائمة الآن', 'View Property in Listings')}
                </button>
                <button
                  onClick={() => {
                    setSuccessProperty(null);
                    setTitleAr('');
                    setPrice('');
                    setSpaceM2('');
                  }}
                  className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm cursor-pointer"
                >
                  {t('إضافة عقار آخر +', 'Add Another Property +')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* ERROR ALERT */}
              {validationError && (
                <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <Info className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* SECTION 1: ALL CATEGORIES & DEPARTMENTS (جميع الأقسام) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-amber-500/20">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {t('القسم وتصنيف العقار (اختر من بين كافة الأقسام الـ 12)', 'Property Category & Department (All 12 Sections)')}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-amber-300">
                    {currentClassification.nameAr}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">
                  {t('حدد القسم التابع له العقار لتصنيفه في تبويبات الموقع والبحث المتقدم:', 'Choose the exact category for navigation and filter tags:')}
                </p>

                {/* 12 Categories Visual Card Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {PROPERTY_CLASSIFICATIONS.filter((c) => c.id !== 'all').map((item) => {
                    const isSelected = category === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => handleSelectCategory(item.id as PropertyCategory)}
                        className={`p-3 rounded-xl border text-right transition-all flex items-start gap-2.5 cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-[0_0_15px_rgba(212,160,23,0.25)]'
                            : 'bg-black/40 border-white/10 hover:border-white/20 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-amber-400 text-slate-950 font-black' : item.badgeBg}`}>
                          {getCategoryIcon(item.iconName, 'w-4 h-4')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold truncate">
                            {t(item.shortNameAr, item.shortNameEn)}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {t(item.taglineAr, item.taglineEn)}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 2: TRANSACTION & FINANCIAL (الغرض والسعر) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {t('الغرض والمعاملة المالية والسعر', 'Transaction, Purpose & Price')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Purpose (Sale vs Rent) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('نوع المعاملة', 'Purpose')} *
                    </label>
                    <div className="flex p-1 bg-black/60 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setPurpose('sale')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          purpose === 'sale' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-400'
                        }`}
                      >
                        {t('بيع وتمليك', 'Sale')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPurpose('rent')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          purpose === 'rent' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-400'
                        }`}
                      >
                        {t('إيجار ومفروش', 'Rent')}
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {purpose === 'rent' ? t('القيمة الإيجارية الشهرية (ج.م) *', 'Monthly Rent (EGP) *') : t('السعر الإجمالي (ج.م) *', 'Total Price (EGP) *')}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                        placeholder={purpose === 'rent' ? 'مثال: 35000' : 'مثال: 4500000'}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                        required
                      />
                      <span className="absolute left-3 top-2 text-[10px] text-amber-400 font-bold">
                        {purpose === 'rent' ? 'ج.م/شهر' : 'ج.م كاش'}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('طريقة السداد', 'Payment Method')}
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="cash">{t('كاش فقط', 'Cash Only')}</option>
                      <option value="installments">{t('تقسيط وأقساط ميسرة', 'Installments')}</option>
                      <option value="both">{t('كاش أو تقسيط (متاح كلاهما)', 'Cash & Installments')}</option>
                    </select>
                  </div>

                  {/* Down Payment & Years (if installments or both) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('المقدم وسنوات التقسيط (إن وجد)', 'Down Payment & Years')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value ? Number(e.target.value) : '')}
                        placeholder="المقدم ج.م"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="number"
                        value={installmentYears}
                        onChange={(e) => setInstallmentYears(e.target.value ? Number(e.target.value) : '')}
                        placeholder="السنوات"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 3: TITLE, LOCATION & ADDRESS (العنوان والموقع) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {t('عنوان العقار والموقع الجغرافي والحي', 'Property Title, Location & Landmark')}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('عنوان العقار الإعلاني (اسم الوحدة المعروضة) *', 'Property Title *')}
                    </label>
                    <input
                      type="text"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      placeholder="مثال: شقة فندقية فاخرة للإيجار بمساكن شيراتون مربع الوزراء خطوات من المطار"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Region */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t('المنطقة والحي الرئيسي', 'Prime Area')} *
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value as RegionArea)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="sheraton">{t('مساكن شيراتون المطار', 'Masaken Sheraton')}</option>
                        <option value="heliopolis">{t('مصر الجديدة (الكوربة / الميرغني / العروبة)', 'Heliopolis')}</option>
                        <option value="nozha">{t('النزهة والنزهة الجديدة', 'El Nozha')}</option>
                        <option value="nasr-city">{t('مدينة نصر (عباس العقاد / مكرم عبيد)', 'Nasr City')}</option>
                        <option value="new-cairo">{t('القاهرة الجديدة والتجمع الخامس', 'New Cairo')}</option>
                        <option value="other">{t('مناطق أخرى (الشيخ زايد / الساحل / العاصمة)', 'Other')}</option>
                      </select>
                    </div>

                    {/* Sub-location / street */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t('العنوان التفصيلي والمعالم القريبة', 'Detailed Address & Landmark')}
                      </label>
                      <input
                        type="text"
                        value={subLocation}
                        onChange={(e) => setSubLocation(e.target.value)}
                        placeholder="مثال: شارع عبد الحميد بدوي، مربع الوزراء، بجوار كنيسة الملاك وفندق راديسون"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 4: SPECIFICATIONS & SPACES (المواصفات والمساحات) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-black">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {t('المواصفات، المساحة، والتقسيم الداخلي', 'Specifications, Spaces & Layout')}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {/* Space */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('المساحة (م²) *', 'Space (m²) *')}
                    </label>
                    <input
                      type="number"
                      value={spaceM2}
                      onChange={(e) => setSpaceM2(e.target.value ? Number(e.target.value) : '')}
                      placeholder="مثال: 180"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('عدد الغرف', 'Bedrooms')}
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>{t('1 غرفة / استوديو', '1 Bed / Studio')}</option>
                      <option value={2}>{t('2 غرف نوم', '2 Beds')}</option>
                      <option value={3}>{t('3 غرف نوم', '3 Beds')}</option>
                      <option value={4}>{t('4 غرف نوم', '4 Beds')}</option>
                      <option value={5}>{t('5 غرف نوم', '5 Beds')}</option>
                      <option value={6}>{t('6+ غرف وقصور', '6+ Beds')}</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('عدد الحمامات', 'Bathrooms')}
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>1 حمام</option>
                      <option value={2}>2 حمام</option>
                      <option value={3}>3 حمامات</option>
                      <option value={4}>4 حمامات فأكثر</option>
                    </select>
                  </div>

                  {/* Floor */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('رقم الدور / الطابق', 'Floor / Level')}
                    </label>
                    <input
                      type="text"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      placeholder="مثال: الدور الثالث"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Finishing */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('مستوى التشطيب', 'Finishing')}
                    </label>
                    <select
                      value={finishing}
                      onChange={(e) => setFinishing(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="الترا سوبر لوكس">{t('الترا سوبر لوكس', 'Ultra Super Lux')}</option>
                      <option value="سوبر لوكس">{t('سوبر لوكس', 'Super Lux')}</option>
                      <option value="مفروش فاخر">{t('مفروش فاخر بالكامل', 'Fully Furnished')}</option>
                      <option value="تشطيب فندقي فاخر">{t('تشطيب فندقي فاخر', 'Hotel Luxury')}</option>
                      <option value="نصف تشطيب">{t('نصف تشطيب (محارة وحلوق)', 'Semi Finished')}</option>
                      <option value="على المحارة">{t('على المحارة', 'Core & Shell')}</option>
                    </select>
                  </div>

                  {/* Delivery Status */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      {t('موعد الاستلام', 'Delivery')}
                    </label>
                    <select
                      value={deliveryStatus}
                      onChange={(e) => setDeliveryStatus(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="ready">{t('استلام فوري جاهز', 'Immediate')}</option>
                      <option value="under_construction">{t('تحت الإنشاء', 'Under Construction')}</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {t('وصف تفصيلي للوحدة والمزايا الإضافية', 'Detailed Description')}
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب نبذة عن تقسيم الوحدة، الواجهة، فيو الشارع، وقربها من الخدمات..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 5: AMENITIES & FEATURES (المميزات والمرافق) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-black">
                    5
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {t('المميزات الحصرية والمرافق المتوفرة', 'Amenities & Luxury Features')}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 mb-3">
                  {t('انقر لاختيار المرافق المتوفرة بالوحدة لإبرازها في بطاقة العرض:', 'Select available facilities to display badges on the card:')}
                </p>

                <div className="flex flex-wrap gap-2">
                  {COMMON_FEATURES.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-sm'
                            : 'bg-black/40 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center ${isChecked ? 'bg-amber-400 text-slate-950 font-black' : 'border border-slate-600'}`}>
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 6: MEDIA & PHOTOS (الصور ومعرض الوسائط) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">
                      6
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {t('الصور والمعرض المرئي للوحدة', 'Media & High-Res Photography')}
                    </h3>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-bold">
                    {t('اختر نموذج فوري بنقرة واحدة أو الصق رابط صورة', 'Choose 1-Click Preset or Paste URL')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Preview & URL */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t('رابط الصورة الرئيسية', 'Image URL')}
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    {/* Presets Grid */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                        {t('نماذج صور احترافية مجهزة لهذا القسم:', 'Preset gallery options for this section:')}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {currentCategoryPresets.map((imgSrc, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectPresetImage(imgSrc)}
                            className={`relative aspect-video rounded-xl overflow-hidden border cursor-pointer group transition-all ${
                              imageUrl === imgSrc ? 'ring-2 ring-amber-400 border-amber-400' : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <img src={imgSrc} alt="Preset" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            {imageUrl === imgSrc && (
                              <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                                <span className="p-1 rounded-full bg-amber-400 text-slate-950">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Card Preview */}
                  <div className="p-3 bg-black/60 rounded-2xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 mb-2">
                        {t('معاينة بطاقة العقار:', 'Card Preview:')}
                      </div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10 mb-2">
                        <img src={imageUrl || heroSheratonImg} alt="Preview" className="w-full h-full object-cover" />
                        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-md ${currentClassification.badgeBg} ${currentClassification.iconColor}`}>
                          {currentClassification.nameAr}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {titleAr || 'عنوان العقار المعروض'}
                      </div>
                      <div className="text-xs font-bold text-amber-400 mt-0.5">
                        {price ? Number(price).toLocaleString('en-US') : '0'} {purpose === 'rent' ? 'ج.م / شهرياً' : 'ج.م'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 7: PUBLISHER & CONTACT (بيانات المعلن والتواصل) */}
              {/* ======================================================== */}
              <div className="rounded-2xl p-5 bg-[#0D111E] border border-white/10">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-black">
                    7
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {t('بيانات المالك / المعلن والتواصل المباشر', 'Publisher / Owner & Direct Contact')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('صفة المعلن', 'Listing Role')}
                    </label>
                    <select
                      value={ownerType}
                      onChange={(e) => setOwnerType(e.target.value as ListingSource)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="owner">{t('مالك أصلي مباشر (0% عمولة)', 'Direct Owner')}</option>
                      <option value="almasreya">{t('المصرية للعقارات (حصري موثق)', 'Al Masreya Exclusive')}</option>
                      <option value="broker">{t('وسيط عقاري معتمد', 'Certified Broker')}</option>
                      <option value="developer">{t('شركة تطوير عقاري', 'Developer')}</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('اسم المعلن أو المالك', 'Contact Name')}
                    </label>
                    <input
                      type="text"
                      value={publisherName}
                      onChange={(e) => setPublisherName(e.target.value)}
                      placeholder="مثال: م. أحمد عبد الرحمن"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('رقم الهاتف للتواصل', 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      value={publisherPhone}
                      onChange={(e) => setPublisherPhone(e.target.value)}
                      placeholder="01286429815"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      dir="ltr"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t('رقم الواتساب', 'WhatsApp Number')}
                    </label>
                    <input
                      type="tel"
                      value={publisherWhatsApp}
                      onChange={(e) => setPublisherWhatsApp(e.target.value)}
                      placeholder="01280822224"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-[#090C15]/95 backdrop-blur-xl py-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    {t('سيتم توثيق العقار ونشره فوراً في تبويب ومحرك البحث', 'Property will be verified and published instantly to category filters')}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t('إلغاء', 'Cancel')}
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none py-3 px-8 rounded-xl text-xs sm:text-sm font-black text-slate-950 transition-all cursor-pointer shadow-[0_0_25px_rgba(212,160,23,0.4)] bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>{t('نشر وإضافة العقار الآن بجميع الأقسام', 'Publish Property with All Sections')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
