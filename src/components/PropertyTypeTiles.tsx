import React from 'react';
import { 
  Home, Castle, Palmtree, Layers, Sun, Maximize2, Grid, Columns, 
  Compass, Store, Briefcase, Cross, Box, Building2, Bed, ArrowLeft 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface PropertyTypeTilesProps {
  onSelectType: (typeId: string) => void;
}

export const PropertyTypeTiles: React.FC<PropertyTypeTilesProps> = ({ onSelectType }) => {
  const { t, isRtl } = useLanguage();

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5 text-[#F7D774]" />;
      case 'Castle': return <Castle className="w-5 h-5 text-[#F7D774]" />;
      case 'Palmtree': return <Palmtree className="w-5 h-5 text-[#2BA8FF]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#F7D774]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#F7D774]" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-[#2BA8FF]" />;
      case 'Grid': return <Grid className="w-5 h-5 text-[#F7D774]" />;
      case 'Columns': return <Columns className="w-5 h-5 text-[#F7D774]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#2BA8FF]" />;
      case 'Store': return <Store className="w-5 h-5 text-[#FF5A2E]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#2BA8FF]" />;
      case 'Cross': return <Cross className="w-5 h-5 text-emerald-400" />;
      case 'Box': return <Box className="w-5 h-5 text-[#B9BCC7]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#F7D774]" />;
      case 'Bed': return <Bed className="w-5 h-5 text-[#F7D774]" />;
      default: return <Home className="w-5 h-5 text-[#F7D774]" />;
    }
  };

  return (
    <section className="py-20 bg-[#05060A] relative border-t border-white/[0.08]" id="property-types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-bold text-[#D4A017] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
              <span>{t('تنوع عقاري شامل', 'Comprehensive Taxonomy')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('تصفح العقارات حسب التصنيف (15 فئة معتمدة)', 'Browse Properties by Type (15 Categories)')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'اختر تصنيفك المفضل للاطلاع على العروض المتاحة فوراً في مساكن شيراتون ومصر الجديدة وكافة أنحاء الجمهورية.',
                'Select your preferred property category to instantly filter verified listings across Sheraton, Heliopolis, and Egypt.'
              )}
            </p>
          </div>

          <div className="text-xs font-mono text-[#F7D774] bg-[#0B0E17] px-4 py-2 rounded-xl border border-[#D4A017]/30">
            {t('+520 وحدة معروضة للبيع والإيجار', '+520 Live Properties')}
          </div>
        </div>

        {/* 15 Property Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {SITE_CONFIG.propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className="group p-4 rounded-2xl bg-[#0B0E17]/70 backdrop-blur-xl border border-white/[0.08] hover:border-[#D4A017]/50 transition-all duration-300 text-right flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,160,23,0.18)] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3 w-full">
                <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 group-hover:border-[#D4A017]/40 group-hover:scale-110 transition-all">
                  {getIcon(type.icon)}
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4A017] bg-[#D4A017]/10 px-2 py-0.5 rounded-full border border-[#D4A017]/20">
                  {type.countEstimate}+
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F7D774] transition-colors leading-snug">
                  {t(type.nameAr, type.nameEn)}
                </h3>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{t('معاينة فورية', 'Instant Visit')}</span>
                  <ArrowLeft className={`w-3 h-3 text-[#D4A017] opacity-0 group-hover:opacity-100 transition-opacity ${isRtl ? '' : 'rotate-180'}`} />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
