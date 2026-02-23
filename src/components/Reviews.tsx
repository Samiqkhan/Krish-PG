import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Mohammed Kaif",
    role: "Software Engineer",
    content: "The best PG experience I've had. The amenities are best and the staff is very helpful.",
    rating: 5,
  },
  {
    name: "Sowmiya",
    role: "Student",
    content: "Very safe and clean environment. Perfect for students looking for a quiet place to study.",
    rating: 5,
  },
  {
    name: "Abishek",
    role: "Software Developer",
    content: "Excellent location and great community. The high-speed internet is a huge plus for work.",
    rating: 4,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Residents Say</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-none shadow-card rounded-3xl">
              <CardContent className="pt-8">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{review.content}"</p>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;