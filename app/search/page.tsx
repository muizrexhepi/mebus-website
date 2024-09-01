"use client";
import { getStationsByOperatorId } from "@/actions/station";
import { handleSearchAvailableTickets } from "@/actions/ticket";
import Navbar from "@/components/Navbar";
import FilterBlock from "@/components/search/FilterBlock";
import SearchBlock from "@/components/SearchBlock";
import { Ticket } from "@/models/ticket";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TicketBlock from "@/components/search/Ticket";
import { Loader2 } from "lucide-react";
const operator_id = "66cba19d1a6e55b32932c59b";

const SearchPage = () => {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    const getStations = async () => {
      const stations = await getStationsByOperatorId(operator_id);
      setStations(stations);
    };
    getStations();
  }, []);

  console.log({ stations });
  const sortOptions = [
    { value: "price", label: "Price" },
    { value: "duration", label: "Duration" },
    { value: "departure", label: "Departure" },
  ];

  const searchParams = useSearchParams();

  const departureStation = searchParams.get("departureStation");
  const arrivalStation = searchParams.get("arrivalStation");
  const departureDate = searchParams.get("departureDate");
  const adult = searchParams.get("adult");
  const children = searchParams.get("children");

  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([]);
  const [uniqueOperators, setUniqueOperators] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (departureStation && arrivalStation) {
      handleSearchAvailableTickets(
        departureStation,
        arrivalStation,
        departureDate,
        adult,
        children
      ).then((tickets) => {
        console.log({ tickets });
        setAvailableTickets(tickets);

        const operatorsMap = new Map();

        if (tickets.length < 1) return { message: "No tickets found" };
        tickets?.forEach((ticket: Ticket) => {
          const { operator_company_name, operator_name } = ticket.metadata;

          const key = `${operator_company_name}-${operator_name}`;

          if (!operatorsMap.has(key)) {
            operatorsMap.set(key, {
              company_name: operator_company_name,
              name: operator_name,
            });
          }
        });

        setLoading(false);
        const unique = Array.from(operatorsMap.values());
        setUniqueOperators(unique);
        console.log({ unique });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#efefef]">
      <div className="w-full flex justify-center items-center bg-neutral-900 px-20 py-4">
        <Navbar />
      </div>
      <div className="min-h-screen px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-4">
        <SearchBlock stations={stations} />
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          <div className="w-full lg:w-[25%]">
            <FilterBlock title="Sort by" data={sortOptions} />
          </div>
          <div className="w-full lg:w-[75%] space-y-4">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : availableTickets.length > 0 ? (
              availableTickets.map((ticket) => (
                <TicketBlock key={ticket._id} ticket={ticket} />
              ))
            ) : (
              <p className="text-center text-gray-700">
                No routes for your request
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
