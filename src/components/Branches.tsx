import { useState, useEffect } from "react";
import { MapPin, Bed, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

const Branches = () => {
  const [branchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('branches').select('*').order('name');
        if (error) throw error;
        setBranchData(data || []);
      } catch (err) {
        console.error("Error fetching branches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const images = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
  ];

  if (loading) return <div className="py-20 text-center animate-pulse text-primary font-medium">Checking live availability...</div>;

  return (
    <section id="branches" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Live Availability
          </Badge>
          <h2 className="text-4xl font-extrabold mb-4">Our Premium Branches</h2>
          <p className="text-muted-foreground">Select from our 5 high-end locations across the city.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {branchData.map((branch, index) => (
            <div key={branch.id} className="group bg-card rounded-[2rem] overflow-hidden shadow-xl border border-border/50 transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={images[index % images.length]} 
                  alt={branch.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ₹{branch.starting_price.toLocaleString()}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{branch.name}</h3>
                <div className="flex items-center gap-4 py-4 border-y border-border/50 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span className="font-bold">{branch.rooms} Rooms Left</span>
                  </div>
                </div>
                <Button onClick={scrollToBooking} className="w-full rounded-xl font-bold group/btn">
                  Book Now <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
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