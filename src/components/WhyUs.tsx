import { ShieldCheck, Zap, HeartHandshake, MapPinned, CreditCard, Users } from "lucide-react";

const advantages = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Safety First",
    description: "24/7 CCTV surveillance, biometric entry, and professional security staff for total peace of mind."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "High-Speed Living",
    description: "Seamless 200+ Mbps Wi-Fi and 100% power backup to ensure your work or study never stops."
  },
  {
    icon: <MapPinned className="w-8 h-8 text-primary" />,
    title: "Prime Locations",
    description: "All our branches are within walking distance or a 5-minute commute to major IT parks and colleges."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Transparent Pricing",
    description: "No hidden maintenance fees or brokerage. What you see is exactly what you pay."
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-primary" />,
    title: "Housekeeping Included",
    description: "Professional daily cleaning and laundry services so you can focus on what matters most."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Vibrant Community",
    description: "Regular social events and networking sessions to help you make friends in a new city."
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Advantage</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Why We Are Better Than Your Average PG
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just provide a room; we provide a lifestyle designed for comfort, productivity, and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all border border-transparent hover:border-primary/20"
            >
              <div className="mb-4 bg-primary/10 w-16 h-16 flex items-center justify-center rounded-2xl">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;