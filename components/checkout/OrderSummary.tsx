"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, InfoIcon, TimerIcon } from "lucide-react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { cn } from "@/lib/utils";
import {
  getPassengersFromStorage,
  PassengerData,
} from "../hooks/use-passengers";
import InfoBlock from "../InfoBlock";
import { useDepositStore } from "@/store";

interface PriceSummaryItemProps {
  label: string;
  amount: number;
  className?: string;
}

const PriceSummaryItem: React.FC<PriceSummaryItemProps> = ({
  label,
  amount,
  className,
}) => (
  <div className={cn("flex items-center justify-between text-sm", className)}>
    <p className="text-black">{label}</p>
    <p className="text-black">{amount.toFixed(2)}€</p>
  </div>
);

const OrderSummary = ({ selectedTicket }: { selectedTicket: Ticket }) => {
  const [selectedFlex, setSelectedFlex] = useState<string | null>(null);
  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  const [useBalance, setUseBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const { useDeposit, depositAmount } =
  useDepositStore();

  console.log({ depositAmount, useDeposit });

  useEffect(() => {
    const updateSelectedFlex = () => {
      const storedFlex = localStorage.getItem("flex_options");
      if (storedFlex) {
        setSelectedFlex(storedFlex);
      }
    };

    const storedPassengers = getPassengersFromStorage();
    setPassengers(storedPassengers);
    updateSelectedFlex();

    window.addEventListener("flexOptionChanged", updateSelectedFlex);

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
      window.removeEventListener("flexOptionChanged", updateSelectedFlex);
    };
  }, []);

  const flexPrice = useMemo(() => {
    return selectedFlex === "premium" ? 4 : selectedFlex === "basic" ? 2 : 0;
  }, [selectedFlex]);

  const adultPrice = selectedTicket?.stops[0].other_prices.our_price;
  const childPrice = selectedTicket?.stops[0].other_prices.our_children_price;

  const adultCount = passengers.filter((p) => p.age > 10).length;
  const childCount = passengers.filter((p) => p.age <= 10).length;

  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const passengerTotal = adultTotal + childTotal;

  const totalPrice = useMemo(() => {
    return passengerTotal + flexPrice;
  }, [passengerTotal, flexPrice]);

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

  console.log({ totalPrice, remainingAmount });

  return (
    <>
      <div className="bg-white rounded-xl p-4 block border border-gray-300">
        <h1 className="font-medium text-lg">Booking details</h1>
        <div className="flex flex-col">
          <div className="flex items-center mt-2 gap-8">
            <div className="flex items-center gap-2 justify-between w-full">
              <p className="text-black capitalize">
                {selectedTicket?.stops[0]?.from?.city}
              </p>
              <hr className="h-[0.5px] w-full bg-gray-800" />
              <p className="text-black capitalize">
                {selectedTicket?.stops[0]?.to?.city}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <Calendar color="gray" size={20} />
              <p className="text-black text-sm">Departure: </p>
              <p className="font-medium text-black text-sm">
                {moment
                  .utc(selectedTicket?.stops[0]?.departure_date)
                  .format("dddd, DD-MM-YYYY / HH:mm")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TimerIcon color="gray" size={20} />
              <p className="text-black text-sm">Duration</p>
              <p className="font-medium text-black text-sm">5h 30m</p>
            </div>
          </div>
          <InfoBlock
            desc="This trip will be operated by"
            title={selectedTicket?.metadata?.operator_company_name}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 border border-gray-300 space-y-3">
        <h1 className="font-medium text-lg">Booking price</h1>
        <div className="flex flex-col gap-1">
          {adultCount > 0 && (
            <PriceSummaryItem
              label={`${adultPrice.toFixed(2)}€ x ${adultCount} adult${
                adultCount > 1 ? "s" : ""
              }`}
              amount={adultTotal}
            />
          )}
          {childCount > 0 && (
            <PriceSummaryItem
              label={`${childPrice.toFixed(2)}€ x ${childCount} child${
                childCount > 1 ? "ren" : ""
              }`}
              amount={childTotal}
            />
          )}
          {selectedFlex && selectedFlex !== "no_flex" && (
            <PriceSummaryItem
              label={selectedFlex === "premium" ? "Premium Flex" : "Basic Flex"}
              amount={flexPrice}
            />
          )}
          <hr className="w-full h-[1px] bg-neutral-500 my-2" />
          {useDeposit && (
            <>
              <PriceSummaryItem
                label="Subtotal"
                amount={finalPrice}
                className="font-medium"
              />
              <PriceSummaryItem
                label="Amount used from deposit"
                amount={-depositAmount || 0}
                className="text-green-600"
              />
            </>
          )}
          <PriceSummaryItem
            label="Total"
            amount={remainingAmount}
            className="font-medium text-lg"
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
