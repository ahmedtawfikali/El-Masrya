import React from 'react';
import { KeyRound, ShieldCheck, Briefcase, Store, Armchair, Calculator, PhoneCall, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const servicesList = [
    {
      num: '01',
      title: 'إيجار سكني وتجاري',
      subtitle: 'خيارات متعددة تبدأ من استوديوهات وحتى شقق عائلية ومقرات كبرى',
      desc: 'نوفر عقود إيجار موثقة وقانونية لمدد قصيرة وطويلة، مع مراجعة دقيقة لسلامة العقار وتوافر كافة المرافق من كهرباء وغاز ومياه دون تعقيدات.',
      icon: KeyRound,
      features: ['عقود موثقة ومحمية قانونياً', 'معاينات فورية مع مندوب المكتب', 'تفاوض مباشر مع الملاك'],
    },
    {
      num: '02',
      title: 'بيع وتمليك واستثمار',
      subtitle: 'شقق فاخرة، دوبلكس، وفيلات بأفضل المواقع المسجلة',
      desc: 'نساعدك على اقتناص أفضل الفرص العقارية في مساكن شيراتون ومصر الجديدة سواء للسكن الراقي أو الاستثمار ذو العائد الإيجاري المرتفع، مع التحقق من صحة التسجيل العقاري.',
      icon: ShieldCheck,
      features: ['وحدات مسجلة شهر عقاري', 'حصة بالأرض وجراج مسجل', 'تسهيلات في السداد أو كاش'],
    },
    {
      num: '03',
      title: 'مقرات إدارية ومكاتب للشركات',
      subtitle: 'تراخيص إدارية معتمدة على الشوارع الحيوية',
      desc: 'مساحات إدارية مجهزة بالكامل للشركات متعددة الجنسيات، مكاتب المحاماة، العيادات، وسفارات، قريبة من مطار القاهرة ومحاور الطرق السريعة.',
      icon: Briefcase,
      features: ['تراخيص إدارية رسمية', 'واجهات إعلانية بارزة', 'شبكات اتصالات وتكييفات مركزية'],
    },
    {
      num: '04',
      title: 'محلات ومساحات تجارية',
      subtitle: 'كثافة مرورية وتجارية استثنائية لعلامتك التجارية',
      desc: 'مواقع تجارية استراتيجية في مساكن شيراتون، الكوربة، عباس العقاد، والنزهة، مناسبة للمطاعم، الكافيهات، الصيدليات، والمعارض الكبرى.',
      icon: Store,
      features: ['كهرباء 3 فاز ومداخن معتمدة', 'واجهات زجاجية عريضة', 'حركة مشاة متواصلة طوال اليوم'],
    },
    {
      num: '05',
      title: 'شقق مفروشة فندقية',
      subtitle: 'أعلى مستويات الفخامة لرجال الأعمال والدبلوماسيين',
      desc: 'شقق مفروشة بالكامل تشطيبات وأثاث فاخر مستورد، تكييفات بكل الغرف، أجهزة منزلية متكاملة، وقرب مباشر من مطار القاهرة الدولي وفنادق شيراتون.',
      icon: Armchair,
      features: ['أثاث مودرن أو كلاسيكي جديد', 'إنترنت سريع وشاشات سمارت', 'خدمات حراسة وأمن وصيانة'],
    },
    {
      num: '06',
      title: 'استشارات وتثمين وإدارة أملاك',
      subtitle: 'تقييم عقاري احترافي وإدارة عقارات للمغتربين',
      desc: 'ندير عقارك من الألف إلى الياء، تحصيل الإيجارات الدورية، صيانة المرافق، وعرض عقارك بأعلى قيمة سوقية ممكنة في السوق المصري.',
      icon: Calculator,
      features: ['تثمين عقاري بسعر السوق الفعلي', 'إدارة دورية وتحصيل مالي موثق', 'تسويق احترافي واستهداف المشترين'],
    },
  ];

  return (
    <section className="py-20 bg-[#07090e] text-white relative overflow-hidden border-t border-white/[0.08]" id="services">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
            منظومة الخدمات العقارية المتكاملة
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            المصرية للعقارات تقدم لك كل ما يلزمك في مكان واحد
          </h2>
          <p className="text-slate-300 text-base mt-3 leading-relaxed">
            سواء كنت تبحث عن سكن عائلي راقٍ، أو فرصة استثمارية للتمليك، أو مقر لشركتك، فريقنا المتخصص في مساكن شيراتون ومحيطها جاهز لخدمتك على مدار الساعة.
          </p>
        </div>

        {/* Bento Grid Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.num}
                className="p-7 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-black text-cyan-400 tracking-wider">
                      {service.num}. الخدمة
                    </span>
                    <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <div className="text-xs text-amber-400/90 font-semibold mb-3">
                    {service.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Sub Features */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Consultation Box */}
        <div className="mt-14 p-8 rounded-3xl glass-panel border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
          <div>
            <h3 className="text-xl font-black text-white">هل تحتاج استشارة عقارية خاصة باحتياجك؟</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تواصل مع أحد مستشاري المصرية للعقارات مباشرة بدون أي التزام، وسنطرح عليك أفضل الخيارات المتاحة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phones[0].number}`}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>اتصل: {COMPANY_INFO.phones[0].number}</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer border border-white/10"
            >
              طلب استشارة وتواصل
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
