import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Krish PG</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("branches")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Locations
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={() => scrollToSection("booking")}>
              Book Your Stay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("branches")}
              className="text-left py-2 font-medium hover:text-primary transition-colors"
            >
              Locations
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-left py-2 font-medium hover:text-primary transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-left py-2 font-medium hover:text-primary transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left py-2 font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("booking")} className="w-full">
              Book Your Stay
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
