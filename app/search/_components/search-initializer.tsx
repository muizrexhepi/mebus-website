"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import useSearchStore from "@/store";

/**
 * This component initializes the search when users land on clean URLs like:
 * /search/skopje-bern (without parameters)
 *
 * It fetches station IDs based on city names and redirects to the parameterized URL
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
    // Only run once and only if we don't have required parameters
    if (hasInitialized.current) return;

    const destination = Array.isArray(params.destination)
      ? params.destination[0]
      : params.destination;

    const hasDepartureStation = searchParams.get("departureStation");
    const hasArrivalStation = searchParams.get("arrivalStation");
    const hasDepartureDate = searchParams.get("departureDate");

    // If we already have all required params, don't initialize
    if (hasDepartureStation && hasArrivalStation && hasDepartureDate) {
      return;
    }

    // Mark as initialized to prevent multiple runs
    hasInitialized.current = true;

    const initializeSearch = async () => {
      try {
        // Parse city names from URL slug
        const [fromCitySlug, toCitySlug] = destination.split("-");

        // Capitalize city names
        const formatCityName = (slug: string) => {
          return slug
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
        };

        const fromCity = formatCityName(fromCitySlug);
        const toCity = formatCityName(toCitySlug);

        // Fetch station data to get IDs
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
        const departureStation = stations.find(
          (s: any) => s.city.toLowerCase() === fromCity.toLowerCase()
        );

        const arrivalStation = stations.find(
          (s: any) => s.city.toLowerCase() === toCity.toLowerCase()
        );

        if (!departureStation || !arrivalStation) {
          console.error(
            "Could not find stations for cities:",
            fromCity,
            toCity
          );
          return;
        }

        // Set default values
        const today = new Date();
        const formattedDate = format(today, "dd-MM-yyyy");
        const adults = 1;
        const children = 0;

        // Update store
        setFrom(departureStation._id);
        setTo(arrivalStation._id);
        setFromCity(fromCity);
        setToCity(toCity);
        setDepartureDate(formattedDate);
        setPassengers({ adults, children });

        // Build search params
        const newSearchParams = new URLSearchParams({
          departureStation: departureStation._id,
          arrivalStation: arrivalStation._id,
          departureDate: formattedDate,
          adult: adults.toString(),
          children: children.toString(),
        });

        // Redirect to parameterized URL
        router.replace(`/search/${destination}?${newSearchParams.toString()}`);
      } catch (error) {
        console.error("Error initializing search:", error);
      }
    };

    initializeSearch();
  }, [
    params.destination,
    searchParams,
    router,
    setFrom,
    setTo,
    setFromCity,
    setToCity,
    setDepartureDate,
    setPassengers,
  ]);

  // This component doesn't render anything
  return null;
}
