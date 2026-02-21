import { CheckCircle2 } from "lucide-react";

const About = () => {
  const features = [
    "5+ Years of Excellence",
    "Verified & Safe Listings",
    "24/7 On-site Support",
    "Prime Locations Near Hubs",
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="flex-1">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="About PG Comfort Connect" 
                className="rounded-3xl shadow-card w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl hidden md:block">
                <p className="text-white font-bold text-4xl">500+</p>
                <p className="text-white/80 text-sm">Happy Residents</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Providing a Home Away <br /> From Home
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              At PG Comfort Connect, we understand that finding the right place to live is crucial for your success and peace of mind. Since our inception, we have been dedicated to redefining the PG experience by offering premium, fully-managed living spaces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
              "Our mission is to provide comfortable, secure, and community-driven housing for the modern professional and student."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;