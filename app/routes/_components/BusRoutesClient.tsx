"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Route } from "@/models/route";
import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { getStations } from "@/actions/station";
import { SearchForm } from "@/components/forms/SearchForm";

// ✅ Add a unique key to force proper remounting
const MapComponent = dynamic(() => import("./RoutesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

interface BusRoutesClientProps {
  initialRoutes: Route[];
}

export default function BusRoutesClient({
  initialRoutes,
}: BusRoutesClientProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  // ✅ Add mounted state
  const [isMounted, setIsMounted] = useState(false);

  const { setFromCity, setFrom, setToCity, setTo, from, to } = useSearchStore();

  // ✅ Track if component is mounted
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

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

  // Sync map markers with search form selections
  useEffect(() => {
    if (stations.length > 0) {
      if (from) {
        const foundFromStation = stations.find((s) => s._id === from);
        if (foundFromStation) {
          setFromStation(foundFromStation);
        }
      } else {
        setFromStation(null);
      }

      if (to) {
        const foundToStation = stations.find((s) => s._id === to);
        if (foundToStation) {
          setToStation(foundToStation);
        }
      } else {
        setToStation(null);
      }
    }
  }, [from, to, stations]);

  const handleStationSelect = (station: Station, type: "from" | "to") => {
    if (type === "from") {
      setFromStation(station);
      setFromCity(station.city);
      setFrom(station._id!);
    } else {
      setToStation(station);
      setToCity(station.city);
      setTo(station._id!);
    }
  };

  // ✅ Don't render map until everything is ready
  if (!isMounted || loading) {
    return (
      <div className="flex flex-col h-screen w-screen">
        <div className="z-[1001] bg-white shadow-md py-4">
          <div className="max-w-6xl mx-auto w-full paddingX">
            <SearchForm />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="z-[1001] bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto w-full paddingX">
          <SearchForm />
        </div>
      </div>
      <div className="w-full h-full">
        {/* ✅ Add key to force proper mounting */}
        <MapComponent
          key="routes-map"
          stations={stations}
          routes={initialRoutes}
          fromStation={fromStation}
          toStation={toStation}
          onStationSelect={handleStationSelect}
        />
      </div>
    </div>
  );
}
