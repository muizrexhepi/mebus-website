"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import useSearchStore from "@/store";

/**
 * This component initializes the search when users land on clean URLs like:
 * /search/skopje-bern (without parameters)
 */
export function SearchInitializer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    setFrom,
    setTo,
    setFromCity,
    setToCity,
    setDepartureDate,
    setPassengers,
  } = useSearchStore();

  const hasInitialized = useRef(false);

  useEffect(() => {
    // 1. Validate params exist
    if (!params?.destination) return;

    // 2. Prevent double-invocation (Strict Mode / React 18+)
    if (hasInitialized.current) return;

    // 3. Check if we already have query params (prevent loops)
    const hasDepartureStation = searchParams.get("departureStation");
    const hasArrivalStation = searchParams.get("arrivalStation");
    const hasDepartureDate = searchParams.get("departureDate");

    if (hasDepartureStation && hasArrivalStation && hasDepartureDate) {
      return;
    }

    // Lock: Mark as initialized immediately
    hasInitialized.current = true;

    const initializeSearch = async () => {
      try {
        // Handle string | string[] safely
        const destinationRaw = params.destination;
        const destination = Array.isArray(destinationRaw)
          ? destinationRaw[0]
          : destinationRaw;

        if (!destination) return;

        const [fromCitySlug, toCitySlug] = destination.split("-");

        // Helper: Capitalize city names (skopje -> Skopje)
        const formatCityName = (slug: string) => {
          if (!slug) return "";
          return slug
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" ");
        };

        const fromCity = formatCityName(fromCitySlug);
        const toCity = formatCityName(toCitySlug);

        // Fetch station data
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "https://www.gobusly.com";
        const stationsResponse = await fetch(`${apiBase}/station`);

        if (!stationsResponse.ok) {
          console.error("Failed to fetch stations");
          return;
        }

        const stationsData = await stationsResponse.json();
        const stations = stationsData.data || [];

        // Find matching stations (case-insensitive)
        // Note: explicit 'any' used to match your previous code, preferably type this interface
        const departureStation = stations.find(
          (s: any) => s.city.toLowerCase() === fromCity.toLowerCase(),
        );

        const arrivalStation = stations.find(
          (s: any) => s.city.toLowerCase() === toCity.toLowerCase(),
        );

        if (!departureStation || !arrivalStation) {
          console.error("Stations not found for:", fromCity, toCity);
          return;
        }

        // Default values
        const today = new Date();
        const formattedDate = format(today, "dd-MM-yyyy");
        const adults = 1;
        const children = 0;

        // Update Store
        setFrom(departureStation._id);
        setTo(arrivalStation._id);
        setFromCity(fromCity);
        setToCity(toCity);
        setDepartureDate(formattedDate);
        setPassengers({ adults, children });

        // Build new URL Params
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("departureStation", departureStation._id);
        newSearchParams.set("arrivalStation", arrivalStation._id);
        newSearchParams.set("departureDate", formattedDate);
        newSearchParams.set("adult", adults.toString());
        newSearchParams.set("children", children.toString());

        // Redirect
        router.replace(`/search/${destination}?${newSearchParams.toString()}`);
      } catch (error) {
        console.error("Error initializing search:", error);
      }
    };

    initializeSearch();
  }, [
    params, // Check the whole object reference
    searchParams,
    router,
    setFrom,
    setTo,
    setFromCity,
    setToCity,
    setDepartureDate,
    setPassengers,
  ]);

  return null;
}
