import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { CinematicHero } from './components/CinematicHero';
import { GoldDustBackground } from './components/GoldDustBackground';
import { InteractiveSpotlight } from './components/InteractiveSpotlight';
import { PropertyTypeTiles } from './components/PropertyTypeTiles';
import { FeaturedListings } from './components/FeaturedListings';
import { PopularAreas } from './components/PopularAreas';
import { ServicesShowcase } from './components/ServicesShowcase';
import { StatsCounters } from './components/StatsCounters';
import { WhyUs } from './components/WhyUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SocialFollowSection } from './components/SocialFollowSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileFloatingActions } from './components/MobileFloatingActions';
import { PropertyModal } from './components/PropertyModal';
import { PosterStudio } from './components/PosterStudio';
import { MarketRadar2027 } from './components/MarketRadar2027';
import { ListPropertyForm } from './components/ListPropertyForm';
import { MapSearchExplorer } from './components/MapSearchExplorer';
import { CompoundsGuide } from './components/CompoundsGuide';
import { AgentsDirectory } from './components/AgentsDirectory';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AddPropertyModal } from './components/AddPropertyModal';
import { Property, PropertyPurpose, RegionArea } from './types';
import { PROPERTIES } from './data/properties';
import { subscribeProperties } from './services/propertyService';

