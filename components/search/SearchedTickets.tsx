"use client";

import { handleSearchAvailableTickets } from "@/actions/ticket";
import { Ticket } from "@/models/ticket";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TicketBlock from "./Ticket";
import TicketSkeleton from "../ticket/ticket-skeleton";
import TicketDetails from "../ticket/ticket-details";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

const createUniqueOperators = (tickets: Ticket[]) => {
  const operatorsMap = new Map();

  tickets.forEach(({ metadata }) => {
    const { operator_company_name, operator_name } = metadata;
    const key = `${operator_company_name}-${operator_name}`;

    if (!operatorsMap.has(key)) {
      operatorsMap.set(key, {
        company_name: operator_company_name,
        name: operator_name,
      });
    }
  });

  return Array.from(operatorsMap.values());
};

export default function SearchedTickets() {
  const searchParams = useSearchParams();
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();

  const { departureStation, arrivalStation, departureDate, adults, children } =
    {
      departureStation: searchParams.get("departureStation"),
      arrivalStation: searchParams.get("arrivalStation"),
      departureDate: searchParams.get("departureDate"),
      adults: searchParams.get("adult"),
      children: searchParams.get("children"),
    };

  const {
    data: availableTickets = [],
    isLoading,
    isError,
  } = useQuery<Ticket[]>({
    queryKey: [
      "searched-tickets",
      departureStation,
      arrivalStation,
      departureDate,
      adults,
      children,
    ],
    queryFn: async () => {
      if (!departureStation || !arrivalStation) return [];

      const tickets = await handleSearchAvailableTickets(
        departureStation,
        arrivalStation,
        departureDate,
        adults,
        children
      );

      const uniqueOperators = createUniqueOperators(tickets);
      console.log({ uniqueOperators });

      return tickets;
    },
    enabled: !!departureStation && !!arrivalStation,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <TicketSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-center">
        An error occurred while loading tickets.
      </p>
    );
  }

  return (
    <>
      {availableTickets.length > 0 ? (
        availableTickets.map((ticket) => (
          <Sheet>
            <SheetTrigger className="w-full">
              <div
                onClick={() => setSelectedTicket(ticket)}
                className="cursor-pointer"
              >
                <TicketBlock
                  key={ticket._id}
                  ticket={ticket}
                  adults={adults}
                  children={children}
                />
              </div>
            </SheetTrigger>
            <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-between">
              <div>
                <SheetHeader className="border-b p-4 shadow-sm">
                  <SheetTitle className="font-medium">
                    Ticket Details
                  </SheetTitle>
                </SheetHeader>
                <TicketDetails ticket={selectedTicket!} />
              </div>
              <SheetFooter className="p-4">
                <Button className="w-full">Continue</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))
      ) : (
        <p className="text-center text-gray-700">No routes for your request</p>
      )}
    </>
  );
}
