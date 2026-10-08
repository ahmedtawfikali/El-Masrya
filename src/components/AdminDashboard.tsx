import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Building2,
  Users,
  Settings,
  PhoneCall,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Search,
  Eye,
  Save,
  Database,
  ArrowRight,
  X,
  MapPin,
  Tag,
  DollarSign,
  Maximize2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useAuth, SUPER_ADMIN_EMAIL } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Property, PropertyPurpose, PropertyCategory, RegionArea } from '../types';
import {
  subscribeProperties,
  savePropertyToFirestore,
  deletePropertyFromFirestore,
  seedInitialPropertiesIfEmpty,
} from '../services/propertyService';
import {
  subscribeInquiries,
  updateInquiryStatus,
  deleteInquiry,
  FirestoreInquiry,
} from '../services/inquiryService';
import {
  subscribeSiteSettings,
  saveSiteSettings,
  FirestoreSiteSettings,
  defaultSettings,
} from '../services/settingsService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { t, isRtl } = useLanguage();
  const { user, isAdmin, profile, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'kpi' | 'properties' | 'leads' | 'settings'>('kpi');
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<FirestoreInquiry[]>([]);
  const [siteSettings, setSiteSettings] = useState<FirestoreSiteSettings>(defaultSettings);

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  // Property Modal State
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);

  // Site Settings Form state
  const [settingsForm, setSettingsForm] = useState<FirestoreSiteSettings>(defaultSettings);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Search in properties
  const [propertySearch, setPropertySearch] = useState('');

  // Subscribe to real-time collections when open
  useEffect(() => {
    if (!isOpen) return;

    const unsubProps = subscribeProperties((data) => setProperties(data));
    const unsubInq = subscribeInquiries((data) => setInquiries(data));
    const unsubSettings = subscribeSiteSettings((data) => {
      setSiteSettings(data);
      setSettingsForm(data);
    });

    return () => {
      unsubProps();
      unsubInq();
      unsubSettings();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Access guard
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
        <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-slate-950 p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-white">
            {isRtl ? 'لوحة التحكم الإدارية مقفلة' : 'Admin Dashboard Locked'}
          </h2>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            {isRtl
              ? `هذه اللوحة خاصة بمدير شركة "المصرية للعقارات" فقط (${SUPER_ADMIN_EMAIL}). يرجى تسجيل الدخول بحساب المدير المصرح له.`
              : `This dashboard is restricted to Al Masreya Real Estate Super Admin (${SUPER_ADMIN_EMAIL}). Please sign in with the authorized account.`}
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-700"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSeedProperties = async () => {
    setIsSeeding(true);
    setSeedNotice(null);
    try {
      const added = await seedInitialPropertiesIfEmpty(user?.uid || 'super-admin');
      if (added) {
        setSeedNotice(isRtl ? 'تمت تهيئة ورفع العقارات الأولية بنجاح إلى Firestore!' : 'Initial properties synced to Firestore successfully!');
      } else {
        setSeedNotice(isRtl ? 'العقارات متوفرة بالفعل في قاعدة البيانات.' : 'Properties are already present in Firestore.');
      }
    } catch (err: any) {
      setSeedNotice(err.message || 'Error seeding database');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty?.title || !editingProperty?.price) return;

    try {
      await savePropertyToFirestore(editingProperty, user?.uid || 'admin');
      setShowPropertyModal(false);
      setEditingProperty(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteProp = async (id: string) => {
    if (confirm(isRtl ? 'هل أنت متأكد من حذف هذا العقار نهائياً؟' : 'Are you sure you want to delete this property?')) {
      await deletePropertyFromFirestore(id);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsSuccess(false);
    try {
      await saveSiteSettings(settingsForm, user?.uid || 'admin');
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSettingsSaving(false);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const q = propertySearch.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.areaNameArabic?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 text-slate-100 backdrop-blur-2xl">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-amber-500/20 bg-slate-900/60 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-cyan-500/20 text-amber-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-wide text-white">
                {isRtl ? 'لوحة التحكم الإدارية — المصرية للعقارات' : 'Al Masreya Admin Command Center'}
              </h1>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                PRO 2027
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {user?.email} • {isRtl ? 'مشرف معتمد' : 'Authorized Admin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-amber-500/40 hover:text-white"
          >
            <ArrowRight className={`h-4 w-4 ${isRtl ? '' : 'rotate-180'}`} />
            <span>{isRtl ? 'العودة للموقع' : 'Return to Site'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar Tabs */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <nav className="w-64 border-l border-slate-800 bg-slate-900/30 p-4">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('kpi')}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all ${
                activeTab === 'kpi'
                  ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>{isRtl ? 'نظرة عامة ومؤشرات' : 'Executive Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold transition-all ${
                activeTab === 'properties'
                  ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                <span>{isRtl ? 'إدارة العقارات' : 'Properties Matrix'}</span>
              </div>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                {properties.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <span>{isRtl ? 'طلبات وعملاء التواصل' : 'Leads & Inquiries'}</span>
              </div>
              {inquiries.filter((i) => i.status === 'new').length > 0 && (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>{isRtl ? 'إعدادات المنصة الرسمية' : 'Platform Settings'}</span>
            </button>
          </div>

          {/* Quick Database Seeder widget */}
          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-slate-950 p-4">
            <h3 className="text-xs font-bold text-amber-400">
              {isRtl ? 'قاعدة بيانات Firestore' : 'Firestore Status'}
            </h3>
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
              {isRtl
                ? 'مربوطة سحابياً بنجاح مع قواعد أمان ABAC.'
                : 'Cloud Firestore connected with ABAC rules.'}
            </p>
            <button
              onClick={handleSeedProperties}
              disabled={isSeeding}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 disabled:opacity-50"
            >
              <Database className="h-3.5 w-3.5" />
              <span>{isSeeding ? (isRtl ? 'جارِ الرفع...' : 'Seeding...') : (isRtl ? 'مزامنة العقارات الأولية' : 'Sync Sample Listings')}</span>
            </button>
            {seedNotice && (
              <p className="mt-2 text-[10px] text-cyan-300 text-center font-medium">
                {seedNotice}
              </p>
            )}
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: KPI OVERVIEW */}
          {activeTab === 'kpi' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">{isRtl ? 'إجمالي العقارات السحابية' : 'Cloud Properties'}</span>
                    <Building2 className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-white">{properties.length}</div>
                  <p className="mt-1 text-[11px] text-slate-400">{isRtl ? 'مسجلة في Cloud Firestore' : 'Stored in Cloud Firestore'}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">{isRtl ? 'طلبات العملاء الجديدة' : 'New Leads'}</span>
                    <Users className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-cyan-300">
                    {inquiries.filter((i) => i.status === 'new').length}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">{isRtl ? 'بانتظار التواصل الفوري' : 'Pending direct WhatsApp/Call'}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">{isRtl ? 'العقارات الموثقة' : 'Verified Listings'}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-emerald-300">
                    {properties.filter((p) => p.verifiedByAlMasreya).length}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">{isRtl ? 'بشارة توثيق المصرية للعقارات' : 'Official Al Masreya Verified'}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">{isRtl ? 'المناطق الرئيسية' : 'Core Hubs'}</span>
                    <MapPin className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-purple-300">4</div>
                  <p className="mt-1 text-[11px] text-slate-400">{isRtl ? 'شيراتون، مصر الجديدة، النزهة، نصر' : 'Sheraton, Heliopolis, Nozha, Nasr City'}</p>
                </div>
              </div>

              {/* Quick Actions & Recent Leads */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white">
                      {isRtl ? 'أحدث طلبات العملاء' : 'Recent Leads & Inquiries'}
                    </h3>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      {isRtl ? 'عرض الكل' : 'View All'}
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 p-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{inq.fullName}</span>
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                              {inq.inquiryType}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{inq.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/20${inq.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                          >
                            <PhoneCall className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="py-8 text-center text-xs text-slate-500">
                        {isRtl ? 'لا توجد طلبات عملاء حتى الآن.' : 'No customer inquiries yet.'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl">
                  <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
                    {isRtl ? 'إجراءات سريعة للمدير' : 'Quick Actions'}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setEditingProperty({
                          title: '',
                          titleAr: '',
                          purpose: 'sale',
                          category: 'apartment',
                          area: 'sheraton',
                          areaNameArabic: 'مساكن شيراتون',
                          subLocation: 'شارع خالد بن الوليد',
                          price: 3500000,
                          priceFormatted: '3,500,000 ج.م',
                          priceUnit: 'ج.م',
                          spaceM2: 180,
                          bedrooms: 3,
                          bathrooms: 2,
                          finishing: 'الترا سوبر لوكس',
                          featured: true,
                          verifiedByAlMasreya: true,
                          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                          description: 'عقار متميز في أرقى مواقع مساكن شيراتون',
                          coordinates: { lat: 30.1065, lng: 31.3785 },
                        });
                        setShowPropertyModal(true);
                      }}
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center transition-all hover:bg-amber-500/20"
                    >
                      <Plus className="h-6 w-6 text-amber-400" />
                      <span className="text-xs font-bold text-white">
                        {isRtl ? 'إضافة عقار جديد' : 'Add Property'}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-center transition-all hover:bg-cyan-500/20"
                    >
                      <Settings className="h-6 w-6 text-cyan-400" />
                      <span className="text-xs font-bold text-white">
                        {isRtl ? 'تعديل هواتف وعنوان الشركة' : 'Edit Contact & Info'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative min-w-[260px]">
                  <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    placeholder={isRtl ? 'بحث في العقارات...' : 'Search listings...'}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pr-3 pl-9 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProperty({
                      title: '',
                      purpose: 'sale',
                      category: 'apartment',
                      area: 'sheraton',
                      areaNameArabic: 'مساكن شيراتون',
                      subLocation: 'مساكن شيراتون',
                      price: 3000000,
                      priceFormatted: '3,000,000 ج.م',
                      priceUnit: 'ج.م',
                      spaceM2: 160,
                      bedrooms: 3,
                      bathrooms: 2,
                      finishing: 'سوبر لوكس',
                      featured: false,
                      verifiedByAlMasreya: true,
                      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
                      description: 'تفاصيل العقار مع المصرية للعقارات',
                      coordinates: { lat: 30.1065, lng: 31.3785 },
                    });
                    setShowPropertyModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isRtl ? 'إضافة عقار جديد' : 'New Listing'}</span>
                </button>
              </div>

              {/* Properties Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-semibold text-slate-400">
                    <tr>
                      <th className="p-3.5">{isRtl ? 'العقار' : 'Property'}</th>
                      <th className="p-3.5">{isRtl ? 'النوع / الغرض' : 'Type / Purpose'}</th>
                      <th className="p-3.5">{isRtl ? 'السعر' : 'Price'}</th>
                      <th className="p-3.5">{isRtl ? 'المساحة' : 'Area'}</th>
                      <th className="p-3.5">{isRtl ? 'الموقع' : 'Location'}</th>
                      <th className="p-3.5">{isRtl ? 'التوثيق' : 'Badges'}</th>
                      <th className="p-3.5 text-center">{isRtl ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProperties.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/30">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="h-10 w-12 rounded-lg object-cover border border-slate-800"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{p.title}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                            p.purpose === 'sale'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          }`}>
                            {p.purpose === 'sale' ? (isRtl ? 'بيع / تمليك' : 'Sale') : (isRtl ? 'إيجار' : 'Rent')}
                          </span>
                          <span className="block mt-0.5 text-[10px] text-slate-400">{p.category}</span>
                        </td>
                        <td className="p-3.5 font-bold text-amber-300">
                          {p.priceFormatted || `${p.price?.toLocaleString()} ${p.priceUnit || 'ج.م'}`}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {p.spaceM2} م²
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {p.areaNameArabic}
                        </td>
                        <td className="p-3.5">
                          {p.verifiedByAlMasreya && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{isRtl ? 'موثق' : 'Verified'}</span>
                            </span>
                          )}
                          {p.featured && (
                            <span className="block text-[10px] text-amber-400 font-semibold">
                              ★ {isRtl ? 'مميز' : 'Featured'}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProperty(p);
                                setShowPropertyModal(true);
                              }}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-amber-400"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProp(p.id)}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProperties.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          {isRtl ? 'لا توجد عقارات مطابقة. اضغط "مزامنة العقارات الأولية" لملء قاعدة البيانات.' : 'No listings found. Click "Sync Sample Listings" to populate.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS & INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">
                  {isRtl ? 'طلبات وعملاء التواصل (Leads)' : 'Customer Leads'}
                </h2>
                <span className="text-xs text-slate-400">
                  {inquiries.length} {isRtl ? 'طلب مسجل' : 'Total Leads'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inq.fullName}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            inq.status === 'new'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : inq.status === 'contacted'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {inq.status === 'new' ? (isRtl ? 'جديد' : 'New') : inq.status === 'contacted' ? (isRtl ? 'تم التواصل' : 'Contacted') : (isRtl ? 'مغلق' : 'Closed')}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(inq.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>{isRtl ? 'نوع الطلب:' : 'Type:'}</span>
                          <span className="text-white font-medium">{inq.inquiryType}</span>
                        </div>
                        {inq.propertyTitle && (
                          <div className="flex items-center justify-between text-slate-400">
                            <span>{isRtl ? 'العقار:' : 'Property:'}</span>
                            <span className="text-amber-300 font-medium truncate max-w-[150px]">{inq.propertyTitle}</span>
                          </div>
                        )}
                        {inq.budgetOrPrice && (
                          <div className="flex items-center justify-between text-slate-400">
                            <span>{isRtl ? 'الميزانية / السعر:' : 'Budget:'}</span>
                            <span className="text-white font-medium">{inq.budgetOrPrice}</span>
                          </div>
                        )}
                        {inq.notes && (
                          <div className="mt-2 rounded-xl bg-slate-950 p-2 text-[11px] text-slate-300 leading-relaxed">
                            {inq.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      {/* Direct WhatsApp Call */}
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/20${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent('أهلاً بحضرتك من المصرية للعقارات بخصوص طلبك.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-xl bg-emerald-600/90 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-500"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-700"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                          <span>{isRtl ? 'اتصال' : 'Call'}</span>
                        </a>
                      </div>

                      {/* Status toggle & delete */}
                      <div className="flex items-center gap-1.5">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="rounded-lg border border-slate-700 bg-slate-900 py-1 px-1.5 text-[10px] text-slate-300 focus:outline-none"
                        >
                          <option value="new">{isRtl ? 'جديد' : 'New'}</option>
                          <option value="contacted">{isRtl ? 'تم التواصل' : 'Contacted'}</option>
                          <option value="closed">{isRtl ? 'مغلق' : 'Closed'}</option>
                        </select>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="rounded-lg p-1.5 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <div className="col-span-full py-12 text-center text-xs text-slate-500">
                    {isRtl ? 'لا توجد طلبات عملاء حتى الآن.' : 'No inquiries recorded yet.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORM BRAND SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">
                  {isRtl ? 'إعدادات المنصة الرسمية لشركة "المصرية للعقارات"' : 'Official Company Brand & Contact Settings'}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {isRtl
                    ? 'يتم حفظ هذه البيانات في Cloud Firestore وتنعكس فورياً على الهيدر، الفوتر، بطاقات الاتصال، والواتساب.'
                    : 'Synced directly with Cloud Firestore and instantly applied across header, footer, contact widgets, and WhatsApp links.'}
                </p>
              </div>

              {settingsSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
                  <Check className="h-4 w-4" />
                  <span>{isRtl ? 'تم حفظ الإعدادات بنجاح في Cloud Firestore!' : 'Settings saved successfully to Cloud Firestore!'}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                {/* Hero Headline */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400">
                    {isRtl ? 'العنوان الرئيسي للواجهة (Hero Headline)' : 'Hero Headline'}
                  </h3>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">
                      {isRtl ? 'العنوان بالعربية' : 'Arabic Headline'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.heroHeadlineAr}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadlineAr: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">
                      {isRtl ? 'العنوان بالإنجليزية' : 'English Headline'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.heroHeadlineEn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadlineEn: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contact & Phones */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400">
                    {isRtl ? 'أرقام الهواتف الرسمية والواتساب' : 'Official Phone Numbers'}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {settingsForm.phones.map((phone, idx) => (
                      <div key={idx}>
                        <label className="mb-1 block text-[11px] text-slate-400 font-mono">
                          {isRtl ? `هاتف ${idx + 1}` : `Phone ${idx + 1}`} ({phone.display})
                        </label>
                        <input
                          type="text"
                          value={phone.number}
                          onChange={(e) => {
                            const updated = [...settingsForm.phones];
                            updated[idx] = { ...updated[idx], number: e.target.value, display: e.target.value };
                            setSettingsForm({ ...settingsForm, phones: updated });
                          }}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">
                      {isRtl ? 'العنوان الرسمي' : 'Official Office Address'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.addressAr}
                      onChange={(e) => setSettingsForm({ ...settingsForm, addressAr: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">
                      {isRtl ? 'مواعيد وساعات العمل' : 'Working Hours'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.workingHoursAr}
                      onChange={(e) => setSettingsForm({ ...settingsForm, workingHoursAr: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400">
                    {isRtl ? 'روابط مواقع التواصل الاجتماعي' : 'Social Channels'}
                  </h3>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">Facebook URL</label>
                    <input
                      type="text"
                      value={settingsForm.facebookUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">TikTok URL</label>
                    <input
                      type="text"
                      value={settingsForm.tiktokUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={settingsSaving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold text-slate-950 shadow-xl shadow-amber-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>
                    {settingsSaving
                      ? isRtl ? 'جارِ الحفظ السحابي...' : 'Saving to Cloud...'
                      : isRtl ? 'حفظ التعديلات في Cloud Firestore' : 'Save Changes to Cloud Firestore'}
                  </span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Property Create / Edit Modal */}
      {showPropertyModal && editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPropertyModal(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingProperty.id
                  ? isRtl ? 'تعديل العقار' : 'Edit Listing'
                  : isRtl ? 'إضافة عقار جديد إلى المنصة' : 'New Property Listing'}
              </h3>
              <button
                onClick={() => setShowPropertyModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'عنوان العقار' : 'Title'}</label>
                <input
                  type="text"
                  required
                  value={editingProperty.title || ''}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  placeholder={isRtl ? 'مثال: شقة فاخرة للبيع في مساكن شيراتون' : 'e.g. Luxury Apartment in Masaken Sheraton'}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'الغرض' : 'Purpose'}</label>
                  <select
                    value={editingProperty.purpose || 'sale'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, purpose: e.target.value as PropertyPurpose })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="sale">{isRtl ? 'بيع / تمليك' : 'Sale'}</option>
                    <option value="rent">{isRtl ? 'إيجار' : 'Rent'}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'النوع' : 'Category'}</label>
                  <select
                    value={editingProperty.category || 'apartment'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, category: e.target.value as PropertyCategory })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="apartment">{isRtl ? 'شقة سكنية' : 'Apartment'}</option>
                    <option value="hotel_apartment">{isRtl ? 'شقة فندقية ومفروشة' : 'Hotel Apartment'}</option>
                    <option value="villa">{isRtl ? 'فيلا مستقلة' : 'Villa'}</option>
                    <option value="studio">{isRtl ? 'استوديو ذكي' : 'Studio'}</option>
                    <option value="duplex">{isRtl ? 'دوبلكس' : 'Duplex'}</option>
                    <option value="penthouse">{isRtl ? 'بنتهاوس' : 'Penthouse'}</option>
                    <option value="administrative">{isRtl ? 'إداري ومكتب' : 'Administrative'}</option>
                    <option value="retail">{isRtl ? 'تجاري ومحل' : 'Retail'}</option>
                    <option value="chalet">{isRtl ? 'شاليه ساحلي' : 'Chalet'}</option>
                    <option value="clinic">{isRtl ? 'عيادة طبية' : 'Clinic'}</option>
                    <option value="furnished">{isRtl ? 'مفروش فاخر' : 'Furnished'}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'المنطقة' : 'Area'}</label>
                  <select
                    value={editingProperty.area || 'sheraton'}
                    onChange={(e) => {
                      const area = e.target.value as RegionArea;
                      const areaNames: Record<string, string> = {
                        sheraton: 'مساكن شيراتون',
                        heliopolis: 'مصر الجديدة',
                        nozha: 'النزهة الجديدة',
                        'nasr-city': 'مدينة نصر',
                        'new-cairo': 'القاهرة الجديدة',
                        other: 'أخرى',
                      };
                      setEditingProperty({
                        ...editingProperty,
                        area,
                        areaNameArabic: areaNames[area] || 'مساكن شيراتون',
                      });
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="sheraton">مساكن شيراتون</option>
                    <option value="heliopolis">مصر الجديدة</option>
                    <option value="nozha">النزهة الجديدة</option>
                    <option value="nasr-city">مدينة نصر</option>
                    <option value="new-cairo">القاهرة الجديدة</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'السعر (ج.م)' : 'Price (EGP)'}</label>
                  <input
                    type="number"
                    required
                    value={editingProperty.price || 0}
                    onChange={(e) => {
                      const price = Number(e.target.value);
                      setEditingProperty({
                        ...editingProperty,
                        price,
                        priceFormatted: `${price.toLocaleString()} ج.م`,
                      });
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'المساحة (م²)' : 'Space (m²)'}</label>
                  <input
                    type="number"
                    required
                    value={editingProperty.spaceM2 || 0}
                    onChange={(e) => setEditingProperty({ ...editingProperty, spaceM2: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'الغرف' : 'Bedrooms'}</label>
                  <input
                    type="number"
                    value={editingProperty.bedrooms || 3}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'الحمامات' : 'Bathrooms'}</label>
                  <input
                    type="number"
                    value={editingProperty.bathrooms || 2}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'رابط الصورة الرئيسية' : 'Image URL'}</label>
                <input
                  type="text"
                  required
                  value={editingProperty.image || ''}
                  onChange={(e) => setEditingProperty({ ...editingProperty, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-slate-300 font-semibold">{isRtl ? 'الوصف' : 'Description'}</label>
                <textarea
                  rows={3}
                  value={editingProperty.description || ''}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingProperty.verifiedByAlMasreya || false}
                    onChange={(e) => setEditingProperty({ ...editingProperty, verifiedByAlMasreya: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                  />
                  <span>{isRtl ? 'توثيق رسمي من المصرية للعقارات' : 'Al Masreya Verified Badge'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingProperty.featured || false}
                    onChange={(e) => setEditingProperty({ ...editingProperty, featured: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                  />
                  <span>{isRtl ? 'عقار مميز في الصفحة الرئيسية' : 'Featured on Home'}</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPropertyModal(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110"
                >
                  {isRtl ? 'حفظ في Firestore' : 'Save to Cloud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
