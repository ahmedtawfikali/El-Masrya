export type PropertyPurpose = 'sale' | 'rent';

export type PropertyCategory = 
  | 'apartment' 
  | 'villa' 
  | 'chalet' 
  | 'duplex' 
  | 'penthouse' 
  | 'studio' 
  | 'townhouse' 
  | 'twinhouse' 
  | 'land' 
  | 'retail' 
  | 'administrative' 
  | 'clinic' 
  | 'warehouse' 
  | 'building' 
  | 'furnished'
  | 'hotel_apartment';

export type RegionArea = 'sheraton' | 'heliopolis' | 'nozha' | 'nasr-city' | 'new-cairo' | 'other';

export type ListingSource = 'almasreya' | 'developer' | 'broker' | 'owner';

export interface Property {
  id: string;
  title: string;
  titleAr?: string;
  titleEn?: string;
  purpose: PropertyPurpose; // 'sale' = تمليك/بيع, 'rent' = إيجار
  category: PropertyCategory;
  area: RegionArea;
  areaNameArabic: string;
  areaNameEnglish?: string;
  subLocation: string;
  subLocationEn?: string;
  price: number;
  priceFormatted: string;
  priceUnit: string; // 'ج.م' or 'ج.م / شهرياً'
  priceUnitEn?: string;
  spaceM2: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: string;
  finishing: 'سوبر لوكس' | 'الترا سوبر لوكس' | 'نصف تشطيب' | 'مفروش فاخر' | 'تشطيب إداري فاخر' | string;
  finishingEn?: string;
  featured?: boolean;
  verifiedByAlMasreya?: boolean; // Gold badge "موثّق من المصرية للعقارات"
  ownerType?: ListingSource;
  compoundName?: string;
  compoundId?: string;
  image: string;
  additionalImages?: string[];
  description: string;
  descriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  coordinates: { lat: number; lng: number };
  paymentMethod?: 'cash' | 'installments' | 'both';
  downPayment?: number;
  installmentYears?: number;
  deliveryStatus?: 'ready' | 'under_construction';
  viewsCount?: number;
  createdAt?: string;
  agentId?: string;
}

export interface Compound {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  developerAr: string;
  developerEn: string;
  area: RegionArea;
  locationAr: string;
  locationEn: string;
  startingPrice: number;
  startingPriceFormatted: string;
  installmentYears: number;
  downPaymentPercent: number;
  deliveryYear: string;
  status: 'delivering' | 'under_construction' | 'new_launch';
  masterPlanImage: string;
  heroImage: string;
  galleryImages: string[];
  amenitiesAr: string[];
  amenitiesEn: string[];
  unitTypesAr: string[];
  unitTypesEn: string[];
  descriptionAr: string;
  descriptionEn: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  exclusiveOffer?: string;
}

export interface Agent {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  dealsCount: number;
  experienceYears: number;
  specialtyAreasAr: string[];
  specialtyAreasEn: string[];
  specialtyTypesAr: string[];
  specialtyTypesEn: string[];
  bioAr: string;
  bioEn: string;
  isVerified: boolean;
}

export interface PosterConfig {
  title: string;
  subtitle: string;
  badge: string;
  aspectRatio: 'square' | 'story' | 'banner' | 'flyer';
  themeColor: 'navy-gold' | 'emerald-gold' | 'black-gold' | 'sand-amber';
  bgImage: string;
  selectedServices: string[];
  selectedAreas: string[];
  phoneNumbers: string[];
  priceTag?: string;
  highlightNote?: string;
  showQrCode: boolean;
  showLogoBadge: boolean;
}

export interface InquiryFormState {
  fullName: string;
  phone: string;
  inquiryType: 'offer' | 'request';
  propertyType: string;
  area: string;
  budgetOrPrice: string;
  notes: string;
}

export interface MapSearchFilterState {
  purpose: PropertyPurpose | 'all';
  category: PropertyCategory | 'all';
  area: RegionArea | 'all';
  source: ListingSource | 'all';
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  viewMode: 'split' | 'map' | 'list';
}
