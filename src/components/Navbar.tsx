import React, { useState } from 'react';
import { Phone, Sparkles, Menu, X, Compass, Activity } from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

interface NavbarProps {
  onOpenPosterStudio: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPosterStudio, onSelectSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phonesDropdownOpen, setPhonesDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onSelectSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm cursor-pointer"
            >
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block font-['Cairo']">
                المصرية للعقارات
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => handleNavClick('smart-matcher')}
              className="text-cyan-300 hover:text-cyan-200 transition-colors py-1 flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>المطابقة الذكية</span>
            </button>
            <button
              onClick={() => handleNavClick('properties')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              عقاراتنا
            </button>
            <button
              onClick={() => handleNavClick('market-radar')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              مؤشر 2027
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              الخدمات
            </button>
            <button
              onClick={() => {
                onOpenPosterStudio();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>استوديو البوسترات</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Phone quick trigger dropdown */}
            <div className="relative">
              <button
                onClick={() => setPhonesDropdownOpen(!phonesDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                title="أرقام التواصل المباشر"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">اتصل بنا</span>
                <span className="font-mono text-cyan-300" dir="ltr">01286429815</span>
              </button>

              {phonesDropdownOpen && (
                <div 
                  className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 glass-panel rounded-2xl shadow-2xl border border-white/15 p-2 z-50 text-right animate-in fade-in"
                >
                  <div className="px-3 py-2 border-b border-white/10 text-xs font-bold text-slate-400">
                    أرقام التواصل المباشر وواتساب
                  </div>
                  <div className="py-1">
                    {COMPANY_INFO.phones.map((phone) => (
                      <div key={phone.number} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <div className="text-xs font-medium text-slate-400 mb-1">{phone.label}</div>
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={`tel:${phone.number}`}
                            className="font-mono font-bold text-sm text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                            dir="ltr"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {phone.number}
                          </a>
                          <a
                            href={`https://wa.me/20${phone.number.slice(1)}?text=${encodeURIComponent('مرحباً المصرية للعقارات مساكن شيراتون')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-2 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg transition-colors border border-emerald-500/30"
                          >
                            واتساب
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Poster Studio CTA */}
            <button
              onClick={onOpenPosterStudio}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">صمم إعلانك</span>
              <span className="sm:hidden">إعلان</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#090d16] px-4 pt-3 pb-6 space-y-2 text-right">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-right py-2 px-3 text-slate-200 font-semibold hover:bg-white/5 rounded-lg"
          >
            الرئيسية
          </button>
          <button
            onClick={() => handleNavClick('smart-matcher')}
            className="w-full text-right py-2 px-3 text-cyan-300 font-bold hover:bg-cyan-950/40 rounded-lg flex items-center justify-between"
          >
            <span>المطابقة الذكية للعقارات 2027</span>
            <Compass className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className="w-full text-right py-2 px-3 text-slate-200 font-semibold hover:bg-white/5 rounded-lg"
          >
            عقاراتنا (شقق، إداري، محلات)
          </button>
          <button
            onClick={() => handleNavClick('market-radar')}
            className="w-full text-right py-2 px-3 text-slate-200 font-semibold hover:bg-white/5 rounded-lg"
          >
            مؤشر أسعار السوق 2027
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-right py-2 px-3 text-slate-200 font-semibold hover:bg-white/5 rounded-lg"
          >
            الخدمات العقارية
          </button>
          <button
            onClick={() => {
              onOpenPosterStudio();
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 px-3 text-amber-300 font-bold hover:bg-amber-950/40 rounded-lg flex items-center justify-between"
          >
            <span>استوديو تصاميم البوسترات والإعلانات</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t border-white/10">
            <p className="text-xs font-bold text-slate-500 mb-2">أرقام هواتف المكتب المباشرة:</p>
            {COMPANY_INFO.phones.map((p) => (
              <a
                key={p.number}
                href={`tel:${p.number}`}
                className="flex items-center justify-between py-1.5 px-3 text-slate-300 font-mono text-sm hover:bg-white/5 rounded-lg"
              >
                <span className="text-xs text-slate-400 font-sans">{p.label}</span>
                <span className="font-bold text-cyan-400">{p.number}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
