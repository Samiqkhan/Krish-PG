import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const branches = [
  "Khande nagar",
  "Sainath nagar",
  "Samarth nagar",
  "Sairam PG - 1",
  "Sairam PG - 2",
];

const roomTypes = [
  "Single Occupancy",
  "Double Sharing",
  "Triple Sharing",
  "Four Sharing",
];

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    room_type: "", // Note: updated to match typical SQL naming (room_type)
    move_in_date: "", // Note: updated to match typical SQL naming (move_in_date)
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save the booking request to Supabase
    const { error } = await supabase
      .from('bookings')
      .insert([formData]);

    if (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error saving your request. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Booking Request Submitted!",
        description: "Our team will contact you within 24 hours to confirm your booking.",
      });

      // Clear the form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        room_type: "",
        move_in_date: "",
        message: "",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="booking" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Book Your Stay</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Reserve Your Room Today
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will get back to you with available options.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-8 md:p-10 rounded-3xl shadow-card">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Preferred Branch
                </Label>
                <Select onValueChange={(value) => handleSelectChange("branch", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room_type" className="flex items-center gap-2">
                  Room Type
                </Label>
                <Select onValueChange={(value) => handleSelectChange("room_type", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="move_in_date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Expected Move-in Date
                </Label>
                <Input
                  id="move_in_date"
                  name="move_in_date"
                  type="date"
                  value={formData.move_in_date}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Additional Message (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Any specific requirements or questions..."
                value={formData.message}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full mt-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;