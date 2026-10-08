import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Globe, PlusCircle, User, Menu, X, 
  MapPin, Clock, ShieldCheck, ChevronDown, Sparkles, LogOut, LayoutDashboard 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenAddProperty?: () => void;
  onOpenLoginModal?: () => void;
  onOpenAdminDashboard?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddProperty,
  onOpenLoginModal,
  onOpenAdminDashboard,
  onNavigateSection,
}) => {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const { user, isAdmin, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phonesDropdownOpen, setPhonesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. TOP UTILITY BAR (Black & Gold Ribbon with Official Phones & 24/7 Hours) */}
      <div className="bg-[#05060A]/95 backdrop-blur-xl border-b border-white/[0.08] text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Right/Start: Official Address & 24/7 Beacon */}
          <div className="flex items-center gap-4 text-[#B9BCC7]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
              <span className="font-semibold text-white">
                {t(SITE_CONFIG.contact.workingHoursAr, SITE_CONFIG.contact.workingHoursEn)}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#2BA8FF]" />
              <span className="truncate max-w-xs lg:max-w-md">
                {t('مساكن شيراتون، المطار، القاهرة', 'Masaken Sheraton, Cairo Airport')}
              </span>
            </div>
          </div>

          {/* Left/End: The 3 Clickable Phones + Socials + Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Phone quick links */}
            <div className="hidden lg:flex items-center gap-3 font-mono text-[11px]" dir="ltr">
              {SITE_CONFIG.contact.phones.map((p, idx) => (
                <div key={p.number} className="flex items-center gap-1">
                  <a
                    href={getTelUrl(p.number)}
                    className="hover:text-[#F7D774] transition-colors text-white font-bold"
                    title={t(p.labelAr, p.labelEn)}
                  >
                    {p.display}
                  </a>
                  <a
                    href={getWhatsAppUrl(p.number, t(p.whatsappMessageAr, p.whatsappMessageEn))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </a>
                  {idx < SITE_CONFIG.contact.phones.length - 1 && (
                    <span className="text-slate-600 mx-1">·</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Icons (Facebook & TikTok) */}
            <div className="flex items-center gap-2 border-r lg:border-r-0 border-l border-white/10 px-2 lg:px-0">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B9BCC7] hover:text-[#2BA8FF] transition-colors p-1"
                aria-label="Facebook Page"
                title="صفحة فيسبوك الرسمية"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B9BCC7] hover:text-[#FF5A2E] transition-colors p-1"
                aria-label="TikTok Official"
                title="حساب تيك توك الرسمي"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.34 6.34 0 0 0-6.07 6.36 6.35 6.35 0 0 0 10.85 4.51c1.32-1.32 2.05-3.07 2.05-4.94V9.22a8.28 8.28 0 0 0 4.92 1.6V7.37a4.83 4.83 0 0 1-2.5-.68z" />
                </svg>
              </a>
            </div>

            {/* Language Switcher (AR / EN) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold transition-all cursor-pointer"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3 h-3 text-[#D4A017]" />
              <span className="font-mono text-[11px] uppercase">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (Glass 2.0 with Frosted Panel & Gold Shimmer) */}
      <div className="bg-[#0B0E17]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Zone 1: Official Brand Logo with Horizontal Emblem */}
            <div className="flex items-center">
              <button
                onClick={() => handleNav('hero')}
                className="text-right focus:outline-none rounded-lg cursor-pointer group"
                aria-label="المصرية للعقارات مساكن شيراتون"
              >
                <BrandLogo variant="horizontal" />
              </button>
            </div>

            {/* Zone 2: 4-6 Clean Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-[#B9BCC7]">
              <button
                onClick={() => handleNav('hero')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('الرئيسية', 'Home')}
              </button>

              <button
                onClick={() => handleNav('map-search')}
                className="hover:text-white hover:text-[#F7D774] text-cyan-400 font-bold transition-colors py-1 cursor-pointer flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{t('البحث بالخريطة', 'Map Search')}</span>
              </button>

              <button
                onClick={() => handleNav('properties')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('عقاراتنا', 'Properties')}
              </button>

              <button
                onClick={() => handleNav('compounds')}
                className="hover:text-white hover:text-[#F7D774] text-[#F7D774] font-bold transition-colors py-1 cursor-pointer flex items-center gap-1.5"
              >
                <span>{t('دليل الكمبوندات', 'Compounds')}</span>
              </button>

              <button
                onClick={() => handleNav('agents')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('المستشارون', 'Agents')}
              </button>

              <button
                onClick={() => handleNav('areas')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('المناطق الحيوية', 'Prime Areas')}
              </button>

              <button
                onClick={() => handleNav('services')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('الخدمات', 'Services')}
              </button>

              <button
                onClick={() => handleNav('market-radar')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer flex items-center gap-1 text-[#2BA8FF]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BA8FF] animate-pulse" />
                <span>{t('مؤشر الأسعار 2027', '2027 Index')}</span>
              </button>

              <button
                onClick={() => handleNav('why-us')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('لماذا المصرية؟', 'Why Us')}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className="hover:text-white hover:text-[#F7D774] transition-colors py-1 cursor-pointer"
              >
                {t('اتصل بنا', 'Contact')}
              </button>
            </nav>

            {/* Zone 3: Actions (Phones trigger, Add Property, Login) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Phone Quick Dial Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPhonesDropdownOpen(!phonesDropdownOpen)}
                  className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#D4A017]/30 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(212,160,23,0.1)]"
                >
                  <Phone className="w-4 h-4 text-[#F7D774]" />
                  <span className="hidden sm:inline font-mono" dir="ltr">01286429815</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {phonesDropdownOpen && (
                  <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 rounded-2xl bg-[#0B0E17]/95 backdrop-blur-2xl border border-[#D4A017]/40 shadow-2xl p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-white/10 text-xs font-bold text-[#F7D774]">
                      {t('أرقام الاتصال المباشر والواتساب (24/7)', 'Direct Phone & WhatsApp (24/7)')}
                    </div>
                    <div className="py-1">
                      {SITE_CONFIG.contact.phones.map((phone) => (
                        <div key={phone.number} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                          <div className="text-[11px] text-[#B9BCC7] font-medium mb-1">
                            {t(phone.labelAr, phone.labelEn)}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <a
                              href={getTelUrl(phone.number)}
                              className="font-mono font-bold text-sm text-white hover:text-[#F7D774] flex items-center gap-1.5"
                              dir="ltr"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {phone.display}
                            </a>
                            <a
                              href={getWhatsAppUrl(phone.number, t(phone.whatsappMessageAr, phone.whatsappMessageEn))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
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

              {/* Add Property CTA button - Comprehensive All Sections */}
              <button
                onClick={() => onOpenAddProperty ? onOpenAddProperty() : handleNav('list-property')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400/20 via-amber-500/15 to-amber-600/20 hover:from-amber-400/30 hover:to-amber-500/30 border border-amber-400/50 text-xs sm:text-sm font-black text-amber-300 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(212,160,23,0.2)] hover:shadow-[0_0_25px_rgba(212,160,23,0.35)] active:scale-95"
                title={t('أضف عقار جديد بكافة الأقسام والتصنيفات', 'Add New Property in All Sections')}
              >
                <PlusCircle className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                <span>{t('أضف عقار جديد +', 'Add Property +')}</span>
              </button>

              {/* Admin Command Center Button (Visible when Admin) */}
              {isAdmin && (
                <button
                  onClick={onOpenAdminDashboard}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-950 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,160,23,0.35)] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 active:scale-95 border border-amber-300/40"
                  title={t('لوحة التحكم الإدارية السحابية', 'Cloud Admin Dashboard')}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{t('لوحة التحكم', 'Admin')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping hidden sm:inline-block" />
                </button>
              )}

              {/* Authenticated User / Login Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-xs text-white transition-all"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full border border-amber-400/50" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-cyan-500 text-[10px] font-black text-slate-950 flex items-center justify-center">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="hidden md:inline font-bold text-xs max-w-[90px] truncate">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-white/10">
                        <div className="text-xs font-bold text-white truncate">{user.displayName || 'User'}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{user.email}</div>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                            {t('مدير النظام', 'Super Admin')}
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        {isAdmin && (
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              if (onOpenAdminDashboard) onOpenAdminDashboard();
                            }}
                            className="w-full text-right py-2 px-3 text-xs text-amber-300 hover:bg-white/5 rounded-xl flex items-center justify-between"
                          >
                            <span>{t('لوحة التحكم الإدارية', 'Admin Dashboard')}</span>
                            <LayoutDashboard className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full text-right py-2 px-3 text-xs text-red-400 hover:bg-red-500/10 rounded-xl flex items-center justify-between"
                        >
                          <span>{t('تسجيل الخروج', 'Sign Out')}</span>
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenLoginModal ? onOpenLoginModal() : handleNav('contact')}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-[#05060A] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,160,23,0.3)] bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] hover:brightness-110 active:scale-95"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('دخول', 'Login')}</span>
                </button>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#07090e]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-8 space-y-2 text-right">
          {/* Mobile Admin / User Status Bar */}
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdminDashboard) onOpenAdminDashboard();
              }}
              className="w-full py-3 px-4 mb-2 text-slate-950 font-black rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 flex items-center justify-between shadow-lg shadow-amber-500/20"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('لوحة التحكم الإدارية (مشرف)', 'Admin Dashboard (Super Admin)')}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            </button>
          )}

          {user ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 mb-2">
              <div>
                <div className="text-xs font-bold text-white">{user.displayName || user.email}</div>
                <div className="text-[10px] text-slate-400">{user.email}</div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1 rounded bg-red-500/10"
              >
                {t('خروج', 'Sign Out')}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="w-full py-2.5 px-4 mb-2 text-slate-950 font-bold rounded-xl bg-gradient-to-r from-[#FFF1B8] to-[#D4A017] flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{t('تسجيل الدخول / حساب جديد', 'Sign In / Register')}</span>
            </button>
          )}

          {/* Mobile Add Property Button with All Sections */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenAddProperty) onOpenAddProperty();
            }}
            className="w-full py-2.5 px-4 mb-3 text-slate-950 font-black text-xs rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,160,23,0.3)] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{t('أضف عقار جديد (كافة الأقسام والتصنيفات) +', 'Add Property (All Sections) +')}</span>
          </button>

          <button
            onClick={() => handleNav('hero')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('الرئيسية', 'Home')}
          </button>
          <button
            onClick={() => handleNav('map-search')}
            className="w-full text-right py-2.5 px-3 text-cyan-400 font-bold hover:bg-white/5 rounded-xl flex items-center justify-between"
          >
            <span>{t('البحث التفاعلي بالخريطة', 'Interactive Map Search')}</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </button>
          <button
            onClick={() => handleNav('properties')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('عقاراتنا المتاحة', 'Available Properties')}
          </button>
          <button
            onClick={() => handleNav('compounds')}
            className="w-full text-right py-2.5 px-3 text-[#F7D774] font-bold hover:bg-white/5 rounded-xl"
          >
            {t('دليل الكمبوندات والمشروعات', 'Compounds & Projects')}
          </button>
          <button
            onClick={() => handleNav('agents')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('دليل المستشارين والوسطاء', 'Advisors & Brokers')}
          </button>
          <button
            onClick={() => handleNav('property-types')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('تصنيفات العقارات (15 تصنيف)', 'Property Types (15 Types)')}
          </button>
          <button
            onClick={() => handleNav('areas')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('المناطق الحيوية (شيراتون، مصر الجديدة، النزهة، مدينة نصر)', 'Prime Areas')}
          </button>
          <button
            onClick={() => handleNav('services')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('خدماتنا العقارية المتكاملة', 'Our Services')}
          </button>
          <button
            onClick={() => handleNav('market-radar')}
            className="w-full text-right py-2.5 px-3 text-[#2BA8FF] font-bold hover:bg-white/5 rounded-xl"
          >
            {t('مؤشر ورادار الأسعار 2027', 'Market Price Radar 2027')}
          </button>
          <button
            onClick={() => handleNav('why-us')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('لماذا المصرية للعقارات؟', 'Why Choose Us')}
          </button>
          <button
            onClick={() => handleNav('faq')}
            className="w-full text-right py-2.5 px-3 text-white font-bold hover:bg-white/5 rounded-xl"
          >
            {t('الأسئلة الشائعة', 'FAQs')}
          </button>

          {/* Mobile Phone list */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-[#F7D774] px-3">
              {t('أرقام الهواتف الرسمية:', 'Official Phone Lines:')}
            </div>
            {SITE_CONFIG.contact.phones.map((p) => (
              <div key={p.number} className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] rounded-lg">
                <span className="text-xs text-slate-400 font-sans">{t(p.labelAr, p.labelEn)}</span>
                <a href={getTelUrl(p.number)} className="font-mono text-sm font-bold text-white" dir="ltr">
                  {p.display}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};
