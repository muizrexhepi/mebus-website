"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Bus, Calendar, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { environment } from "@/environment";
import { Route } from "@/models/route";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import useSearchStore from "@/store";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Coordinates {
  lat: number;
  lng: number;
}

const ChangeView = ({
  center,
  zoom,
}: {
  center: Coordinates;
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export default function BusRoutes() {
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const { setFromCity, setFrom, setToCity, setTo } = useSearchStore();
  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 39.8283,
    lng: -98.5795,
  });
  const [mapZoom, setMapZoom] = useState<number>(4);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get(`${environment.apiurl}/route/map-display`);
        const fetchedRoutes: Route[] = res.data.data || [];
        setRoutes(fetchedRoutes);
        setFilteredRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Failed to fetch routes", error);
      }
    };

    fetchRoutes();
  }, []);

  const router = useRouter();

  const handleBook = (route: Route, e: React.MouseEvent) => {
    e.stopPropagation();
    const fromLabel = route.destination.from;
    const toLabel = route.destination.to;
    const fromValue = route.stations.from._id;
    const toValue = route.stations.to._id;

    if (typeof window !== "undefined") {
      setFromCity(fromLabel);
      setFrom(fromValue!);
      localStorage.setItem("fromCity", fromLabel);
      localStorage.setItem("fromValue", fromValue!);
      setToCity(toLabel);
      setTo(toValue!);
      localStorage.setItem("toCity", toLabel);
      localStorage.setItem("toValue", toValue!);
    }
    try {
      const searchParams = new URLSearchParams({
        departureStation: route.stations.from._id!,
        arrivalStation: route.stations.to._id!,
        departureDate: format(new Date(), "dd-MM-yyyy") || "",
        adult: "1",
        children: "0",
      });

      router.push(
        `/search/${route.destination.from.toLowerCase()}-${route.destination.to.toLowerCase()}?${searchParams.toString()}`
      );
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSearch = () => {
    const filtered = routes.filter(
      (route) =>
        route.destination.from
          .toLowerCase()
          .includes(searchFrom.toLowerCase()) &&
        route.destination.to.toLowerCase().includes(searchTo.toLowerCase())
    );
    setFilteredRoutes(filtered);
    if (filtered.length > 0) {
      setSelectedRoute(filtered[0]);
      handleRouteSelect(filtered[0]);
    }
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    const center = {
      lat:
        (route.stations.from.location.lat + route.stations.to.location.lat) / 2,
      lng:
        (route.stations.from.location.lng + route.stations.to.location.lng) / 2,
    };
    setMapCenter(center);
    setMapZoom(4);
    setIsMapVisible(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-primary text-white w-full py-4">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          Explore Bus Routes
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Search Routes</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="From"
                      value={searchFrom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchFrom(e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="To"
                      value={searchTo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchTo(e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleSearch} className="w-full">
                    <Search className="mr-2 h-4 w-4" /> Search Routes
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
              {filteredRoutes.map((route) => (
                <Card
                  key={route._id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedRoute?._id === route._id
                      ? "border-primary border-2"
                      : ""
                  }`}
                  onClick={() => handleRouteSelect(route)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg truncate">
                          {route.destination.from} to {route.destination.to}
                        </h3>
                        <Bus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Available seats: {Math.floor(Math.random() * 30) + 1}
                      </div>
                      <Button
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
          </div>
          <div className="w-full lg:w-2/3">
            <Card className="h-[calc(100vh-200px)] shadow-lg overflow-hidden">
              <CardContent className="p-0 h-full relative">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: "100%", width: "100%" }}
                >
                  <ChangeView center={mapCenter} zoom={mapZoom} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {selectedRoute && (
                    <>
                      <Marker
                        position={[
                          selectedRoute.stations.from.location.lat as number,
                          selectedRoute.stations.from.location.lng as number,
                        ]}
                      >
                        <Popup>{selectedRoute.destination.from}</Popup>
                      </Marker>
                      <Marker
                        position={[
                          selectedRoute.stations.to.location.lat as number,
                          selectedRoute.stations.to.location.lng as number,
                        ]}
                      >
                        <Popup>{selectedRoute.destination.to}</Popup>
                      </Marker>
                      <Polyline
                        positions={[
                          [
                            selectedRoute.stations.from.location.lat,
                            selectedRoute.stations.from.location.lng,
                          ],
                          [
                            selectedRoute.stations.to.location.lat,
                            selectedRoute.stations.to.location.lng,
                          ],
                        ]}
                        color="blue"
                        weight={4}
                      />
                    </>
                  )}
                </MapContainer>
                {selectedRoute && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md">
                    <h3 className="font-semibold text-lg mb-2">
                      {selectedRoute.destination.from}{" "}
                      <ArrowRight className="inline h-4 w-4" />{" "}
                      {selectedRoute.destination.to}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Distance: {Math.floor(Math.random() * 500) + 100} km
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <SecondaryFooter className="paddingX max-w-none" />
    </div>
  );
}
