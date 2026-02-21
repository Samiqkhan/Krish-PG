import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, MapPin, Sparkles, PhoneCall } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">Krish PG</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["branches", "amenities", "booking", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-semibold capitalize hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={() => scrollToSection("booking")} className="shadow-button rounded-xl font-bold">
              Book Your Stay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Improved Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-card border-b shadow-2xl transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
          <button onClick={() => scrollToSection("branches")} className="flex items-center gap-4 text-lg font-bold">
            <MapPin className="text-primary" /> Our Locations
          </button>
          <button onClick={() => scrollToSection("amenities")} className="flex items-center gap-4 text-lg font-bold">
            <Sparkles className="text-primary" /> Amenities
          </button>
          <button onClick={() => scrollToSection("contact")} className="flex items-center gap-4 text-lg font-bold">
            <PhoneCall className="text-primary" /> Contact Us
          </button>
          <hr className="border-border" />
          <Button onClick={() => scrollToSection("booking")} className="w-full h-14 rounded-2xl text-lg font-bold shadow-button">
            Book Your Stay
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;