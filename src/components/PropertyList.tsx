import React, { useState, useMemo } from 'react';
import { Property, PropertyPurpose, RegionArea } from '../types';
import { PROPERTIES, COMPANY_INFO } from '../data/properties';
import { Sparkles, Phone, MessageSquare, MapPin, Eye, Search } from 'lucide-react';
import { PropertyModal } from './PropertyModal';

interface PropertyListProps {
  initialFilter?: {
    purpose: PropertyPurpose | 'all';
    area: RegionArea | 'all';
    category: string;
  };
  onOpenInPosterStudio: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  initialFilter,
  onOpenInPosterStudio,
}) => {
  const [selectedPurpose, setSelectedPurpose] = useState<PropertyPurpose | 'all'>(
    initialFilter?.purpose || 'all'
  );
  const [selectedArea, setSelectedArea] = useState<RegionArea | 'all'>(
    initialFilter?.area || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialFilter?.category || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeModalProperty, setActiveModalProperty] = useState<Property | null>(null);

  React.useEffect(() => {
    if (initialFilter) {
      if (initialFilter.purpose) setSelectedPurpose(initialFilter.purpose);
      if (initialFilter.area) setSelectedArea(initialFilter.area);
      if (initialFilter.category) setSelectedCategory(initialFilter.category);
    }
  }, [initialFilter]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      if (selectedPurpose !== 'all' && prop.purpose !== selectedPurpose) return false;
      if (selectedArea !== 'all' && prop.area !== selectedArea) return false;
      if (selectedCategory !== 'all' && prop.category !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(query);
        const matchLocation = prop.subLocation.toLowerCase().includes(query);
        const matchDesc = prop.description.toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchDesc) return false;
      }
      return true;
    });
  }, [selectedPurpose, selectedArea, selectedCategory, searchQuery]);

  return (
    <section className="py-16 bg-[#07090e] border-t border-white/[0.08]" id="properties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              العقارات المتاحة والمعتمدة
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              كتالوج عقارات شيراتون والمناطق الحيوية
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              وحدات سكنية وتجارية وإدارية ومفروشة بمعاينات فورية ومراجعة قانونية كاملة.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            عرض <span className="font-bold text-cyan-300">{filteredProperties.length}</span> من أصل <span className="font-bold text-white">{PROPERTIES.length}</span> وحدة متاحة
          </div>
        </div>

        {/* Filter Controls (Segmented controls with proper buttons) */}
        <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 mb-10 space-y-4">
          
          {/* Row 1: Purpose Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
              <button
                onClick={() => setSelectedPurpose('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedPurpose === 'all'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                كافة العروض
              </button>
              <button
                onClick={() => setSelectedPurpose('sale')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedPurpose === 'sale'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                بيع وتمليك
              </button>
              <button
                onClick={() => setSelectedPurpose('rent')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedPurpose === 'rent'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                إيجار (سكني / إداري)
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الشارع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Row 2: Area Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-xs">
            <span className="font-bold text-slate-500 text-[11px] ml-1">المنطقة:</span>
            {[
              { id: 'all', label: 'كافة المناطق' },
              { id: 'sheraton', label: 'مساكن شيراتون' },
              { id: 'heliopolis', label: 'مصر الجديدة' },
              { id: 'nozha', label: 'النزهة' },
              { id: 'nasr-city', label: 'مدينة نصر' },
            ].map((ar) => (
              <button
                key={ar.id}
                onClick={() => setSelectedArea(ar.id as any)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedArea === ar.id
                    ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                }`}
              >
                {ar.label}
              </button>
            ))}
          </div>

          {/* Row 3: Category Selector */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 text-[11px] ml-1">الفئة:</span>
            {[
              { id: 'all', label: 'الجميع' },
              { id: 'apartment', label: 'شقق سكنية' },
              { id: 'furnished', label: 'مفروش فندقي' },
              { id: 'administrative', label: 'إداري ومكاتب' },
              { id: 'retail', label: 'محلات وتجاري' },
              { id: 'villa', label: 'دوبلكس وفيلات' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="rounded-3xl glass-panel p-12 text-center border border-white/10">
            <p className="text-base font-bold text-slate-300 mb-2">لا توجد وحدات مطابقة لبحثك في هذا القسم</p>
            <p className="text-xs text-slate-500 mb-6">يمكنك إعادة ضبط الفلاتر أو الاتصال المباشر بمكتبنا لتوفير طلبك.</p>
            <button
              onClick={() => {
                setSelectedPurpose('all');
                setSelectedArea('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-cyan-600 text-slate-950 text-xs font-black rounded-xl cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="rounded-3xl glass-panel glass-panel-hover overflow-hidden border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Property Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-black/30" />
                    
                    {/* Purpose marker */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-black/80 text-amber-300 border border-amber-500/30">
                        {prop.purpose === 'sale' ? 'تمليك / بيع' : 'إيجار'}
                      </span>
                    </div>

                    {/* Finishing marker */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-black/70 text-slate-200 border border-white/10">
                        {prop.finishing}
                      </span>
                    </div>

                    {/* Location kicker */}
                    <div className="absolute bottom-3 right-3 left-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{prop.areaNameArabic} · {prop.subLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content (Zero-Pill Metadata) */}
                  <div className="p-5">
                    
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2 mb-3 group-hover:text-cyan-300 transition-colors">
                      {prop.title}
                    </h3>

                    {/* Unboxed Metadata with Typographic Separators (Rule 1.A) */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-4 border-b border-white/5">
                      <span className="font-bold text-white font-mono">{prop.spaceM2} م²</span>
                      {prop.rooms && (
                        <>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>{prop.rooms} غرف</span>
                        </>
                      )}
                      {prop.bathrooms && (
                        <>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>{prop.bathrooms} حمام</span>
                        </>
                      )}
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="truncate">{prop.floor || prop.finishing}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-slate-500 block">السعر المطلوب:</span>
                        <div className="text-xl font-black text-amber-400 font-mono">
                          {prop.priceFormatted}
                          <span className="text-xs font-sans font-bold text-slate-300 mr-1">{prop.priceUnit}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 space-y-2">
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalProperty(prop)}
                      className="w-full py-2 px-3 text-xs font-bold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>التفاصيل</span>
                    </button>

                    <button
                      onClick={() => onOpenInPosterStudio(prop)}
                      className="w-full py-2 px-3 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="تصميم إعلان سوشيال ميديا فوري لهذا العقار"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>تصميم بوستر</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${COMPANY_INFO.phones[0].number}`}
                      className="flex-1 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-white/5"
                    >
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>اتصال</span>
                    </a>
                    <a
                      href={`https://wa.me/20${COMPANY_INFO.phones[0].number.slice(1)}?text=${encodeURIComponent(`أود الاستفسار عن ${prop.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-emerald-500/30"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>واتساب</span>
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {activeModalProperty && (
        <PropertyModal
          property={activeModalProperty}
          onClose={() => setActiveModalProperty(null)}
          onOpenInPosterStudio={onOpenInPosterStudio}
        />
      )}
    </section>
  );
};
