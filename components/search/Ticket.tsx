import React from "react";
import moment from "moment-timezone";
import { Symbols } from "@/symbols";
import { Ticket as TicketType } from "@/models/ticket"; // Import the Ticket type
import {
  ArrowRightIcon,
  BatteryChargingIcon,
  SnowflakeIcon,
  WifiIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TicketProps {
  ticket: TicketType;
}

const TicketBlock: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-2 items-center">
          <Badge>{ticket.metadata.operator_name}</Badge>
          <Badge className="bg-green-600 hover:bg-green-600">Mebus</Badge>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start mt-2">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center">
              <div className="text-xl">
                {moment(ticket.stops[0].departure_date).format("HH:mm")}
              </div>
              <div className="text-center flex-1 px-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 font-medium text-xl">
                    16:00 hrs
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
              <div className="text-xl">
                {moment(ticket.stops[0].arrival_time).format("HH:mm")}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-medium text-lg capitalize">
                  {ticket.destination.from}
                </h1>
                <span className="text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].from.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-medium text-lg capitalize">
                  {ticket.destination.to}
                </h1>
                <span className="text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].to.name}
                </span>
              </div>
            </div>
          </div>
          <div className="text-2xl font-semibold w-full md:w-1/3 flex justify-end">
            {Symbols.EURO}
            {ticket.stops[0].other_prices.our_price.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
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
          {/* {ticket.isFastest ? "FASTEST TRIP" : ""} */}
          FASTEST TRIP
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default TicketBlock;
