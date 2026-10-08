import React, { useState } from 'react';
import { 
  X, Phone, MessageSquare, Sparkles, MapPin, Check, 
  Building, ShieldCheck, Navigation, Calculator, Calendar, DollarSign, Share2 
} from 'lucide-react';
import { Property } from '../types';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { getClassificationForCategory, getCategoryIcon } from '../config/propertyCategories';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenInPosterStudio: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onOpenInPosterStudio,
}) => {
  const { t, isRtl } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showLoanCalc, setShowLoanCalc] = useState(false);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanYears, setLoanYears] = useState(5);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const currentImage = activeImage || property.image;
  const allImages = [property.image, ...(property.additionalImages || [])];

  const getSourceBadge = () => {
    switch (property.ownerType) {
      case 'owner':
        return {
          label: t('معروض من المالك مباشرة (0% عمولة وسيط)', 'Direct from Owner (0% Broker Fee)'),
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        };
      case 'developer':
        return {
          label: t('طرح مباشر من المطور العقاري (أقساط)', 'Direct Developer Project (Installments)'),
          color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        };
      case 'broker':
        return {
          label: t('وسيط عقاري مسجل ومعتمد', 'Certified Registered Broker'),
          color: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        };
      default:
        return {
          label: t('حصري المصرية للعقارات (موثق)', 'Exclusive Al Masreya (Verified)'),
          color: 'bg-[#D4A017]/20 text-[#F7D774] border-[#D4A017]/40',
        };
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Google directions URL
  const directionsUrl = property.coordinates 
    ? `https://maps.google.com/?q=${property.coordinates.lat},${property.coordinates.lng}`
    : SITE_CONFIG.contact.getDirectionsUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/15 bg-[#090C15] text-[#B9BCC7]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image & Gallery */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={currentImage}
            alt={property.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090C15] via-transparent to-black/30" />
          
          {/* Top Badges */}
          <div className="absolute top-4 right-4 flex flex-wrap items-center gap-2">
            {(() => {
              const classItem = getClassificationForCategory(property.category);
              return (
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border backdrop-blur-md flex items-center gap-1.5 ${classItem.badgeBg} ${classItem.iconColor}`}>
                  {getCategoryIcon(classItem.iconName, 'w-3.5 h-3.5')}
                  <span>{t(classItem.nameAr, classItem.nameEn)}</span>
                </span>
              );
            })()}
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border backdrop-blur-md ${getSourceBadge().color}`}>
              {getSourceBadge().label}
            </span>
            {property.verifiedByAlMasreya && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D4A017]/30 text-[#F7D774] border border-[#D4A017]/50 flex items-center gap-1 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('موثق رسمياً', 'Verified')}</span>
              </span>
            )}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>{property.areaNameArabic} · {property.subLocation}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold">{property.title}</h2>
          </div>
        </div>

        {/* Thumbnails row */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-2 px-6 pt-3 overflow-x-auto bg-[#07090E]">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                  currentImage === img ? 'border-[#D4A017]' : 'border-white/10 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Price & Primary Specs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs text-slate-400 font-medium">{t('القيمة والمطلوب:', 'Price / Value:')}</div>
              <div className="text-2xl sm:text-3xl font-black text-[#F7D774] font-mono">
                {property.priceFormatted} <span className="text-sm font-sans font-bold text-slate-300">{property.priceUnit}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="text-center">
                <span className="block text-xs text-slate-500">{t('المساحة', 'Area')}</span>
                <span className="font-bold font-mono text-base text-white">{property.spaceM2} م²</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="text-center">
                <span className="block text-xs text-slate-500">{t('الغرف', 'Rooms')}</span>
                <span className="font-bold font-mono text-base text-white">{property.bedrooms || property.rooms || 3}</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="text-center">
                <span className="block text-xs text-slate-500">{t('الحمامات', 'Baths')}</span>
                <span className="font-bold font-mono text-base text-white">{property.bathrooms || 2}</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="text-center">
                <span className="block text-xs text-slate-500">{t('التشطيب', 'Finishing')}</span>
                <span className="font-bold text-xs text-cyan-300">{property.finishing}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-white mb-2">{t('تفاصيل العقار والموقع:', 'Property Details & Location:')}</h3>
            <p className="text-xs sm:text-sm text-[#B9BCC7] leading-relaxed">
              {isRtl ? property.description : (property.descriptionEn || property.description)}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-bold text-white mb-2.5">{t('المواصفات والامتيازات الملحقة:', 'Features & Inclusions:')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(isRtl ? property.features : (property.featuresEn || property.features)).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Installment Simulator Toggle */}
          <div className="p-4 rounded-2xl bg-[#05060A] border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Calculator className="w-4 h-4 text-[#D4A017]" />
                <span>{t('حاسبة الأقساط والتمويل العقاري', 'Installment & Financing Calculator')}</span>
              </div>
              <button
                onClick={() => setShowLoanCalc(!showLoanCalc)}
                className="text-xs text-[#D4A017] hover:underline font-bold cursor-pointer"
              >
                {showLoanCalc ? t('إخفاء الحاسبة', 'Hide Calculator') : t('فتح الحاسبة', 'Open Calculator')}
              </button>
            </div>

            {showLoanCalc && (
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">{t('نسبة المقدم', 'Down Payment')}</label>
                  <select
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full bg-[#0A0D18] border border-white/15 rounded-xl p-2 text-white"
                  >
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={30}>30%</option>
                    <option value={50}>50%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{t('مدة التقسيط', 'Years')}</label>
                  <select
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full bg-[#0A0D18] border border-white/15 rounded-xl p-2 text-white"
                  >
                    <option value={1}>{t('سنة واحدة', '1 Year')}</option>
                    <option value={3}>{t('3 سنوات', '3 Years')}</option>
                    <option value={5}>{t('5 سنوات', '5 Years')}</option>
                    <option value={7}>{t('7 سنوات', '7 Years')}</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="p-2 rounded-xl bg-[#090C15] border border-[#D4A017]/30 text-center">
                    <span className="text-[10px] text-slate-400 block">{t('القسط الشهري التقديري', 'Est. Monthly')}</span>
                    <span className="font-bold text-[#F7D774] text-xs">
                      {Math.round((property.price * (1 - downPaymentPct / 100)) / (loanYears * 12)).toLocaleString()} {t('ج.م', 'EGP')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  onOpenInPosterStudio(property);
                  onClose();
                }}
                className="flex items-center gap-1.5 py-2.5 px-3.5 bg-[#D4A017]/10 hover:bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#F7D774] font-bold rounded-xl text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(212,160,23,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('تحويل لبوستر إعلاني', 'Social Ad Studio')}</span>
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 py-2.5 px-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('الاتجاهات على الخريطة', 'Get Directions')}</span>
              </a>

              <button
                onClick={handleCopyShare}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer"
                title={t('مشاركة رابط العقار', 'Share')}
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copiedLink && (
                <span className="text-[10px] text-emerald-400 font-bold">{t('تم النسخ!', 'Copied!')}</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={getTelUrl(SITE_CONFIG.contact.phones[0].number)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>{t('اتصل للمعاينة', 'Call Inspection')}</span>
              </a>

              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.contact.phones[0].number,
                  `مرحباً المصرية للعقارات، أود حجز معاينة فورية للعقار (${property.id}): ${property.title} في ${property.areaNameArabic}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('واتساب فوري', 'WhatsApp')}</span>
              </a>
            </div>

          </div>

          <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-white/5">
            {t('المصرية للعقارات – مساكن شيراتون · خدمة المعاينات والاستشارات متاحة 24/7', 'Al Masreya Real Estate · Masaken Sheraton · 24/7 Viewings')}
          </div>

        </div>

      </div>
    </div>
  );
};
