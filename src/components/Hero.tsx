import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, ChevronRight, ShieldCheck } from "lucide-react";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBranches = () => {
    document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#FDFDFD] overflow-hidden pt-10">
      {/* Dynamic Background Decorative Elements */}
      <div className="absolute top-20 right-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-[-5%] w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
              <Star className="w-4 h-4 fill-primary" />
              Trusted by 280+ Residents
            </div>
            
            {/* Main Heading - Corrected for Mobile */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-900">
              Find Your <span className="text-primary italic">Perfect</span> 
              <span className="block mt-2">Home in Pune</span>
            </h1>
            
            <p className="text-base md:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Premium PG accommodations across **5 prime locations** including Kharadi and Sainath Nagar. Experience safety, comfort, and community.
            </p>

            {/* Mobile-Friendly Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14 justify-center lg:justify-start">
              <Button 
                onClick={scrollToBooking}
                className="h-16 md:h-14 rounded-2xl px-10 text-lg font-black shadow-button hover:scale-105 active:scale-95 transition-all"
              >
                Book Your Stay
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={scrollToBranches}
                className="h-16 md:h-14 rounded-2xl px-10 text-lg font-black border-2 border-slate-200 hover:bg-slate-50 transition-all"
              >
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Explore Branches
              </Button>
            </div>

            {/* Stats Row - Centered on Mobile */}
            <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-10 border-t pt-10 border-slate-100">
              <div className="text-center lg:text-left">
                <p className="font-black text-2xl md:text-3xl text-slate-900">5</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branches</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-black text-2xl md:text-3xl text-slate-900">280+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Residents</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-black text-2xl md:text-3xl text-slate-900">4.8</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviews</p>
              </div>
            </div>
          </div>

          {/* Image Section - Simplified & Professional */}
          <div className="relative group hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
                alt="Modern PG Interior"
                className="rounded-[3rem] shadow-2xl w-full h-[550px] object-cover border-[12px] border-white"
              />
              
              {/* Floating Community Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 max-w-[240px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div className="bg-green-100 text-green-700 p-1.5 rounded-lg">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <p className="font-black text-slate-900 leading-tight">Join Pune's Safest PG Community</p>
                <p className="text-xs text-slate-400 font-bold mt-1 tracking-tight">Verified Stays Only</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;