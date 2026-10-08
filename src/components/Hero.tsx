import React, { useState } from 'react';
import { Phone, MessageSquare, Sparkles, MapPin, Search, CheckCircle2, Compass, ArrowDown } from 'lucide-react';
import heroImg from '../assets/images/hero_sheraton_luxury_1791387800905.jpg';
import { COMPANY_INFO } from '../data/properties';
import { PropertyPurpose, RegionArea } from '../types';

interface HeroProps {
  onSearch: (filters: { purpose: PropertyPurpose | 'all'; area: RegionArea | 'all'; category: string }) => void;
  onOpenPosterStudio: () => void;
  onExploreProperties: () => void;
  onOpenSmartMatcher: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSearch, 
  onOpenPosterStudio, 
  onExploreProperties,
  onOpenSmartMatcher,
}) => {
  const [purpose, setPurpose] = useState<PropertyPurpose | 'all'>('all');
  const [area, setArea] = useState<RegionArea | 'all'>('all');
  const [category, setCategory] = useState<string>('all');

  const handleApplyFilter = () => {
    onSearch({ purpose, area, category });
    onExploreProperties();
  };

  return (
    <section className="relative text-white overflow-hidden bg-[#07090e]" id="hero">
      
      {/* Background Architectural Canvas with High-Tech Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="المصرية للعقارات مساكن شيراتون"
          className="w-full h-full object-cover object-center scale-105 opacity-35"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Neon Horizon Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/90 to-[#07090e]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        
        {/* Top Status & Region Beacon */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-cyan-300 text-xs font-semibold mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>مساكن شيراتون · مصر الجديدة · النزهة · مدينة نصر</span>
        </div>

        {/* Main 2027 Headline */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight text-white mb-4">
            المصرية للعقارات
            <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent font-black text-2xl sm:text-4xl lg:text-5xl mt-2">
              مساكن شيراتون وشرق القاهرة
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed text-balance">
            المكتب بيقدّملك مجموعة كبيرة من الخدمات: إيجار، بيع، تمليك، إداري، تجاري، مفروش، محلات، وكل خدمات العقارات اللي تحتاجها بأعلى دقة واحترافية.
          </p>
        </div>

        {/* Fast Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={onOpenSmartMatcher}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.35)]"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>نظام المطابقة الذكية للوحدات</span>
          </button>

          <button
            onClick={onOpenPosterStudio}
            className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-amber-400/50"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>استوديو تصاميم وبوسترات السوشيال ميديا</span>
          </button>
        </div>

        {/* The 3 Direct Official Phone Numbers (Glassmorphic Cards) */}
        <div className="mb-10 p-5 rounded-3xl glass-panel border border-white/10 shadow-2xl">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>اتصل بينا مباشرة لحجز المعاينة أو الاستفسار:</span>
            <span className="text-[11px] font-mono text-emerald-400">متاح اتصال وواتساب الآن</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {COMPANY_INFO.phones.map((phone) => (
              <div
                key={phone.number}
                className="p-3.5 bg-black/40 hover:bg-black/60 transition-all rounded-2xl border border-white/5 hover:border-cyan-500/30 flex items-center justify-between gap-3 group"
              >
                <div>
                  <div className="text-[11px] text-slate-400 font-medium line-clamp-1">{phone.label}</div>
                  <div className="font-mono text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors" dir="ltr">
                    {phone.number}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${phone.number}`}
                    className="p-2.5 bg-slate-800 hover:bg-cyan-600 text-white rounded-xl transition-all"
                    title={`اتصال: ${phone.number}`}
                  >
                    <Phone className="w-4 h-4 text-cyan-300 group-hover:text-white" />
                  </a>
                  <a
                    href={`https://wa.me/20${phone.number.slice(1)}?text=${encodeURIComponent('مرحباً المصرية للعقارات مساكن شيراتون، أود الاستفسار عن الوحدات المتاحة')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl transition-all border border-emerald-500/20"
                    title={`واتساب: ${phone.number}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Glassmorphic Search Bar */}
        <div className="rounded-3xl glass-panel p-5 sm:p-7 border border-white/10 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/5">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">البحث السريع في كتالوج العقارات</h2>
              <p className="text-xs text-slate-400">حدد نوع العقار أو المنطقة لتصفية الوحدات فوراً</p>
            </div>
            <div className="text-xs text-amber-400 font-semibold">
              شقق · مقرات إدارية · محلات تجارية · مفروش
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Area Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">المنطقة</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as any)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">كافة المناطق</option>
                <option value="sheraton">مساكن شيراتون</option>
                <option value="heliopolis">مصر الجديدة</option>
                <option value="nozha">النزهة</option>
                <option value="nasr-city">مدينة نصر</option>
              </select>
            </div>

            {/* Purpose Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">طبيعة العقد</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as any)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">الكل (بيع وإيجار)</option>
                <option value="sale">بيع وتمليك</option>
                <option value="rent">إيجار (سكني / إداري)</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">التصنيف</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">جميع الفئات</option>
                <option value="apartment">شقق سكنية</option>
                <option value="furnished">مفروش فندقي</option>
                <option value="administrative">مقرات إدارية ومكاتب</option>
                <option value="retail">محلات ومطاعم</option>
                <option value="villa">فيلات ودوبلكس</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                onClick={handleApplyFilter}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] text-xs sm:text-sm"
              >
                <Search className="w-4 h-4" />
                <span>عرض العقارات المطابقة</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
