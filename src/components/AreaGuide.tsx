import React from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import { RegionArea } from '../types';

interface AreaGuideProps {
  onSelectAreaFilter: (area: RegionArea) => void;
}

export const AreaGuide: React.FC<AreaGuideProps> = ({ onSelectAreaFilter }) => {
  const areas = [
    {
      id: 'sheraton' as RegionArea,
      name: 'مساكن شيراتون المطار',
      badge: 'المنطقة الرئيسية للمكتب',
      summary: 'أرقى مناطق شرق القاهرة قرب مطار القاهرة الدولي، هدوء سكني وتخطيط معماري متميز مع وفرة في الخدمات والكافيهات.',
      landmarks: ['مطار القاهرة الدولي (5 دقائق)', 'مربع الوزراء والنصر', 'نادي وادي دجلة وشيراتون', 'صن سيتي مول'],
      types: 'شقق تمليك فاخرة، شقق مفروشة فندقية، مقرات شركات ومكاتب طيران',
      character: 'هادئ، استراتيجي، فندقي، وقريب من كافة المحاور السريعة',
    },
    {
      id: 'heliopolis' as RegionArea,
      name: 'مصر الجديدة',
      badge: 'العراقة والأصالة التاريخية',
      summary: 'الحي الأرقى تاريخياً بطرازه المعماري الفريد، شوارع واسعة ومشجرة، مراكز أعمال عريقة ومطاعم شهيرة.',
      landmarks: ['حي الكوربة التراثي', 'شارع الميرغني وتريومف', 'شارع العروبة وصلاح سالم', 'محطات مترو الخط الثالث'],
      types: 'مقرات إدارية رئيسية، شقق كلاسيكية بمساحات شاسعة، عيادات طبية وتوكيلات',
      character: 'عريق، تجاري نشط، راقي، ووجهة أولى للشركات الكبرى',
    },
    {
      id: 'nozha' as RegionArea,
      name: 'النزهة والنزهة الجديدة',
      badge: 'تنوع حيوي وسهولة وصول',
      summary: 'موقع يربط بين مصر الجديدة والدائري وطريق السويس، أسواق تجارية متكاملة وطلب إيجاري وسكني مستمر.',
      landmarks: ['محور جوزيف تيتو', 'ميدان الحجاز وسانت فاتيما', 'قرب محطة مترو النزهة', 'أسواق تجارية متكاملة'],
      types: 'محلات تجارية بأسعار تنافسية، شقق سكنية اقتصادية وفوق متوسطة',
      character: 'حيوي، متكامل الخدمات، مناسب للمشاريع والأنشطة التجارية',
    },
    {
      id: 'nasr-city' as RegionArea,
      name: 'مدينة نصر',
      badge: 'القلب التجاري والسكني النابض',
      summary: 'أكبر أحياء القاهرة حيوية وتجارة، يضم كبرى المراكز التجارية والمقرات الحكومية والجامعات.',
      landmarks: ['سيتي ستارز ومول العرب', 'شارع عباس العقاد ومكرم عبيد', 'طريق النصر والمنطقة الأولى', 'محور المشير طنطاوي'],
      types: 'محلات على شوارع رئيسية بكثافة عالية، دوبلكس وشقق بمساحات متنوعة',
      character: 'تجاري من الدرجة الأولى، حركة مستمرة على مدار الساعة',
    },
  ];

  return (
    <section className="py-16 bg-[#07090e] border-t border-white/[0.08]" id="areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            نطاق التغطية الجغرافية 2027
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            أهم المناطق التي تغطيها المصرية للعقارات
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            تركيزنا الاستراتيجي ينصب على أرقى وأنشط مناطق شرق القاهرة، حيث نضمن لك المعرفة التامة بكل مربع سكني وميزة تجارية.
          </p>
        </div>

        {/* Areas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => (
            <div
              key={area.id}
              className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-black text-white">{area.name}</h3>
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {area.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {area.summary}
                </p>

                {/* Key Landmarks */}
                <div className="mb-4">
                  <div className="text-xs font-bold text-slate-400 mb-1.5">أهم المعالم والمحاور:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-300">
                    {area.landmarks.map((mark, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="truncate">{mark}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demand Types */}
                <div className="text-xs text-slate-400 pt-3 border-t border-white/5">
                  <span className="font-bold text-slate-200">الطلب الأبرز: </span>
                  <span>{area.types}</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <button
                  onClick={() => onSelectAreaFilter(area.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border border-white/10 hover:border-cyan-500/40"
                >
                  <span>استعراض عقارات {area.name}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
