import React, { useState, useRef } from 'react';
import { 
  Sparkles, Download, Copy, Check, Printer, Phone, MapPin, 
  Layers, Palette, Layout, RefreshCw, X, Shield, Building2, Store, Home, ArrowRight, Zap
} from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';
import { Property } from '../types';

import heroImg from '../assets/images/hero_sheraton_luxury_1791387800905.jpg';
import furnishedImg from '../assets/images/property_interior_furnished_1791387814128.jpg';
import commercialImg from '../assets/images/commercial_administrative_office_1791387825243.jpg';
import retailImg from '../assets/images/retail_storefront_heliopolis_1791387836933.jpg';

interface PosterStudioProps {
  initialProperty?: Property | null;
  onClose?: () => void;
}

export const PosterStudio: React.FC<PosterStudioProps> = ({ initialProperty, onClose }) => {
  // Poster State
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story' | 'banner' | 'flyer'>('square');
  const [theme, setTheme] = useState<'cyber-gold' | 'neon-cyan' | 'black-gold' | 'emerald-luxury'>('cyber-gold');
  
  const [title, setTitle] = useState(
    initialProperty 
      ? initialProperty.title 
      : 'المصرية للعقارات – مساكن شيراتون'
  );
  
  const [subtitle, setSubtitle] = useState(
    initialProperty 
      ? `${initialProperty.areaNameArabic} · ${initialProperty.subLocation}` 
      : 'إيجار · بيع وتمليك · إداري · تجاري · مفروش · محلات'
  );
  
  const [badgeText, setBadgeText] = useState(
    initialProperty ? (initialProperty.purpose === 'sale' ? 'فرصة تمليك حصرية 2027' : 'متاح للإيجار الفوري') : 'المكتب العقاري الأول'
  );

  const [priceHighlight, setPriceHighlight] = useState(
    initialProperty ? `${initialProperty.priceFormatted} ${initialProperty.priceUnit}` : 'أفضل الأسعار وأرقى المواقع المعتمدة'
  );

  const [bgChoice, setBgChoice] = useState<'sheraton' | 'furnished' | 'commercial' | 'retail' | 'gradient'>(
    initialProperty?.category === 'furnished' ? 'furnished' :
    initialProperty?.category === 'administrative' ? 'commercial' :
    initialProperty?.category === 'retail' ? 'retail' : 'sheraton'
  );

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'إيجار سكني وتجاري',
    'بيع وتمليك',
    'مقرات إدارية ومكاتب',
    'محلات وتجاري',
    'شقق مفروشة فندقية',
  ]);

  const [selectedPhones, setSelectedPhones] = useState<string[]>([
    '01286429815',
    '01280822224',
    '01032599331',
  ]);

  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const previewCardRef = useRef<HTMLDivElement>(null);

  // Background Image map
  const bgImageMap = {
    sheraton: heroImg,
    furnished: furnishedImg,
    commercial: commercialImg,
    retail: retailImg,
    gradient: '',
  };

  // Color Themes Definitions with 2027 Neon & Glass aesthetics
  const themeStyles = {
    'cyber-gold': {
      name: '2027 سايبر ذهبي وفحم',
      bgGrad: 'from-black via-[#0b0e17] to-[#14120b]',
      accentColor: '#F59E0B',
      accentBadge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black',
      headerText: 'text-amber-400',
      borderGrad: 'border-amber-500/40',
      tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      phoneBg: 'bg-black/90 text-white border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    },
    'neon-cyan': {
      name: 'نيون أزرق زجاجي 2027',
      bgGrad: 'from-slate-950 via-[#07131e] to-[#040812]',
      accentColor: '#06B6D4',
      accentBadge: 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black',
      headerText: 'text-cyan-300',
      borderGrad: 'border-cyan-500/40',
      tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      phoneBg: 'bg-black/90 text-white border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    },
    'black-gold': {
      name: 'أسود ملكي كلاسيكي',
      bgGrad: 'from-stone-950 via-neutral-900 to-black',
      accentColor: '#D97706',
      accentBadge: 'bg-amber-500 text-slate-950 font-black',
      headerText: 'text-amber-300',
      borderGrad: 'border-yellow-600/30',
      tagBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-600/20',
      phoneBg: 'bg-black/90 text-white border-yellow-500/30',
    },
    'emerald-luxury': {
      name: 'زمردي راقي وذهبي',
      bgGrad: 'from-emerald-950 via-[#091512] to-black',
      accentColor: '#10B981',
      accentBadge: 'bg-emerald-400 text-emerald-950 font-black',
      headerText: 'text-emerald-300',
      borderGrad: 'border-emerald-500/40',
      tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      phoneBg: 'bg-black/90 text-white border-emerald-500/40',
    },
  };

  const currentTheme = themeStyles[theme];

  // Aspect ratio containers
  const aspectConfig = {
    square: {
      label: 'مربع (1:1) - إنستجرام وفيسبوك',
      ratioClass: 'aspect-square max-w-[500px]',
      canvasW: 1080,
      canvasH: 1080,
    },
    story: {
      label: 'طولي (9:16) - ستوري وواتساب ريلز',
      ratioClass: 'aspect-[9/16] max-w-[370px]',
      canvasW: 1080,
      canvasH: 1920,
    },
    banner: {
      label: 'أفقي (16:9) - غلاف وبانر',
      ratioClass: 'aspect-[16/9] max-w-[620px]',
      canvasW: 1200,
      canvasH: 675,
    },
    flyer: {
      label: 'بوستر A4 / فلاير مطبوع (3:4)',
      ratioClass: 'aspect-[3/4] max-w-[450px]',
      canvasW: 1200,
      canvasH: 1600,
    },
  };

  const togglePhone = (num: string) => {
    if (selectedPhones.includes(num)) {
      if (selectedPhones.length > 1) {
        setSelectedPhones(selectedPhones.filter((p) => p !== num));
      }
    } else {
      setSelectedPhones([...selectedPhones, num]);
    }
  };

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleCopyCaption = () => {
    const text = `✨ ${title}
📍 ${subtitle}

🏢 خدمات المصرية للعقارات – مساكن شيراتون:
${selectedServices.map((s) => `▪️ ${s}`).join('\n')}

📍 نطاق التغطية: مساكن شيراتون · مصر الجديدة · النزهة · مدينة نصر
💎 ${priceHighlight}

📞 للتواصل الفوري والمعاينة:
${selectedPhones.map((p) => `☎️ ${p}`).join('\n')}
💬 واتساب مباشر: https://wa.me/20${selectedPhones[0]?.slice(1)}

#المصرية_للعقارات #مساكن_شيراتون #مصر_الجديدة #النزهة #مدينة_نصر #عقارات_القاهرة #شقق_للبيع #شقق_للايجار #مقرات_ادارية #محلات_تجارية`;

    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    setExportNotice('جاري إنشاء صورة البوستر بدقة فائقة 2K...');

    try {
      const targetConfig = aspectConfig[aspectRatio];
      const canvas = document.createElement('canvas');
      canvas.width = targetConfig.canvasW;
      canvas.height = targetConfig.canvasH;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas not supported');

      // Draw background
      if (bgChoice !== 'gradient' && bgImageMap[bgChoice]) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          img.src = bgImageMap[bgChoice];
        });

        const scale = Math.max(canvas.width / (img.width || 1), canvas.height / (img.height || 1));
        const x = (canvas.width / 2) - ((img.width || 1) / 2) * scale;
        const y = (canvas.height / 2) - ((img.height || 1) / 2) * scale;
        
        if (img.width) {
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }

        const scrim = ctx.createLinearGradient(0, 0, 0, canvas.height);
        scrim.addColorStop(0, 'rgba(6, 8, 15, 0.75)');
        scrim.addColorStop(0.4, 'rgba(6, 8, 15, 0.9)');
        scrim.addColorStop(1, 'rgba(3, 4, 8, 0.98)');
        ctx.fillStyle = scrim;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#06080e');
        grad.addColorStop(0.5, '#0b0f19');
        grad.addColorStop(1, '#020408');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Neon Accent Border Frame
      ctx.strokeStyle = currentTheme.accentColor;
      ctx.lineWidth = Math.round(canvas.width * 0.008);
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Inner Hairline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

      // Badge
      ctx.textAlign = 'center';
      ctx.fillStyle = currentTheme.accentColor;
      const badgeY = 90;
      ctx.fillRect(canvas.width / 2 - 180, badgeY, 360, 48);
      ctx.fillStyle = '#06080e';
      ctx.font = '900 22px Cairo, sans-serif';
      ctx.fillText(badgeText, canvas.width / 2, badgeY + 32);

      // Brand Wordmark
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 52px Cairo, sans-serif';
      ctx.fillText('المصرية للعقارات', canvas.width / 2, badgeY + 110);

      ctx.fillStyle = currentTheme.accentColor;
      ctx.font = 'bold 30px Cairo, sans-serif';
      ctx.fillText('مساكن شيراتون · مصر الجديدة · النزهة · مدينة نصر', canvas.width / 2, badgeY + 155);

      // Title
      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 38px Cairo, sans-serif';
      ctx.fillText(title, canvas.width / 2, badgeY + 240);

      // Subtitle
      ctx.fillStyle = '#94A3B8';
      ctx.font = '24px Cairo, sans-serif';
      ctx.fillText(subtitle, canvas.width / 2, badgeY + 285);

      // Highlight Box
      const boxY = badgeY + 330;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.fillRect(80, boxY, canvas.width - 160, 70);
      ctx.strokeStyle = currentTheme.accentColor;
      ctx.strokeRect(80, boxY, canvas.width - 160, 70);

      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 30px Cairo, sans-serif';
      ctx.fillText(priceHighlight, canvas.width / 2, boxY + 45);

      // Services Checklist Box
      const srvStartY = boxY + 110;
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.fillText('الخدمات العقارية المعتمدة:', canvas.width / 2, srvStartY);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px Cairo, sans-serif';
      selectedServices.slice(0, 5).forEach((srv, idx) => {
        const itemY = srvStartY + 45 + idx * 42;
        ctx.fillText(`▪️ ${srv}`, canvas.width / 2, itemY);
      });

      // Bottom Phone Numbers Section
      const footerY = canvas.height - 180;
      ctx.fillStyle = 'rgba(6, 8, 15, 0.95)';
      ctx.fillRect(60, footerY, canvas.width - 120, 120);
      ctx.strokeStyle = currentTheme.accentColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(60, footerY, canvas.width - 120, 120);

      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.fillText('اتصل بنا الآن للمعاينة الفورية والاستفسار:', canvas.width / 2, footerY + 36);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px monospace';
      const phoneString = selectedPhones.join('   |   ');
      ctx.fillText(phoneString, canvas.width / 2, footerY + 86);

      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `el-masria-sheraton-poster-${aspectRatio}.png`;
      downloadLink.href = dataUrl;
      downloadLink.click();

      setExportNotice('تم تصدير البوستر عالي الدقة 2K بنجاح!');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (err) {
      console.error(err);
      setExportNotice('حدث خطأ أثناء إنشاء الصورة، يرجى المحاولة ثانية');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="bg-[#07090e] py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]" id="poster-studio">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>استوديو إعلانات السوشيال ميديا 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              تصميم بوسترات وإعلانات جاهزة للسوشيال ميديا
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              حوّل بيانات وخدمات المصرية للعقارات (مساكن شيراتون) إلى بوستر بصري متألق جاهز للنشر الفوري بدقة 2K.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCaption}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer border border-white/10"
            >
              {copiedCaption ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCaption ? 'تم نسخ نص الإعلان' : 'نسخ كابشن السوشيال ميديا'}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{isExporting ? 'جاري التصدير...' : 'تحميل البوستر (PNG)'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                title="إغلاق الاستوديو"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {exportNotice && (
          <div className="mb-6 p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-semibold flex items-center justify-between">
            <span>{exportNotice}</span>
            <button onClick={() => setExportNotice(null)} className="text-cyan-400">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-white/10 space-y-6">
            
            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                مقاس وأبعاد التصميم:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(aspectConfig) as Array<keyof typeof aspectConfig>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setAspectRatio(key)}
                    className={`p-2.5 rounded-xl border text-right transition-all font-bold cursor-pointer ${
                      aspectRatio === key
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                        : 'bg-slate-900/40 text-slate-300 border-white/5 hover:bg-slate-800/40'
                    }`}
                  >
                    {aspectConfig[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Colors */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                نمط الإضاءة والألوان 2027:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(themeStyles) as Array<keyof typeof themeStyles>).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`p-2.5 rounded-xl border text-right transition-all font-bold cursor-pointer ${
                      theme === themeKey
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-900/40 text-slate-300 border-white/5 hover:bg-slate-800/40'
                    }`}
                  >
                    {themeStyles[themeKey].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                صورة الخلفية:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'sheraton', label: 'عمارة شيراتون' },
                  { id: 'furnished', label: 'شقة مفروشة' },
                  { id: 'commercial', label: 'مقر إداري' },
                  { id: 'retail', label: 'محل تجاري' },
                  { id: 'gradient', label: 'تدرج أسود مستقبلي', span: true },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBgChoice(b.id as any)}
                    className={`p-2 rounded-xl border text-center font-bold truncate cursor-pointer ${
                      b.span ? 'col-span-2' : ''
                    } ${
                      bgChoice === b.id
                        ? 'bg-slate-800 text-white border-white/30'
                        : 'bg-slate-900/40 text-slate-400 border-white/5'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Texts */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">شارة البوستر (Badge)</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">العنوان الرئيسي للإعلان</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">الوصف الفرعي والمناطق</label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">الميزة الترويجية / السعر</label>
                <input
                  type="text"
                  value={priceHighlight}
                  onChange={(e) => setPriceHighlight(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                الخدمات الظاهرة في البوستر:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {COMPANY_INFO.services.map((srv) => (
                  <label
                    key={srv}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 border border-white/5 cursor-pointer hover:bg-slate-800/50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(srv)}
                      onChange={() => toggleService(srv)}
                      className="rounded text-amber-500 focus:ring-amber-400 bg-slate-800"
                    />
                    <span className="font-semibold text-slate-300 text-[11px] truncate">{srv}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phones */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                أرقام الهواتف الظاهرة:
              </label>
              <div className="space-y-1.5 text-xs">
                {COMPANY_INFO.phones.map((phone) => (
                  <label
                    key={phone.number}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 border border-white/5 cursor-pointer hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPhones.includes(phone.number)}
                        onChange={() => togglePhone(phone.number)}
                        className="rounded text-amber-500 focus:ring-amber-400 bg-slate-800"
                      />
                      <span className="font-semibold text-slate-300 text-xs">{phone.label}</span>
                    </div>
                    <span className="font-mono text-cyan-400 text-xs" dir="ltr">{phone.number}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Live Preview Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-3 text-xs font-bold text-slate-400 px-2">
              <span>المعاينة المباشرة للبوستر:</span>
              <span className="font-mono text-cyan-400">{aspectConfig[aspectRatio].label}</span>
            </div>

            {/* Visual Preview Container */}
            <div
              id="poster-preview-card"
              ref={previewCardRef}
              className={`w-full ${aspectConfig[aspectRatio].ratioClass} relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/15 flex flex-col justify-between`}
            >
              
              {/* Background Layer */}
              <div className="absolute inset-0 z-0">
                {bgChoice !== 'gradient' && bgImageMap[bgChoice] ? (
                  <>
                    <img
                      src={bgImageMap[bgChoice]}
                      alt="خلفية البوستر"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentTheme.bgGrad} opacity-90`} />
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${currentTheme.bgGrad}`} />
                )}
                {/* Thin Futuristic Frame */}
                <div className={`absolute inset-3 border ${currentTheme.borderGrad} rounded-2xl pointer-events-none`} />
              </div>

              {/* Poster Content */}
              <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between h-full text-white text-center">
                
                {/* Top Section */}
                <div>
                  <div className="inline-block mx-auto mb-3">
                    <span className={`px-4 py-1 rounded-full text-xs font-black shadow-lg ${currentTheme.accentBadge}`}>
                      {badgeText}
                    </span>
                  </div>

                  <div className="mb-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-['Cairo']">
                      المصرية للعقارات
                    </h3>
                    <div className={`text-xs sm:text-sm font-bold ${currentTheme.headerText} mt-0.5`}>
                      مساكن شيراتون · مصر الجديدة · النزهة · مدينة نصر
                    </div>
                  </div>

                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />

                  <h4 className="text-base sm:text-lg md:text-xl font-extrabold text-stone-100 leading-snug px-2">
                    {title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-300 font-medium mt-1.5 px-4 leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Middle Highlight Box */}
                <div className="my-3">
                  <div className={`p-3 rounded-xl border backdrop-blur-md ${currentTheme.tagBg} max-w-md mx-auto`}>
                    <div className="text-xs sm:text-sm font-black text-amber-300 tracking-wide">
                      {priceHighlight}
                    </div>
                  </div>

                  {/* Selected Services Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-lg mx-auto">
                    {selectedServices.map((srv) => (
                      <span
                        key={srv}
                        className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-white/10 backdrop-blur-sm text-stone-200 border border-white/10"
                      >
                        ▪️ {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Contact Numbers Section */}
                <div>
                  <div className={`p-3.5 sm:p-4 rounded-2xl border shadow-xl backdrop-blur-md ${currentTheme.phoneBg}`}>
                    <div className="text-[11px] sm:text-xs font-bold text-amber-400 mb-2">
                      اتصل بينا مباشرة لحجز المعاينة أو الاستفسار:
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
                      {selectedPhones.map((phone) => (
                        <div key={phone} className="flex items-center gap-1 font-mono font-bold text-xs sm:text-sm text-white" dir="ltr">
                          <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{phone}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 text-[10px] text-stone-400 font-medium">
                      متاح واتساب طوال اليوم · معاينات فورية للمواقع
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Print trigger */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة البوستر مباشرة كفلاير ورقي</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
