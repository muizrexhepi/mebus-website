"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./daterange-picker";
import SearchForm from "./forms/SearchForm";

const SearchBlock = () => {
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
    tripType,
    setTripType,
  } = useSearchStore();
  const resetSearch = useSearchStore((state) => state.resetSearch);

  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        console.log({ data });
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

      if (returnDate && tripType == "round-trip") {
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
    tripType,
  ]);

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setTripType(type);
      setReturnDate(null);
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);
    },
    [setReturnDate]
  );

  const datePickerComponent = useMemo(() => {
    return tripType == "round-trip" ? <DateRangePicker /> : <DatePicker />;
  }, [tripType]);

  return (
    <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit shadow-md">
      <div className="space-y-6 flex-1">
        <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={tripType == "one-way"}
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
                  checked={tripType == "round-trip"}
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
  );
};

export default SearchBlock;
