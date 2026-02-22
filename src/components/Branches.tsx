import { useState, useEffect } from "react";
import { MapPin, Bed, Navigation, ChevronRight, ExternalLink, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const Branches = () => {
  const [branchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data, error } = await supabase.from('branches').select('*').order('name');
        if (error) throw error;
        setBranchData(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"
  ];

  if (loading) return <div className="py-20 text-center animate-pulse font-bold text-primary">Loading Premium Accommodations...</div>;

  return (
    <section id="branches" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">Our Branches</h2>
          <p className="text-muted-foreground font-medium">Choose your comfort level at Krish PG</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {branchData.map((branch, index) => (
            <div key={branch.id} className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-border/50 transition-all hover:shadow-2xl flex flex-col">
              <div className="relative h-64">
                <img src={images[index % images.length]} alt={branch.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur shadow-lg px-4 py-2 rounded-2xl border border-primary/20">
                    <p className="text-[10px] font-black text-primary uppercase leading-none mb-1">2 Sharing</p>
                    <p className="font-black text-lg">₹{Number(branch.price_double_sharing || branch.starting_price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-3xl font-black mb-4 tracking-tighter">{branch.name}</h3>

                {/* Large Touchable Location Button */}
                <a 
                  href={branch.map_link || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center justify-between bg-primary/5 hover:bg-primary/10 border-2 border-dashed border-primary/30 p-4 rounded-2xl mb-6 transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white p-2 rounded-xl">
                      <MapPin size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Open in Maps</p>
                      <p className="text-sm font-bold text-slate-700 line-clamp-1 truncate w-40">{branch.name} Location</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-primary opacity-50 group-hover:opacity-100" />
                </a>

                {/* Pricing Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-100 p-4 rounded-2xl text-center">
                    <User className="w-4 h-4 mx-auto mb-2 text-primary" />
                    <p className="text-[10px] font-black uppercase text-slate-500">1 Sharing</p>
                    <p className="font-black text-slate-900">₹{Number(branch.price_single_sharing || 12000).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl text-center border-2 border-primary/20">
                    <Users className="w-4 h-4 mx-auto mb-2 text-primary" />
                    <p className="text-[10px] font-black uppercase text-slate-500">2 Sharing</p>
                    <p className="font-black text-slate-900">₹{Number(branch.price_double_sharing || branch.starting_price).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Nearby Places Section */}
                <div className="mb-6 space-y-2">
                   <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                     <Navigation size={14} /> Nearby Landmarks
                   </div>
                   <div className="bg-white border rounded-xl p-3 text-sm font-bold shadow-sm">
                      1.2 km Eon IT Park
                   </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-center gap-2 text-primary font-black text-sm uppercase">
                    <Bed size={18} /> {branch.rooms} Rooms Left
                  </div>
                  <Button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-14 rounded-2xl font-black text-lg shadow-button active:scale-95">
                    RESERVE NOW
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;