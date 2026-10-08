import React, { useState } from 'react';
import { Calculator as CalcIcon, Percent, DollarSign, HelpCircle } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [calcType, setCalcType] = useState<'sale_commission' | 'rent_commission' | 'mortgage'>('sale_commission');
  
  const [propertyPrice, setPropertyPrice] = useState<number>(5000000);
  const [commissionRate, setCommissionRate] = useState<number>(2.5);

  const [monthlyRent, setMonthlyRent] = useState<number>(30000);
  const [rentCommissionType, setRentCommissionType] = useState<'one_month' | 'percentage'>('one_month');

  const [totalPrice, setTotalPrice] = useState<number>(6000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(5);

  const calculatedSaleCommission = Math.round((propertyPrice * commissionRate) / 100);
  const calculatedRentCommission = rentCommissionType === 'one_month' ? monthlyRent : Math.round(monthlyRent * 12 * 0.1);

  const downPaymentAmount = Math.round((totalPrice * downPaymentPercent) / 100);
  const remainingAmount = totalPrice - downPaymentAmount;
  const totalMonths = years * 12;
  const estimatedMonthlyInstallment = totalMonths > 0 ? Math.round(remainingAmount / totalMonths) : 0;

  return (
    <section className="py-16 bg-[#07090e] border-t border-white/[0.08]" id="calculator">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 rounded-full text-xs font-bold mb-2">
            <CalcIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>حاسبة مالية رقمية 2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            حاسبة العمولات والأقساط العقارية
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            احتساب فوري وموثوق لعمولة الوساطة المعتادة (2.5% تمليك / إيجار شهر) أو جدول الأقساط الشهرية.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex max-w-md mx-auto p-1 bg-slate-900 rounded-2xl border border-white/10 mb-8">
          <button
            onClick={() => setCalcType('sale_commission')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              calcType === 'sale_commission' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-slate-400'
            }`}
          >
            عمولة التمليك (2.5%)
          </button>
          <button
            onClick={() => setCalcType('rent_commission')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              calcType === 'rent_commission' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-slate-400'
            }`}
          >
            عمولة الإيجار
          </button>
          <button
            onClick={() => setCalcType('mortgage')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              calcType === 'mortgage' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-slate-400'
            }`}
          >
            حساب الأقساط
          </button>
        </div>

        {/* Content per Tab */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10">
          {calcType === 'sale_commission' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    سعر العقار الإجمالي (ج.م):
                  </label>
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full text-base font-mono p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">
                    المبلغ: {propertyPrice.toLocaleString('ar-EG')} جنيه مصري
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    نسبة عمولة الوساطة:
                  </label>
                  <div className="flex items-center gap-2">
                    {[2.5, 2.0, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setCommissionRate(rate)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                          commissionRate === rate
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-900 text-slate-300 border-white/10'
                        }`}
                      >
                        {rate}% {rate === 2.5 && '(المعتاد)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 text-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div className="text-xs text-amber-400 font-semibold mb-1">قيمة العمولة المستحقة التقديرية</div>
                <div className="text-3xl font-black font-mono text-white mb-2">
                  {calculatedSaleCommission.toLocaleString('ar-EG')} <span className="text-sm font-sans font-bold">ج.م</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تُسدد عند توقيع العقود النهائية واستلام الدفعة المبدئية.
                </p>
              </div>
            </div>
          )}

          {calcType === 'rent_commission' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    قيمة الإيجار الشهري (ج.م):
                  </label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                    className="w-full text-base font-mono p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    طريقة احتساب عمولة الإيجار:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setRentCommissionType('one_month')}
                      className={`p-2.5 rounded-xl border font-bold cursor-pointer transition-all ${
                        rentCommissionType === 'one_month'
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-900 text-slate-300 border-white/10'
                      }`}
                    >
                      إيجار شهر كامل (المعتاد)
                    </button>
                    <button
                      onClick={() => setRentCommissionType('percentage')}
                      className={`p-2.5 rounded-xl border font-bold cursor-pointer transition-all ${
                        rentCommissionType === 'percentage'
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-900 text-slate-300 border-white/10'
                      }`}
                    >
                      10% من إجمالي السنة
                    </button>
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 text-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div className="text-xs text-amber-400 font-semibold mb-1">عمولة الإيجار المستحقة للمكتب</div>
                <div className="text-3xl font-black font-mono text-white mb-2">
                  {calculatedRentCommission.toLocaleString('ar-EG')} <span className="text-sm font-sans font-bold">ج.م</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تُسدد دفعة واحدة عند إبرام عقد الإيجار الرسمي.
                </p>
              </div>
            </div>
          )}

          {calcType === 'mortgage' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    إجمالي سعر العقار (ج.م):
                  </label>
                  <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full text-base font-mono p-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      المقدم (%):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full text-sm font-mono p-2.5 bg-slate-950 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      المدة (سنوات):
                    </label>
                    <select
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full text-sm p-2.5 bg-slate-950 border border-white/10 rounded-xl text-white"
                    >
                      <option value={1}>سنة واحدة</option>
                      <option value={2}>سنتان</option>
                      <option value={3}>3 سنوات</option>
                      <option value={5}>5 سنوات</option>
                      <option value={7}>7 سنوات</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="text-slate-400">قيمة الدفعة المقدمة ({downPaymentPercent}%):</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">
                    {downPaymentAmount.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="text-slate-400">المبلغ المتبقي للتقسيط:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {remainingAmount.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>
                <div className="pt-2 text-center">
                  <div className="text-xs text-amber-400 font-semibold mb-1">القسط الشهري المتساوي التقريبي</div>
                  <div className="text-2xl font-black font-mono text-white">
                    {estimatedMonthlyInstallment.toLocaleString('ar-EG')} <span className="text-xs font-sans text-slate-400">ج.م / شهرياً</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
