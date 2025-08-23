"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Locate, MapPin, Tag, X, Check, ArrowRight, Clock } from "lucide-react";
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
import { useCurrency } from "@/components/providers/currency-provider";
import { Button } from "@/components/ui/button";
import { ConnectedTicket } from "@/models/connected-ticket";
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
    console.log({ ticket });

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
  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(
    null
  );
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);

  const { useDeposit, depositAmount } = useDepositStore();
  const { passengers: passengerAmount } = useSearchStore();
  const { outboundTicket, returnTicket, selectedFlex, passengers } =
    useCheckoutStore();
  const { currency, convertFromEUR } = useCurrency();

  const validDiscountCodes = {
    SAVE10: 10,
    WELCOME5: 5,
    SUMMER2025: 10,
    STUDENT20: 20,
  };

  const validateDiscountCode = (code: string) => {
    const upperCode = code.trim().toUpperCase();
    return (
      validDiscountCodes[upperCode as keyof typeof validDiscountCodes] || null
    );
  };

  const handleApplyDiscountCode = () => {
    if (!discountCode.trim()) {
      setDiscountError(
        t("orderSummary.enterDiscountCode", "Please enter a discount code")
      );
      return;
    }

    setIsApplyingCode(true);
    setDiscountError(null);

    setTimeout(() => {
      const percentage = validateDiscountCode(discountCode);
      if (percentage) {
        const code = discountCode.trim().toUpperCase();
        setAppliedDiscountCode(code);
        setDiscountPercentage(percentage);
        setDiscountError(null);
        setDiscountCode("");

        localStorage.setItem("discountCode", code);
        localStorage.setItem("discountPercentage", percentage.toString());

        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 30);
        localStorage.setItem("discountExpiration", expiration.toISOString());
      } else {
        setDiscountError(
          t("orderSummary.invalidDiscountCode", "Invalid discount code")
        );
      }
      setIsApplyingCode(false);
    }, 500);
  };

  const handleRemoveDiscountCode = () => {
    setAppliedDiscountCode(null);
    setDiscountPercentage(0);
    setDiscountAmount(0);
    setDiscountError(null);
    setDiscountCode("");
  };

  const handleDiscountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountCode(e.target.value);
    setDiscountError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyDiscountCode();
    }
  };

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

  const calculateTicketTotal = (ticket: Ticket | ConnectedTicket) => {
    const adultPrice = convertFromEUR(getTicketPrice(ticket));
    const childPrice = convertFromEUR(getChildrenPrice(ticket));

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

  useEffect(() => {
    if (appliedDiscountCode && discountPercentage > 0) {
      const calculatedDiscount = (subtotalPrice * discountPercentage) / 100;
      setDiscountAmount(calculatedDiscount);
    } else {
      setDiscountAmount(0);
    }
  }, [appliedDiscountCode, discountPercentage, subtotalPrice]);

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

      {/* <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={18} className="text-gray-600" />
          <h3 className="font-medium text-base">
            {t("discountCodes.title", "Discount Code")}
          </h3>
        </div>

        {!appliedDiscountCode ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={handleDiscountInputChange}
                onKeyPress={handleKeyPress}
                placeholder={t("orderSummary.enterCode", "Enter discount code")}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isApplyingCode}
              />
              <Button
                onClick={handleApplyDiscountCode}
                disabled={isApplyingCode || !discountCode.trim()}
                variant={"primary"}
              >
                {isApplyingCode
                  ? t("orderSummary.applying", "Applying...")
                  : t("affiliateProgramPage.apply", "Apply")}
              </Button>
            </div>
            {discountError && (
              <p className="text-red-600 text-xs">{discountError}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-green-800">
                  {t("orderSummary.discountApplied", "Discount applied")}
                </span>
                <span className="text-xs text-green-600">
                  {appliedDiscountCode} ({discountPercentage}% off)
                </span>
              </div>
            </div>
            <button
              onClick={handleRemoveDiscountCode}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 transition-colors"
            >
              <X size={14} />
              {t("orderSummary.remove", "Remove")}
            </button>
          </div>
        )}
      </div> */}

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

          {/* {appliedDiscountCode && (
            <>
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
          )} */}

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
