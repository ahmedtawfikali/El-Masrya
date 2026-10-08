import React, { useState } from 'react';
import { 
  Search, MapPin, Building, DollarSign, Bed, Phone, MessageSquare, 
  Sparkles, CheckCircle2, ChevronDown, ArrowRight, Shield 
} from 'lucide-react';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { PropertyPurpose, RegionArea } from '../types';

interface CinematicHeroProps {
  onSearchSubmit: (filters: {
    purpose: PropertyPurpose;
    area: RegionArea | 'all';
    category: string;
    priceRange: string;
    bedrooms: string;
  }) => void;
  onExploreProperties: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onSearchSubmit,
  onExploreProperties,
}) => {
  const { t, isRtl } = useLanguage();
  
  // Search Bar State
  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [area, setArea] = useState<RegionArea | 'all'>('all');
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [bedrooms, setBedrooms] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      purpose,
      area,
      category,
      priceRange,
      bedrooms,
    });
    onExploreProperties();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden" id="hero">
      
      {/* 1. LAYER: SATELLITE & ARCHITECTURAL ILLUMINATION BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Vignette & Deep Obsidian Void */}
        <div className="absolute inset-0 bg-[#05060A]" />
        
        {/* Animated Gold & Blue Plasma Aurora Drift */}
        <div 
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-25 blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,160,23,0.6) 0%, rgba(43,168,255,0.3) 45%, transparent 70%)',
          }}
        />

        {/* Subtle Architectural Skyline Vector Silhouette */}
        <div className="absolute bottom-0 inset-x-0 h-96 opacity-15 pointer-events-none flex items-end justify-center">
          <svg viewBox="0 0 1200 320" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4A017" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#05060A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect x="80" y="160" width="50" height="160" fill="url(#skyGrad)" />
            <rect x="150" y="110" width="70" height="210" fill="url(#skyGrad)" />
            <rect x="250" y="70" width="85" height="250" fill="url(#skyGrad)" />
            <rect x="360" y="140" width="60" height="180" fill="url(#skyGrad)" />
            <polygon points="510,30 460,320 560,320" fill="url(#skyGrad)" />
            <rect x="580" y="90" width="80" height="230" fill="url(#skyGrad)" />
            <rect x="690" y="120" width="75" height="200" fill="url(#skyGrad)" />
            <rect x="790" y="50" width="90" height="270" fill="url(#skyGrad)" />
            <rect x="910" y="100" width="65" height="220" fill="url(#skyGrad)" />
            <rect x="1000" y="150" width="75" height="170" fill="url(#skyGrad)" />
          </svg>
        </div>

        {/* Glowing Gold & Blue Wave Divider Line at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent opacity-50" />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Top Badge: Verified & 24/7 Official Masaken Sheraton */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-[#D4A017]/30 text-xs font-bold text-white mb-6 shadow-[0_0_20px_rgba(212,160,23,0.15)] animate-in fade-in">
          <Shield className="w-3.5 h-3.5 text-[#F7D774]" />
          <span className="text-[#F7D774]">
            {t(SITE_CONFIG.brand.officialTagAr, SITE_CONFIG.brand.officialTagEn)}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            {t('مساكن شيراتون ومحيط شرق القاهرة', 'Masaken Sheraton & East Cairo')}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* Cinematic Animated Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Reem_Kufi',sans-serif] font-bold tracking-tight text-white leading-[1.18] max-w-4xl mb-6 text-balance">
          {t('اعثر على عقار أحلامك مع', 'Find Your Dream Property with')}
          <span className="block mt-2 bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(212,160,23,0.45)]">
            {t(SITE_CONFIG.brand.nameAr, SITE_CONFIG.brand.nameEn)}
          </span>
        </h1>

        {/* Subtitle with Focus Areas */}
        <p className="text-sm sm:text-base md:text-lg text-[#B9BCC7] max-w-3xl leading-relaxed mb-8 text-balance font-['Tajawal',sans-serif]">
          {t(
            'منظومة عقارية متكاملة: إيجار، بيع، تمليك، إداري، تجاري، مفروش، ومحلات بأعلى معايير المصداقية والأمان القانوني في مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر.',
            'Comprehensive marketplace: Rent, Sale, Ownership, Corporate Offices, Commercial, Luxury Furnished, and Retail with trusted credibility across Masaken Sheraton, Heliopolis, El Nozha, and Nasr City.'
          )}
        </p>

        {/* 3. BLACK CAPSULE PHONE BANNER WITH GLOWING GOLD/BLUE DUAL BORDER (Mandatory Phase 1) */}
        <div className="w-full max-w-3xl mb-10 group">
          <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-[#D4A017] via-[#2BA8FF] to-[#D4A017] shadow-[0_0_25px_rgba(212,160,23,0.25)] hover:shadow-[0_0_35px_rgba(43,168,255,0.35)] transition-all duration-300">
            <div className="rounded-full bg-[#05060A]/95 backdrop-blur-2xl px-5 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
              
              {/* Left Label */}
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/50 text-[#F7D774]">
                  <Phone className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white font-['Tajawal',sans-serif]">
                  {t('الخط الساخن والحجز الفوري (24/7):', 'Instant Hotline & 24/7 Booking:')}
                </span>
              </div>

              {/* The 3 Phones in Glowing Format */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono font-bold text-xs sm:text-sm" dir="ltr">
                {SITE_CONFIG.contact.phones.map((phone) => (
                  <div key={phone.number} className="flex items-center gap-1.5 group/ph">
                    <a
                      href={getTelUrl(phone.number)}
                      className="text-white group-hover/ph:text-[#F7D774] transition-colors hover:underline tracking-wider"
                    >
                      {phone.display}
                    </a>
                    <a
                      href={getWhatsAppUrl(phone.number, t(phone.whatsappMessageAr, phone.whatsappMessageEn))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                      title="WhatsApp Direct"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* 4. GLASS 2.0 ADVANCED SEARCH BAR (Buy/Rent Tabs, Location, Type, Price, Beds) */}
        <div className="w-full max-w-4xl rounded-3xl bg-[#0B0E17]/85 backdrop-blur-3xl border border-white/[0.12] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-right">
          
          {/* Buy vs Rent Sliding Segmented Control */}
          <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10">
              <button
                type="button"
                onClick={() => setPurpose('sale')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  purpose === 'sale'
                    ? 'bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_20px_rgba(212,160,23,0.35)]'
                    : 'text-[#B9BCC7] hover:text-white'
                }`}
              >
                {t('بيع وتمليك', 'For Sale / Buy')}
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_20px_rgba(212,160,23,0.35)]'
                    : 'text-[#B9BCC7] hover:text-white'
                }`}
              >
                {t('إيجار (سكني / إداري / مفروش)', 'For Rent')}
              </button>
            </div>

            <span className="hidden sm:inline text-xs text-[#D4A017] font-semibold font-mono">
              {t('+520 عقار متوفر حالياً', '+520 Live Properties')}
            </span>
          </div>

          {/* Form Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* 1. Location */}
            <div>
              <label className="block text-[11px] font-bold text-[#B9BCC7] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2BA8FF]" />
                <span>{t('المنطقة والحي', 'Location')}</span>
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as any)}
                className="w-full bg-[#05060A]/80 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#D4A017] transition-colors"
              >
                <option value="all">{t('كافة المناطق', 'All Locations')}</option>
                <option value="sheraton">{t('مساكن شيراتون المطار', 'Masaken Sheraton')}</option>
                <option value="heliopolis">{t('مصر الجديدة (الكوربة / الميرغني)', 'Heliopolis')}</option>
                <option value="nozha">{t('النزهة والنزهة الجديدة', 'El Nozha')}</option>
                <option value="nasr-city">{t('مدينة نصر (عباس / مكرم)', 'Nasr City')}</option>
                <option value="new-cairo">{t('القاهرة الجديدة والتجمع', 'New Cairo')}</option>
              </select>
            </div>

            {/* 2. Property Type */}
            <div>
              <label className="block text-[11px] font-bold text-[#B9BCC7] mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>{t('نوع العقار', 'Property Type')}</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#05060A]/80 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#D4A017] transition-colors"
              >
                <option value="all">{t('جميع التصنيفات (12 فئة معتمدة)', 'All Types')}</option>
                <option value="hotel_apartment">{t('🏨 شقق فندقية ومفروشة', 'Hotel Apartments')}</option>
                <option value="villas">{t('🏰 فيلات وقصور مستقلة', 'Luxury Villas')}</option>
                <option value="studios">{t('📐 استوديوهات ذكية', 'Smart Studios')}</option>
                <option value="apartments">{t('🏢 شقق سكنية وتمليك', 'Apartments')}</option>
                <option value="duplex">{t('🥞 دوبلكس وبنتهاوس', 'Duplex & Penthouse')}</option>
                <option value="offices">{t('💼 مقرات إدارية ومكاتب', 'Offices & HQs')}</option>
                <option value="shops">{t('🏪 محلات وتجاري', 'Retail & Shops')}</option>
                <option value="chalets">{t('🌴 شاليهات ومصايف', 'Chalets & Coastal')}</option>
                <option value="clinics">{t('🩺 عيادات ومراكز طبية', 'Clinics & Medical')}</option>
              </select>
            </div>

            {/* 3. Price Range */}
            <div>
              <label className="block text-[11px] font-bold text-[#B9BCC7] mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('الميزانية والسعر', 'Price Range')}</span>
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#05060A]/80 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#D4A017] transition-colors"
              >
                <option value="all">{t('أي سعر', 'Any Price')}</option>
                {purpose === 'sale' ? (
                  <>
                    <option value="under_3m">{t('أقل من 3 مليون ج.م', 'Under 3M EGP')}</option>
                    <option value="3m_6m">{t('3 - 6 مليون ج.م', '3M - 6M EGP')}</option>
                    <option value="6m_10m">{t('6 - 10 مليون ج.م', '6M - 10M EGP')}</option>
                    <option value="above_10m">{t('أكثر من 10 مليون ج.م', 'Above 10M EGP')}</option>
                  </>
                ) : (
                  <>
                    <option value="under_20k">{t('أقل من 20 ألف ج.م / شهر', 'Under 20k/mo')}</option>
                    <option value="20k_40k">{t('20 - 40 ألف ج.م / شهر', '20k - 40k/mo')}</option>
                    <option value="40k_70k">{t('40 - 70 ألف ج.م / شهر', '40k - 70k/mo')}</option>
                    <option value="above_70k">{t('أكثر من 70 ألف ج.م / شهر', 'Above 70k/mo')}</option>
                  </>
                )}
              </select>
            </div>

            {/* 4. Bedrooms */}
            <div>
              <label className="block text-[11px] font-bold text-[#B9BCC7] mb-1.5 flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#2BA8FF]" />
                <span>{t('عدد الغرف', 'Bedrooms')}</span>
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#05060A]/80 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#D4A017] transition-colors"
              >
                <option value="all">{t('الكل', 'Any')}</option>
                <option value="1">{t('غرفة واحدة (استوديو)', '1 Bedroom')}</option>
                <option value="2">{t('غرفتان', '2 Bedrooms')}</option>
                <option value="3">{t('3 غرف نوم', '3 Bedrooms')}</option>
                <option value="4+">{t('4 غرف فأكثر', '4+ Bedrooms')}</option>
              </select>
            </div>

            {/* 5. Submit CTA Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black text-[#05060A] transition-all cursor-pointer shadow-[0_0_25px_rgba(212,160,23,0.4)] bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{t('بحث في العقارات', 'Search Now')}</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </section>
  );
};
