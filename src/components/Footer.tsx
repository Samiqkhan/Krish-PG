import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from "lucide-react";

const Footer = () => {
  const branches = [
    "Sainath nagar",
    "Samarth nagar",
    "Khande nagar",
    "Sairam PG - 1",
    "Sairam PG - 2"
  ];

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {/* CIRCULAR LOGO */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 bg-white p-1">
                <img 
                  src="/favicon.ico" 
                  alt="Krish PG Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter italic">KRISH PG</h2>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Premium Living</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing high-quality, safe, and comfortable PG accommodations for students and professionals across Pune.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Branches</h4>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li key={branch}>
                  <a href="#branches" className="text-slate-400 hover:text-primary text-sm transition-colors flex items-center gap-2">
                    <MapPin size={14} /> {branch}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="text-primary shrink-0" size={18} />
                <span>contact@krishpg.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Trust */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Stay updated with room availability and offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-black px-4 py-2 rounded-xl font-bold text-sm">Join</button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium">
          <p>© 2026 Krish PG Accommodations. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;