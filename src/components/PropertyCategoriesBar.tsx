import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Filter, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  PROPERTY_CLASSIFICATIONS, 
  PropertyClassificationItem, 
  getCategoryIcon 
} from '../config/propertyCategories';
import { Property } from '../types';

interface PropertyCategoriesBarProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  properties?: Property[];
  className?: string;
  showTaglineBanner?: boolean;
}

export const PropertyCategoriesBar: React.FC<PropertyCategoriesBarProps> = ({
  selectedCategoryId,
  onSelectCategory,
  properties = [],
  className = '',
  showTaglineBanner = true,
}) => {
  const { t, isRtl } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate live count per category
  const getCategoryCount = (item: PropertyClassificationItem) => {
    if (item.id === 'all') {
      return properties.length > 0 ? properties.length : item.countEstimate;
    }
    if (properties.length === 0) {
      return item.countEstimate;
    }

    const count = properties.filter((prop) => {
      if (item.id === 'hotel_apartment') {
        return prop.category === 'hotel_apartment' || prop.category === 'furnished';
      }
      if (item.id === 'villa') {
        return prop.category === 'villa' || prop.category === 'townhouse' || prop.category === 'twinhouse';
      }
      if (item.id === 'studio') {
        return prop.category === 'studio';
      }
      if (item.id === 'apartment') {
        return prop.category === 'apartment';
      }
      if (item.id === 'duplex') {
        return prop.category === 'duplex' || prop.category === 'penthouse';
      }
      if (item.id === 'administrative') {
        return prop.category === 'administrative';
      }
      if (item.id === 'retail') {
        return prop.category === 'retail';
      }
      if (item.id === 'chalet') {
        return prop.category === 'chalet';
      }
      if (item.id === 'clinic') {
        return prop.category === 'clinic';
      }
      if (item.id === 'land') {
        return prop.category === 'land' || prop.category === 'building' || prop.category === 'warehouse';
      }
      return prop.category === item.id;
    }).length;

    return count;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeCategory = PROPERTY_CLASSIFICATIONS.find((c) => c.id === selectedCategoryId) || PROPERTY_CLASSIFICATIONS[0];

  return (
    <div className={`w-full ${className}`}>
      {/* Top Header bar for Classification System */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-tr from-[#D4A017]/30 to-[#F7D774]/10 border border-[#D4A017]/40 text-[#F7D774]">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F7D774]">
            {t('نظام تصنيف العقارات السريع', 'Quick Property Classification')}
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            ({PROPERTY_CLASSIFICATIONS.length - 1} {t('فئات تخصصية بأيقونات معتمدة', 'Specialized Categories')})
          </span>
        </div>

        {/* Selected Filter Reset */}
        {selectedCategoryId !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-bold transition-all cursor-pointer"
          >
            <span>{t('إلغاء التصفية', 'Clear Filter')}</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Horizontal Category Strip with Navigation Buttons */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll(isRtl ? 'right' : 'left')}
          aria-label="Previous categories"
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0B0E17]/90 hover:bg-[#D4A017] hover:text-[#05060A] text-white border border-white/20 hover:border-[#D4A017] items-center justify-center shadow-lg transition-all duration-200 cursor-pointer backdrop-blur-md"
        >
          {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Scrollable Categories List */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-2.5 px-1 scrollbar-none no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROPERTY_CLASSIFICATIONS.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const count = getCategoryCount(cat);

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileTap={{ scale: 0.96 }}
                className={`flex-shrink-0 snap-start flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer text-right group/item relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#1A1F2E] via-[#0E121B] to-[#07090E] border-[#D4A017] shadow-[0_0_20px_rgba(212,160,23,0.3)] ring-1 ring-[#F7D774]/50'
                    : 'bg-[#0B0E17]/75 hover:bg-[#121624] border-white/10 hover:border-white/25 hover:shadow-md'
                }`}
              >
                {/* Active category gold aura */}
                {isSelected && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(212,160,23,0.4) 0%, transparent 70%)',
                    }}
                  />
                )}

                {/* Category Icon with glow */}
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 relative z-10 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#D4A017] to-[#F7D774] text-[#05060A] shadow-[0_0_12px_rgba(247,215,116,0.5)] scale-105'
                      : 'bg-black/50 border border-white/10 group-hover/item:border-white/20 group-hover/item:scale-105 ' + cat.iconColor
                  }`}
                >
                  {getCategoryIcon(cat.iconName, 'w-5 h-5 sm:w-5 sm:h-5')}
                </div>

                {/* Category Titles & Count Badge */}
                <div className="flex flex-col text-right relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'text-[#F7D774]'
                          : 'text-white group-hover/item:text-[#F7D774]'
                      }`}
                    >
                      {t(cat.shortNameAr, cat.shortNameEn)}
                    </span>

                    {/* Live Count Pill */}
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-[#D4A017]/25 text-[#FFF1B8] border-[#D4A017]/50'
                          : 'bg-white/5 text-slate-400 border-white/10 group-hover/item:text-slate-300'
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 whitespace-nowrap hidden sm:block">
                    {t(cat.nameAr, cat.nameEn)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll(isRtl ? 'left' : 'right')}
          aria-label="Next categories"
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0B0E17]/90 hover:bg-[#D4A017] hover:text-[#05060A] text-white border border-white/20 hover:border-[#D4A017] items-center justify-center shadow-lg transition-all duration-200 cursor-pointer backdrop-blur-md"
        >
          {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Classification Info Tagline Banner */}
      {showTaglineBanner && activeCategory.id !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-[#D4A017]/10 via-[#0B0E17] to-[#0B0E17] border border-[#D4A017]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#D4A017]/20 text-[#F7D774]">
              {getCategoryIcon(activeCategory.iconName, 'w-4 h-4')}
            </div>
            <div>
              <span className="font-bold text-white ml-1">
                {t(activeCategory.nameAr, activeCategory.nameEn)}:
              </span>
              <span className="text-slate-300">
                {t(activeCategory.taglineAr, activeCategory.taglineEn)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] self-end sm:self-auto">
            <span className="font-mono text-[#F7D774] font-bold">
              {getCategoryCount(activeCategory)} {t('وحدات متاحة', 'units live')}
            </span>
            <button
              onClick={() => onSelectCategory('all')}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              {t('إظهار الكل', 'Show all')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
