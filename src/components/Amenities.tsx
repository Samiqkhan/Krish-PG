import { 
  Wifi, 
  Utensils, 
  ShieldCheck, 
  Droplets, 
  Refrigerator,
  Tv,
  Car,
  WashingMachine,
  Coffee,
  Users,
  Bed,
  Package,
  DoorClosed
} from "lucide-react";


// 🔥 Under Bed Storage Icon (Bed + Box)
const UnderBedIcon = ({ className }) => {
  return (
    <div className="relative w-7 h-7">
      <Bed className={`w-7 h-7 ${className}`} />
      <Package className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 text-primary" />
    </div>
  );
};


// 🔥 Furnished Wardrobe + Bed Icon
const FurnishedIcon = ({ className }) => {
  return (
    <div className="relative w-7 h-7">
      {/* Wardrobe */}
      <DoorClosed className={`absolute top-0 left-0 w-5 h-5 ${className}`} />
      
      {/* Bed */}
      <Bed className={`absolute bottom-0 right-0 w-5 h-5 ${className}`} />
    </div>
  );
};


const amenities = [
  {
    icon: Utensils,
    title: "Delicious Meals",
    description: "Mon - Fri: Breakfast & Dinner  | Sat - Sun: All meals included",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "100 Mbps fiber connection in all rooms",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "CCTV surveillance and security guards",
  },
  {
    icon: Droplets,
    title: "Hot Water",
    description: "24/7 hot water supply in all bathrooms",
  },
  {
    icon: Refrigerator,
    title: "Common Fridge",
    description: "Shared refrigerator in common area",
  },
  {
    icon: Tv,
    title: "Common TV Room",
    description: "Large screen TV with DTH connection",
  },
  {
    icon: Car,
    title: "Parking Space",
    description: "Secure parking for two-wheelers",
  },
  {
    icon: WashingMachine,
    title: "Laundry Service",
    description: "Washing machines and ironing",
  },
  {
    icon: Coffee,
    title: "Pantry Access",
    description: "24/7 kitchen access for snacks",
  },
  {
    icon: FurnishedIcon,  // ✅ Updated here
    title: "Furnished Wardrobes and Beds",
    description: "Fully furnished rooms with wooden wardrobes and beds",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Regular social gatherings and activities",
  },
  {
    icon: UnderBedIcon,   // ✅ Updated here
    title: "Under Bed Storage",
    description: "Secure storage space under each bed",
  },
];


const Amenities = () => {
  return (
    <section id="amenities" className="py-20">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Premium Amenities for Comfortable Living
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need for a hassle-free stay. 
            Focus on your goals while we take care of the rest.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                
                <amenity.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              
              </div>

              <h3 className="font-semibold mb-2">
                {amenity.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Amenities;