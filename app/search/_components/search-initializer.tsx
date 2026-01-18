"use client";

import { useEffect, useRef, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import useSearchStore from "@/store";

// 1. Move the logic into a "Content" component
function SearchInitializerContent() {
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
    if (!params?.destination || hasInitialized.current) return;

    const hasDepartureStation = searchParams.get("departureStation");
    const hasArrivalStation = searchParams.get("arrivalStation");
    const hasDepartureDate = searchParams.get("departureDate");

    if (hasDepartureStation && hasArrivalStation && hasDepartureDate) {
      return;
    }

    hasInitialized.current = true;

    const initializeSearch = async () => {
      try {
        const destinationRaw = params.destination;
        const destination = Array.isArray(destinationRaw)
          ? destinationRaw[0]
          : destinationRaw;
        if (!destination) return;

        const [fromCitySlug, toCitySlug] = destination.split("-");

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

        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "https://www.gobusly.com";
        const stationsResponse = await fetch(`${apiBase}/station`);
        if (!stationsResponse.ok) return;

        const stationsData = await stationsResponse.json();
        const stations = stationsData.data || [];

        const departureStation = stations.find(
          (s: any) => s.city.toLowerCase() === fromCity.toLowerCase(),
        );
        const arrivalStation = stations.find(
          (s: any) => s.city.toLowerCase() === toCity.toLowerCase(),
        );

        if (!departureStation || !arrivalStation) return;

        const today = new Date();
        const formattedDate = format(today, "dd-MM-yyyy");

        setFrom(departureStation._id);
        setTo(arrivalStation._id);
        setFromCity(fromCity);
        setToCity(toCity);
        setDepartureDate(formattedDate);
        setPassengers({ adults: 1, children: 0 });

        const newSearchParams = new URLSearchParams();
        newSearchParams.set("departureStation", departureStation._id);
        newSearchParams.set("arrivalStation", arrivalStation._id);
        newSearchParams.set("departureDate", formattedDate);
        newSearchParams.set("adult", "1");
        newSearchParams.set("children", "0");

        router.replace(`/search/${destination}?${newSearchParams.toString()}`);
      } catch (error) {
        console.error("Error initializing search:", error);
      }
    };

    initializeSearch();
  }, [
    params,
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

// 2. Export a wrapper that provides the Suspense boundary
export function SearchInitializer() {
  return (
    <Suspense fallback={null}>
      <SearchInitializerContent />
    </Suspense>
  );
}
