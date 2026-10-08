import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(SITE_CONFIG.faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#07090e] relative border-t border-white/[0.08]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F7D774] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('إجابات شفافة وموثوقة', 'Transparent Answers')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
            {t('الأسئلة الشائعة حول خدماتنا العقارية', 'Frequently Asked Questions')}
          </h2>
          <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 leading-relaxed">
            {t(
              'كل ما تحتاج معرفته عن إجراءات المعاينة، العمولات، والأمان القانوني مع المصرية للعقارات.',
              'Everything you need to know about inspections, brokerage fees, and title safety with Al Masreya.'
            )}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {SITE_CONFIG.faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#0B0E17]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {t(faq.questionAr, faq.questionEn)}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.05] text-[#D4A017] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#B9BCC7] leading-relaxed border-t border-white/5 font-['Tajawal',sans-serif] animate-in fade-in">
                    {t(faq.answerAr, faq.answerEn)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
