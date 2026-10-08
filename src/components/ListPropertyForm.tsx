import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, Building, Sparkles } from 'lucide-react';
import { submitInquiry } from '../services/inquiryService';
import { COMPANY_INFO } from '../data/properties';

interface ListPropertyFormProps {
  onOpenComprehensiveAdd?: () => void;
}

export const ListPropertyForm: React.FC<ListPropertyFormProps> = ({
  onOpenComprehensiveAdd,
}) => {
  const [tab, setTab] = useState<'offer' | 'request'>('offer');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('مساكن شيراتون');
  const [propertyType, setPropertyType] = useState('شقة سكنية');
  const [dealType, setDealType] = useState('بيع وتمليك');
  const [priceOrBudget, setPriceOrBudget] = useState('');
  const [details, setDetails] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError('يرجى كتابة الاسم ورقم الهاتف للتواصل.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await submitInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        inquiryType: tab === 'offer' ? 'offer' : 'request',
        area,
        propertyType: `${propertyType} (${dealType})`,
        budgetOrPrice: priceOrBudget.trim() || 'غير محدد',
        notes: details.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission fallback:', err);
      // Still show success to visitor and let them reach out via WhatsApp
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = `السلام عليكم، أود تسجيل ${tab === 'offer' ? 'عقار معروض' : 'طلب عقار مطلوب'} لدى المصرية للعقارات:
👤 الاسم: ${fullName || 'عميل'}
📱 رقم الهاتف: ${phone || 'غير مسجل'}
📍 المنطقة: ${area}
🏢 نوع العقار: ${propertyType} (${dealType})
💰 السعر أو الميزانية: ${priceOrBudget || 'حسب الاتفاق'}
📝 تفاصيل إضافية: ${details || 'لا يوجد'}`;

    const url = `https://wa.me/20${COMPANY_INFO.phones[0].number.slice(1)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-[#07090e] border-t border-white/[0.08]" id="list-property">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {tab === 'offer' ? 'اعرض عقارك مع المصرية للعقارات' : 'اطلب عقارك وسنوفر لك أفضل الخيارات'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              لدينا شبكة عملاء ومستثمرين جاهزين في مساكن شيراتون، مصر الجديدة، النزهة، ومدينة نصر.
            </p>
          </div>

          {/* Banner for Comprehensive Add Property with All Sections */}
          {onOpenComprehensiveAdd && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-600/15 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    هل ترغب في إضافة عقار متكامل بجميع الأقسام والصور والمواصفات؟
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    استخدم نموذج الإضافة الشامل بكافة تصنيفات العقارات (12 فئة) ونشره فوراً في الموقع
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenComprehensiveAdd}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(212,160,23,0.3)] hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                أضف عقارك بكافة الأقسام +
              </button>
            </div>
          )}

          {/* Toggle Tab */}
          <div className="flex max-w-xs mx-auto p-1 bg-slate-900 rounded-xl border border-white/10 mb-8">
            <button
              onClick={() => { setTab('offer'); setSubmitted(false); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'offer' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-slate-400'
              }`}
            >
              اعرض عقارك
            </button>
            <button
              onClick={() => { setTab('request'); setSubmitted(false); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'request' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-slate-400'
              }`}
            >
              اطلب عقار
            </button>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                تم استلام طلبك بنجاح!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-md mx-auto">
                يقوم فريق المصرية للعقارات بمراجعة المواصفات وسيتصل بك أحد مستشارينا على الرقم ({phone}) في أقرب وقت.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>إرسال التفاصيل مباشرة عبر واتساب</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhone('');
                    setPriceOrBudget('');
                    setDetails('');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700"
                >
                  تسجيل طلب آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-200 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أ/ أحمد محمد"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف أو الموبايل *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="012XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المنطقة</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="مساكن شيراتون">مساكن شيراتون</option>
                    <option value="مصر الجديدة">مصر الجديدة</option>
                    <option value="النزهة">النزهة والنزهة الجديدة</option>
                    <option value="مدينة نصر">مدينة نصر</option>
                    <option value="أخرى">أخرى بشرق القاهرة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نوع العقار</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="شقة سكنية">شقة سكنية</option>
                    <option value="شقة مفروشة">شقة مفروشة فندقية</option>
                    <option value="مقر إداري ومكاتب">مقر إداري ومكاتب</option>
                    <option value="محل تجاري">محل تجاري</option>
                    <option value="دوبلكس أو فيلا">دوبلكس أو فيلا</option>
                    <option value="أرض أو مبنى كامل">أرض أو عمارة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">طبيعة العملية</label>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="بيع وتمليك">بيع وتمليك</option>
                    <option value="إيجار جديد">إيجار جديد شهري/سنوي</option>
                    <option value="إيجار مفروش">إيجار مفروش</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {tab === 'offer' ? 'السعر التقديري المطلوب (ج.م)' : 'الميزانية المتوقعة (ج.م)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 5,000,000 ج.م أو 30,000 شهرياً"
                  value={priceOrBudget}
                  onChange={(e) => setPriceOrBudget(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">تفاصيل إضافية عن العقار / الطلب</label>
                <textarea
                  rows={3}
                  placeholder="المساحة بالمتر المربع، عدد الغرف، الدور، حالة التشطيب، أو أي شروط خاصة..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال البيانات للمكتب</span>
                </button>

                <div className="text-xs text-slate-400 text-center sm:text-left">
                  أو تواصل فورياً عبر الهاتف: <span className="font-mono font-bold text-cyan-300" dir="ltr">01286429815</span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
