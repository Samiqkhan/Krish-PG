import { MapPin, Bed, Navigation, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const branches = [
  {
    id: 1,
    name: "Downtown Central",
    address: "123 Main Street, City Center",
    mapUrl: "https://goo.gl/maps/example1",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&fit=crop",
    rooms: 25,
    startingPrice: 8000,
    amenities: ["WiFi", "AC", "Parking"],
    distances: [{ landmark: "Global IT Park", value: "1.5 km" }, { landmark: "City Commerce College", value: "0.8 km" }],
  },
  {
    id: 2,
    name: "Tech Park Hub",
    address: "456 Innovation Drive, IT Corridor",
    mapUrl: "https://goo.gl/maps/example2",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop",
    rooms: 40,
    startingPrice: 9500,
    amenities: ["WiFi", "Gym", "Cafeteria"],
    distances: [{ landmark: "Tech Mahindra Office", value: "0.5 km" }, { landmark: "Engineering Institute", value: "2.2 km" }],
  },
  {
    id: 3,
    name: "University Heights",
    address: "789 College Road, Education District",
    mapUrl: "https://goo.gl/maps/example3",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&fit=crop",
    rooms: 35,
    startingPrice: 6500,
    amenities: ["WiFi", "Study Room", "Laundry"],
    distances: [{ landmark: "Central University", value: "0.2 km" }, { landmark: "Software SEZ", value: "4.0 km" }],
  },
  {
    id: 4,
    name: "Business Bay",
    address: "321 Corporate Avenue, Financial Hub",
    mapUrl: "https://goo.gl/maps/example4",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&fit=crop",
    rooms: 30,
    startingPrice: 11000,
    amenities: ["WiFi", "AC", "Concierge"],
    distances: [{ landmark: "Financial District", value: "1.0 km" }, { landmark: "Management School", value: "1.5 km" }],
  },
  {
    id: 5,
    name: "Garden View",
    address: "654 Green Lane, Residential Area",
    mapUrl: "https://goo.gl/maps/example5",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&fit=crop",
    rooms: 20,
    startingPrice: 7500,
    amenities: ["WiFi", "Garden", "Parking"],
    distances: [{ landmark: "Eco IT Park", value: "3.2 km" }, { landmark: "St. Mary's College", value: "1.8 km" }],
  },
];

const Branches = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="branches" className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Premium Living</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">5 Exclusive Branches</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base px-4">
            Strategically located near major tech parks and educational hubs for ultimate convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-border/50 group transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-2xl text-lg font-black shadow-lg">
                  ₹{(branch.startingPrice/1000).toFixed(1)}k
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{branch.name}</h3>
                <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-6 hover:text-primary">
                  <MapPin className="w-4 h-4 text-primary" /> {branch.address}
                </a>

                <div className="bg-secondary/40 p-4 rounded-3xl mb-6 space-y-3">
                  {branch.distances.map((d, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground font-bold flex items-center gap-2">
                        <Navigation className="w-3 h-3 text-primary" /> {d.landmark}
                      </span>
                      <span className="font-black text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                   <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2">
                     <Bed className="w-3.5 h-3.5" /> {branch.rooms} Units Left
                   </div>
                </div>

                <Button onClick={scrollToBooking} className="w-full h-14 rounded-2xl font-black text-base shadow-button group/btn">
                  Reserve Spot <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;