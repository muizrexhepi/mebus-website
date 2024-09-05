"use client";
import { Ticket } from "@/models/ticket";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  if (!ticket) return null;

  console.log({ ticket });
  const router = useRouter();
  const departureDate = new Date(ticket.departure_date);
  const formattedDepartureDate = departureDate.toLocaleDateString();
  const formattedDepartureTime = departureDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleViewOnMap = () => {
    const { lat, lng } = ticket.location.from; // Make sure ticket.from.location has lat/lng
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    router.push(googleMapsUrl);
  };

  return (
    <div className="">
      <div className="p-4 flex items-center gap-4 border-b">
        <MapPin className="text-black/80 h-5 w-5" />
        <div className="cursor-pointer" onClick={handleViewOnMap}>
          <p className="text-black font-medium text-base capitalize">
            {ticket.destination.from}
          </p>
          <p className="text-black/70 font-normal">
            View starting destination on map.
          </p>
        </div>
      </div>
      <div className="p-4 flex items-baseline gap-5">
        <div className="flex flex-col justify-center items-center">
          <div className="w-4 h-4 rounded-full bg-black/70 flex justify-center items-center">
            <div className="bg-white h-3 w-3 rounded-full" />
          </div>
          <div className="bg-black/70 w-0.5 h-10" />
          <div className="w-4 h-4 rounded-full bg-black/70 flex justify-center items-center">
            <div className="bg-white h-3 w-3 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between h-ful">
          <p className="text-black font-medium text-base capitalize">
            {ticket.stops[0].from.name}
          </p>
          <p className="text-black font-medium text-base capitalize">
            {ticket.stops[0].from.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
