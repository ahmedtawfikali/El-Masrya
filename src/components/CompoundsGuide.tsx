import React, { useState } from 'react';
import { 
  Building2, MapPin, Calendar, Clock, DollarSign, ShieldCheck, 
  Layers, CheckCircle2, Phone, MessageSquare, ArrowUpRight, 
  Download, Calculator, X, Sparkles, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Compound, RegionArea } from '../types';
import { COMPOUNDS } from '../data/compounds';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl, getTelUrl } from '../config/siteConfig';

export const CompoundsGuide: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [selectedArea, setSelectedArea] = useState<RegionArea | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivering' | 'under_construction'>('all');
  const [activeCompoundModal, setActiveCompoundModal] = useState<Compound | null>(null);
  
  // Installment calculator state for active compound
  const [calcDownPayment, setCalcDownPayment] = useState<number>(10);
  const [calcYears, setCalcYears] = useState<number>(7);

  const filteredCompounds = COMPOUNDS.filter((c) => {
    if (selectedArea !== 'all' && c.area !== selectedArea) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <section id="compounds" className="py-20 bg-[#07090e] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F7D774] text-xs font-bold mb-3 shadow-[0_0_12px_rgba(212,160,23,0.2)]">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('دليل مشروعات المطورين الكبرى 2027', 'Major Developer Compounds Guide 2027')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('كمبوندات ومشروعات شرق القاهرة المعتمدة', 'Verified East Cairo Compounds & Projects')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'استعراض شامل لأهم المجمعات السكنية والتجارية في مساكن شيراتون والقاهرة الجديدة وطريق السويس مع تسهيلات سداد حتى 8 سنوات بدون فوائد.',
                'A comprehensive directory of prestigious compounds across Masaken Sheraton, New Cairo, and Suez Road with up to 8-year interest-free payment terms.'
              )}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-[#0B0E17] border border-white/10 rounded-2xl">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A]'
                    : 'text-[#B9BCC7] hover:text-white'
                }`}
              >
                {t('الكل', 'All')}
              </button>
              <button
                onClick={() => setStatusFilter('delivering')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'delivering'
                    ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A]'
                    : 'text-[#B9BCC7] hover:text-white'
                }`}
              >
                {t('استلام فوري / قريب', 'Ready / Near Handover')}
              </button>
              <button
                onClick={() => setStatusFilter('under_construction')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'under_construction'
                    ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A]'
                    : 'text-[#B9BCC7] hover:text-white'
                }`}
              >
                {t('تحت الإنشاء (أطول تقسيط)', 'Under Construction')}
              </button>
            </div>
          </div>
        </div>

        {/* Compound Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompounds.map((compound) => (
            <div
              key={compound.id}
              className="rounded-3xl bg-[#0A0D18] border border-white/10 overflow-hidden hover:border-[#D4A017]/40 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] group flex flex-col"
            >
              {/* Hero Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={compound.heroImage}
                  alt={compound.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-black/40"></div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${
                    compound.status === 'delivering'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-400'
                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-400'
                  }`}>
                    {compound.status === 'delivering' ? t('جاهز للاستلام 2025', 'Ready Handover') : t('تحت الإنشاء (أقساط)', 'Installments')}
                  </span>
                </div>

                {/* Developer Tag */}
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-black/70 text-[#F7D774] border border-[#D4A017]/30 backdrop-blur-md">
                    {t(compound.developerAr, compound.developerEn)}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-white group-hover:text-[#F7D774] transition-colors mb-2">
                  {t(compound.nameAr, compound.nameEn)}
                </h3>

                <p className="text-xs text-[#B9BCC7] flex items-center gap-1.5 mb-4 line-clamp-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A017] flex-shrink-0" />
                  <span>{t(compound.locationAr, compound.locationEn)}</span>
                </p>

                {/* Pricing & Installments Bento */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#05060A] border border-white/5 mb-4 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">{t('يبدأ من', 'Starting Price')}</div>
                    <div className="font-bold text-[#F7D774] mt-0.5">
                      {compound.startingPriceFormatted} <span className="text-[10px] font-normal text-slate-400">{t('ج.م', 'EGP')}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{t('فترة السداد', 'Installments')}</div>
                    <div className="font-bold text-white mt-0.5">
                      {t(`حتى ${compound.installmentYears} سنوات`, `Up to ${compound.installmentYears} Years`)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{t('المقدم المطلوب', 'Down Payment')}</div>
                    <div className="font-bold text-emerald-400 mt-0.5">
                      {compound.downPaymentPercent}% {t('فقط', 'Only')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{t('تاريخ التسليم', 'Delivery')}</div>
                    <div className="font-bold text-white mt-0.5">
                      {compound.deliveryYear}
                    </div>
                  </div>
                </div>

                {/* Exclusive Al Masreya Offer */}
                {compound.exclusiveOffer && (
                  <div className="p-2.5 rounded-xl bg-[#D4A017]/10 border border-[#D4A017]/25 text-[11px] text-[#F7D774] mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
                    <span>{compound.exclusiveOffer}</span>
                  </div>
                )}

                {/* Amenities Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(isRtl ? compound.amenitiesAr : compound.amenitiesEn).slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                    >
                      {amenity}
                    </span>
                  ))}
                  {compound.amenitiesAr.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-400">
                      +{compound.amenitiesAr.length - 3} {t('مزايا', 'more')}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveCompoundModal(compound);
                      setCalcDownPayment(compound.downPaymentPercent);
                      setCalcYears(compound.installmentYears);
                    }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(212,160,23,0.25)]"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>{t('تفاصيل وحاسبة الأقساط', 'Details & Calculator')}</span>
                  </button>

                  <a
                    href={getWhatsAppUrl('01286429815', `مرحباً المصرية للعقارات، أود الاستفسار عن وحدات ${compound.nameAr}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 transition-all cursor-pointer"
                    title={t('تواصل واتساب', 'WhatsApp')}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Compound Modal with Masterplan & Detailed Calculator */}
      {activeCompoundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#090C15] border border-[#D4A017]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={() => setActiveCompoundModal(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-bold text-[#F7D774] px-2.5 py-1 rounded-md bg-[#D4A017]/20 border border-[#D4A017]/40">
                {t(activeCompoundModal.developerAr, activeCompoundModal.developerEn)}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {t(activeCompoundModal.nameAr, activeCompoundModal.nameEn)}
              </h3>
              <p className="text-xs text-[#B9BCC7] mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>{t(activeCompoundModal.locationAr, activeCompoundModal.locationEn)}</span>
              </p>
            </div>

            {/* Masterplan Image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-6 relative h-64">
              <img
                src={activeCompoundModal.masterPlanImage}
                alt="Masterplan"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/80 text-[10px] text-white border border-white/20">
                {t('مخطط المشروع واللاندسكيب العام', 'Masterplan View')}
              </div>
            </div>

            {/* Overview text */}
            <p className="text-xs text-[#B9BCC7] leading-relaxed mb-6">
              {t(activeCompoundModal.descriptionAr, activeCompoundModal.descriptionEn)}
            </p>

            {/* Installment Simulator */}
            <div className="p-4 rounded-2xl bg-[#05060A] border border-white/10 mb-6">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-3">
                <Calculator className="w-4 h-4 text-[#D4A017]" />
                <span>{t('محاكي خطط السداد والأقساط الشهرية', 'Payment Plan & Monthly Installment Simulator')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div>
                  <label className="block text-slate-400 mb-1">{t('نسبة المقدم (%)', 'Down Payment %')}</label>
                  <select
                    value={calcDownPayment}
                    onChange={(e) => setCalcDownPayment(Number(e.target.value))}
                    className="w-full bg-[#0A0D18] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value={5}>5% ({((activeCompoundModal.startingPrice * 0.05) / 1000).toLocaleString()} ألف ج.م)</option>
                    <option value={10}>10% ({((activeCompoundModal.startingPrice * 0.10) / 1000).toLocaleString()} ألف ج.م)</option>
                    <option value={15}>15% ({((activeCompoundModal.startingPrice * 0.15) / 1000).toLocaleString()} ألف ج.م)</option>
                    <option value={20}>20% ({((activeCompoundModal.startingPrice * 0.20) / 1000).toLocaleString()} ألف ج.م)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">{t('مدة التقسيط', 'Installment Period')}</label>
                  <select
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full bg-[#0A0D18] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value={5}>{t('5 سنوات (60 شهراً)', '5 Years (60 Mos)')}</option>
                    <option value={7}>{t('7 سنوات (84 شهراً)', '7 Years (84 Mos)')}</option>
                    <option value={8}>{t('8 سنوات (96 شهراً)', '8 Years (96 Mos)')}</option>
                  </select>
                </div>
              </div>

              {/* Calculated Results */}
              {(() => {
                const total = activeCompoundModal.startingPrice;
                const downAmount = total * (calcDownPayment / 100);
                const remaining = total - downAmount;
                const monthly = Math.round(remaining / (calcYears * 12));
                return (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090C15] border border-[#D4A017]/30 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400">{t('قيمة المقدم', 'Down Payment')}</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">{downAmount.toLocaleString()} ج.م</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">{t('المتبقي للتقسيط', 'Remaining')}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{remaining.toLocaleString()} ج.م</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">{t('القسط الشهري التقريبي', 'Approx Monthly')}</div>
                      <div className="text-xs font-bold text-[#F7D774] mt-0.5">{monthly.toLocaleString()} ج.م</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal CTA Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl('01286429815', `مرحباً المصرية للعقارات، أود حجز معاينة وتفاصيل كمبوند ${activeCompoundModal.nameAr}`)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('حجز وحدة ومقابلة الاستشاري', 'Book Unit with Consultant')}</span>
              </a>

              <a
                href={getTelUrl('01286429815')}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4A017]" />
                <span>{t('اتصال مباشر', 'Call Now')}</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
