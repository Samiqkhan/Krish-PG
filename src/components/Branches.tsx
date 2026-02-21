import { useState, useEffect } from "react";
import { MapPin, Bed, Navigation, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const Branches = () => {
  const [branchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch LIVE data from Supabase
  const fetchBranches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .order('name');

      if (error) throw error;
      if (data) setBranchData(data);
    } catch (error) {
      console.error("Error fetching branches:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  // Modern PG placeholders
  const images = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
  ];

  if (loading) return <div className="py-20 text-center animate-pulse text-primary font-bold">Updating live prices...</div>;

  return (
    <section id="branches" className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Premium Living</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Our 5 Branches</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branchData.map((branch, index) => (
            <div key={branch.id} className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-border/50 group transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={images[index % images.length]} alt={branch.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Fixed Pricing Format: Shows full amount e.g. 8,000 */}
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-2xl text-lg font-black shadow-lg">
                  ₹{Number(branch.starting_price).toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black mb-2">{branch.name}</h3>
                
                <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-bold mb-6">
                  <MapPin className="w-4 h-4 text-primary" /> {branch.address || "Main Branch Area"}
                </div>

                <div className="flex items-center gap-3 mb-6">
                   <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black flex items-center gap-2">
                     <Bed className="w-4 h-4" /> {branch.rooms} Units Available
                   </div>
                </div>

                <Button onClick={scrollToBooking} className="w-full h-14 rounded-2xl font-black text-base shadow-button">
                  Book Now 
                  <ChevronRight className="w-5 h-5 ml-1" />
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