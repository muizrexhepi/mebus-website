"use client";

import moment from "moment-timezone";
import { Symbols } from "@/symbols";
import { Ticket as TicketType } from "@/models/ticket";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";

interface TicketProps {
  ticket: TicketType;
  adults?: string | null;
  nrOfChildren?: string | null;
}

const TicketBlock: React.FC<TicketProps> = ({
  ticket,
  adults,
  nrOfChildren,
}) => {
  const { setSelectedTicket } = useCheckoutStore();
  const router = useRouter();
  const handleCheckout = (e: any) => {
    try {
      e.preventDefault();
      setSelectedTicket(ticket);
      router.push(`/checkout?adults=${adults}&children=${nrOfChildren}`);
      console.log({ ticket });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex gap-2 items-center">
          <Badge>{ticket.metadata.operator_name}</Badge>
          <Badge className="bg-emerald-700 hover:bg-emerald-700">Mebus</Badge>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center">
              <div className="text-lg sm:text-xl">
                {moment.utc(ticket.stops[0].departure_date).format("HH:mm")}
              </div>
              <div className="text-center flex-1 px-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-neutral-700 font-medium text-lg sm:text-xl">
                    16:00 hrs
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
              <div className="text-lg sm:text-xl">
                {moment.utc(ticket.stops[0].arrival_time).format("HH:mm")}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[0].from.city}
                </h1>
                <span className="text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].from.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[0].to.city}
                </h1>
                <span className="text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].to.name}
                </span>
              </div>
            </div>
          </div>
          <div className="text-2xl font-semibold w-full md:w-1/3 flex md:flex-col justify-between items-end mt-2 md:mt-0">
            {Symbols.EURO}
            {ticket.stops[0].other_prices.our_price.toFixed(2)}
          </div>
          <Button
            className="w-fit absolute -bottom-2 md:bottom-0 right-0 text-base bg-emerald-700 hover:bg-emerald-600"
            onClick={handleCheckout}
          >
            Continue
          </Button>
        </div>
      </div>
      {/* <div className="px-6 py-2 flex justify-between items-center bg-gray-50">
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <ArrowRightIcon className="h-6 w-6" />
            <span className="text-lg">{0} transfer(s)</span>
          </div>
          <div className="flex items-center space-x-4">
            {ticket.metadata.features.includes("wifi") && (
              <WifiIcon className="h-6 w-6" />
            )}
            {ticket.metadata.features.includes("ac/heating") && (
              <SnowflakeIcon className="h-6 w-6" />
            )}
            {ticket.metadata.features.includes("usb charging ports") && (
              <BatteryChargingIcon className="h-6 w-6" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          FASTEST TRIP
          <Button>Continue</Button>
        </div>
      </div> */}
    </div>
  );
};

export default TicketBlock;
