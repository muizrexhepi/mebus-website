"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Locate, MapPin, Tag } from "lucide-react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import useSearchStore, { useDepositStore, useCheckoutStore } from "@/store";
import { useCurrency } from "@/components/providers/currency-provider";

interface PriceSummaryItemProps {
  label: string;
  amount: number;
  quantity?: number;
  className?: string;
  currencySymbol: string;
}

const PriceSummaryItem: React.FC<PriceSummaryItemProps> = ({
  label,
  amount,
  quantity,
  className,
  currencySymbol,
}) => (
  <div className={cn("flex items-center justify-between text-sm", className)}>
    <p className="text-black">{quantity ? `${quantity} x ${label}` : label}</p>
    <p className="text-black">
      {currencySymbol}
      {amount.toFixed(2)}
    </p>
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">
          {departureDate.format("ddd, D MMM")}
          {isNextDay && ` → ${arrivalDate.format("ddd, D MMM")}`}
        </div>
        <div className="px-3 py-1 bg-secondary-bg/20 font-medium rounded-full text-sm text-black">
          {ticket.operatorInfo.name}
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Locate size={20} className="text-gray-600" />
              <div className="flex flex-col">
                <span className="capitalize">{ticket.stops[0].from.city}</span>
                <span className="text-primary-bg/60 text-sm font-medium">
                  {ticket.stops[0].from.name}
                </span>
              </div>
            </div>
            <span className="font-medium">{departureDate.format("HH:mm")}</span>
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

const OrderSummary = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [useBalance, setUseBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { useDeposit, depositAmount } = useDepositStore();
  const { passengers: passengerAmount } = useSearchStore();
  const { outboundTicket, returnTicket, selectedFlex, passengers } =
    useCheckoutStore();
  const { currency, convertFromEUR } = useCurrency();

  // Check for discount code in localStorage on component mount
  useEffect(() => {
    const storedCode = localStorage.getItem("discountCode");
    const expiration = localStorage.getItem("discountExpiration");
    const percentage = localStorage.getItem("discountPercentage");

    if (storedCode && expiration && new Date() < new Date(expiration || "")) {
      setDiscountCode(storedCode);
      setDiscountPercentage(Number(percentage) || 5);
    }
  }, []);

  useEffect(() => {
    const handleUseBalanceChange = (event: CustomEvent) => {
      setUseBalance(event.detail.useBalance);
      setBalanceAmount(event.detail.balanceAmount);
      setRemainingAmount(convertFromEUR(event.detail.remainingAmount));
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
  }, [convertFromEUR]);

  const flexPrice = useMemo(() => {
    return convertFromEUR(
      selectedFlex === "premium" ? 4 : selectedFlex === "basic" ? 2 : 0
    );
  }, [selectedFlex, convertFromEUR]);

  const calculateTicketTotal = (ticket: Ticket) => {
    const adultPrice = convertFromEUR(ticket.stops[0].other_prices.our_price);
    const childPrice = convertFromEUR(
      ticket.stops[0].other_prices.our_children_price
    );

    return {
      adultTotal: adultPrice * passengerAmount.adults || 1,
      childTotal: childPrice * passengerAmount.children || 0,
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

  // Calculate discount amount if discount code exists
  useEffect(() => {
    if (discountCode && discountPercentage > 0) {
      const calculatedDiscount = (subtotalPrice * discountPercentage) / 100;
      setDiscountAmount(calculatedDiscount);
    } else {
      setDiscountAmount(0);
    }
  }, [discountCode, discountPercentage, subtotalPrice]);

  const totalPrice = useMemo(() => {
    return Math.max(subtotalPrice - discountAmount, 0);
  }, [subtotalPrice, discountAmount]);

  const finalPrice = useMemo(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(
        convertFromEUR(balanceAmount / 100),
        totalPrice
      );
      return Math.max(totalPrice - appliedBalanceAmount, 0);
    }
    return totalPrice;
  }, [useBalance, balanceAmount, totalPrice, convertFromEUR]);

  useEffect(() => {
    if (useBalance) {
      const appliedBalanceAmount = Math.min(
        convertFromEUR(balanceAmount / 100),
        totalPrice
      );
      setRemainingAmount(Math.max(totalPrice - appliedBalanceAmount, 0));
    } else {
      setRemainingAmount(totalPrice - (convertFromEUR(depositAmount) || 0));
    }
  }, [useBalance, balanceAmount, totalPrice, depositAmount, convertFromEUR]);

  const removeDiscountCode = () => {
    localStorage.removeItem("discountCode");
    localStorage.removeItem("discountExpiration");
    localStorage.removeItem("discountPercentage");
    setDiscountCode(null);
    setDiscountPercentage(0);
    setDiscountAmount(0);
  };

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-medium text-2xl">
          {t("orderSummary.bookingDetails")}
        </h1>
        {outboundTicket && (
          <div className="w-full rounded-lg p-4 bg-white border border-gray-200">
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
      <div
        className={cn(
          "bg-white rounded-lg p-4 border border-gray-200 space-y-3",
          className
        )}
      >
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
                currencySymbol={currency.symbol}
              />
              <PriceSummaryItem
                label={t("orderSummary.children")}
                className={`${passengerAmount.children < 1 && "hidden"}`}
                amount={outboundDetails.childPrice}
                quantity={outboundDetails.childCount}
                currencySymbol={currency.symbol}
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
                currencySymbol={currency.symbol}
              />
              <PriceSummaryItem
                label={t("orderSummary.children")}
                className={`${passengerAmount.children < 1 && "hidden"}`}
                amount={returnDetails.childPrice}
                quantity={returnDetails.childCount}
                currencySymbol={currency.symbol}
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
              currencySymbol={currency.symbol}
            />
          )}
          <hr className="w-full h-[1px] bg-neutral-500 my-2" />

          {/* Discount Code Section */}
          {discountCode && (
            <>
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-green-600" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {t("orderSummary.discountApplied", "Discount applied")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {discountCode}
                    </span>
                  </div>
                </div>
                <button
                  onClick={removeDiscountCode}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  {t("orderSummary.remove", "Remove")}
                </button>
              </div>
              <PriceSummaryItem
                label={t("orderSummary.subtotal")}
                amount={subtotalPrice}
                className="font-medium"
                currencySymbol={currency.symbol}
              />
              <PriceSummaryItem
                label={`${t(
                  "orderSummary.discount",
                  "Discount"
                )} (${discountPercentage}%)`}
                amount={-discountAmount}
                className="text-green-600"
                currencySymbol={currency.symbol}
              />
            </>
          )}

          {useDeposit && (
            <>
              <PriceSummaryItem
                label={t("orderSummary.subtotal")}
                amount={finalPrice}
                className="font-medium"
                currencySymbol={currency.symbol}
              />
              <PriceSummaryItem
                label={t("orderSummary.amountUsedFromDeposit")}
                amount={-convertFromEUR(depositAmount) || 0}
                className="text-green-600"
                currencySymbol={currency.symbol}
              />
            </>
          )}
          <PriceSummaryItem
            label={t("orderSummary.total")}
            amount={remainingAmount}
            className="font-medium text-lg"
            currencySymbol={currency.symbol}
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
