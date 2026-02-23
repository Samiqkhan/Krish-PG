import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Sparkles, Phone, ShieldCheck } from "lucide-react";

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
      const offset = 80; 
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
            ? "bg-white/95 backdrop-blur-xl shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            
            {/* CIRCULAR LOGO SECTION */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 z-[70] group"
            >
              {/* This container ensures the logo is a perfect circle */}
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-white shadow-sm transition-transform group-hover:scale-105">
                <img 
                  src="/favicon.ico" 
                  alt="Krish PG Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-primary">
                  KRISH PG
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] text-red-500">
                  Premium Living
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {["branches", "amenities", "about"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-bold capitalize text-slate-700 hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("booking")} 
                className="rounded-full px-6 font-bold shadow-lg shadow-primary/20"
              >
                Book Now
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 transition-all active:scale-90 z-[70]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay (unchanged) */}
      <div 
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-[80%] h-full bg-white shadow-2xl transition-transform duration-500 ease-out p-8 pt-24 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col gap-8">
            <nav className="flex flex-col gap-3">
              <button onClick={() => scrollToSection("branches")} className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-slate-50 text-lg font-bold text-slate-800">
                <MapPin className="w-5 h-5 text-primary" /> Our Branches
              </button>
              <button onClick={() => scrollToSection("amenities")} className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-slate-50 text-lg font-bold text-slate-800">
                <Sparkles className="w-5 h-5 text-primary" /> Amenities
              </button>
            </nav>
            <Button onClick={() => scrollToSection("booking")} className="w-full h-14 rounded-2xl text-lg font-black shadow-button">
              Reserve Your Stay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;