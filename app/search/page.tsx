"use client";

import { useSearchParams } from "next/navigation";
import { handleSearchAvailableTickets } from "@/actions/ticket";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const departureStation = searchParams.get('departureStation');
  const arrivalStation = searchParams.get('arrivalStation');
  const departureDate = searchParams.get('departureDate');
  const adult = searchParams.get('adult');
  const children = searchParams.get('children');

  const [availableTickets, setAvailableTickets] = useState<any[]>([]);

  useEffect(() => {
    if (departureStation && arrivalStation) {
      const fromStationId = departureStation;
      const toStationId = arrivalStation;
      handleSearchAvailableTickets(fromStationId, toStationId).then((tickets) => {
        setAvailableTickets(tickets);
      });
    }
  }, [departureStation, arrivalStation]);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {availableTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="border p-4 rounded shadow-lg bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">
                {ticket.metadata.operator_name}
              </h2>
              <p className="text-gray-600">
                {ticket.destination.from} to {ticket.destination.to}
              </p>
              <p className="text-gray-600">
                Departure: {new Date(ticket.departure_date).toLocaleDateString()} at {ticket.time}
              </p>
              <p className="text-gray-600">
                Tickets Available: {ticket.number_of_tickets}
              </p>
              <p className="text-gray-600">
                Type: {ticket.type}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default SearchPage;
