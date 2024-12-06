"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search, MapPin, Bus, Calendar, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "@/models/route";
import { Station } from "@/models/station";
import useSearchStore from "@/store";
import Cookies from "js-cookie";
import { getStations } from "@/actions/station";

const MapComponent = dynamic(() => import("./RoutesMap"), { ssr: false });

interface BusRoutesClientProps {
  initialRoutes: Route[];
}

export default function BusRoutesClient({
  initialRoutes,
}: BusRoutesClientProps) {
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(initialRoutes);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  const [openFromOptions, setOpenFromOptions] = useState<boolean>(false);
  const [openToOptions, setOpenToOptions] = useState<boolean>(false);
  const { setFromCity, setFrom, setToCity, setTo, from, fromCity, to, toCity } =
    useSearchStore();
  const router = useRouter();

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

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

  const handleTicketSearch = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: format(new Date(), "dd-MM-yyyy"),
        adult: "1",
        children: "0",
      });

      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`
      );
    } catch (err) {
      console.error("Search error:", err);
    }
  }, [from, to, fromCity, toCity, router]);

  useEffect(() => {
    const loadSavedLocations = (
      cityKey: string,
      valueKey: string,
      setCity: (city: string) => void,
      setValue: (value: string) => void,
      setSearch: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const savedCity = localStorage.getItem(cityKey);
      const savedValue = localStorage.getItem(valueKey);

      if (savedCity && savedValue) {
        setCity(savedCity);
        setValue(savedValue);
        setSearch(savedCity);
      }
    };

    loadSavedLocations(
      "fromCity",
      "fromValue",
      setFromCity,
      setFrom,
      setSearchFrom
    );
    loadSavedLocations("toCity", "toValue", setToCity, setTo, setSearchTo);
  }, [setFromCity, setFrom, setToCity, setTo]);

  const handleFocus = (isFrom: boolean) => {
    if (isFrom) {
      setOpenFromOptions(true);
    } else {
      setOpenToOptions(true);
    }
  };

  const handleBlur = (isFrom: boolean) => {
    setTimeout(() => {
      if (isFrom) {
        setOpenFromOptions(false);
      } else {
        setOpenToOptions(false);
      }
    }, 100);
  };

  const handleStationSelect = (station: Station, isFrom: boolean) => {
    const value = station._id;
    const label = station.city;

    if (isFrom) {
      setSearchFrom(label);
      setFromCity(label);
      setFrom(value!);
      setFromStation(station);
      localStorage.setItem("fromCity", label);
      localStorage.setItem("fromValue", value!);
      setOpenFromOptions(false);
    } else {
      setSearchTo(label);
      setToCity(label);
      setTo(value!);
      setToStation(station);
      localStorage.setItem("toCity", label);
      localStorage.setItem("toValue", value!);
      setOpenToOptions(false);
    }

    updateRecentStations(isFrom ? "recentFromStations" : "recentToStations", {
      _id: value!,
      city: label,
    });
  };

  const updateRecentStations = (
    cookieName: string,
    newStation: { _id: string; city: string }
  ) => {
    const recentStations = JSON.parse(Cookies.get(cookieName) || "[]");
    const updatedRecentStations = [
      newStation,
      ...recentStations.filter(
        (station: { _id: string }) => station._id !== newStation._id
      ),
    ].slice(0, 5);
    Cookies.set(cookieName, JSON.stringify(updatedRecentStations), {
      expires: 7,
    });
  };

  const filteredFromStations = stations.filter((station) =>
    station.city.toLowerCase().includes(searchFrom.toLowerCase())
  );

  const filteredToStations = stations.filter((station) =>
    station.city.toLowerCase().includes(searchTo.toLowerCase())
  );

  const recentFromStations = JSON.parse(
    Cookies.get("recentFromStations") || "[]"
  );
  const recentToStations = JSON.parse(Cookies.get("recentToStations") || "[]");

  const handleBook = (route: Route, e: React.MouseEvent) => {
    e.stopPropagation();
    const { from, to } = route.destination;
    const fromValue = route.stations.from._id;
    const toValue = route.stations.to._id;

    setFromCity(from);
    setFrom(fromValue!);
    setToCity(to);
    setTo(toValue!);

    if (typeof window !== "undefined") {
      localStorage.setItem("fromCity", from);
      localStorage.setItem("fromValue", fromValue!);
      localStorage.setItem("toCity", to);
      localStorage.setItem("toValue", toValue!);
    }

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
      <div className="bg-white rounded-lg p-4 md:py-6 flex flex-col gap-4 w-full min-h-fit sm:p-8 md:px-8">
        <div className="max-w-6xl mx-auto w-full z-[99]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative z-[10]">
              <MapPin className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <Input
                ref={fromInputRef}
                placeholder="From"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleBlur(true)}
                className="pl-10 h-14 capitalize text-base"
              />
              {openFromOptions && (
                <div className="absolute top-14 w-full bg-white z-20 left-0 mt-4 shadow-sm h-fit max-h-80 overflow-y-auto rounded-lg">
                  {recentFromStations.length > 0 && searchFrom === "" && (
                    <>
                      <h3 className="font-semibold mb-2 bg-muted p-2 px-4">
                        Recent Searches
                      </h3>
                      {recentFromStations.map((station: Station) => (
                        <Button
                          key={station._id}
                          variant="ghost"
                          className="w-full justify-start text-left mb-2"
                          onClick={() => handleStationSelect(station, true)}
                          type="button"
                        >
                          <MapPin className="w-5 h-5 text-primary mr-2" />
                          <span className="capitalize">{station.city}</span>
                        </Button>
                      ))}
                      <div className="mb-2 border-t border-gray-200" />
                    </>
                  )}
                  {filteredFromStations.map((station: Station) => (
                    <Button
                      key={station._id}
                      variant="ghost"
                      className="w-full justify-start text-left mb-2"
                      onClick={() => handleStationSelect(station, true)}
                      type="button"
                    >
                      <MapPin className="w-6 h-6 text-primary mr-2" />
                      <span className="capitalize">{station.city}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative z-[10]">
              <MapPin className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <Input
                ref={toInputRef}
                placeholder="To"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                onFocus={() => handleFocus(false)}
                onBlur={() => handleBlur(false)}
                className="pl-10 h-14 capitalize text-base"
              />
              {openToOptions && (
                <div className="absolute top-14 w-full bg-white left-0 mt-4 shadow-sm h-fit max-h-80 overflow-y-auto rounded-lg z-[999]">
                  {recentToStations.length > 0 && searchTo === "" && (
                    <>
                      <h3 className="font-semibold mb-2 bg-muted p-2 px-4">
                        Recent Searches
                      </h3>
                      {recentToStations.map((station: Station) => (
                        <Button
                          key={station._id}
                          variant="ghost"
                          className="w-full justify-start text-left mb-2"
                          onClick={() => handleStationSelect(station, false)}
                          type="button"
                        >
                          <MapPin className="w-5 h-5 text-primary mr-2" />
                          <span className="capitalize">{station.city}</span>
                        </Button>
                      ))}
                      <div className="mb-2 border-t border-gray-200" />
                    </>
                  )}
                  {filteredToStations.map((station: Station) => (
                    <Button
                      key={station._id}
                      variant="ghost"
                      className="w-full justify-start text-left mb-2"
                      onClick={() => handleStationSelect(station, false)}
                      type="button"
                    >
                      <MapPin className="w-6 h-6 text-primary mr-2" />
                      <span className="capitalize">{station.city}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant={"primary"}
              className="h-14 sm:col-span-2 lg:col-span-1 z-[10]"
              type="button"
              onClick={handleTicketSearch}
            >
              Search for tickets
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-start max-w-6xl mx-auto w-full">
        <div className="flex flex-row w-full overflow-x-auto items-start px-4 sm:px-8 lg:px-0 gap-4 lg:flex-col max-h-[calc(100vh-220px)] overflow-y-auto lg:w-1/3 ">
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
        <section className="w-full lg:w-2/3">
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
