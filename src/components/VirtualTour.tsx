import { Pannellum } from "pannellum-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VirtualTour = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Experience</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Virtual Room Tour</h2>
        
        <Tabs defaultValue="double" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="double">Double Sharing Room</TabsTrigger>
            <TabsTrigger value="triple">Dining Area & Common Space</TabsTrigger>
          </TabsList>

          <TabsContent value="double">
            <div className="rounded-3xl overflow-hidden shadow-card h-[500px] border border-border">
              <Pannellum
                width="100%"
                height="100%"
                image="/room.jpeg" // Replace with your 360 image URL
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
              >
                <Pannellum.Hotspot 
                  type="info" 
                  pitch={11} 
                  yaw={-167} 
                  text="Spacious Double Sharing Bed" 
                />
              </Pannellum>
            </div>
            <p className="mt-4 text-muted-foreground">Double sharing rooms include separate cupboards and study tables.</p>
          </TabsContent>

          <TabsContent value="triple">
            <div className="rounded-3xl overflow-hidden shadow-card h-[500px] border border-border">
              <Pannellum
                width="100%"
                height="100%"
                image="https://pannellum.org/images/milan.jpg" // Replace with your 360 image URL
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
              >
                <Pannellum.Hotspot 
                  type="info" 
                  pitch={11} 
                  yaw={-167} 
                  text="Dining Area and Common Space" 
                />
              </Pannellum>
            </div>
            <p className="mt-4 text-muted-foreground">Dining area and common space are shared among residents for a comfortable living experience.</p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VirtualTour;