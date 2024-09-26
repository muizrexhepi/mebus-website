"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import InputSkeleton from "./input-skeleton";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";
import PassengerSelect from "./passenger-select";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./daterange-picker";
import CitySelect from "./city-select";

const SearchBlock = () => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      if (returnDate) {
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
      if (type === "one-way") {
        setReturnDate(null);
      }
    },
    [setReturnDate]
  );

  const datePickerComponent = useMemo(() => {
    if (loading) return <InputSkeleton />;
    return isRoundTrip ? <DateRangePicker /> : <DatePicker />;
  }, [loading, isRoundTrip]);

  return (
    <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-4">
          {["from", "to"].map((departure) => (
            <div key={departure} className="w-full">
              <p className="text-black font-normal text-lg">
                {departure === "from" ? "From" : "To"}
              </p>
              {loading ? (
                <InputSkeleton />
              ) : (
                <CitySelect
                  stations={stations}
                  departure={departure as "from" | "to"}
                />
              )}
            </div>
          ))}
          <div className="w-full">
            <p className="text-black font-normal text-lg">Departure</p>
            {datePickerComponent}
          </div>
          <div>
            <p className="text-black font-normal text-lg">Passengers</p>
            {loading ? <InputSkeleton /> : <PassengerSelect />}
          </div>
          <Button
            type="submit"
            className="p-6 flex items-center gap-2 text-base w-full sm:col-span-2 h-14 lg:col-span-1"
            disabled={isSubmitting}
            onClick={handleSearch}
          >
            {isSubmitting ? "Searching..." : "Search"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBlock;
