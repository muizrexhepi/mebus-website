"use client";

import { useSearchParams } from "next/navigation";
import { handleSearchAvailableTickets } from "@/actions/ticket";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Ticket } from "@/models/ticket";
import { Symbols } from "@/symbols";


const SearchPage = () => {
  const searchParams = useSearchParams();

  const departureStation = searchParams.get('departureStation');
  const arrivalStation = searchParams.get('arrivalStation');
  const departureDate = searchParams.get('departureDate');
  const adult = searchParams.get('adult');
  const children = searchParams.get('children');

  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([]);
  const [uniqueOperators, setUniqueOperators] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean[]>([]);

  useEffect(() => {
    if (departureStation && arrivalStation) {

      handleSearchAvailableTickets(departureStation, arrivalStation, departureDate, adult, children).then((tickets) => {
        console.log({ tickets });
        setAvailableTickets(tickets);

        const operatorsMap = new Map();

        if(tickets.length < 1) return { message: "No tickets found" };
        tickets?.forEach((ticket: Ticket) => {
          const { operator_company_name, operator_name } = ticket.metadata;

          const key = `${operator_company_name}-${operator_name}`;

          if (!operatorsMap.has(key)) {
            operatorsMap.set(key, {
              company_name: operator_company_name,
              name: operator_name
            });
          }
        })

        const unique = Array.from(operatorsMap.values());
        setUniqueOperators(unique);
        console.log({ unique });
      });
    }
  }, [departureStation, arrivalStation]);


  return (
    <div className="min-h-screen flex flex-col p-8 bg-gray-300">
      <div className="flex flex-row space-x-4">
        <div className="w-1/4 bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Operators</h3>
            <div className="space-y-2">
              {
                uniqueOperators.length > 0 && uniqueOperators.map((operator: any) => (
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span>{operator?.name}</span>
                  </label>
                ))
              }
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Bus Type</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span>Type A</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span>Type B</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span>Type C</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                className="w-full"
                id="priceRange"
              />
              <span id="priceRangeValue" className="text-gray-700">0 - 1000</span>
            </div>
          </div>
        </div>

        <div className="w-3/4 bg-white p-6 rounded shadow-lg">
          {availableTickets?.length > 0 ? (
            <div>
              {availableTickets?.map((ticket: Ticket) => (
                <div key={ticket?._id} className="border-b border-gray-200 py-4">
                  <h2 className="text-xl font-semibold">Operated by {ticket?.metadata?.operator_name}</h2>
                  <p className="text-gray-700">
                    {ticket?.destination?.from} to {ticket?.destination?.to}
                  </p>
                  <p className="text-gray-600">
                    Departure: {moment.utc(ticket?.stops[0]?.departure_date).format("dddd, DD-MM-YYYYY")} at {ticket?.time}
                  </p>
                  <p className="text-gray-600">Seats left: {ticket?.number_of_tickets}</p>
                  <p className="text-gray-600">The bus has  {ticket?.metadata?.features?.map((feature: string) => feature + ", ")}</p>
                  <p className="text-gray-600">Price  {ticket?.stops[0].price.toFixed(2)} {Symbols.EURO}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700">No routes for your request</p>
          )}
        </div>
      </div>
    </div>


  );
};

export default SearchPage;
