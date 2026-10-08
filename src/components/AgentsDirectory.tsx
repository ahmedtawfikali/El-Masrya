import React, { useState } from 'react';
import { 
  Users, Star, Phone, MessageSquare, ShieldCheck, Award, 
  MapPin, CheckCircle, ArrowUpRight, Send, X, Clock, Briefcase 
} from 'lucide-react';
import { Agent } from '../types';
import { AGENTS } from '../data/agents';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl, getTelUrl } from '../config/siteConfig';

export const AgentsDirectory: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [selectedAgentForConsultation, setSelectedAgentForConsultation] = useState<Agent | null>(null);
  const [consultFormSent, setConsultFormSent] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientRequest, setClientRequest] = useState('');

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedAgentForConsultation) return;

    // Direct WhatsApp lead routing to the selected agent
    const msg = `طلب استشارة خاصة موجه للمستشار (${selectedAgentForConsultation.nameAr}):\nالعميل: ${clientName}\nالهاتف: ${clientPhone}\nالطلب: ${clientRequest || 'استشارة عقارية عامة'}`;
    window.open(getWhatsAppUrl(selectedAgentForConsultation.phone, msg), '_blank');

    setConsultFormSent(true);
    setTimeout(() => {
      setConsultFormSent(false);
      setSelectedAgentForConsultation(null);
      setClientName('');
      setClientPhone('');
      setClientRequest('');
    }, 2500);
  };

  return (
    <section id="agents" className="py-20 bg-[#05060A] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Users className="w-3.5 h-3.5" />
              <span>{t('فريق الخبراء المعتمدين', 'Certified Advisors & Brokers')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('دليل مستشاري ووسطاء المصرية للعقارات', 'Official Real Estate Advisors Directory')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'فريق عمل متفرغ متخصص في مساكن شيراتون ومصر الجديدة والنزهة ومدينة نصر، يقدم استشارات قانونية، تثمين عقاري، وتنسيق معاينات فورية على مدار 24 ساعة.',
                'Dedicated full-time brokers specializing in Sheraton, Heliopolis, and Nasr City, providing certified legal inspections, valuation, and immediate viewing arrangements 24/7.'
              )}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#090C15] border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#D4A017] flex-shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">{t('وساطة آمنة 100%', '100% Verified Brokerage')}</div>
              <div className="text-[10px] text-slate-400">{t('فحص تسلسل الملكية وتوثيق العقود رسمياً', 'Complete legal due diligence on every deal')}</div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="rounded-3xl bg-[#090C15] border border-white/10 hover:border-[#D4A017]/50 p-5 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] group flex flex-col justify-between"
            >
              <div>
                {/* Agent Avatar & Badges */}
                <div className="relative mb-4 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#D4A017] to-cyan-500 shadow-lg">
                    <img
                      src={agent.avatar}
                      alt={agent.nameAr}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05060A] text-[#F7D774] border border-[#D4A017] text-[10px] font-bold shadow-md">
                      <ShieldCheck className="w-3 h-3 text-[#D4A017]" />
                      <span>{t('مستشار معتمد', 'Certified')}</span>
                    </span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mt-3 mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-[#F7D774] transition-colors">
                    {t(agent.nameAr, agent.nameEn)}
                  </h3>
                  <p className="text-xs text-[#B9BCC7] mt-0.5">
                    {t(agent.roleAr, agent.roleEn)}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center justify-around py-2 px-3 rounded-2xl bg-[#05060A] border border-white/5 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#F7D774] font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-[#F7D774]" />
                      <span>{agent.rating}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{agent.reviewCount} {t('تقييم', 'reviews')}</div>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div>
                    <div className="text-xs font-bold text-white">{agent.dealsCount}+</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{t('صفقة منجزة', 'deals')}</div>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div>
                    <div className="text-xs font-bold text-cyan-400">{agent.experienceYears} {t('سنة', 'yrs')}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{t('خبرة بالسوق', 'exp')}</div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="space-y-1.5 mb-4 text-[11px]">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A017] flex-shrink-0" />
                    <span className="text-slate-300 font-medium">
                      {(isRtl ? agent.specialtyAreasAr : agent.specialtyAreasEn).join(' · ')}
                    </span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300 font-medium truncate">
                      {(isRtl ? agent.specialtyTypesAr : agent.specialtyTypesEn).join(' · ')}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#B9BCC7] leading-relaxed mb-5 line-clamp-2">
                  {t(agent.bioAr, agent.bioEn)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppUrl(agent.phone, `مرحباً ${agent.nameAr}، أود استشارتك بخصوص عقار في ${agent.specialtyAreasAr[0]}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('مراسلة واتساب', 'WhatsApp')}</span>
                  </a>

                  <a
                    href={getTelUrl(agent.phone)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    title={t('اتصال مباشر', 'Call')}
                  >
                    <Phone className="w-4 h-4 text-[#D4A017]" />
                  </a>
                </div>

                <button
                  onClick={() => setSelectedAgentForConsultation(agent)}
                  className="w-full py-1.5 rounded-xl bg-[#05060A] hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-[11px] font-bold transition-all cursor-pointer"
                >
                  {t('طلب استشارة خاصة ومقابلة', 'Request Consultation')}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Consultation Modal */}
      {selectedAgentForConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#090C15] border border-[#D4A017]/40 rounded-3xl max-w-md w-full p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={() => setSelectedAgentForConsultation(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <img
                src={selectedAgentForConsultation.avatar}
                alt={selectedAgentForConsultation.nameAr}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#D4A017]"
              />
              <div>
                <h4 className="text-sm font-bold text-white">
                  {t(selectedAgentForConsultation.nameAr, selectedAgentForConsultation.nameEn)}
                </h4>
                <p className="text-[11px] text-[#B9BCC7]">
                  {t(selectedAgentForConsultation.roleAr, selectedAgentForConsultation.roleEn)}
                </p>
                <div className="text-[10px] text-[#F7D774] mt-0.5">
                  ★ {selectedAgentForConsultation.rating} · {selectedAgentForConsultation.phone}
                </div>
              </div>
            </div>

            {consultFormSent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h5 className="text-sm font-bold text-white">{t('تم فتح المحادثة المباشرة بنجاح', 'Consultation Initiated!')}</h5>
                <p className="text-xs text-slate-300 mt-1">{t('سيتواصل معك المستشار فوراً لإتمام المعاينة', 'The advisor will reply immediately.')}</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">{t('الاسم بالكامل', 'Full Name')}</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={t('أدخل اسمك الكريم', 'Enter your name')}
                    className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">{t('رقم الهاتف / واتساب', 'Phone / WhatsApp')}</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:border-[#D4A017] focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">{t('تفاصيل طلبك العقاري', 'Property Request Details')}</label>
                  <textarea
                    rows={3}
                    value={clientRequest}
                    onChange={(e) => setClientRequest(e.target.value)}
                    placeholder={t('مثال: أبحث عن شقة تمليك 200م في مربع الوزراء بميزانية 6 مليون...', 'e.g. Looking for a 200m² flat in Ministers Square...')}
                    className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('إرسال وبدء المحادثة الفورية', 'Send & Start Instant Chat')}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
