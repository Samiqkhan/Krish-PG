import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Branches from "@/components/Branches";
import Amenities from "@/components/Amenities";
import About from "@/components/About";
import VirtualTour from "@/components/VirtualTour";
import WhyUs from "@/components/WhyUs";
import Comparison from "@/components/Comparison";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Branches /> {/* This is now fixed and working */}
      <About />
      <Amenities />
      <VirtualTour />
      <WhyUs />
      <Comparison />
      <BookingForm />
      <Reviews />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;