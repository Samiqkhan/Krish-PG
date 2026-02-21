import { Pannellum } from "pannellum-react";

interface RoomTourProps {
  imagePath: string;
  roomName: string;
}

const RoomTour = ({ imagePath, roomName }: RoomTourProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold">{roomName} - 360° View</h4>
      <div className="rounded-3xl overflow-hidden shadow-card border border-border h-[400px]">
        <Pannellum
          width="100%"
          height="100%"
          image={imagePath}
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          showZoomCtrl={false}
        >
          {/* Optional: Add a "Hotspot" to highlight specific features like AC or Bed */}
          <Pannellum.Hotspot
            type="info"
            pitch={11}
            yaw={-167}
            text="High-quality single bed"
          />
        </Pannellum>
      </div>
      <p className="text-sm text-muted-foreground italic">
        * Drag your mouse/finger to look around the room.
      </p>
    </div>
  );
};

export default RoomTour;