import React, { useState } from 'react';
import { Activity, TrendingUp, BarChart3, Building, Percent, ShieldCheck } from 'lucide-react';

export const MarketRadar2027: React.FC = () => {
  const [metric, setMetric] = useState<'meter_price' | 'rental_yield' | 'demand_index'>('meter_price');

  const radarData = [
    {
      area: 'مساكن شيراتون',
      sub: 'قرب المطار ومجمع الكافيهات',
      meterPrice: '38,000 - 52,000 ج.م/م²',
      rentalYield: '12.8% سنوياً',
      demandScore: '96/100 (مرتفع جداً)',
      demandTrend: '+18% نمو سنوي',
      strengths: 'طلب فندقي وأجنبي مرتفع، إيجارات مفروشة بالدولار والجنيه، هدوء سكني',
    },
    {
      area: 'مصر الجديدة (الكوربة والميرغني)',
      sub: 'العراقة والمقرات الإدارية',
      meterPrice: '42,000 - 65,000 ج.م/م²',
      rentalYield: '11.4% سنوياً',
      demandScore: '94/100 (مستقر وعريق)',
      demandTrend: '+15% نمو سنوي',
      strengths: 'أعلى قيمة إيجارية للمقرات والشركات والعيادات، استقرار رأسمالي قوي',
    },
    {
      area: 'النزهة والنزهة الجديدة',
      sub: 'حيوية تجارية وسهولة وصول',
      meterPrice: '26,000 - 36,000 ج.م/م²',
      rentalYield: '13.5% سنوياً',
      demandScore: '91/100 (سيولة سريعة)',
      demandTrend: '+14% نمو سنوي',
      strengths: 'حركة بيع وإيجار سريعة للغاية، عائد تجاري مرتفع للمحلات الصغيرة',
    },
    {
      area: 'مدينة نصر (عباس ومكرم)',
      sub: 'القلب التجاري النابض',
      meterPrice: '30,000 - 45,000 ج.م/م²',
      rentalYield: '12.1% سنوياً',
      demandScore: '93/100 (نشط تجارياً)',
      demandTrend: '+16% نمو سنوي',
      strengths: 'كثافة تجارية لا تنقطع، توكيلات ومطاعم كبرى، طلب سكني عائلي مستمر',
    },
  ];

  return (
    <section className="py-16 bg-[#07090e] border-t border-white/[0.06] relative" id="market-radar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>مؤشرات السوق العقاري 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              رادار الأسعار والعوائد الاستثمارية بشرق القاهرة
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              تحليل دوري معتمد من مكتب المصرية للعقارات لمتوسطات الأسعار ومعدلات العائد الإيجاري الفعلي.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setMetric('meter_price')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                metric === 'meter_price'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              متوسط سعر المتر
            </button>
            <button
              onClick={() => setMetric('rental_yield')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                metric === 'rental_yield'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              العائد الإيجاري
            </button>
            <button
              onClick={() => setMetric('demand_index')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                metric === 'demand_index'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              مؤشر الطلب والنمو
            </button>
          </div>
        </div>

        {/* 4 Area Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {radarData.map((data, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {data.area}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    2027 Radar
                  </span>
                </div>
                
                <p className="text-[11px] text-slate-400 mb-4">{data.sub}</p>

                {/* Metric value box */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 mb-4">
                  {metric === 'meter_price' && (
                    <div>
                      <div className="text-[10px] text-slate-400 mb-0.5">متوسط سعر المتر المربع:</div>
                      <div className="text-base font-black font-mono text-cyan-300">
                        {data.meterPrice}
                      </div>
                    </div>
                  )}

                  {metric === 'rental_yield' && (
                    <div>
                      <div className="text-[10px] text-slate-400 mb-0.5">معدل العائد الإيجاري السنوي:</div>
                      <div className="text-base font-black font-mono text-emerald-400">
                        {data.rentalYield}
                      </div>
                    </div>
                  )}

                  {metric === 'demand_index' && (
                    <div>
                      <div className="text-[10px] text-slate-400 mb-0.5">مؤشر القوة والنمو:</div>
                      <div className="text-base font-black font-mono text-amber-400 flex items-center justify-between">
                        <span>{data.demandScore}</span>
                        <span className="text-xs text-emerald-400">{data.demandTrend}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white text-[11px] block mb-1">الميزة التنافسية الأبرز:</span>
                  {data.strengths}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">معتمد لدى المصرية:</span>
                <span className="font-bold text-amber-400">وحدات جاهزة فوراً</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
