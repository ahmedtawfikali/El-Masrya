import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const StatsCounters: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 bg-[#05060A] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SITE_CONFIG.stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 rounded-3xl bg-[#0B0E17]/60 backdrop-blur-xl border border-white/[0.06] text-center hover:border-[#D4A017]/40 transition-all hover:shadow-[0_0_25px_rgba(212,160,23,0.12)]"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-['Reem_Kufi',sans-serif] font-bold bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(212,160,23,0.3)] mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#B9BCC7] font-['Tajawal',sans-serif]">
                {t(stat.labelAr, stat.labelEn)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
