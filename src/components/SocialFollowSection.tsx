import React from 'react';
import { Share2, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const SocialFollowSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#05060A] relative border-t border-white/[0.08]" id="social">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-[#0B0E17]/85 backdrop-blur-2xl border border-white/[0.1] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#2BA8FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Text description */}
            <div className="max-w-2xl text-center lg:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2BA8FF]/10 border border-[#2BA8FF]/30 text-[#2BA8FF] text-xs font-bold mb-3">
                <Share2 className="w-3.5 h-3.5" />
                <span>{t('تغطيات عقارية حية ويومية', 'Daily Live Real Estate Drops')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
                {t('تابع المصرية للعقارات على فيسبوك وتيك توك', 'Follow Al Masreya on Facebook & TikTok')}
              </h2>
              <p className="text-xs sm:text-sm text-[#B9BCC7] mt-3 leading-relaxed font-['Tajawal',sans-serif]">
                {t(
                  'شاهد جولات تصويرية فيديو حصرية للشقق والفيلات والمقرات الإدارية بمساكن شيراتون ومصر الجديدة لحظة طرحها في السوق وقبل أي وسيط آخر.',
                  'Watch exclusive video tours of luxury flats, villas, and executive office spaces in Sheraton and Heliopolis as soon as they hit the market.'
                )}
              </p>
            </div>

            {/* Social Action Cards */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              
              {/* Facebook Card */}
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#05060A] hover:bg-black border border-white/10 hover:border-[#2BA8FF]/60 transition-all flex items-center justify-between sm:justify-start gap-4 group shadow-lg cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-[#2BA8FF]/10 text-[#2BA8FF] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{t('الصفحة الرسمية', 'Official Page')}</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#2BA8FF] transition-colors">
                    {t('فيسبوك / Facebook', 'Facebook')}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </a>

              {/* TikTok Card */}
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#05060A] hover:bg-black border border-white/10 hover:border-[#FF5A2E]/60 transition-all flex items-center justify-between sm:justify-start gap-4 group shadow-lg cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-[#FF5A2E]/10 text-[#FF5A2E] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.34 6.34 0 0 0-6.07 6.36 6.35 6.35 0 0 0 10.85 4.51c1.32-1.32 2.05-3.07 2.05-4.94V9.22a8.28 8.28 0 0 0 4.92 1.6V7.37a4.83 4.83 0 0 1-2.5-.68z" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">@elmasria_real_estate22</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#FF5A2E] transition-colors">
                    {t('تيك توك / TikTok', 'TikTok')}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
