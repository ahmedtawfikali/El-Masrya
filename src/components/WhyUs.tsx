import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, Award, FileText, PhoneCall, Building } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const WhyUs: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: ShieldCheck,
      titleAr: 'أمان قانوني وفحص شامل لسندات الملكية',
      titleEn: '100% Legal Title Verification',
      descAr: 'فريقنا القانوني يدقق تسلسل الملكية، توكيلات الشهر العقاري، وبراءات الذمة وعدادات المرافق قبل توقيع أي عقد.',
      descEn: 'Our in-house legal team verifies property title chains, power of attorney, and utility clearances before finalizing any deal.',
    },
    {
      icon: Clock,
      titleAr: 'تواجد ميداني على مدار الساعة (24/7)',
      titleEn: '24/7 On-Ground Field Availability',
      descAr: 'مندوبو المصرية للعقارات متواجدون في مساكن شيراتون ومصر الجديدة طوال الأسبوع لإجراء المعاينات الفورية في أي وقت يناسبك.',
      descEn: 'Our agents are permanently stationed in Masaken Sheraton and Heliopolis for immediate same-day site visits.',
    },
    {
      icon: Award,
      titleAr: 'وحدات حقيقية بدون إعلانات وهمية',
      titleEn: 'Zero Phantom Listings — 100% Verified',
      descAr: 'كل عقار معروض تم تصويره ومعاينته والتأكد من أصحابه وسعره الفعلي، مع وساطة مباشرة تضمن أعلى قيمة لأموالك.',
      descEn: 'Every listing on our platform is photographed, verified with property owners, and guaranteed accurate in pricing.',
    },
    {
      icon: FileText,
      titleAr: 'دعم كامل حتى استلام المفتاح والتسجيل',
      titleEn: 'End-to-End Closing & Title Registration',
      descAr: 'لا نتركك بعد توقيع العقد، بل نرافقك في إجراءات نقل عدادات الكهرباء والغاز والمياه وتوثيق الشهر العقاري.',
      descEn: 'We guide you through utility meter transfers, notary deeds, and official handover protocols smoothly.',
    },
  ];

  return (
    <section className="py-20 bg-[#07090e] relative border-t border-white/[0.08]" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F7D774] text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t('معايير الجودة والمصداقية', 'Excellence & Trust')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
            {t('لماذا تختار المصرية للعقارات (مساكن شيراتون)؟', 'Why Choose Al Masreya Real Estate?')}
          </h2>
          <p className="text-xs sm:text-sm text-[#B9BCC7] mt-3 leading-relaxed">
            {t(
              'أكثر من 16 عاماً من الثقة والريادة في شرق القاهرة ومصر، نضع مصلحة العميل وسلامة أمواله فوق أي اعتبار.',
              'Over 16 years of leadership and trust in East Cairo, prioritizing your investment security above all.'
            )}
          </p>
        </div>

        {/* 4 Reasons Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-7 rounded-3xl bg-[#0B0E17]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-[#D4A017]/40 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,160,23,0.12)]"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#F7D774]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F7D774] transition-colors mb-2 leading-snug">
                    {t(r.titleAr, r.titleEn)}
                  </h3>

                  <p className="text-xs text-[#B9BCC7] leading-relaxed font-['Tajawal',sans-serif]">
                    {t(r.descAr, r.descEn)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('ضمان المصرية للعقارات', 'Al Masreya Guarantee')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
