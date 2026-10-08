import React, { useState } from 'react';
import { Phone, MessageSquare, X, ChevronUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

export const QuickContactFloating: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40 print:hidden">
      
      {/* Expanded Menu */}
      {open && (
        <div className="mb-3 w-72 rounded-3xl glass-panel shadow-2xl border border-white/15 p-4 animate-in fade-in slide-in-from-bottom-2 text-right bg-[#090d16]/95">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200">اتصل بالمصرية للعقارات</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {COMPANY_INFO.phones.map((phone) => (
              <div key={phone.number} className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-xl transition-colors border border-white/5">
                <div className="text-[11px] text-slate-400 font-medium mb-1">{phone.label}</div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${phone.number}`}
                    className="font-mono text-xs font-bold text-white flex items-center gap-1 hover:text-cyan-400"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-cyan-400" />
                    {phone.number}
                  </a>
                  <a
                    href={`https://wa.me/20${phone.number.slice(1)}?text=${encodeURIComponent('مرحباً المصرية للعقارات مساكن شيراتون')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400 text-center">
            مساكن شيراتون · مصر الجديدة · النزهة · مدينة نصر
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          href={`https://wa.me/20${COMPANY_INFO.phones[0].number.slice(1)}?text=${encodeURIComponent('مرحباً المصرية للعقارات مساكن شيراتون')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center group"
          title="محادثة واتساب مباشرة"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-3 bg-[#0d1322] hover:bg-slate-800 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.25)] border border-cyan-500/30 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
        >
          <Phone className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">اتصل بنا (3 خطوط)</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

    </div>
  );
};
