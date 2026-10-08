import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const [showAddReview, setShowAddReview] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);

  const testimonials = [
    {
      id: 'test-1',
      nameAr: 'م/ طارق عبد الرحمن',
      nameEn: 'Eng. Tarek Abdelrahman',
      roleAr: 'مشتري شقة تمليك بمساكن شيراتون (مربع الوزراء)',
      roleEn: 'Buyer, Masaken Sheraton',
      textAr: 'تعامل راقٍ ومصداقية نادرة في سوق العقارات. تم فحص أوراق الشقة في الشهر العقاري والتأكد من حصة الأرض خلال 48 ساعة فقط وتمت البيعة بمنتهى الأمان.',
      textEn: 'Outstanding professionalism and rare honesty. Property titles and land shares were audited in just 48 hours with complete safety.',
      rating: 5,
      date: '2026-09',
    },
    {
      id: 'test-2',
      nameAr: 'د/ سارة الشناوي',
      nameEn: 'Dr. Sara El Shennawy',
      roleAr: 'مستأجرة مقر إداري وعيادة بشارع الميرغني مصر الجديدة',
      roleEn: 'Clinic Owner, Merghany St, Heliopolis',
      textAr: 'وفّروا لي مقراً إدارياً مرخصاً على الميرغني مباشرة بأفضل قيمة إيجارية وبدون أي مصاريف خفية، وأتمموا صياغة العقد بحرفية كاملة.',
      textEn: 'They secured an executive licensed clinic on Merghany St at the best rental value with zero hidden fees. Highly recommended!',
      rating: 5,
      date: '2026-08',
    },
    {
      id: 'test-3',
      nameAr: 'أ/ كريم الدسوقي',
      nameEn: 'Karim El Desouki',
      roleAr: 'مستأجر شقة مفروشة فندقية بشيراتون المطار',
      roleEn: 'Corporate Expat, Sheraton Cairo',
      textAr: 'شقة فندقية كاملة التكييفات والفرش قرب المطار. مندوب المكتب كان متاحاً في أي وقت حتى بعد الساعة 10 مساءً، شكراً للأستاذ أحمد وفريق العمل.',
      textEn: 'Top hotel-grade furnished apartment near the airport. The agent was available around the clock. Great team!',
      rating: 5,
      date: '2026-09',
    },
  ];

  return (
    <section className="py-20 bg-[#05060A] relative border-t border-white/[0.08]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F7D774] text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-[#F7D774]" />
              <span>{t('تجارب وشهادات العملاء', 'Client Reviews & Proof')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('ماذا يقول عملاؤنا عن المصرية للعقارات؟', 'What Our Clients Say')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'آراء موثقة من أصحاب العقارات والمشترين والمستأجرين في مساكن شيراتون ومصر الجديدة.',
                'Verified testimonials from homeowners, buyers, and tenants across Sheraton and Heliopolis.'
              )}
            </p>
          </div>

          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#D4A017]/40 text-xs sm:text-sm font-bold text-[#F7D774] transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D4A017]" />
            <span>{t('شارك تجربتك معنا', 'Add Your Review')}</span>
          </button>
        </div>

        {/* Add Review Dialog / Drawer (Empty-state / Submission ready) */}
        {showAddReview && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#0B0E17] border border-[#D4A017]/40 shadow-2xl animate-in fade-in">
            {submittedReview ? (
              <div className="text-center py-6 text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">
                  {t('شكراً لمشاركتك! تم استلام تقييمك وسيُنشر بعد المراجعة.', 'Thank you! Your review will appear shortly.')}
                </h3>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedReview(true);
                }}
                className="max-w-2xl mx-auto space-y-4 text-right"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white">{t('تقييم تجربتك مع المصرية للعقارات', 'Rate Your Experience')}</h3>
                  <p className="text-xs text-slate-400">{t('رأيك يسهم في تطوير خدماتنا المستمرة', 'Your feedback helps us maintain excellence')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={t('اسمك الكريم', 'Full Name')}
                    className="p-3 rounded-xl bg-[#05060A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4A017]"
                  />
                  <input
                    type="text"
                    required
                    placeholder={t('صفة التعامل (مشتري / مستأجر / مالك)', 'Role (Buyer, Tenant, Owner)')}
                    className="p-3 rounded-xl bg-[#05060A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder={t('اكتب تفاصيل تجربتك...', 'Share your feedback...')}
                  className="w-full p-3 rounded-xl bg-[#05060A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4A017]"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    {t('إلغاء', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FFF1B8] to-[#D4A017] text-[#05060A] text-xs font-bold"
                  >
                    {t('إرسال التقييم', 'Submit Review')}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="p-7 rounded-3xl bg-[#0B0E17]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-[#D4A017]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(tItem.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F7D774] text-[#F7D774]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-['Tajawal',sans-serif] mb-6">
                  "{t(tItem.textAr, tItem.textEn)}"
                </p>
              </div>

              {/* Author row */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A017]/30 to-black border border-[#D4A017]/40 flex items-center justify-center text-[#F7D774] font-bold text-sm">
                  {tItem.nameAr[0]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {t(tItem.nameAr, tItem.nameEn)}
                  </h4>
                  <div className="text-[10px] text-slate-400">
                    {t(tItem.roleAr, tItem.roleEn)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
