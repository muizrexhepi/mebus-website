"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import { Search, MapPin, Bus, Calendar, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "@/models/route";
import { Station } from "@/models/station";
import useSearchStore from "@/store";
import Cookies from "js-cookie";
import { getStations } from "@/actions/station";
import { SearchForm } from "@/components/forms/SearchForm";

const MapComponent = dynamic(() => import("./RoutesMap"), { ssr: false });

interface BusRoutesClientProps {
  initialRoutes: Route[];
}

export default function BusRoutesClient({
  initialRoutes,
}: BusRoutesClientProps) {
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(initialRoutes);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);

  const { setFromCity, setFrom, setToCity, setTo, setDepartureDate } =
    useSearchStore();
  const router = useRouter();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleBook = (route: Route, e: React.MouseEvent) => {
    e.stopPropagation();
    const { from, to } = route.destination;
    const fromValue = route.stations.from._id;
    const toValue = route.stations.to._id;

    setFromCity(from);
    setFrom(fromValue!);
    setToCity(to);
    setTo(toValue!);
    setDepartureDate(format(addDays(new Date(), 1), "dd-MM-yyyy"));

    const searchParams = new URLSearchParams({
      departureStation: route.stations.from._id!,
      arrivalStation: route.stations.to._id!,
      departureDate: format(new Date(), "dd-MM-yyyy"),
      adult: "1",
      children: "0",
    });

    router.push(
      `/search/${from.toLowerCase()}-${to.toLowerCase()}?${searchParams.toString()}`
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg py-6 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-6xl mx-auto w-full paddingX">
          <SearchForm />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between max-w-6xl mx-auto paddingX w-full">
        <div className="flex flex-row w-full overflow-x-auto items-start gap-4 lg:flex-col max-h-[calc(100vh-220px)] overflow-y-auto lg:w-1/3">
          {filteredRoutes.map((route) => (
            <Card
              key={route._id}
              className={`cursor-pointer transition-all duration-200 max-w-60 lg:max-w-none w-full hover:shadow-md ${
                selectedRoute?._id === route._id
                  ? "border-primary border-2"
                  : ""
              }`}
              onClick={() => setSelectedRoute(route)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg truncate">
                      {route.destination.from} to {route.destination.to}
                    </h3>
                    <Bus className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Available seats: 6
                  </div>
                  <Button
                    variant={"primary"}
                    size="sm"
                    className="mt-2"
                    onClick={(e) => handleBook(route, e)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <section className="w-full lg:w-2/3 z-10">
          <MapComponent
            selectedRoute={selectedRoute}
            fromStation={fromStation}
            toStation={toStation}
          />
        </section>
      </div>
    </div>
  );
}
