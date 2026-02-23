import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Mohammed Kaif",
    role: "Software Engineer",
    content: "The best PG experience I've had. The amenities are top-notch and the staff is incredibly helpful.",
    rating: 5,
  },
  {
    name: "Sowmiya",
    role: "Student",
    content: "Very safe and clean environment. Perfect for students looking for a quiet place to study and relax.",
    rating: 5,
  },
  {
    name: "Abishek",
    role: "Software Developer",
    content: "Excellent location and great community. The high-speed internet is a huge plus for my remote work.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "UI Designer",
    content: "Beautifully furnished rooms and very hygienic. The deposit process was transparent and quick.",
    rating: 5,
  },
];

const Reviews = () => {
  // We double the array to create a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-24 bg-[#FBFBFE] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight uppercase italic">
            Resident Stories
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Moving Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap py-10">
            {duplicatedReviews.map((review, index) => (
              <div key={index} className="mx-4 w-[300px] md:w-[400px] shrink-0 whitespace-normal">
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-white h-full transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="pt-10 pb-8 px-8 relative">
                    <Quote className="absolute top-6 right-8 text-primary/10 w-12 h-12 -z-0" />
                    
                    <div className="flex mb-6 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-slate-200"}`} 
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 font-medium mb-8 italic leading-relaxed relative z-10">
                      "{review.content}"
                    </p>

                    <div className="flex items-center gap-4 border-t pt-6 border-slate-50 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">{review.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Side Gradients to fade the edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FBFBFE] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FBFBFE] to-transparent z-20 pointer-events-none" />
        </div>
      </div>

      {/* Adding the CSS Animation via Tailwind Plugin or Global CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default Reviews;