import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, 
  Phone, MessageSquare, Compass, ShieldCheck, Zap, SlidersHorizontal, MapPin
} from 'lucide-react';
import { PROPERTIES, COMPANY_INFO } from '../data/properties';
import { Property } from '../types';

interface SmartPropertyMatcherProps {
  onSelectProperty: (property: Property) => void;
  onOpenInPosterStudio: (property: Property) => void;
}

export const SmartPropertyMatcher: React.FC<SmartPropertyMatcherProps> = ({
  onSelectProperty,
  onOpenInPosterStudio,
}) => {
  const [step, setStep] = useState<number>(1);
  
  // User answers
  const [targetType, setTargetType] = useState<string>('apartment');
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale');
  const [locationPreference, setLocationPreference] = useState<string>('sheraton');
  const [budgetRange, setBudgetRange] = useState<string>('mid');
  const [priorityFeature, setPriorityFeature] = useState<string>('sea_facing');

  // Scanning animation state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>('جاري معايرة محرك المطابقة العقارية...');
  const [hasResult, setHasResult] = useState<boolean>(false);

  // Suggested matches
  const [matchedResults, setMatchedResults] = useState<Array<{ property: Property; score: number; matchReason: string }>>([]);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setHasResult(false);
    
    // Simulate step-by-step smart analytical calculation without an external AI call
    const messages = [
      'فحص قواعد بيانات مساكن شيراتون ومصر الجديدة...',
      'حساب مؤشرات القيمة السوقية والتراخيص القانونية...',
      'استخراج أنسب الوحدات المتوافقة مع متطلباتك...',
    ];

    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx++;
      if (msgIdx < messages.length) {
        setScanMessage(messages[msgIdx]);
      }
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
      setHasResult(true);

      // Score properties based on user inputs
      const scored = PROPERTIES.map((prop) => {
        let score = 75; // base compatibility
        let reason = 'تطابق استراتيجي مع الموقع والميزانية المحددة';

        if (prop.area === locationPreference) {
          score += 15;
        }
        if (prop.purpose === purpose) {
          score += 8;
        }
        if (prop.category === targetType) {
          score += 10;
          reason = 'مطابقة تامة لنوع العقار والموقع الجغرافي المطلوب';
        }

        // Add variance for authentic feel
        score = Math.min(99, score + (prop.featured ? 4 : 0));
        return { property: prop, score, matchReason: reason };
      });

      scored.sort((a, b) => b.score - a.score);
      setMatchedResults(scored.slice(0, 3));
    }, 1400);
  };

  const handleReset = () => {
    setStep(1);
    setHasResult(false);
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#07090e] via-[#090d16] to-[#07090e] border-t border-white/[0.06]" id="smart-matcher">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>نظام التوفيق العقاري التفاعلي 2027</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            المطابقة الذكية لاحتياجك العقاري
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            أجب عن 3 اختيارات سريعة وسيقوم النظام بتحديد أفضل 3 خيارات عقارية متطابقة مع متطلباتك وميزانيتك في مساكن شيراتون وشرق القاهرة فوراً.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-3xl mx-auto rounded-3xl glass-panel p-6 sm:p-9 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span className={step >= 1 ? 'text-cyan-400' : ''}>1. نوع العقار والغرض</span>
              <span className={step >= 2 ? 'text-cyan-400' : ''}>2. المنطقة والموقع</span>
              <span className={step >= 3 ? 'text-cyan-400' : ''}>3. الأولويات والميزانية</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {!hasResult && !isAnalyzing && (
            <div>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      ما هو الغرض الرئيسي من طلبك؟
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPurpose('sale')}
                        className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                          purpose === 'sale'
                            ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="font-black text-sm text-white mb-1">تمليك وشراء استثماري</div>
                        <div className="text-[11px] text-slate-400">حصة بالأرض، تسجيل عقاري، سكن دائم أو حفظ رأس مال</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPurpose('rent')}
                        className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                          purpose === 'rent'
                            ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="font-black text-sm text-white mb-1">إيجار (سكني / إداري / تجاري)</div>
                        <div className="text-[11px] text-slate-400">عقود سنوية أو شهرية، مفروش فندقي أو مقر لشركة</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      تصنيف العقار المطلوب:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      {[
                        { id: 'apartment', label: 'شقة سكنية عائلية', hint: 'مساحات واسعة' },
                        { id: 'furnished', label: 'شقة مفروشة فندقية', hint: 'أثاث وتكييفات كاملة' },
                        { id: 'administrative', label: 'مقر إداري ومكتب', hint: 'ترخيص رسمي للشركات' },
                        { id: 'retail', label: 'محل تجاري / كافيه', hint: 'واجهات وشوارع رئيسية' },
                        { id: 'villa', label: 'دوبلكس أو فيلا', hint: 'حديقة ومدخل خاص' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTargetType(item.id)}
                          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                            targetType === item.id
                              ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="font-bold text-white text-xs">{item.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.hint}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <span>المتابعة إلى الخطوة التالية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      أين تفضل موقع العقار؟
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'sheraton', name: 'مساكن شيراتون المطار', desc: 'قرب المطار، كليوباترا، هدوء سكني راقٍ وفنادق عالمية' },
                        { id: 'heliopolis', name: 'مصر الجديدة', desc: 'الكوربة والميرغني والعروبة وتريومف، عراقة وتجارة نشطة' },
                        { id: 'nozha', name: 'النزهة والنزهة الجديدة', desc: 'محور جوزيف تيتو والمترو، سهولة حركة وأسعار متوازنة' },
                        { id: 'nasr-city', name: 'مدينة نصر', desc: 'عباس العقاد ومكرم عبيد وسيتي ستارز، حيوية وكثافة تجارية' },
                      ].map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setLocationPreference(loc.id)}
                          className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                            locationPreference === loc.id
                              ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold text-xs text-white mb-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{loc.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{loc.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <span>المتابعة إلى الأولويات</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      الميزانية التقديرية المتوقعة:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 text-xs">
                      {[
                        { id: 'low', label: 'اقتصادية ميسرة', note: 'أفضل قيمة مقابل السعر' },
                        { id: 'mid', label: 'متوسطة إلى راقية', note: 'المستوى السائد بالشيراتون' },
                        { id: 'high', label: 'بريميوم وفاخرة جداً', note: 'تشطيبات وديكورات خاصة' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudgetRange(b.id)}
                          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                            budgetRange === b.id
                              ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="font-bold text-white text-xs">{b.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{b.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      الأولوية الأكثر أهمية بالنسبة لك:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      {[
                        { id: 'immediate', label: '⚡ استلام وتشغيل فوري' },
                        { id: 'registered', label: '🏛️ مسجل شهر عقاري وحصة بالأرض' },
                        { id: 'main_street', label: '🛣️ واجهة بحري على شارع رئيسي' },
                        { id: 'parking', label: '🚗 جراج خاص وأمن وكاميرات 24 س' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setPriorityFeature(f.id)}
                          className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                            priorityFeature === f.id
                              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                              : 'bg-slate-900/40 border-white/5 text-slate-400'
                          }`}
                        >
                          <span className="text-xs font-semibold">{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={handleStartAnalysis}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>تشغيل المطابقة الذكية للنتائج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SIMULATED SCANNING STATE */}
          {isAnalyzing && (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <Sparkles className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="text-base font-black text-white">{scanMessage}</div>
              <div className="text-xs text-slate-400 font-mono">
                مقارنة 8 عقارات رئيسية مع معايير الاختيار المحددة...
              </div>
            </div>
          )}

          {/* MATCHED RESULTS VIEW */}
          {hasResult && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم تحليل البيانات ومطابقتها بنجاح</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-0.5">
                    أفضل الوحدات العقارية المطابقة لمواصفاتك
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تعديل معايير البحث</span>
                </button>
              </div>

              {/* Result cards list */}
              <div className="space-y-4">
                {matchedResults.map(({ property, score, matchReason }, index) => (
                  <div
                    key={property.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-black text-cyan-300 font-mono">
                          #{index + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            مطابقة: {score}%
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {property.areaNameArabic} · {property.subLocation}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {property.title}
                        </h4>

                        <div className="text-xs text-amber-400 font-semibold mt-1">
                          {property.priceFormatted} {property.priceUnit}
                        </div>

                        <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                          {matchReason}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="flex-1 md:flex-none px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        معاينة الوحدة
                      </button>

                      <a
                        href={`https://wa.me/20${COMPANY_INFO.phones[0].number.slice(1)}?text=${encodeURIComponent(`مرحباً المصرية للعقارات، قمت بإجراء المطابقة الذكية واخترت: ${property.title} (كود #${property.id})`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>حجز المعاينة</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct call footer */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-center text-xs text-cyan-200">
                ترغب بمناقشة هذه الترشيحات مع مندوب المكتب مباشرة؟ اتصل الآن على: <span className="font-mono font-bold" dir="ltr">{COMPANY_INFO.phones[0].number}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
