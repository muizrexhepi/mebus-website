"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Locate, MapPin, ArrowRight, Clock } from "lucide-react";
import moment from "moment-timezone";
import type { Ticket } from "@/models/ticket";
import {
  cn,
  getChildrenPrice,
  getTicketPrice,
  isConnectedTicket,
} from "@/lib/utils";
import { useTranslation } from "react-i18next";
import useSearchStore, { useDepositStore, useCheckoutStore } from "@/store";
import { ConnectedTicket } from "@/models/connected-ticket";

interface PriceSummaryItemProps {
  label: string;
  amount: number;
  quantity?: number;
  className?: string;
}

const PriceSummaryItem: React.FC<PriceSummaryItemProps> = ({
  label,
  amount,
  quantity,
  className,
}) => (
  <div className={cn("flex items-center justify-between text-sm", className)}>
    <p className="text-black">{quantity ? `${quantity} x ${label}` : label}</p>
    <p className="text-black">
      {/* Hardcoded currency symbol to Euro */}€{amount.toFixed(2)}
    </p>
  </div>
);

interface TripProps {
  ticket: Ticket | ConnectedTicket;
  isReturn: boolean;
}

function TicketSummary({ ticket }: TripProps) {
  if (isConnectedTicket(ticket)) {
    const firstLeg = ticket.legs[0];
    const lastLeg = ticket.legs[ticket.legs.length - 1];
    const departureDate = moment.utc(firstLeg.departure_date);
    const arrivalDate = moment.utc(lastLeg.arrival_time);
    const isNextDay = !departureDate.isSame(arrivalDate, "day");

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">
            {departureDate.format("ddd, D MMM")}
            {isNextDay && ` → ${arrivalDate.format("ddd, D MMM")}`}
          </div>
          <div className="px-3 py-1 bg-orange-100 font-medium rounded-full text-sm text-orange-700">
            {ticket.legs.length - 1}{" "}
            {ticket.legs.length === 1 ? "Connection" : "Connections"}
          </div>
        </div>

        <div className="space-y-3">
          {ticket?.legs.map((leg, index) => {
            const legDeparture = moment.utc(leg.departure_date);
            const legArrival = moment.utc(leg.arrival_time);

            return (
              <div key={`leg-${index}`} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-primary-bg text-white text-xs px-2 py-1 rounded-full font-medium w-fit">
                    {leg.operator.name}
                  </div>
                  <span className="text-xs text-gray-800">
                    {moment.utc(leg.departure_date).format("DD-MM-YYYY")}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Locate size={16} className="text-gray-600" />
                        <div className="flex flex-col">
                          <span className="capitalize font-medium text-sm">
                            {leg.from_station.city}
                          </span>
                          <span className="text-primary-bg/60 text-xs">
                            {leg.from_station.name}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-sm">
                        {legDeparture.format("HH:mm")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                    <ArrowRight size={14} className="text-gray-400" />
                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-600" />
                        <div className="flex flex-col">
                          <span className="capitalize font-medium text-sm">
                            {leg.to_station.city}
                          </span>
                          <span className="text-primary-bg/60 text-xs">
                            {leg.to_station.name}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-sm">
                        {legArrival.format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>

                {index < ticket.legs.length - 1 && (
                  <div className="w-full my-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                      <p className="text-sm text-yellow-800">
                        Transfer at{" "}
                        <span className="font-bold">
                          {ticket.intermediate_station?.name ||
                            leg.to_station.name}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <ArrowRight className="w-3 h-3 mr-1 text-yellow-600" />
                      <p className="text-xs text-yellow-700">
                        Wait time:{" "}
                        {(() => {
                          const totalMinutes = Math.abs(ticket.connection_time);
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;
                          return `${hours.toString().padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}`;
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    const departureDate = moment.utc(ticket.stops[0].departure_date);
    const arrivalDate = moment.utc(ticket.stops[0].arrival_time);
    const isNextDay = !departureDate.isSame(arrivalDate, "day");

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">
            {departureDate.format("ddd, D MMM")}
            {isNextDay && ` → ${arrivalDate.format("ddd, D MMM")}`}
          </div>
          <div className="bg-primary-bg text-white text-xs px-2 py-1 rounded-full font-medium w-fit">
            {ticket.operatorInfo.name}
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Locate size={20} className="text-gray-600" />
                <div className="flex flex-col">
                  <span className="capitalize">
                    {ticket.stops[0].from.city}
                  </span>
                  <span className="text-primary-bg/60 text-sm font-medium">
                    {ticket.stops[0].from.name}
                  </span>
                </div>
              </div>
              <span className="font-medium">
                {departureDate.format("HH:mm")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-600" />
                <div className="flex flex-col">
                  <span className="capitalize">{ticket.stops[0].to.city}</span>
                  <span className="text-primary-bg/60 text-sm font-medium">
                    {ticket.stops[0].to.name}
                  </span>
                </div>
              </div>
              <span className="font-medium">{arrivalDate.format("HH:mm")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const OrderSummary = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [useBalance, setUseBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const { useDeposit, depositAmount } = useDepositStore();
  const { passengers: passengerAmount } = useSearchStore();
  const { outboundTicket, returnTicket, selectedFlex } = useCheckoutStore();

  // No more `useCurrency` hook

  useEffect(() => {
    const handleUseBalanceChange = (event: CustomEvent) => {
      setUseBalance(event.detail.useBalance);
      setBalanceAmount(event.detail.balanceAmount);
      // The amount is already in EUR, so no need to convert.
      setRemainingAmount(event.detail.remainingAmount);
    };

    window.addEventListener(
      "useBalanceChanged",
      handleUseBalanceChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "useBalanceChanged",
        handleUseBalanceChange as EventListener
      );
    };
  }, []);

  const flexPrice = useMemo(() => {
    return selectedFlex === "premium" ? 4 : selectedFlex === "standard" ? 2 : 0;
  }, [selectedFlex]);

  const calculateTicketTotal = (ticket: Ticket | ConnectedTicket) => {
    const adultPrice = getTicketPrice(ticket);
    const childPrice = getChildrenPrice(ticket);

    return {
      adultTotal: adultPrice * (passengerAmount.adults || 1),
      childTotal: childPrice * (passengerAmount.children || 0),
      adultCount: passengerAmount.adults,
      childCount: passengerAmount.children,
      adultPrice,
      childPrice,
    };
  };

  const outboundDetails = outboundTicket
    ? calculateTicketTotal(outboundTicket)
    : null;
  const returnDetails = returnTicket
    ? calculateTicketTotal(returnTicket)
    : null;

  const subtotalPrice = useMemo(() => {
    const outboundTotal = outboundDetails
      ? outboundDetails.adultTotal + outboundDetails.childTotal
      : 0;
    const returnTotal = returnDetails
      ? returnDetails.adultTotal + returnDetails.childTotal
      : 0;
    return outboundTotal + returnTotal + flexPrice;
  }, [outboundDetails, returnDetails, flexPrice]);

  const totalPrice = useMemo(() => {
    return Math.max(subtotalPrice, 0);
  }, [subtotalPrice]);

  const finalPrice = useMemo(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(balanceAmount, totalPrice);
      return Math.max(totalPrice - appliedBalanceAmount, 0);
    }
    return totalPrice;
  }, [useBalance, balanceAmount, totalPrice]);

  useEffect(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(balanceAmount, totalPrice);
      setRemainingAmount(Math.max(totalPrice - appliedBalanceAmount, 0));
    } else {
      setRemainingAmount(totalPrice - (depositAmount || 0));
    }
  }, [useBalance, balanceAmount, totalPrice, depositAmount]);

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-medium text-2xl">
          {t("orderSummary.bookingDetails")}
        </h1>

        {outboundTicket && (
          <div className="w-full rounded-xl p-4 bg-white ">
            <TicketSummary ticket={outboundTicket} isReturn={false} />
            {returnTicket && (
              <>
                <div className="my-4 border-t border-gray-200" />
                <TicketSummary ticket={returnTicket} isReturn={true} />
              </>
            )}
          </div>
        )}
      </div>

      <div className={cn("bg-white rounded-xl p-4 space-y-3", className)}>
        <div className="flex flex-col gap-1">
          {outboundDetails && (
            <>
              <h2 className="font-medium text-base mt-2">
                {t("orderSummary.outboundTrip")}
              </h2>
              <PriceSummaryItem
                label={t("orderSummary.adults")}
                amount={outboundDetails.adultPrice}
                quantity={outboundDetails.adultCount}
              />
              <PriceSummaryItem
                label={t("orderSummary.children")}
                className={`${passengerAmount.children < 1 && "hidden"}`}
                amount={outboundDetails.childPrice}
                quantity={outboundDetails.childCount}
              />
            </>
          )}

          {returnDetails && (
            <>
              <h2 className="font-medium text-base mt-2">
                {t("orderSummary.returnTrip")}
              </h2>
              <PriceSummaryItem
                label={t("orderSummary.adults")}
                amount={returnDetails.adultPrice}
                quantity={returnDetails.adultCount}
              />
              <PriceSummaryItem
                label={t("orderSummary.children")}
                className={`${passengerAmount.children < 1 && "hidden"}`}
                amount={returnDetails.childPrice}
                quantity={returnDetails.childCount}
              />
            </>
          )}

          {selectedFlex && selectedFlex !== "no_flex" && (
            <PriceSummaryItem
              label={
                selectedFlex === "premium"
                  ? t("services.priority.name")
                  : t("services.standard.name")
              }
              amount={flexPrice}
            />
          )}

          <hr className="w-full h-[1px] bg-neutral-500 my-2" />

          {useDeposit && (
            <>
              <PriceSummaryItem
                label={t("orderSummary.subtotal")}
                amount={totalPrice}
                className="font-medium"
              />
              <PriceSummaryItem
                label={t("orderSummary.amountUsedFromDeposit")}
                amount={-depositAmount || 0}
                className="text-green-600"
              />
            </>
          )}

          <PriceSummaryItem
            label={t("orderSummary.total")}
            amount={remainingAmount}
            className="font-medium text-lg"
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
