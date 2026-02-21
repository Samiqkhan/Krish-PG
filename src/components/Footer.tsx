import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">Krish PG</span>
            </a>
            <p className="text-background/70 text-sm mb-6">
              Premium paying guest accommodations designed for comfort, convenience, 
              and community living across 5 prime locations.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#branches" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Our Locations
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#booking" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Book a Room
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Our Branches */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Branches</h3>
            <ul className="space-y-3">
              <li className="text-background/70 text-sm">Downtown Central</li>
              <li className="text-background/70 text-sm">Tech Park Hub</li>
              <li className="text-background/70 text-sm">University Heights</li>
              <li className="text-background/70 text-sm">Business Bay</li>
              <li className="text-background/70 text-sm">Garden View</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  123 Main Street, City Center,<br />
                  State - 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-background/70 hover:text-primary text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@Krish PG.com" className="text-background/70 hover:text-primary text-sm transition-colors">
                  hello@Krish PG.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8">
          <p className="text-center text-background/50 text-sm">
            © {new Date().getFullYear()} Krish PG PG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
