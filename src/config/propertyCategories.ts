import React from 'react';
import { 
  Sparkles, Hotel, Castle, Maximize2, Building2, Layers, Sun, 
  Briefcase, Store, Palmtree, Activity, Compass, Grid, Bed
} from 'lucide-react';
import { PropertyCategory } from '../types';

export interface PropertyClassificationItem {
  id: string; // 'all' or a PropertyCategory
  categoryKey?: PropertyCategory | 'all';
  nameAr: string;
  nameEn: string;
  shortNameAr: string;
  shortNameEn: string;
  taglineAr: string;
  taglineEn: string;
  iconName: string;
  iconColor: string;
  badgeBg: string;
  glowColor: string;
  countEstimate: number;
}

export const PROPERTY_CLASSIFICATIONS: PropertyClassificationItem[] = [
  {
    id: 'all',
    categoryKey: 'all',
    nameAr: 'كافة التصنيفات العقارية',
    nameEn: 'All Categories',
    shortNameAr: 'جميع العقارات',
    shortNameEn: 'All Properties',
    taglineAr: 'استعراض كافة الوحدات المعروضة للبيع والإيجار والمفروش',
    taglineEn: 'Explore all available units for sale, rent, and luxury stay',
    iconName: 'Sparkles',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-400/10 border-amber-400/30',
    glowColor: 'rgba(212, 160, 23, 0.4)',
    countEstimate: 520,
  },
  {
    id: 'hotel_apartment',
    categoryKey: 'hotel_apartment',
    nameAr: 'شقق فندقية ومفروشة فاخرة',
    nameEn: 'Hotel & Serviced Apartments',
    shortNameAr: 'شقق فندقية',
    shortNameEn: 'Hotel Apartments',
    taglineAr: 'إقامة راقية بخدمات فندقية كاملة، هاوس كيبنج، وقرب المطار',
    taglineEn: 'Luxury hotel suites with full housekeeping, 5 min to Airport',
    iconName: 'Hotel',
    iconColor: 'text-[#F7D774]',
    badgeBg: 'bg-[#F7D774]/15 border-[#F7D774]/40',
    glowColor: 'rgba(247, 215, 116, 0.45)',
    countEstimate: 48,
  },
  {
    id: 'villa',
    categoryKey: 'villa',
    nameAr: 'فيلات وقصور مستقلة',
    nameEn: 'Standalone Villas & Mansions',
    shortNameAr: 'فيلات وقصور',
    shortNameEn: 'Luxury Villas',
    taglineAr: 'قصور وفيلات بحدائق خاصة، حمامات سباحة، وخصوصية تامة',
    taglineEn: 'Private gated villas with private pools and landscaped gardens',
    iconName: 'Castle',
    iconColor: 'text-amber-300',
    badgeBg: 'bg-amber-400/10 border-amber-400/30',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    countEstimate: 38,
  },
  {
    id: 'studio',
    categoryKey: 'studio',
    nameAr: 'استوديوهات ذكية وديلوكس',
    nameEn: 'Smart & Deluxe Studios',
    shortNameAr: 'استوديوهات',
    shortNameEn: 'Studios',
    taglineAr: 'مساحات عصرية مفروشة بتشطيبات ذكية مناسبة لرجال الأعمال ورواد الأعمال',
    taglineEn: 'Compact smart luxury spaces ideal for executives and singles',
    iconName: 'Maximize2',
    iconColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-400/10 border-cyan-400/30',
    glowColor: 'rgba(34, 211, 238, 0.4)',
    countEstimate: 31,
  },
  {
    id: 'apartment',
    categoryKey: 'apartment',
    nameAr: 'شقق سكنية وتمليك',
    nameEn: 'Residential Apartments',
    shortNameAr: 'شقق سكنية',
    shortNameEn: 'Apartments',
    taglineAr: 'شقق عائلية بمساحات متنوعة في أرقى مربعات شيراتون ومصر الجديدة',
    taglineEn: 'Spacious family apartments in prime Sheraton & Heliopolis blocks',
    iconName: 'Building2',
    iconColor: 'text-blue-400',
    badgeBg: 'bg-blue-400/10 border-blue-400/30',
    glowColor: 'rgba(96, 165, 250, 0.4)',
    countEstimate: 142,
  },
  {
    id: 'duplex',
    categoryKey: 'duplex',
    nameAr: 'دوبلكس وبنتهاوس',
    nameEn: 'Duplex & Penthouses',
    shortNameAr: 'دوبلكس وبنتهاوس',
    shortNameEn: 'Duplex / Penthouse',
    taglineAr: 'وحدات بروف خاص وحدائق مستقلة وإطلالات بانورامية مفتوحة',
    taglineEn: 'Multi-level living with private rooftop terraces and skyline views',
    iconName: 'Layers',
    iconColor: 'text-purple-400',
    badgeBg: 'bg-purple-400/10 border-purple-400/30',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    countEstimate: 42,
  },
  {
    id: 'administrative',
    categoryKey: 'administrative',
    nameAr: 'مقرات ومكاتب إدارية',
    nameEn: 'Offices & Corporate HQs',
    shortNameAr: 'مكاتب إدارية',
    shortNameEn: 'Offices & HQs',
    taglineAr: 'مقرات مرخصة ومجهزة للشركات الدولية والبنوك والعيادات الكبرى',
    taglineEn: 'Licensed headquarters for multinational firms and consultancy hubs',
    iconName: 'Briefcase',
    iconColor: 'text-teal-400',
    badgeBg: 'bg-teal-400/10 border-teal-400/30',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    countEstimate: 63,
  },
  {
    id: 'retail',
    categoryKey: 'retail',
    nameAr: 'محلات ومساحات تجارية',
    nameEn: 'Retail & Commercial Stores',
    shortNameAr: 'محلات وتجاري',
    shortNameEn: 'Retail Stores',
    taglineAr: 'واجهات تجارية عريضة على أهم شوارع القاهرة بكثافة مارة استثنائية',
    taglineEn: 'High-footfall storefronts on landmark avenues ready for top brands',
    iconName: 'Store',
    iconColor: 'text-orange-400',
    badgeBg: 'bg-orange-400/10 border-orange-400/30',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    countEstimate: 57,
  },
  {
    id: 'chalet',
    categoryKey: 'chalet',
    nameAr: 'شاليهات ومصايف ساحلية',
    nameEn: 'Coastal Chalets & Resorts',
    shortNameAr: 'شاليهات ومصايف',
    shortNameEn: 'Chalets & Coastal',
    taglineAr: 'وحدات ساحلية صف أول على البحر واللاجون في الساحل والسخنة',
    taglineEn: 'Beachfront chalets and coastal escapes across North Coast & Sokhna',
    iconName: 'Palmtree',
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-400/10 border-emerald-400/30',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    countEstimate: 29,
  },
  {
    id: 'clinic',
    categoryKey: 'clinic',
    nameAr: 'عيادات ومراكز طبية',
    nameEn: 'Medical Clinics & Suites',
    shortNameAr: 'عيادات طبية',
    shortNameEn: 'Medical Clinics',
    taglineAr: 'وحدات مجهزة ومطابقة لاشتراطات وزارة الصحة ونقابة الأطباء',
    taglineEn: 'Fully compliant medical clinic spaces in prime healthcare hubs',
    iconName: 'Activity',
    iconColor: 'text-rose-400',
    badgeBg: 'bg-rose-400/10 border-rose-400/30',
    glowColor: 'rgba(251, 113, 133, 0.4)',
    countEstimate: 28,
  },
  {
    id: 'land',
    categoryKey: 'land',
    nameAr: 'أراضي ومواقع استثمارية',
    nameEn: 'Land Plots & Full Buildings',
    shortNameAr: 'أراضي ومباني',
    shortNameEn: 'Land & Plots',
    taglineAr: 'قطع أراضٍ مرخصة ومبانٍ سكنية وتجارية كاملة بعوائد استثمارية قوية',
    taglineEn: 'Licensed development plots and standalone income-generating buildings',
    iconName: 'Compass',
    iconColor: 'text-yellow-400',
    badgeBg: 'bg-yellow-400/10 border-yellow-400/30',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    countEstimate: 27,
  },
];

