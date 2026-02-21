import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, MapPin, Sparkles, Phone, ShieldCheck } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Accounting for header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/90 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 z-[70]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-button">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xl font-black tracking-tighter">KRISH PG</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium Stay</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {["branches", "amenities", "about"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-bold capitalize hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("booking")} 
                className="rounded-full px-6 font-bold shadow-button"
              >
                Book Now
              </Button>
            </nav>

            {/* Mobile Toggle - Improved Hitbox */}
            <button
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-secondary/50 transition-all active:scale-90 z-[70]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop blur */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 w-[80%] h-full bg-card shadow-2xl transition-transform duration-500 ease-out p-8 pt-28 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Navigation</span>
            
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("branches")}
                className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-secondary/50 text-lg font-bold hover:bg-primary/10 transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary" /> Our Branches
              </button>
              
              <button 
                onClick={() => scrollToSection("amenities")}
                className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-secondary/50 text-lg font-bold"
              >
                <Sparkles className="w-5 h-5 text-primary" /> Amenities
              </button>

              <button 
                onClick={() => scrollToSection("about")}
                className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-secondary/50 text-lg font-bold"
              >
                <ShieldCheck className="w-5 h-5 text-primary" /> Why Choose Us
              </button>
            </nav>

            <div className="mt-4 p-6 rounded-[2rem] bg-primary/5 border border-primary/10">
              <p className="text-sm font-bold mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> Instant Support
              </p>
              <Button 
                onClick={() => scrollToSection("booking")} 
                className="w-full h-14 rounded-2xl text-lg font-black shadow-button"
              >
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;