function AppContent() {
  const { t, isRtl } = useLanguage();
  const { user, isAdmin } = useAuth();

  // Active state for Property inspection modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Social Ad & Poster Studio state
  const [showPosterStudio, setShowPosterStudio] = useState(false);
  const [posterProperty, setPosterProperty] = useState<Property | null>(null);

  // Authentication & Admin Dashboard Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // Cloud Firestore Properties with fallback to local seed & stored user properties
  const [propertiesList, setPropertiesList] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('almasreya_user_properties');
      if (stored) {
        const userProps: Property[] = JSON.parse(stored);
        if (Array.isArray(userProps) && userProps.length > 0) {
          const userIds = new Set(userProps.map((p) => p.id));
          return [...userProps, ...PROPERTIES.filter((p) => !userIds.has(p.id))];
        }
      }
    } catch (e) {
      console.warn('Could not read user properties from local storage:', e);
    }
    return PROPERTIES;
  });

  useEffect(() => {
    const unsubscribe = subscribeProperties((cloudProps) => {
      if (cloudProps && cloudProps.length > 0) {
        try {
          const stored = localStorage.getItem('almasreya_user_properties');
          if (stored) {
            const userProps: Property[] = JSON.parse(stored);
            const cloudIds = new Set(cloudProps.map((p) => p.id));
            const uniqueLocal = userProps.filter((p) => !cloudIds.has(p.id));
            setPropertiesList([...uniqueLocal, ...cloudProps]);
            return;
          }
        } catch (e) {}
        setPropertiesList(cloudProps);
      }
    });
    return () => unsubscribe();
  }, []);

  // Filters passed from Hero Search Bar to Listings
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSearchFilters, setActiveSearchFilters] = useState<{
    purpose: PropertyPurpose;
    area: RegionArea | 'all';
    category: string;
    priceRange: string;
    bedrooms: string;
  } | null>(null);

  const handleHeroSearch = (filters: {
    purpose: PropertyPurpose;
    area: RegionArea | 'all';
    category: string;
    priceRange: string;
    bedrooms: string;
  }) => {
    setActiveSearchFilters(filters);
    if (filters.category) {
      setSelectedCategory(filters.category);
    }
  };

  const handleSelectArea = (areaId: RegionArea) => {
    setActiveSearchFilters((prev) => ({
      purpose: prev?.purpose || 'sale',
      area: areaId,
      category: prev?.category || 'all',
      priceRange: prev?.priceRange || 'all',
      bedrooms: prev?.bedrooms || 'all',
    }));
    scrollToSection('properties');
  };

  const handleSelectPropertyType = (typeId: string) => {
    let normalized = typeId;
    if (typeId === 'apartments') normalized = 'apartment';
    else if (typeId === 'villas') normalized = 'villa';
    else if (typeId === 'chalets') normalized = 'chalet';
    else if (typeId === 'studios') normalized = 'studio';
    else if (typeId === 'furnished') normalized = 'hotel_apartment';
    else if (typeId === 'offices') normalized = 'administrative';
    else if (typeId === 'shops') normalized = 'retail';
    else if (typeId === 'clinics') normalized = 'clinic';
    else if (typeId === 'buildings' || typeId === 'warehouses') normalized = 'land';

    setSelectedCategory(normalized);
    setActiveSearchFilters((prev) => ({
      purpose: prev?.purpose || 'sale',
      area: prev?.area || 'all',
      category: normalized,
      priceRange: prev?.priceRange || 'all',
      bedrooms: prev?.bedrooms || 'all',
    }));
    scrollToSection('properties');
  };

  const handlePropertyCreated = (newProperty: Property) => {
    setPropertiesList((prev) => [newProperty, ...prev.filter((p) => p.id !== newProperty.id)]);
    setSelectedCategory(newProperty.category);
    scrollToSection('properties');
  };

  const handleOpenPoster = (property: Property) => {
    setPosterProperty(property);
    setShowPosterStudio(true);
    scrollToSection('poster-studio');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-[#B9BCC7] flex flex-col relative selection:bg-[#D4A017] selection:text-[#05060A] font-['Cairo',sans-serif]">
      
      {/* 1. Canvas Gold Dust Particles & Interactive Cursor Spotlight */}
      <GoldDustBackground />
      <InteractiveSpotlight />

      {/* 2. Header with Top utility phone bar, 24/7 hours, socials & language switcher */}
      <Header
        onOpenAddProperty={() => setShowAddPropertyModal(true)}
        onNavigateSection={scrollToSection}
        onOpenLoginModal={() => setShowAuthModal(true)}
        onOpenAdminDashboard={() => setShowAdminDashboard(true)}
      />

      {/* 3. Main Sections */}
      <main className="flex-1 relative z-10">
        
        {/* Cinematic Hero */}
        <CinematicHero
          onSearchSubmit={handleHeroSearch}
          onExploreProperties={() => scrollToSection('properties')}
        />

        {/* Stats Counters */}
        <StatsCounters />

        {/* Phase 2: Interactive Map-Based Search Explorer */}
        <MapSearchExplorer
          properties={propertiesList}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenInPosterStudio={handleOpenPoster}
        />

        {/* 15 Property Types Taxonomy Tiles */}
        <PropertyTypeTiles onSelectType={handleSelectPropertyType} />

        {/* Featured Listings with "موثّق من المصرية للعقارات" Gold Badge */}
        <FeaturedListings
          properties={propertiesList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenInPosterStudio={handleOpenPoster}
        />

        {/* Phase 2: Major Compounds Guide & Masterplans */}
        <CompoundsGuide />

        {/* 4 Prime Focus Areas: Sheraton, Heliopolis, El Nozha, Nasr City */}
        <PopularAreas onSelectArea={handleSelectArea} />

        {/* 8 Core Services with Custom Icons */}
        <ServicesShowcase />

        {/* Phase 2: Official Certified Advisors & Agents Directory */}
        <AgentsDirectory />

        {/* 2027 Market Radar / Price Index Intelligence */}
        <MarketRadar2027 />

        {/* Poster & Social Media Ad Studio */}
        {showPosterStudio && (
          <div id="poster-studio">
            <PosterStudio
              initialProperty={posterProperty}
              onClose={() => setShowPosterStudio(false)}
            />
          </div>
        )}

        {/* Why Choose Al Masreya Real Estate */}
        <WhyUs />

        {/* Testimonials (Empty-State & Submission Ready) */}
        <TestimonialsSection />

        {/* Follow us on Facebook & TikTok */}
        <SocialFollowSection />

        {/* "اعرض عقارك معنا" / List Property Form */}
        <div id="list-property">
          <ListPropertyForm />
        </div>

        {/* FAQ Section */}
        <FAQSection />

      </main>

      {/* 4. Luxury Dark Footer */}
      <Footer />

      {/* 5. Mobile Floating Call + WhatsApp Action Bar */}
      <MobileFloatingActions />

      {/* 6. Property Details Lightbox Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenInPosterStudio={handleOpenPoster}
        />
      )}

      {/* 7. Authentication Modal (Phase 3 Firebase Auth) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* 8. Private Admin Dashboard (Phase 3 Firestore + Role ABAC) */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
