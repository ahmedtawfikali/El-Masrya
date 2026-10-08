import React, { useState } from 'react';
import { Phone, MessageSquare, ChevronUp, X, Sparkles, Search, PlusCircle } from 'lucide-react';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface MobileFloatingActionsProps {
  onOpenAddProperty?: () => void;
}

export const MobileFloatingActions: React.FC<MobileFloatingActionsProps> = ({
  onOpenAddProperty,
}) => {
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 print:hidden pointer-events-none">
      
      {/* Expanded Phone Selection Drawer */}
      {drawerOpen && (
        <div className="pointer-events-auto mb-3 rounded-3xl bg-[#090d16]/95 backdrop-blur-2xl border border-[#D4A017]/40 p-4 shadow-2xl text-right animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-bold text-[#F7D774]">
              {t('اتصل بالمصرية للعقارات (مساكن شيراتون)', 'Call Al Masreya Real Estate')}
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {SITE_CONFIG.contact.phones.map((p) => (
              <div key={p.number} className="p-2.5 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">{t(p.labelAr, p.labelEn)}</div>
                  <a href={getTelUrl(p.number)} className="font-mono text-xs font-bold text-white hover:text-[#F7D774]" dir="ltr">
                    {p.display}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={getTelUrl(p.number)}
                    className="p-2 rounded-lg bg-slate-800 text-[#2BA8FF]"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={getWhatsAppUrl(p.number, t(p.whatsappMessageAr, p.whatsappMessageEn))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-600 text-white"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Bottom Pill Bar */}
      <div className="pointer-events-auto rounded-full bg-[#0B0E17]/95 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-between gap-1.5">
        
        {/* Add Property Button */}
        {onOpenAddProperty && (
          <button
            onClick={onOpenAddProperty}
            className="py-2.5 px-3 rounded-full bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(212,160,23,0.35)] cursor-pointer shrink-0 active:scale-95"
            title={t('أضف عقار جديد', 'Add Property')}
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{t('أضف عقار +', 'Add +')}</span>
          </button>
        )}

        {/* Direct WhatsApp button (Primary line) */}
        <a
          href={getWhatsAppUrl(
            SITE_CONFIG.contact.phones[0].number,
            'مرحباً المصرية للعقارات (مساكن شيراتون)، أود الاستفسار عن العقارات المتاحة.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] truncate"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="truncate">{t('واتساب 24/7', 'WhatsApp')}</span>
        </a>

        {/* Direct Call Button (Shows 3 lines trigger) */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="flex-1 py-2.5 px-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1 border border-white/10 cursor-pointer truncate"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{t('3 خطوط', 'Call')}</span>
          <ChevronUp className={`w-3 h-3 text-slate-400 transition-transform ${drawerOpen ? 'rotate-180' : ''}`} />
        </button>

      </div>

    </div>
  );
};
