import React from 'react';
import { 
  Building, Key, Bed, Briefcase, TrendingUp, Store, Award, ShieldCheck, ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const ServicesShowcase: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building': return <Building className="w-5 h-5 text-[#F7D774]" />;
      case 'Key': return <Key className="w-5 h-5 text-[#2BA8FF]" />;
      case 'Bed': return <Bed className="w-5 h-5 text-[#F7D774]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#2BA8FF]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Store': return <Store className="w-5 h-5 text-[#FF5A2E]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#F7D774]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default: return <Building className="w-5 h-5 text-[#F7D774]" />;
    }
  };

  return (
    <section className="py-20 bg-[#07090e] relative border-t border-white/[0.08]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#D4A017] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
            <span>{t('منظومة الخدمات المتكاملة', 'Integrated Services Spectrum')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
            {t('خدمات المصرية للعقارات (مساكن شيراتون)', 'Al Masreya Real Estate Services')}
          </h2>
          <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 leading-relaxed">
            {t(
              'المكتب بيقدّملك مجموعة كبيرة من الخدمات: إيجار، بيع، تمليك، إداري، تجاري، مفروش، محلات، وجميع خدمات العقارات اللي تحتاجها بأعلى دقة واحترافية قانونية.',
              'The agency provides a full spectrum of real estate solutions: Rent, Sale, Ownership, Corporate Offices, Commercial Assets, Furnished Residences, Retail, and complete property advisory.'
            )}
          </p>
        </div>

        {/* 8 Services Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE_CONFIG.services.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-[#0B0E17]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-[#D4A017]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,160,23,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F7D774] transition-colors mb-2">
                  {t(service.nameAr, service.nameEn)}
                </h3>

                <p className="text-xs text-[#B9BCC7] leading-relaxed font-['Tajawal',sans-serif]">
                  {t(service.descAr, service.descEn)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#2BA8FF] font-semibold">
                <span>{t('معاينة وتعاقد رسمي', 'Official Contract')}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
