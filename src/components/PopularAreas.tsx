import React from 'react';
import { MapPin, Navigation, ArrowLeft, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { RegionArea } from '../types';

interface PopularAreasProps {
  onSelectArea: (areaId: RegionArea) => void;
}

export const PopularAreas: React.FC<PopularAreasProps> = ({ onSelectArea }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-[#05060A] relative border-t border-white/[0.08]" id="areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Directions CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-bold text-[#2BA8FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2BA8FF]" />
              <span>{t('النطاق الجغرافي الأقوى بشرق القاهرة', 'East Cairo Strategic Zones')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('المناطق الحيوية الأكثر طلباً 2027', 'Prime Egyptian Focus Areas')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'التركيز الأساسي لشركة المصرية للعقارات مع تغطية شاملة لكافة أحياء القاهرة الكبرى والعاصمة الإدارية.',
                'The core geographical footprint of Al Masreya Real Estate with full coverage of Greater Cairo and Egypt.'
              )}
            </p>
          </div>

          {/* "Get Directions" Button (Mandatory Phase 1 Requirement) */}
          <a
            href={SITE_CONFIG.contact.getDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#D4A017]/40 text-xs sm:text-sm font-bold text-[#F7D774] transition-all shadow-[0_0_20px_rgba(212,160,23,0.1)] hover:border-[#D4A017]"
          >
            <Navigation className="w-4 h-4 text-[#D4A017]" />
            <span>{t('الاتجاهات إلى مقر شيراتون', 'Get Directions to Sheraton HQ')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* 4 Prime Areas Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.mainAreas.map((area) => (
            <div
              key={area.id}
              className="p-6 sm:p-7 rounded-3xl bg-[#0B0E17]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-[#D4A017]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)]"
            >
              <div>
                
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[#D4A017] group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-[#2BA8FF]" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#F7D774] transition-colors">
                        {t(area.nameAr, area.nameEn)}
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-['Tajawal',sans-serif]">
                        {t(area.subtitleAr, area.subtitleEn)}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[#F7D774] bg-[#D4A017]/10 px-2.5 py-1 rounded-full border border-[#D4A017]/30">
                    2027 Prime
                  </span>
                </div>

                {/* Popular Property Types in this area */}
                <div className="my-5 p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-bold text-[#B9BCC7] block mb-2">
                    {t('أبرز أنواع الوحدات المتوفرة:', 'Popular Unit Profiles:')}
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {(isRtl ? area.popularTypesAr : area.popularTypesEn).map((type, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-200 border border-white/5 text-[11px]"
                      >
                        ▪️ {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SEO Landing Page Link (Mandatory Phase 1 Requirement) */}
                <div className="text-xs text-[#2BA8FF] font-semibold flex items-center gap-1.5 pt-2">
                  <span>{t('صفحة مخصصة:', 'SEO Landing:')}</span>
                  <span className="hover:underline cursor-pointer">
                    {t(area.seoLandingKeywordAr, area.seoLandingKeywordEn)}
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => onSelectArea(area.id as any)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10 group-hover:border-[#D4A017]/40"
                >
                  <span>{t(`عرض عقارات ${area.nameAr}`, `Browse ${area.nameEn} Properties`)}</span>
                  <ArrowLeft className={`w-3.5 h-3.5 text-[#F7D774] ${isRtl ? '' : 'rotate-180'}`} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
