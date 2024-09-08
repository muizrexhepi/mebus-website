import React, { useEffect, useState } from "react";
import { Calendar, TimerIcon } from "lucide-react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { cn } from "@/lib/utils";
import {
  getPassengersFromStorage,
  PassengerData,
} from "../hooks/use-passengers";

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

  useEffect(() => {
    // Function to update selectedFlex from localStorage
    const updateSelectedFlex = () => {
      const storedFlex = localStorage.getItem("flex_options");
      if (storedFlex) {
        setSelectedFlex(storedFlex);
      }
    };

    // Load passengers and initial selectedFlex when component mounts
    const storedPassengers = getPassengersFromStorage();
    setPassengers(storedPassengers);
    updateSelectedFlex();

    // Add event listener for changes in localStorage
    window.addEventListener("flexOptionChanged", updateSelectedFlex);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("flexOptionChanged", updateSelectedFlex);
    };
  }, []);

  const flexPrice =
    selectedFlex === "premium" ? 4 : selectedFlex === "basic" ? 2 : 0;

  const adultPrice = selectedTicket?.stops[0].other_prices.our_price;
  const childPrice = selectedTicket?.stops[0].other_prices.our_children_price;

  const adultCount = passengers.filter((p) => p.age > 10).length;
  const childCount = passengers.filter((p) => p.age <= 10).length;

  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const passengerTotal = adultTotal + childTotal;

  const totalPrice = passengerTotal + flexPrice;

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
          <div className="py-2 px-4 bg-neutral-700/10 rounded-lg mt-2 font-light">
            This trip will be operated by{" "}
            <span className="font-medium">
              {selectedTicket?.metadata?.operator_company_name}
            </span>
            .
          </div>
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
          <PriceSummaryItem
            label="Total"
            amount={totalPrice}
            className="font-medium text-lg"
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
