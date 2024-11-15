import React, { useEffect, useMemo, useState } from "react";
import { Circle, MapPin } from "lucide-react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

import useSearchStore, { useDepositStore, useCheckoutStore } from "@/store";

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
    <p className="text-black">{amount.toFixed(2)}€</p>
  </div>
);

interface TripProps {
  ticket: Ticket;
  isReturn: boolean;
}

function TicketSummary({ ticket, isReturn }: TripProps) {
  const departureDate = moment.utc(ticket.stops[0].departure_date);
  const arrivalDate = moment.utc(ticket.stops[0].arrival_time);
  const isNextDay = !departureDate.isSame(arrivalDate, "day");

  return (
    <div className="w-full rounded-xl p-4 bg-white shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">
            {departureDate.format("ddd, D MMM")}
            {isNextDay && ` → ${arrivalDate.format("ddd, D MMM")}`}
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {ticket.operatorInfo.name}
          </div>
        </div>

        <div className="relative ml-1">
          <div className="absolute left-[5px] top-[20px] h-[calc(100%-40px)] w-[1px] border-l border-dashed border-gray-300" />

          <div className="flex items-center gap-4 mb-6">
            <Circle className="h-2.5 w-2.5 fill-black stroke-black" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="capitalize">{ticket.stops[0].from.name}</span>
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <span className="font-medium">
                {departureDate.format("HH:mm")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Circle className="h-2.5 w-2.5 fill-black stroke-black" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="capitalize">{ticket.stops[0].to.name}</span>
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <span className="font-medium">{arrivalDate.format("HH:mm")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const OrderSummary = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [useBalance, setUseBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const { useDeposit, depositAmount } = useDepositStore();
  const childrenAmount = useSearchStore((state) => state.passengers.children);
  const { outboundTicket, returnTicket, selectedFlex, passengers } =
    useCheckoutStore();

  useEffect(() => {
    const handleUseBalanceChange = (event: CustomEvent) => {
      setUseBalance(event.detail.useBalance);
      setBalanceAmount(event.detail.balanceAmount);
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
    return selectedFlex === "premium" ? 4 : selectedFlex === "basic" ? 2 : 0;
  }, [selectedFlex]);

  const calculateTicketTotal = (ticket: Ticket) => {
    const adultPrice = ticket.stops[0].other_prices.our_price;
    const childPrice = ticket.stops[0].other_prices.our_children_price;
    const adultCount = passengers.filter((p) => p.age > 10).length;
    const childCount = passengers.filter((p) => p.age <= 10).length;
    return {
      adultTotal: adultPrice * adultCount,
      childTotal: childPrice * childCount,
      adultCount,
      childCount,
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

  const totalPrice = useMemo(() => {
    const outboundTotal = outboundDetails
      ? outboundDetails.adultTotal + outboundDetails.childTotal
      : 0;
    const returnTotal = returnDetails
      ? returnDetails.adultTotal + returnDetails.childTotal
      : 0;
    return outboundTotal + returnTotal + flexPrice;
  }, [outboundDetails, returnDetails, flexPrice]);

  const finalPrice = useMemo(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(balanceAmount / 100, totalPrice);
      return Math.max(totalPrice - appliedBalanceAmount, 0);
    }
    return totalPrice;
  }, [useBalance, balanceAmount, totalPrice]);

  useEffect(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(balanceAmount / 100, totalPrice);
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
          <TicketSummary ticket={outboundTicket} isReturn={false} />
        )}
        {returnTicket && (
          <TicketSummary ticket={returnTicket} isReturn={true} />
        )}
      </div>
      <div
        className={cn("bg-white rounded-xl p-4 shadow-md space-y-3", className)}
      >
        {/* <h1 className="font-medium text-lg">
          {t("orderSummary.bookingPrice")}
        </h1> */}
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
                className={`${childrenAmount < 1 && "hidden"}`}
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
                className={`${childrenAmount < 1 && "hidden"}`}
                amount={returnDetails.childPrice}
                quantity={returnDetails.childCount}
              />
            </>
          )}
          {selectedFlex && selectedFlex !== "no_flex" && (
            <PriceSummaryItem
              label={
                selectedFlex === "premium"
                  ? t("orderSummary.premiumFlex")
                  : t("orderSummary.basicFlex")
              }
              amount={flexPrice}
            />
          )}
          <hr className="w-full h-[1px] bg-neutral-500 my-2" />
          {useDeposit && (
            <>
              <PriceSummaryItem
                label={t("orderSummary.subtotal")}
                amount={finalPrice}
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
