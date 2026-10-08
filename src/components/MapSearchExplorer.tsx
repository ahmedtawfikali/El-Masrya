import React, { useState, useMemo, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { 
  MapPin, Search, Filter, Layers, Navigation, Phone, MessageSquare, 
  Sparkles, CheckCircle2, Building, Eye, X, ChevronRight, SlidersHorizontal,
  Home, Bed, Bath, Maximize2, ShieldCheck, Compass, ArrowUpRight
} from 'lucide-react';
import { Property, RegionArea, PropertyPurpose, ListingSource } from '../types';
import { PROPERTIES } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';
import { getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { getClassificationForCategory, getCategoryIcon } from '../config/propertyCategories';

interface MapSearchExplorerProps {
  onSelectProperty: (property: Property) => void;
  onOpenInPosterStudio?: (property: Property) => void;
  properties?: Property[];
}

// Default map center: Masaken Sheraton HQ
const DEFAULT_CENTER = { lat: 30.1065, lng: 31.3789 };
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDXc5Z1_6Gs8hlJshg6DRNzZEdicEeJr6g';

export const MapSearchExplorer: React.FC<MapSearchExplorerProps> = ({
  onSelectProperty,
  onOpenInPosterStudio,
  properties,
}) => {
  const { t, isRtl } = useLanguage();

  // Filters state
  const [purpose, setPurpose] = useState<PropertyPurpose | 'all'>('all');
  const [selectedArea, setSelectedArea] = useState<RegionArea | 'all'>('all');
  const [source, setSource] = useState<ListingSource | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // View mode: 'split' | 'map' | 'list'
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');

  // Selected marker
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(13);
  const [mapError, setMapError] = useState(false);

  const sourceProperties = properties && properties.length > 0 ? properties : PROPERTIES;

  // Filter listings
  const filteredProperties = useMemo(() => {
    return sourceProperties.filter((p) => {
      if (purpose !== 'all' && p.purpose !== purpose) return false;
      if (selectedArea !== 'all' && p.area !== selectedArea) return false;
      if (source !== 'all' && p.ownerType !== source) return false;
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'hotel_apartment') {
          if (p.category !== 'hotel_apartment' && p.category !== 'furnished') return false;
        } else if (categoryFilter === 'villa') {
          if (p.category !== 'villa' && p.category !== 'townhouse' && p.category !== 'twinhouse') return false;
        } else if (categoryFilter === 'duplex') {
          if (p.category !== 'duplex' && p.category !== 'penthouse') return false;
        } else if (p.category !== categoryFilter) {
          return false;
        }
      }
      if (p.price > maxPrice) return false;
      if (minBedrooms > 0 && (p.bedrooms || p.rooms || 0) < minBedrooms) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q) || (p.titleEn && p.titleEn.toLowerCase().includes(q));
        const matchSub = p.subLocation.toLowerCase().includes(q) || p.areaNameArabic.toLowerCase().includes(q);
        if (!matchTitle && !matchSub) return false;
      }
      return true;
    });
  }, [purpose, selectedArea, source, categoryFilter, maxPrice, minBedrooms, searchQuery]);

  // Center map when area changes
  useEffect(() => {
    if (selectedArea === 'sheraton') {
      setMapCenter({ lat: 30.1065, lng: 31.3789 });
      setMapZoom(14);
    } else if (selectedArea === 'heliopolis') {
      setMapCenter({ lat: 30.0894, lng: 31.3285 });
      setMapZoom(14);
    } else if (selectedArea === 'nozha') {
      setMapCenter({ lat: 30.1248, lng: 31.3685 });
      setMapZoom(14);
    } else if (selectedArea === 'nasr-city') {
      setMapCenter({ lat: 30.0578, lng: 31.3412 });
      setMapZoom(14);
    } else if (selectedArea === 'new-cairo') {
      setMapCenter({ lat: 30.0125, lng: 31.4289 });
      setMapZoom(13);
    } else {
      setMapCenter(DEFAULT_CENTER);
      setMapZoom(12);
    }
  }, [selectedArea]);

  const handleMarkerClick = (property: Property) => {
    setActiveProperty(property);
    setMapCenter(property.coordinates);
  };

  const getSourceBadge = (src?: ListingSource) => {
    switch (src) {
      case 'owner':
        return {
          textAr: 'من المالك مباشرة (0% عمولة)',
          textEn: 'Direct from Owner (0% Fee)',
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        };
      case 'developer':
        return {
          textAr: 'مشروع مطور معتمد',
          textEn: 'Certified Developer',
          color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        };
      case 'broker':
        return {
          textAr: 'وسيط عقاري مسجل',
          textEn: 'Registered Broker',
          color: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        };
      default:
        return {
          textAr: 'حصري المصرية للعقارات',
          textEn: 'Exclusive Al Masreya',
          color: 'bg-[#D4A017]/20 text-[#F7D774] border-[#D4A017]/40',
        };
    }
  };

  return (
    <section id="map-search" className="py-16 bg-[#05060A] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{t('المستكشف الجغرافي الذكي 2027', 'Smart Geospatial Explorer 2027')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-['Reem_Kufi',sans-serif] font-bold text-white tracking-tight">
              {t('البحث التفاعلي بالخريطة في شرق القاهرة', 'Interactive Map Property Search')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B9BCC7] mt-2 max-w-2xl">
              {t(
                'استكشف الشقق، المقرات الإدارية، المحلات، ومشروعات الكمبوندات موزعة جغرافياً في مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر مع عروض الملاك والمطورين المباشرة.',
                'Explore residential, commercial, and compound listings accurately pinned across Masaken Sheraton, Heliopolis, El Nozha, and Nasr City with owner & developer direct filters.'
              )}
            </p>
          </div>

          {/* View Mode Toggle: Split / Map / List */}
          <div className="flex items-center p-1 bg-[#0B0E17] border border-white/10 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] shadow-[0_0_12px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('شاشة مقسمة', 'Split View')}
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] shadow-[0_0_12px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('خريطة فقط', 'Map Only')}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] shadow-[0_0_12px_rgba(212,160,23,0.3)]'
                  : 'text-[#B9BCC7] hover:text-white'
              }`}
            >
              {t('قائمة فقط', 'List Only')}
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#090C15]/90 border border-white/10 backdrop-blur-xl mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            
            {/* 1. Purpose */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('نوع المعاملة', 'Transaction')}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as any)}
                className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4A017] focus:outline-none"
              >
                <option value="all">{t('الكل (بيع وإيجار)', 'All (Sale & Rent)')}</option>
                <option value="sale">{t('بيع وتمليك', 'For Sale')}</option>
                <option value="rent">{t('إيجار ومفروش', 'For Rent')}</option>
              </select>
            </div>

            {/* 2. Category Classification */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('تصنيف العقار', 'Property Type')}
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-[#05060A] border border-[#D4A017]/40 rounded-xl px-3 py-2 text-xs text-[#F7D774] font-semibold focus:border-[#D4A017] focus:outline-none bg-black/40"
              >
                <option value="all">{t('كافة التصنيفات', 'All Categories')}</option>
                <option value="hotel_apartment">{t('🏨 شقق فندقية ومفروشة', 'Hotel Apartments')}</option>
                <option value="villa">{t('🏰 فيلات وقصور', 'Luxury Villas')}</option>
                <option value="studio">{t('📐 استوديوهات ذكية', 'Smart Studios')}</option>
                <option value="apartment">{t('🏢 شقق سكنية', 'Apartments')}</option>
                <option value="duplex">{t('🥞 دوبلكس وبنتهاوس', 'Duplex / Penthouse')}</option>
                <option value="administrative">{t('💼 مقرات ومكاتب إدارية', 'Offices & HQs')}</option>
                <option value="retail">{t('🏪 محلات وتجاري', 'Retail & Commercial')}</option>
                <option value="chalet">{t('🌴 شاليهات ومصايف', 'Chalets & Coastal')}</option>
                <option value="clinic">{t('🩺 عيادات ومراكز طبية', 'Medical Clinics')}</option>
              </select>
            </div>

            {/* 3. Area */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('المنطقة المستهدفة', 'Target Area')}
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value as any)}
                className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4A017] focus:outline-none"
              >
                <option value="all">{t('كل مناطق شرق القاهرة', 'All East Cairo Areas')}</option>
                <option value="sheraton">{t('مساكن شيراتون (المقر)', 'Masaken Sheraton')}</option>
                <option value="heliopolis">{t('مصر الجديدة (الكوربة والميرغني)', 'Heliopolis')}</option>
                <option value="nozha">{t('النزهة والنزهة الجديدة', 'El Nozha')}</option>
                <option value="nasr-city">{t('مدينة نصر', 'Nasr City')}</option>
                <option value="new-cairo">{t('القاهرة الجديدة', 'New Cairo')}</option>
              </select>
            </div>

            {/* 4. Listing Source */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('مصدر العرض العقاري', 'Listing Source')}
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full bg-[#05060A] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none bg-cyan-950/20"
              >
                <option value="all">{t('جميع المصادر المعتمدة', 'All Verified Sources')}</option>
                <option value="almasreya">{t('★ حصريات المصرية للعقارات', '★ Exclusive Al Masreya')}</option>
                <option value="owner">{t('✦ من المالك مباشرة (0% عمولة)', '✦ Direct from Owner (0% Fee)')}</option>
                <option value="developer">{t('🏢 مشروعات المطورين (أقساط)', '🏢 Developer Projects')}</option>
                <option value="broker">{t('🤝 وسطاء معتمدون', '🤝 Certified Brokers')}</option>
              </select>
            </div>

            {/* 4. Bedrooms / Rooms */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('عدد الغرف الأدنى', 'Min Bedrooms')}
              </label>
              <select
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(Number(e.target.value))}
                className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4A017] focus:outline-none"
              >
                <option value={0}>{t('أي عدد غرف', 'Any Bedrooms')}</option>
                <option value={1}>{t('1+ غرفة', '1+ Room')}</option>
                <option value={2}>{t('2+ غرف', '2+ Rooms')}</option>
                <option value={3}>{t('3+ غرف', '3+ Rooms')}</option>
                <option value={4}>{t('4+ غرف وأكثر', '4+ Rooms')}</option>
              </select>
            </div>

            {/* 5. Keyword search */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {t('بحث بالشارع أو المعلم', 'Street / Landmark')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('مثال: مربع الوزراء، الميرغني...', 'e.g. Ministers Square, Merghany...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#05060A] border border-white/15 rounded-xl px-3 py-2 pr-8 text-xs text-white placeholder-slate-500 focus:border-[#D4A017] focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

          </div>

          {/* Results count & Active Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#B9BCC7]">{t('عقارات مطابقة:', 'Matching properties:')}</span>
              <span className="px-2 py-0.5 rounded-md bg-[#D4A017]/20 text-[#F7D774] font-bold">
                {filteredProperties.length} {t('عقار', 'units')}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A017]"></span>
                {t('المصرية للعقارات', 'Al Masreya')}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                {t('المالك مباشرة', 'Owner')}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                {t('مطور', 'Developer')}
              </span>
            </div>
          </div>
        </div>

        {/* Main Explorer Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}>
          
          {/* Map Column (shown in 'split' or 'map' mode) */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <div className={`relative rounded-3xl overflow-hidden border border-white/15 bg-[#0A0D18] shadow-[0_12px_40px_rgba(0,0,0,0.8)] ${
              viewMode === 'split' ? 'lg:col-span-7 h-[640px]' : 'h-[720px]'
            }`}>
              
              {/* Google Maps Container */}
              <div className="w-full h-full relative">
                <APIProvider apiKey={GOOGLE_MAPS_KEY}>
                  <Map
                    mapId="DEMO_MAP_ID"
                    center={mapCenter}
                    zoom={mapZoom}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    className="w-full h-full"
                  >
                    {filteredProperties.map((prop) => {
                      const isSelected = activeProperty?.id === prop.id;
                      const badge = getSourceBadge(prop.ownerType);
                      const isOwner = prop.ownerType === 'owner';
                      const isDev = prop.ownerType === 'developer';

                      return (
                        <AdvancedMarker
                          key={prop.id}
                          position={prop.coordinates}
                          onClick={() => handleMarkerClick(prop)}
                          title={prop.title}
                        >
                          <div className={`transform transition-all duration-300 cursor-pointer ${
                            isSelected ? 'scale-110 z-50' : 'hover:scale-105 z-20'
                          }`}>
                            <div className={`px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border text-[11px] font-bold backdrop-blur-md ${
                              isSelected
                                ? 'bg-[#D4A017] text-[#05060A] border-white shadow-[0_0_20px_rgba(212,160,23,0.8)]'
                                : isOwner
                                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400'
                                : isDev
                                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400'
                                : 'bg-[#0B0E17]/95 text-[#F7D774] border-[#D4A017]/70'
                            }`}>
                              <Building className="w-3 h-3" />
                              <span>{prop.priceFormatted} {prop.priceUnit.split(' ')[0]}</span>
                            </div>
                            <div className="w-2 h-2 bg-current rotate-45 mx-auto -mt-1 shadow-md"></div>
                          </div>
                        </AdvancedMarker>
                      );
                    })}
                  </Map>
                </APIProvider>

                {/* Map Quick Navigator overlay */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <div className="bg-[#05060A]/85 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setMapCenter(DEFAULT_CENTER);
                        setMapZoom(14);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-[#D4A017]" />
                      <span>{t('مقر شيراتون', 'Sheraton HQ')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setMapCenter({ lat: 30.0894, lng: 31.3285 });
                        setMapZoom(14);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{t('مصر الجديدة', 'Heliopolis')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setMapCenter({ lat: 30.0578, lng: 31.3412 });
                        setMapZoom(14);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{t('مدينة نصر', 'Nasr City')}</span>
                    </button>
                  </div>
                </div>

                {/* Floating Selected Property Card Preview over Map */}
                {activeProperty && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 max-w-md mx-auto">
                    <div className="p-3.5 rounded-2xl bg-[#090C15]/95 border border-[#D4A017]/40 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] relative animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <button
                        onClick={() => setActiveProperty(null)}
                        className="absolute top-2.5 left-2.5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex gap-3">
                        <img
                          src={activeProperty.image}
                          alt={activeProperty.title}
                          className="w-24 h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          {/* Badge */}
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSourceBadge(activeProperty.ownerType).color}`}>
                              {t(getSourceBadge(activeProperty.ownerType).textAr, getSourceBadge(activeProperty.ownerType).textEn)}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-white truncate mb-1">
                            {activeProperty.title}
                          </h4>

                          <p className="text-[11px] text-[#B9BCC7] flex items-center gap-1 truncate mb-2">
                            <MapPin className="w-3 h-3 text-[#D4A017]" />
                            <span>{activeProperty.subLocation}</span>
                          </p>

                          <div className="flex items-baseline gap-1 text-[#F7D774] font-bold text-sm">
                            <span>{activeProperty.priceFormatted}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{activeProperty.priceUnit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card actions */}
                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/10">
                        <button
                          onClick={() => onSelectProperty(activeProperty)}
                          className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F7D774] text-[#05060A] text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t('معاينة كاملة', 'View Full Details')}</span>
                        </button>
                        
                        <a
                          href={getWhatsAppUrl(activeProperty.ownerType === 'almasreya' ? '01286429815' : '01032599331', `مرحباً، أستفسر عن العقار رقم (${activeProperty.id}): ${activeProperty.title}`)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/50 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{t('واتساب', 'WhatsApp')}</span>
                        </a>

                        <a
                          href={getTelUrl('01286429815')}
                          className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{t('اتصال', 'Call')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Listings List Column (shown in 'split' or 'list' mode) */}
          {(viewMode === 'split' || viewMode === 'list') && (
            <div className={`${
              viewMode === 'split' ? 'lg:col-span-5' : 'col-span-12'
            } flex flex-col`}>
              
              {/* Header inside list */}
              <div className="flex items-center justify-between mb-3 text-xs text-[#B9BCC7]">
                <span>{t('قائمة العقارات في نطاق الخريطة', 'Properties in Map Range')}</span>
                <span>{filteredProperties.length} {t('عقار متاح', 'listings available')}</span>
              </div>

              {/* Scrollable Listings Cards */}
              <div className={`space-y-3.5 ${
                viewMode === 'split' ? 'h-[600px] overflow-y-auto pr-1' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              }`}>
                {filteredProperties.length === 0 ? (
                  <div className="p-8 text-center bg-[#090C15] border border-white/10 rounded-2xl">
                    <Building className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-white font-bold">{t('لا توجد عقارات مطابقة للفلاتر المحددة', 'No matching properties')}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('جرّب توسيع نطاق البحث أو تغيير نوع المعاملة', 'Try broadening your search criteria')}</p>
                  </div>
                ) : (
                  filteredProperties.map((prop) => {
                    const isSelected = activeProperty?.id === prop.id;
                    const badge = getSourceBadge(prop.ownerType);
                    const classItem = getClassificationForCategory(prop.category);

                    return (
                      <div
                        key={prop.id}
                        onClick={() => handleMarkerClick(prop)}
                        className={`p-3.5 rounded-2xl bg-[#090C15] border transition-all cursor-pointer group hover:border-[#D4A017]/50 ${
                          isSelected
                            ? 'border-[#D4A017] shadow-[0_0_20px_rgba(212,160,23,0.25)] bg-[#0C101C]'
                            : 'border-white/10'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={prop.image}
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 items-end">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border backdrop-blur-md ${badge.color}`}>
                                {t(badge.textAr, badge.textEn)}
                              </span>
                            </div>
                            <div className="absolute bottom-1.5 right-1.5">
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold border backdrop-blur-md ${classItem.badgeBg} ${classItem.iconColor}`}>
                                {getCategoryIcon(classItem.iconName, 'w-2.5 h-2.5')}
                                <span>{t(classItem.shortNameAr, classItem.shortNameEn)}</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                                  <MapPin className="w-3 h-3 text-[#D4A017]" />
                                  <span className="truncate">{prop.subLocation}</span>
                                </div>

                                <h4 className="text-xs font-bold text-white group-hover:text-[#F7D774] transition-colors line-clamp-1 mb-1.5">
                                  {prop.title}
                                </h4>

                            <div className="flex items-center gap-3 text-[11px] text-[#B9BCC7] mb-2">
                              <span>{prop.spaceM2} م²</span>
                              <span>·</span>
                              <span>{prop.bedrooms || prop.rooms || 3} غرف</span>
                              <span>·</span>
                              <span>{prop.bathrooms || 2} حمام</span>
                            </div>

                            <div className="flex items-baseline justify-between">
                              <div className="text-[#F7D774] font-bold text-sm">
                                {prop.priceFormatted} <span className="text-[10px] text-slate-400 font-normal">{prop.priceUnit}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectProperty(prop);
                                }}
                                className="text-[11px] text-[#D4A017] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                              >
                                <span>{t('التفاصيل', 'Details')}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
