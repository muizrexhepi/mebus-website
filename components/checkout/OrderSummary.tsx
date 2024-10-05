import React, { useEffect, useMemo, useState } from "react";
import { Calendar, InfoIcon, TimerIcon } from "lucide-react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { cn } from "@/lib/utils";

import InfoBlock from "../InfoBlock";
import { useDepositStore, useCheckoutStore } from "@/store";

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

const TicketSummary = ({
  ticket,
  isReturn,
}: {
  ticket: Ticket;
  isReturn: boolean;
}) => (
  <div className="flex flex-col">
    <h2 className="font-medium text-base mt-2">
      {isReturn ? "Return Trip" : "Outbound Trip"}
    </h2>
    <div className="flex items-center mt-2 gap-8">
      <div className="flex items-center gap-2 justify-between w-full">
        <p className="text-black capitalize">
          {isReturn ? ticket.stops[0].to.city : ticket.stops[0].from.city}
        </p>
        <hr className="h-[0.5px] w-full bg-gray-800" />
        <p className="text-black capitalize">
          {isReturn ? ticket.stops[0].from.city : ticket.stops[0].to.city}
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <Calendar color="gray" size={20} />
        <p className="text-black text-sm">Departure: </p>
        <p className="font-medium text-black text-sm">
          {moment
            .utc(ticket.stops[0].departure_date)
            .format("dddd, DD-MM-YYYY / HH:mm")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <TimerIcon color="gray" size={20} />
        <p className="text-black text-sm">Duration</p>
        <p className="font-medium text-black text-sm">
          {moment
            .duration(
              moment(ticket.stops[0].arrival_time).diff(
                moment(ticket.stops[0].departure_date)
              )
            )
            .asHours()
            .toFixed(2)}{" "}
          hrs
        </p>
      </div>
    </div>
    <InfoBlock
      desc="This trip will be operated by"
      title={ticket.metadata.operator_company_name}
    />
  </div>
);

const OrderSummary = ({ className }: { className?: string }) => {
  const [useBalance, setUseBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const { useDeposit, depositAmount } = useDepositStore();
  const {
    outboundTicket,
    returnTicket,
    selectedFlex,
    setSelectedFlex,
    passengers,
    setPassengers,
  } = useCheckoutStore();

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
    return adultPrice * adultCount + childPrice * childCount;
  };

  const outboundTotal = outboundTicket
    ? calculateTicketTotal(outboundTicket)
    : 0;
  const returnTotal = returnTicket ? calculateTicketTotal(returnTicket) : 0;

  const totalPrice = useMemo(() => {
    return outboundTotal + returnTotal + flexPrice;
  }, [outboundTotal, returnTotal, flexPrice]);

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
      <div className="bg-white rounded-xl p-4 block shadow-md">
        <h1 className="font-medium text-lg">Booking details</h1>
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
        <h1 className="font-medium text-lg">Booking price</h1>
        <div className="flex flex-col gap-1">
          <PriceSummaryItem label="Outbound Trip" amount={outboundTotal} />
          {returnTicket && (
            <PriceSummaryItem label="Return Trip" amount={returnTotal} />
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
