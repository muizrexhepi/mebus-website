"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputSkeleton from "@/components/input-skeleton";
import PassengerSelect from "@/app/search/_components/passenger-select";
import { Station } from "@/models/station";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import StationSelect from "@/app/search/_components/station-select";
import DatePicker from "@/app/search/_components/date-picker";
import ReturnDatePicker from "@/app/search/_components/return-date-picker";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import { getStations } from "@/actions/station";

interface SearchFormProps {
  updateUrl?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ updateUrl }) => {
  const { t } = useTranslation();
  const {
    returnDate,
    departureDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
    tripType,
  } = useSearchStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        setStations(data);
      } catch (error) {
        console.error(t("searchBlock.searchError"), error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleSearch = async () => {
    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate || "",
        adult: passengers.adults.toString(),
        children: passengers.children.toString(),
      });

      if (returnDate && tripType === "round-trip") {
        searchParams.append("returnDate", returnDate);
      }

      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`
      );
      setIsSubmitting(false);
    } catch (err) {
      console.error("Search error:", err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    console.log({ isSubmitting });
  }, [isSubmitting]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-2 lg:gap-1",
        {
          "lg:grid-cols-4": updateUrl,
        }
      )}
    >
      {["from", "to"].map((departure) => (
        <div key={departure} className="w-full">
          {loading ? (
            <InputSkeleton />
          ) : (
            <StationSelect
              stations={stations}
              departure={departure as "from" | "to"}
              updateUrl={updateUrl}
            />
          )}
        </div>
      ))}
      <div className="w-full">
        {loading ? (
          <InputSkeleton />
        ) : (
          <div className="flex items-center gap-2 sm:gap-1">
            <DatePicker updateUrl={updateUrl} />
            {tripType == "round-trip" ? (
              <ReturnDatePicker updateUrl={updateUrl} />
            ) : null}
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <InputSkeleton />
        ) : (
          <PassengerSelect updateUrl={updateUrl} />
        )}
      </div>
      <Button
        type="submit"
        className={cn(
          "p-6 flex items-center gap-2 w-full sm:col-span-2 rounded-lg h-12 lg:col-span-1 bg-gradient-to-tr from-[#ff6700] to-[#ff007f]",
          {
            hidden: updateUrl,
          }
        )}
        disabled={isSubmitting}
        onClick={handleSearch}
      >
        {isSubmitting ? (
          <Loader2 className="size-6 animate-spin mx-auto text-white" />
        ) : (
          t("searchForm.searchButton.default")
        )}{" "}
      </Button>
    </div>
  );
};
