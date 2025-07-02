"use client";

import React from "react";
import moment from "moment-timezone";
import { Button } from "@/components/ui/button";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../providers/currency-provider";
import { FaCalendarAlt } from "react-icons/fa";
import { ConnectedTicket } from "@/models/connected-ticket";

export interface ConnectedTicketProps {
  ticket: ConnectedTicket;
  isReturn?: boolean;
}

const ConnectedTicketBlock: React.FC<ConnectedTicketProps> = ({
  ticket,
  isReturn,
}) => {
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
  const { currency, convertFromEUR } = useCurrency();
  const { setIsLoading, isLoading } = useLoadingStore();

  const handleTicketSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSelectingReturn) {
      if (ticket._id !== returnTicket?._id) {
        setIsLoading(true);
        setReturnTicket(ticket);
      }
      router.push(`/checkout`);
      setIsLoading(false);
    } else {
      if (ticket._id !== outboundTicket?._id) {
        setOutboundTicket(ticket);
        setIsLoading(true);
      }
      setIsLoading(true);
      if (tripType === "round-trip") {
        setIsSelectingReturn(true);
        setIsLoading(false);
      } else {
        router.push(`/checkout`);
        setIsLoading(false);
      }
    }
  };

  const firstLeg = ticket.legs[0];
  const lastLeg = ticket.legs[ticket.legs.length - 1];

  const departureDateTime = moment.utc(firstLeg.departure_date);
  const arrivalDateTime = moment.utc(lastLeg.arrival_time);

  const duration = moment.duration(arrivalDateTime.diff(departureDateTime));

  const totalHours = Math.floor(Math.abs(duration.asHours()));
  const minutes = Math.abs(duration.minutes());

  const durationFormatted = `${totalHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} hrs`;

  const convertedPrice = convertFromEUR(ticket.total_price);

  return (
    <div className="max-w-5xl mx-auto bg-white border rounded-lg overflow-hidden shrink-0">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div className="flex gap-2 items-center mb-2 sm:mb-0 justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary-accent/10 px-2 py-1 rounded-full font-medium">
                <span className="bg-primary-accent bg-clip-text text-transparent">
                  {ticket.legs.length - 1}{" "}
                  {ticket.legs.length - 1 === 1 ? "Transfer" : "Transfers"}
                </span>
              </span>
            </div>

            <div className="flex items-center text-sm text-black">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              {departureDateTime.format("ddd, MMMM D, YYYY")}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end relative gap-3">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center">
              <div className="text-base sm:text-lg md:text-xl">
                {/* {departureDateTime.format("HH:mm")} */}
                {firstLeg.time}
              </div>
              <div className="text-center flex-1 px-2">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-2 text-neutral-700 font-medium text-lg sm:text-xl">
                    {durationFormatted}
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
              <div className="text-base sm:text-lg md:text-xl">
                {arrivalDateTime.isValid()
                  ? arrivalDateTime.format("HH:mm")
                  : "00:00"}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {firstLeg.from_station.city}
                </h1>
                <span className="truncate text-black/50 line-clamp-1 hidden sm:block">
                  {firstLeg.from_station.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {lastLeg.to_station.city}
                </h1>
                <span className="truncate text-black/50 line-clamp-1 hidden sm:block">
                  {lastLeg.to_station.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 w-full md:flex-col md:justify-end md:items-end md:w-fit">
            <div className="text-xl sm:text-2xl font-semibold w-full md:w-1/3 flex md:flex-col justify-between items-end">
              {currency.symbol}
              {convertedPrice.toFixed(2)}
            </div>
            <Button
              className="w-fit text-sm button-gradient"
              onClick={handleTicketSelection}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin text-white mx-auto" />
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

export default ConnectedTicketBlock;
