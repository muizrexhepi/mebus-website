"use client";

import { handleSearchAvailableTickets } from "@/actions/ticket";
import { Ticket } from "@/models/ticket";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import TicketBlock from "./Ticket";
import TicketSkeleton from "../ticket/ticket-skeleton";

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
          <TicketBlock key={ticket._id} ticket={ticket} />
        ))
      ) : (
        <p className="text-center text-gray-700">No routes for your request</p>
      )}
    </>
  );
}
