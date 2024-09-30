"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import { DateSelectBlock } from "@/components/search/DateSelectBlock";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";
import { DatePicker } from "../date-picker";
import { DateRangePicker } from "../daterange-picker";
import SearchForm from "../forms/SearchForm";

const SearchSection = () => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTripType = localStorage.getItem("tripType");
      return savedTripType === "round-trip";
    }
    return false;
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const {
    returnDate,
    departureDate,
    setReturnDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
  } = useSearchStore();

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

  const handleSearch = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate || "",
        adult: passengers.adults.toString(),
        children: passengers.children.toString(),
      });

      if (isRoundTrip && returnDate) {
        searchParams.append("returnDate", returnDate);
      }

      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`
      );
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    from,
    to,
    departureDate,
    returnDate,
    passengers,
    fromCity,
    toCity,
    router,
  ]);

  const resetSearch = useSearchStore((state) => state.resetSearch);

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setIsRoundTrip(type === "round-trip");
      localStorage.setItem("tripType", type);
      if (type === "one-way") {
        setReturnDate(null);
      }
    },
    [setReturnDate]
  );

  const datePickerComponent = useMemo(() => {
    return isRoundTrip ? <DateRangePicker /> : <DatePicker />;
  }, [isRoundTrip]);

  return (
    <>
      <div className="bg-white rounded-xl p-4 md:py-6 flex flex-col gap-4 w-full min-h-fit sm:p-8 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="space-y-6 flex-1">
            <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={!isRoundTrip}
                      onChange={() => handleTripTypeChange("one-way")}
                      className="h-7 w-7 accent-emerald-700"
                    />
                    <span>One-way</span>
                  </label>
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="tripType"
                      value="round-trip"
                      checked={isRoundTrip}
                      onChange={() => handleTripTypeChange("round-trip")}
                      className="h-7 w-7 accent-emerald-700"
                    />
                    <span>Round-trip</span>
                  </label>
                </div>
              </div>
            </div>

            <SearchForm
              loading={loading}
              stations={stations}
              datePickerComponent={datePickerComponent}
              isSubmitting={isSubmitting}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <DateSelectBlock />
    </>
  );
};

export default SearchSection;