/**
 * Returns the matching icon element for a category
 */
export const getCategoryIcon = (iconName: string, className = 'w-5 h-5') => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Sparkles,
    Hotel,
    Castle,
    Maximize2,
    Building2,
    Layers,
    Sun,
    Briefcase,
    Store,
    Palmtree,
    Activity,
    Compass,
    Grid,
    Bed,
  };
  const IconComponent = iconMap[iconName] || Building2;
  return React.createElement(IconComponent, { className });
};

/**
 * Map any property category to its main classification item
 */
export const getClassificationForCategory = (category: string): PropertyClassificationItem => {
  // Normalize
  const normalized = category?.toLowerCase();
  
  if (normalized === 'hotel_apartment' || normalized === 'furnished') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'hotel_apartment') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'villa' || normalized === 'villas') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'villa') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'studio' || normalized === 'studios') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'studio') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'duplex' || normalized === 'penthouse') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'duplex') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'administrative' || normalized === 'offices') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'administrative') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'retail' || normalized === 'shops') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'retail') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'chalet' || normalized === 'chalets') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'chalet') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'clinic' || normalized === 'clinics') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'clinic') || PROPERTY_CLASSIFICATIONS[0];
  }
  if (normalized === 'land' || normalized === 'building' || normalized === 'warehouse') {
    return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'land') || PROPERTY_CLASSIFICATIONS[0];
  }
  return PROPERTY_CLASSIFICATIONS.find(c => c.id === 'apartment') || PROPERTY_CLASSIFICATIONS[0];
};
