import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building, MapPin, Eye, Phone, MessageSquare, Sparkles, 
  Check, ShieldCheck, ArrowLeft, Heart, Share2, Layers, SearchX, PlusCircle
} from 'lucide-react';
import { Property, PropertyPurpose, RegionArea } from '../types';
import { PROPERTIES, COMPANY_INFO } from '../data/properties';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { PropertyCategoriesBar } from './PropertyCategoriesBar';
import { 
  getClassificationForCategory, 
  getCategoryIcon, 
  PROPERTY_CLASSIFICATIONS 
} from '../config/propertyCategories';

interface FeaturedListingsProps {
  onSelectProperty: (property: Property) => void;
  onOpenInPosterStudio?: (property: Property) => void;
  onOpenAddProperty?: () => void;
  properties?: Property[];
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  onSelectProperty,
  onOpenInPosterStudio,
  onOpenAddProperty,
  properties,
  selectedCategory: externalSelectedCategory,
  onSelectCategory: externalOnSelectCategory,
}) => {
  const { t, isRtl } = useLanguage();
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const [filterTab, setFilterTab] = useState<'all' | 'sale' | 'rent' | 'furnished' | 'commercial' | 'owner' | 'developer'>('all');
  const [selectedArea, setSelectedArea] = useState<RegionArea | 'all'>('all');

  const activeCategory = externalSelectedCategory !== undefined ? externalSelectedCategory : internalCategory;

  const handleCategoryChange = (categoryId: string) => {
    if (externalOnSelectCategory) {
      externalOnSelectCategory(categoryId);
    } else {
      setInternalCategory(categoryId);
    }
  };

  const sourceProperties = properties && properties.length > 0 ? properties : PROPERTIES;

  // Filter properties
  const filteredListings = useMemo(() => {
    return sourceProperties.filter((prop) => {
      // 1. Purpose & Source filter tabs
      if (filterTab === 'sale' && prop.purpose !== 'sale') return false;
      if (filterTab === 'rent' && prop.purpose !== 'rent') return false;
      if (filterTab === 'furnished' && prop.category !== 'furnished' && prop.category !== 'hotel_apartment') return false;
      if (filterTab === 'commercial' && prop.category !== 'administrative' && prop.category !== 'retail') return false;
      if (filterTab === 'owner' && prop.ownerType !== 'owner') return false;
      if (filterTab === 'developer' && prop.ownerType !== 'developer') return false;
      
      // 2. Area filter
      if (selectedArea !== 'all' && prop.area !== selectedArea) return false;

      // 3. Category classification filter
      if (activeCategory && activeCategory !== 'all') {
        if (activeCategory === 'hotel_apartment') {
          if (prop.category !== 'hotel_apartment' && prop.category !== 'furnished') return false;
        } else if (activeCategory === 'villa') {
          if (prop.category !== 'villa' && prop.category !== 'townhouse' && prop.category !== 'twinhouse') return false;
        } else if (activeCategory === 'studio') {
          if (prop.category !== 'studio') return false;
        } else if (activeCategory === 'apartment') {
          if (prop.category !== 'apartment') return false;
        } else if (activeCategory === 'duplex') {
          if (prop.category !== 'duplex' && prop.category !== 'penthouse') return false;
        } else if (activeCategory === 'administrative') {
          if (prop.category !== 'administrative') return false;
        } else if (activeCategory === 'retail') {
          if (prop.category !== 'retail') return false;
        } else if (activeCategory === 'chalet') {
          if (prop.category !== 'chalet') return false;
        } else if (activeCategory === 'clinic') {
          if (prop.category !== 'clinic') return false;
        } else if (activeCategory === 'land') {
          if (prop.category !== 'land' && prop.category !== 'building' && prop.category !== 'warehouse') return false;
        } else {
          if (prop.category !== activeCategory) return false;
        }
      }

      return true;
    });
  }, [sourceProperties, filterTab, selectedArea, activeCategory]);

  const currentClassificationItem = PROPERTY_CLASSIFICATIONS.find((c) => c.id === activeCategory);

  return (
    <section className="py-20 bg-[#07090e] relative border-t border-white/[0.08]" id="properties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F7D774] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('معاينة فورية وسندات ملكية موثقة', 'Direct Inspection & Verified Titles')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('العقارات المميزة والحصرية (شرق القاهرة)', 'Featured & Exclusive Listings (East Cairo)')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'عقارات موثقة تابعة لشركة المصرية للعقارات تظهر أولاً بشارة الأمان الذهبية، مصنفة بدقة لتسهيل التصفح السريع.',
                'Verified properties by Al Masreya Real Estate categorized with bespoke icons for intuitive browsing.'
              )}
            </p>
          </div>

          {/* Quick Purpose Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#0B0E17] border border-white/10">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_15px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('جميع العروض', 'All Listings')}
            </button>
            <button
              onClick={() => setFilterTab('sale')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'sale'
                  ? 'bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_15px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('بيع وتمليك', 'For Sale')}
            </button>
            <button
              onClick={() => setFilterTab('rent')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'rent'
                  ? 'bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_15px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('إيجار جديد', 'For Rent')}
            </button>
            <button
              onClick={() => setFilterTab('owner')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'owner'
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-[#05060A] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              {t('من المالك مباشرة', 'Direct from Owner')}
            </button>
            <button
              onClick={() => setFilterTab('developer')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'developer'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-[#05060A] shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              {t('مشروعات المطورين', 'Developer Units')}
            </button>
          </div>
        </div>

        {/* PROPERTY CLASSIFICATION SYSTEM BAR (Featured Component with Icons) */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl bg-[#090C14]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <PropertyCategoriesBar
            selectedCategoryId={activeCategory}
            onSelectCategory={handleCategoryChange}
            properties={sourceProperties}
            showTaglineBanner={true}
          />
        </div>

        {/* Listings Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>{t('عدد الوحدات المعروضة:', 'Matching Listings:')}</span>
            <span className="font-bold text-[#F7D774] text-sm">{filteredListings.length}</span>
            <span>{t('من إجمالي', 'of')} {sourceProperties.length} {t('وحدة معتمدة', 'verified units')}</span>
          </div>

          <div className="flex items-center gap-3">
            {activeCategory !== 'all' && currentClassificationItem && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-300">
                  {t('التصنيف المختار:', 'Active Type:')} <strong className="text-[#F7D774]">{t(currentClassificationItem.shortNameAr, currentClassificationItem.shortNameEn)}</strong>
                </span>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  {t('(عرض الكل)', '(Show all)')}
                </button>
              </div>
            )}

            {onOpenAddProperty && (
              <button
                onClick={onOpenAddProperty}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-amber-500/15 to-amber-600/20 hover:from-amber-400/30 hover:to-amber-500/30 border border-amber-400/40 text-amber-300 hover:text-white font-bold text-xs transition-all shadow-sm cursor-pointer active:scale-95"
                title={t('أضف عقارك الآن في هذا القسم أو كافة الأقسام', 'Add Property to Any Category')}
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('إضافة عقار جديد (كافة الأقسام) +', 'Add Property (All Sections) +')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Listings Cards Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((prop) => {
              const classItem = getClassificationForCategory(prop.category);

              return (
                <div
                  key={prop.id}
                  className="rounded-3xl bg-[#0B0E17]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-[#D4A017]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(212,160,23,0.18)]"
                >
                  <div>
                    {/* Image Container with Badges */}
                    <div className="relative h-56 w-full overflow-hidden bg-black">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-transparent to-black/40" />

                      {/* Top-Right: Gold Verified Badge + Purpose */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                        <div className="px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-[#05060A] shadow-[0_0_15px_rgba(212,160,23,0.4)] flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#05060A]" />
                          <span>{t(SITE_CONFIG.brand.verifiedBadgeAr, SITE_CONFIG.brand.verifiedBadgeEn)}</span>
                        </div>

                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-black/80 text-white backdrop-blur-md border border-white/10">
                          {prop.purpose === 'sale' ? t('تمليك وبيع', 'Sale') : t('إيجار', 'Rent')}
                        </span>
                      </div>

                      {/* Top-Left: Category Classification Pill with Icon (One-click category filter) */}
                      <div className="absolute top-3 left-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryChange(classItem.id);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md border shadow-lg transition-transform hover:scale-105 cursor-pointer ${classItem.badgeBg} ${classItem.iconColor}`}
                          title={t(`تصفية حسب: ${classItem.nameAr}`, `Filter by: ${classItem.nameEn}`)}
                        >
                          {getCategoryIcon(classItem.iconName, 'w-3 h-3')}
                          <span>{t(classItem.shortNameAr, classItem.shortNameEn)}</span>
                        </button>
                      </div>

                      {/* Bottom: Location kicker */}
                      <div className="absolute bottom-3 right-3 left-3 text-white">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2BA8FF] truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#2BA8FF]" />
                          <span className="truncate">{prop.areaNameArabic} · {prop.subLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-slate-400">
                          {prop.finishing}
                        </span>
                        {prop.compoundName && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                            {prop.compoundName}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F7D774] transition-colors line-clamp-2 mb-3 leading-snug">
                        {prop.title}
                      </h3>

                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#B9BCC7] mb-4 pb-4 border-b border-white/[0.08]">
                        <span className="font-bold text-white font-mono">{prop.spaceM2} م²</span>
                        {prop.rooms && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span>{prop.rooms} {t('غرف', 'Rooms')}</span>
                          </>
                        )}
                        {prop.bathrooms && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span>{prop.bathrooms} {t('حمام', 'Baths')}</span>
                          </>
                        )}
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="truncate">{prop.floor || prop.finishing}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] text-slate-500 block mb-0.5">{t('السعر المطلوب:', 'Asking Price:')}</span>
                          <div className="text-lg sm:text-xl font-black text-[#F7D774] font-mono">
                            {prop.priceFormatted}
                            <span className="text-xs font-sans font-bold text-[#B9BCC7] mr-1">{prop.priceUnit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="p-5 pt-0 space-y-2">
                    
                    {/* Details Button + Poster trigger */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProperty(prop)}
                        className="w-full py-2 px-3 text-xs font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t('معاينة وتفاصيل', 'Details')}</span>
                      </button>

                      <button
                        onClick={() => onOpenInPosterStudio && onOpenInPosterStudio(prop)}
                        className="w-full py-2 px-3 text-xs font-bold text-[#F7D774] bg-[#D4A017]/10 hover:bg-[#D4A017]/20 border border-[#D4A017]/30 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                        title={t('تحويل لإعلان سوشيال ميديا فوري', 'Generate Social Ad')}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F7D774]" />
                        <span>{t('صمم بوستر', 'Ad Studio')}</span>
                      </button>
                    </div>

                    {/* Instant Dial + WhatsApp Direct Links */}
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={getTelUrl(SITE_CONFIG.contact.phones[0].number)}
                        className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-white/5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2BA8FF]" />
                        <span>{t('اتصال', 'Call')}</span>
                      </a>
                      <a
                        href={getWhatsAppUrl(
                          SITE_CONFIG.contact.phones[0].number,
                          `مرحباً المصرية للعقارات، أود الاستفسار عن الوحدة: ${prop.title} (${prop.priceFormatted} ${prop.priceUnit})`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-emerald-500/30"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>واتساب</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State when no properties match */
          <div className="py-16 px-6 text-center rounded-3xl bg-[#090C14] border border-white/10 max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {t('لا توجد وحدات معروضة حالياً تطابق هذا التصنيف', 'No units currently listed in this category')}
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {t(
                'لدينا طلبات وعقود حصرية غير معلنة في مساكن شيراتون ومصر الجديدة. تواصل مع مستشارنا العقاري وسنوفر لك طلبك فوراً.',
                'We have private off-market listings in Masaken Sheraton & Heliopolis. Contact our consultant and we will find your exact request.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all cursor-pointer"
              >
                {t('إظهار كافة العقارات', 'Show All Properties')}
              </button>
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.contact.phones[0].number,
                  `مرحباً المصرية للعقارات، أبحث عن عقار بتصنيف (${currentClassificationItem ? currentClassificationItem.nameAr : 'خاص'}) في مساكن شيراتون أو مصر الجديدة، برجاء موافاتي بالعروض المتاحة فوراً.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-slate-950 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('طلب عقار عبر واتساب', 'Request via WhatsApp')}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
