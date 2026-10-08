import React from 'react';
import { 
  Phone, MessageSquare, MapPin, Navigation, Clock, ShieldCheck, 
  ExternalLink, Heart, ArrowUp, Mail 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] text-[#B9BCC7] border-t border-white/[0.08] relative pt-16 pb-12 overflow-hidden" id="contact">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4A017]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-white/[0.08]">
          
          {/* Col 1: Vertical Logo & About */}
          <div className="space-y-4 flex flex-col items-start">
            <BrandLogo variant="vertical" size="md" />

            <p className="text-xs text-[#B9BCC7] leading-relaxed font-['Tajawal',sans-serif] mt-3">
              {t(SITE_CONFIG.brand.aboutAr, SITE_CONFIG.brand.aboutEn)}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#D4A017]/30 text-xs font-semibold text-[#F7D774]">
              <Clock className="w-3.5 h-3.5" />
              <span>{t(SITE_CONFIG.contact.workingHoursAr, SITE_CONFIG.contact.workingHoursEn)}</span>
            </div>
          </div>

          {/* Col 2: Services & Taxonomies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
              <span>{t('الخدمات العقارية', 'Real Estate Services')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.services.map((srv) => (
                <li key={srv.id}>
                  <a href="#properties" className="hover:text-[#F7D774] transition-colors flex items-center gap-1.5">
                    <span className="text-[#D4A017]">▪</span>
                    <span>{t(srv.nameAr, srv.nameEn)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Prime Areas & SEO Landings */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2BA8FF]" />
              <span>{t('المناطق الأكثر طلباً', 'Prime Locations')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.mainAreas.map((area) => (
                <li key={area.id}>
                  <div className="font-bold text-white hover:text-[#2BA8FF] cursor-pointer">
                    {t(area.nameAr, area.nameEn)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t(area.seoLandingKeywordAr, area.seoLandingKeywordEn)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Official Headquarters & Direct Phones (Clickable) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t('المقر الرسمي وخدمة العملاء', 'Official Headquarters')}</span>
            </h4>

            {/* Address */}
            <div className="p-3.5 rounded-2xl bg-[#0B0E17] border border-white/10 text-xs space-y-2">
              <div className="flex items-start gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {t(SITE_CONFIG.contact.addressAr, SITE_CONFIG.contact.addressEn)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {t(SITE_CONFIG.contact.landmarksAr, SITE_CONFIG.contact.landmarksEn)}
              </div>
              <a
                href={SITE_CONFIG.contact.getDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F7D774] hover:underline pt-1"
              >
                <Navigation className="w-3 h-3" />
                <span>{t('الاتجاهات عبر خرائط جوجل', 'Get Directions')}</span>
              </a>
            </div>

            {/* 3 Clickable Phones */}
            <div className="space-y-2 text-xs">
              {SITE_CONFIG.contact.phones.map((phone) => (
                <div
                  key={phone.number}
                  className="p-2.5 rounded-xl bg-[#0B0E17] border border-white/5 flex items-center justify-between gap-2"
                >
                  <a
                    href={getTelUrl(phone.number)}
                    className="font-mono font-bold text-white hover:text-[#F7D774] flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2BA8FF]" />
                    <span>{phone.display}</span>
                  </a>
                  <a
                    href={getWhatsAppUrl(phone.number, t(phone.whatsappMessageAr, phone.whatsappMessageEn))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                  >
                    واتساب
                  </a>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white hover:text-[#2BA8FF] transition-all"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white hover:text-[#FF5A2E] transition-all"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.34 6.34 0 0 0-6.07 6.36 6.35 6.35 0 0 0 10.85 4.51c1.32-1.32 2.05-3.07 2.05-4.94V9.22a8.28 8.28 0 0 0 4.92 1.6V7.37a4.83 4.83 0 0 1-2.5-.68z" />
                </svg>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Row: Legal Notice & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            {t(
              `جميع الحقوق محفوظة © ${new Date().getFullYear()} المصرية للعقارات (مساكن شيراتون) · Al Masreya Real Estate.`,
              `All Rights Reserved © ${new Date().getFullYear()} Al Masreya Real Estate (Masaken Sheraton).`
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">{t('سياسة الخصوصية', 'Privacy Policy')}</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">{t('شروط الاستخدام', 'Terms of Service')}</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F7D774] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t('للأعلى', 'Top')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
