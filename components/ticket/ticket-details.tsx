"use client";

import { Ticket } from "@/models/ticket";
import { MapPin, Clock, Calendar, Bus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import InfoBlock from "../InfoBlock";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  if (!ticket) return null;

  // const router = useRouter();

  // const handleViewOnMap = () => {
  //   const { lat, lng } = ticket?.location?.from;
  //   const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  //   router.push(googleMapsUrl);
  // };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-emerald-700" />
          <span className="font-semibold">
            {formatDate(ticket.departure_date)}
          </span>
        </div>
        {/* <Badge
          variant="outline"
          className="text-emerald-700 border-emerald-700"
        >
          {ticket.type}
        </Badge> */}
      </div>

      <Separator />

      <div className="px-4">
        {ticket.stops.map((stop, index) => (
          <div key={index} className="flex items-baseline space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-emerald-700" />
              {index < ticket.stops.length - 1 && (
                <div className="w-0.5 h-full bg-emerald-700" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold capitalize">{stop.from.name}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatTime(stop.time)}</span>
              </div>
              {index < ticket.stops.length - 1 && (
                <p className="text-sm text-gray-600 mt-1">To: {stop.to.name}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2 px-4">
        <div className="flex items-center space-x-2">
          <Bus className="h-5 w-5 text-emerald-700" />
          <span className="font-semibold">
            {typeof ticket.operator === "string"
              ? ticket.operator
              : ticket.operator.toString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-emerald-700" />
          <span
            className="text-sm text-blue-600 cursor-pointer"
            // onClick={handleViewOnMap}
          >
            View on map
          </span>
        </div>
      </div>

      <Separator />

      <div className="space-y-2 px-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Adult Price:</span>
          <span>${ticket.stops[0].other_prices.our_price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Child Price:</span>
          <span>
            ${ticket.stops[0].other_prices.our_children_price.toFixed(2)}
          </span>
        </div>
      </div>

      <InfoBlock
        desc="This trip will be operated by"
        title={ticket?.metadata?.operator_company_name}
      />
    </div>
  );
};

export default TicketDetails;
