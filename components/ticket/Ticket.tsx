"use client";

import React from "react";
import moment from "moment-timezone";
import type { Ticket as TicketType } from "@/models/ticket";
import { Button } from "@/components/ui/button";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";

export interface TicketProps {
  ticket: TicketType;
  isReturn?: boolean;
}

const TicketBlock: React.FC<TicketProps> = ({ ticket, isReturn }) => {
  const {
    setOutboundTicket,
    outboundTicket,
    setReturnTicket,
    returnTicket,
    isSelectingReturn,
    setIsSelectingReturn,
  } = useCheckoutStore();
  const { tripType } = useSearchStore();
  const router = useRouter();
  const { t } = useTranslation();
  const { setIsLoading, isLoading } = useLoadingStore();
  // Check if route is bookable
  const isBookable = ticket.route?.metadata?.bookable !== false;

  const handleTicketSelection = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isBookable) {
      return; // Don't proceed if not bookable
    }

    setIsLoading(true);

    if (isSelectingReturn) {
      if (ticket._id !== returnTicket?._id) {
        setReturnTicket(ticket);
      }
      router.push(`/checkout`);
    } else {
      if (ticket._id !== outboundTicket?._id) {
        setOutboundTicket(ticket);
      }
      if (tripType === "round-trip") {
        setIsSelectingReturn(true);
      } else {
        router.push(`/checkout`);
      }
    }
  };

  const departureDate = moment.utc(ticket.stops[0].departure_date);
  const arrivalTime = moment.utc(
    ticket.stops[ticket.stops.length - 1].arrival_time
  );

  const duration = moment.duration(arrivalTime.diff(departureDate));
  const totalHours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const durationFormatted = `${totalHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} hrs`;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shrink-0">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div className="flex gap-2 items-center mb-2 sm:mb-0 justify-between w-full">
            <p className="button-gradient bg-clip-text text-transparent">
              {ticket.operatorInfo?.name}
            </p>
            <div className="flex items-center text-sm text-black">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              {departureDate.format("ddd, MMMM D, YYYY")}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end relative gap-3">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center">
              <div className="text-base sm:text-lg md:text-xl">
                {departureDate.format("HH:mm")}
              </div>
              <div className="text-center flex-1 px-2">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t"></div>
                  <span className="flex-shrink text-neutral-700 border px-3 rounded-full font-medium text-base">
                    {durationFormatted !== "NaN:NaN hrs"
                      ? durationFormatted
                      : "00:00"}
                  </span>
                  <div className="flex-grow border-t"></div>
                </div>
              </div>
              <div className="text-base sm:text-lg md:text-xl">
                {arrivalTime.format("HH:mm") !== "Invalid date"
                  ? arrivalTime.format("HH:mm")
                  : "00:00"}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[0].from.city}
                </h1>
                <span className="truncate text-black/50 line-clamp-1 hidden sm:block">
                  {ticket.stops[0].from.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[ticket.stops.length - 1].to.city}
                </h1>
                <span className="truncate text-black/50 line-clamp-1 hidden sm:block">
                  {ticket.stops[ticket.stops.length - 1].to.name}
                </span>
              </div>
            </div>

            {ticket.number_of_tickets <= 3 && isBookable && (
              <div className="text-left mt-2">
                <span className="text-sm text-transparent button-gradient bg-clip-text font-medium">
                  {ticket.number_of_tickets}{" "}
                  {t("ticket.seatsLeft", "Seats Left")}
                </span>
              </div>
            )}

            {!isBookable && (
              <div className="text-left mt-2">
                <span className="text-sm text-red-600 font-medium">
                  {t("ticket.notBookable", "Not Available for Booking")}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-4 w-full md:flex-col md:justify-end md:items-end md:w-fit">
            <div className="text-xl sm:text-2xl font-semibold w-full md:w-1/3 flex md:flex-col justify-between items-end ">
              €{ticket.stops[0].other_prices.our_price.toFixed(2)}
            </div>

            <Button
              variant={isBookable ? "primary" : "secondary"}
              className="w-fit text-sm"
              onClick={handleTicketSelection}
              disabled={!isBookable}
            >
              {isLoading && isBookable ? (
                <Loader2 className="size-5 animate-spin text-white mx-auto" />
              ) : !isBookable ? (
                t("actions.viewDetails", "Not Available")
              ) : isReturn && outboundTicket ? (
                t("ticket.selectReturn")
              ) : tripType !== "round-trip" ? (
                t("ticket.continue")
              ) : (
                t("ticket.selectOutbound")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBlock;
