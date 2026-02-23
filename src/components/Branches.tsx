import { useState, useEffect } from "react";
import { 
  MapPin, 
  Bed, 
  Navigation, 
  ExternalLink, 
  User, 
  Users, 
  ShieldCheck, 
  Banknote,
  Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const Branches = () => {
  const [branchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live data from Supabase
  const fetchBranches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .order('name');

      if (error) throw error;
      if (data) setBranchData(data);
    } catch (error: any) {
      console.error("Error fetching branches:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // High-quality PG Room Placeholders
  const images = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
  ];

  if (loading) return (
    <div className="py-20 text-center animate-pulse text-primary font-black tracking-widest">
      SYNCING LIVE AVAILABILITY...
    </div>
  );

  return (
    <section id="branches" className="py-20 bg-[#FBFBFE]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Premium Accommodations</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">Our Branches</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {branchData.map((branch, index) => (
            <div 
              key={branch.id} 
              className="group bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-border/50 transition-all duration-500 hover:shadow-2xl flex flex-col"
            >
              {/* Image & Main Pricing Badge */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={images[index % images.length]} 
                  alt={branch.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur shadow-xl px-5 py-2.5 rounded-2xl border border-primary/20">
                  <p className="text-[10px] font-black text-primary uppercase leading-none mb-1 text-center">Starts At</p>
                  <p className="font-black text-xl text-slate-900">
                    ₹{Number(branch.price_double_sharing || branch.starting_price).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="absolute bottom-4 left-6">
                   <div className="bg-black/40 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 font-black uppercase tracking-wider">
                     <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Top Rated
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-3xl font-black mb-4 tracking-tighter text-slate-900 group-hover:text-primary transition-colors">
                  {branch.name}
                </h3>

                {/* Large Touchable Location Button */}
                <a 
                  href={branch.map_link || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between bg-primary/5 hover:bg-primary/10 border-2 border-dashed border-primary/30 p-4 rounded-2xl mb-6 transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20">
                      <MapPin size={22} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Location</p>
                      <p className="text-sm font-bold text-slate-700">Open in Google Maps</p>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-primary opacity-50" />
                </a>

                {/* Nearby Landmarks - Dynamic from Admin */}
                <div className="bg-slate-50 p-5 rounded-[2rem] mb-6 space-y-3 border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                     <Navigation size={14} className="text-primary" /> Proximity
                   </p>
                   <div className="flex justify-between items-center text-xs font-bold">
                     <span className="text-slate-600 truncate w-40">{branch.landmark_1 || "Eon IT Park"}</span>
                     <span className="text-primary font-black">NEARBY</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold">
                     <span className="text-slate-600 truncate w-40">{branch.landmark_2 || "Main Hub"}</span>
                     <span className="text-primary font-black">ACCESSIBLE</span>
                   </div>
                </div>

                {/* Description Grid (Room details & Deposit) */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                   <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <ShieldCheck className="text-green-600 w-5 h-5 shrink-0" />
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1 tracking-widest">Room Quality</p>
                        <p className="text-xs font-bold text-slate-800">{branch.room_desc || "Standard furnished rooms"}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <Banknote className="text-blue-600 w-5 h-5 shrink-0" />
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1 tracking-widest">Payment Terms</p>
                        <p className="text-xs font-bold text-slate-800">{branch.deposit_desc || "Security deposit applicable"}</p>
                      </div>
                   </div>
                </div>

                {/* Final Dual Pricing Row */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="text-center p-3 rounded-2xl bg-slate-100">
                      <User size={14} className="mx-auto mb-1 text-slate-400" />
                      <p className="text-[9px] font-black uppercase text-slate-500">1 Sharing</p>
                      <p className="text-sm font-black text-slate-900">₹{Number(branch.price_single_sharing).toLocaleString('en-IN')}</p>
                   </div>
                   <div className="text-center p-3 rounded-2xl bg-slate-100 border-2 border-primary/20">
                      <Users size={14} className="mx-auto mb-1 text-primary" />
                      <p className="text-[9px] font-black uppercase text-slate-500">2 Sharing</p>
                      <p className="text-sm font-black text-slate-900">₹{Number(branch.price_double_sharing).toLocaleString('en-IN')}</p>
                   </div>
                </div>

                {/* Call to Action */}
                <div className="mt-auto pt-4 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                    <Bed size={16} /> {branch.rooms} Units Available
                  </div>
                  <Button 
                    onClick={scrollToBooking} 
                    className="w-full h-14 rounded-2xl font-black text-base shadow-button active:scale-95 transition-all uppercase tracking-widest"
                  >
                    Reserve Now
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