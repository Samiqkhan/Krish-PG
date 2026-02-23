import { 
  Wifi, Utensils, ShieldCheck, Droplets, Refrigerator, Tv, 
  Car, WashingMachine, Coffee, Users, Bed, Package, DoorClosed 
} from "lucide-react";

// Custom Icons
const UnderBedIcon = ({ className }: { className?: string }) => (
  <div className="relative w-7 h-7">
    <Bed className={`w-7 h-7 ${className}`} />
    <Package className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-4 h-4 text-primary bg-card rounded-sm" />
  </div>
);

const FurnishedIcon = ({ className }: { className?: string }) => (
  <div className="relative w-7 h-7">
    <DoorClosed className={`absolute top-0 left-0 w-5 h-5 ${className}`} />
    <Bed className={`absolute bottom-0 right-0 w-5 h-5 ${className}`} />
  </div>
);

const amenities = [
  { icon: Utensils, title: "Delicious Meals", description: "Mon-Fri: B/F & Dinner | Sat-Sun: All meals" },
  { icon: Wifi, title: "High-Speed WiFi", description: "100 Mbps fiber connection in all rooms" },
  { icon: ShieldCheck, title: "24/7 Security", description: "CCTV surveillance and security guards" },
  { icon: Droplets, title: "Hot Water", description: "24/7 hot water supply in all bathrooms" },
  { icon: Refrigerator, title: "Common Fridge", description: "Shared refrigerator in common area" },
  { icon: Tv, title: "Common TV Room", description: "Large screen TV with DTH connection" },
  { icon: Car, title: "Parking Space", description: "Secure parking for two-wheelers" },
  { icon: WashingMachine, title: "Laundry Service", description: "Washing machines and ironing" },
  { icon: Coffee, title: "Pantry Access", description: "24/7 kitchen access for snacks" },
  { icon: FurnishedIcon, title: "Furnished Rooms", description: "Wooden wardrobes and premium beds" },
  { icon: Users, title: "Social Events", description: "Regular gatherings and community activities" },
  { icon: UnderBedIcon, title: "Under Bed Storage", description: "Secure storage space under each bed" },
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            The Krish Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Premium Amenities
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Updated Grid: 
          - 1 column on tiny screens 
          - 2 columns on mobile/tablet (Side-by-side)
          - 3 columns on desktop
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="flex items-start gap-5 group"
            >
              {/* Icon Container */}
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-sm border border-slate-100">
                <amenity.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Text Side */}
              <div className="flex flex-col justify-center pt-1">
                <h3 className="font-black text-slate-900 text-lg leading-none mb-2 group-hover:text-primary transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Amenities;