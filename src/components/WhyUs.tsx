import { ShieldCheck, Zap, HeartHandshake, MapPinned, CreditCard, Users } from "lucide-react";

const advantages = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Safety First",
    description: "24/7 CCTV, biometric entry, and professional security for total peace of mind."
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "High-Speed Living",
    description: "Seamless 200+ Mbps Wi-Fi and 100% power backup to ensure you stay connected."
  },
  {
    icon: <MapPinned className="w-7 h-7" />,
    title: "Prime Locations",
    description: "Walking distance or a 5-minute commute to major IT parks and colleges."
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "Transparent Pricing",
    description: "No hidden maintenance fees or brokerage. What you see is what you pay."
  },
  {
    icon: <HeartHandshake className="w-7 h-7" />,
    title: "Housekeeping",
    description: "Professional daily cleaning and laundry services so you can focus on work."
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Vibrant Community",
    description: "Regular social events and networking sessions to help you make friends."
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            The Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
            Why We Are Better <br className="hidden md:block" />
            Than Your Average PG
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Advantage Grid: Side-by-Side Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {advantages.map((adv, index) => (
            <div 
              key={index} 
              className="flex items-start gap-6 group transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="shrink-0 w-16 h-16 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:-translate-y-1">
                {adv.icon}
              </div>

              {/* Text Side */}
              <div className="pt-2">
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;