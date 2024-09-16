import { Ticket } from "@/models/ticket";
import { MapPin, Clock, Calendar, Bus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoBlock from "../InfoBlock";
import { Fragment, useEffect, useState } from "react";
import { Station } from "@/models/station";
import { toast } from "../hooks/use-toast";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  const [allStations, setAllStations] = useState<Station[]>([]);
  console.log({ ticket });

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

  const handleLocation = (location: { lat?: number; lng?: number }) => {
    if (!location || !location.lat || !location.lng) {
      console.log("Keine lat lng");
      return toast({
        description: "Wrong coordinates.",
        variant: "destructive",
      });
    }

    const { lat, lng } = location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  useEffect(() => {
    const firstStopId = ticket?.stops[0].from?._id;
    const lastStopId = ticket?.stops[0].to?._id;

    if (firstStopId && lastStopId && ticket.fromStations && ticket.toStations) {
      const fromStationIndex = ticket.fromStations.findIndex(
        (station) => station._id === firstStopId
      );

      const toStationIndex = ticket.toStations.findIndex(
        (station) => station._id === lastStopId
      );

      console.log(fromStationIndex);
      const filteredFromStations =
        fromStationIndex !== -1
          ? ticket.fromStations.slice(fromStationIndex)
          : ticket.fromStations;

      const filteredToStations =
        toStationIndex !== -1
          ? ticket.toStations.slice(0, toStationIndex + 1)
          : ticket.toStations;

      const all = [...filteredFromStations, ...filteredToStations];
      console.log({ all });
      setAllStations(all);
      console.log({ filteredFromStations, filteredToStations });
    }
  }, [ticket]);

  if (!ticket) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-4 items-center justify-between px-4 pt-4">
        {/* <h1 className="mb-2 uppercase font-medium text-neutral-600">Map</h1> */}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(ticket?.stops[0]?.from?.location)}
        >
          <MapPin className="h-5 w-5 text-emerald-700" />
          <div>
            <p className="font-medium capitalize">
              {ticket.stops[0].from.city}
            </p>
            <p className="text-black/60 text-sm">View location on map</p>
          </div>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(ticket?.stops[0]?.to?.location)}
        >
          <MapPin className="h-5 w-5 text-emerald-700" />
          <div>
            <p className="font-medium capitalize">{ticket.stops[0].to.city}</p>
            <p className="text-black/60 text-sm">View location on map</p>
          </div>
        </div>
      </div>
      <Separator />

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-emerald-700" />
          <span className="font-semibold">
            {formatDate(ticket.departure_date)}
          </span>
        </div>
      </div>
      <Separator />
      <div className="px-4">
        {/* <h1 className="mb-2 uppercase font-medium text-neutral-600">Stops</h1> */}
        {allStations.map((station, index) => (
          <Fragment key={station._id}>
            <div className="flex items-center gap-6">
              <div className="h-4 w-4 bg-emerald-700 rounded-full flex justify-center items-center">
                <div className="h-2 w-2 bg-white rounded-full" />
              </div>
              <div>
                <p className="text-black capitalize">{station.name}</p>
              </div>
            </div>
            {index < allStations.length - 1 && (
              <div className="ml-[7px] h-5 border-l-2 border-dotted border-neutral-700" />
            )}
          </Fragment>
        ))}
      </div>

      <Separator />
      {/* <div className="space-y-2 px-4">
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
      </div> */}
      <InfoBlock
        desc="This trip will be operated by"
        title={ticket?.metadata?.operator_company_name}
      />
    </div>
  );
};

export default TicketDetails;
