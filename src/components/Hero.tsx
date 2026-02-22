import { Button } from "@/components/ui/button";
import { MapPin, Star, Users } from "lucide-react";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBranches = () => {
    document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-primary" />
              Trusted by 1000+ Residents
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Finest resident 
              <span className="text-primary block">For You and Your Loved Ones</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Premium paying guest accommodations across 5 prime locations. 
              Experience comfort, convenience, and community living at afforadble price.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" onClick={scrollToBooking}>
                Book Your Stay
              </Button>
              <Button variant="heroOutline" onClick={scrollToBranches}>
                <MapPin className="w-5 h-5" />
                Explore Locations
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-2xl">5</p>
                  <p className="text-sm text-muted-foreground">Locations</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-2xl">180+</p>
                  <p className="text-sm text-muted-foreground">Happy Residents</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div>
                  <p className="font-bold text-2xl">4.8</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=700&fit=crop"
                alt="Modern PG Room"
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/40?img=1" alt="Resident" className="w-10 h-10 rounded-full border-2 border-card" />
                    <img src="https://i.pravatar.cc/40?img=2" alt="Resident" className="w-10 h-10 rounded-full border-2 border-card" />
                    <img src="https://i.pravatar.cc/40?img=3" alt="Resident" className="w-10 h-10 rounded-full border-2 border-card" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Join our community</p>
                    <p className="text-xs text-muted-foreground">500+ residents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
