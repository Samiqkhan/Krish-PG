import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  preferred_location: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    text: "👋 Hello! Welcome to Krish PG. I'm here to help you find your perfect accommodation. May I know your name?",
  },
];

// Updated locations with specific names
const locations = [
  "Sainath nagar", 
  "Samarth nagar", 
  "Khandve nagar", 
  "Sairam PG - 1 (Kharadi Bypass)", 
  "Sairam PG - 2 (Sainath Nagar)"
];

const Chatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    preferred_location: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "bot", text },
    ]);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone.replace(/\D/g, ""));
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: userMessage },
    ]);
    setInput("");

    switch (step) {
      case 0: // Name
        setLeadData((prev) => ({ ...prev, name: userMessage }));
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${userMessage}! 😊 Could you please share your email address?`);
        }, 500);
        setStep(1);
        break;

      case 1: // Email Capture
        if (!validateEmail(userMessage)) {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid email. Please enter a valid email address.");
          }, 500);
          return;
        }
        setLeadData((prev) => ({ ...prev, email: userMessage }));
        setTimeout(() => {
          addBotMessage("Great! Now, could you share your phone number so we can reach you?");
        }, 500);
        setStep(2);
        break;

      case 2: // Phone
        if (!validatePhone(userMessage)) {
          setTimeout(() => {
            addBotMessage("Please enter a valid 10-digit phone number.");
          }, 500);
          return;
        }
        setLeadData((prev) => ({ ...prev, phone: userMessage }));
        setTimeout(() => {
          addBotMessage(
            `Perfect! Which location are you interested in?\n\n${locations.map((loc, i) => `${i + 1}. ${loc}`).join("\n")}\n\nJust type the number or location name.`
          );
        }, 500);
        setStep(3);
        break;

      case 3: // Location & Sync
        let selectedLocation = "";
        const num = parseInt(userMessage);
        if (num >= 1 && num <= 5) {
          selectedLocation = locations[num - 1];
        } else {
          const found = locations.find((loc) =>
            loc.toLowerCase().includes(userMessage.toLowerCase())
          );
          if (found) selectedLocation = found;
        }

        if (!selectedLocation) {
          setTimeout(() => {
            addBotMessage("Please select a valid location from the list above (1-5 or location name).");
          }, 500);
          return;
        }

        const finalData = { ...leadData, preferred_location: selectedLocation };
        
        // Sync to Supabase - ensuring email is included in the finalData object
        const { error } = await supabase.from('chatbot_leads').insert([finalData]);

        if (error) {
          console.error("Error saving lead:", error);
          addBotMessage("I'm sorry, I'm having trouble saving your info. Please try again later.");
        } else {
          setTimeout(() => {
            addBotMessage(
              `🎉 Thank you, ${finalData.name}! We've noted your interest in ${selectedLocation}.\n\nOur team will contact you at ${finalData.phone} within 24 hours.\n\nIs there anything else you'd like to know?`
            );
            toast({
              title: "Lead Captured!",
              description: "Your details (including email) have been saved successfully.",
            });
          }, 500);
        }
        setStep(4);
        break;

      case 4: // General conversation
        setTimeout(() => {
          addBotMessage(
            "Thank you! Our team will address all your queries when they contact you. Feel free to explore our website for more info. 🏠"
          );
        }, 500);
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-button hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen ? "scale-0" : "scale-100 animate-bounce-gentle"
        }`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-card rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Krish PG Assistant</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "bot"
                    ? "bg-primary/10"
                    : "bg-secondary"
                }`}
              >
                {message.type === "bot" ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.type === "bot"
                    ? "bg-secondary text-secondary-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-full"
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="rounded-full w-10 h-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;