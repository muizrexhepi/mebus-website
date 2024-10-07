import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputSkeleton from "@/components/input-skeleton";
import PassengerSelect from "@/components/passenger-select";
import { Station } from "@/models/station";
import StationSelect from "../search/station-select";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  loading: boolean;
  stations: Station[];
  datePickerComponent: React.ReactNode;
  isSubmitting: boolean;
  onSearch: () => void;
  updateUrl?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  loading,
  updateUrl,
  stations,
  datePickerComponent,
  isSubmitting,
  onSearch,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-3 sm:gap-2 lg:gap-1",
        {
          "lg:grid-cols-4": updateUrl,
        }
      )}
    >
      {["from", "to"].map((departure) => (
        <div key={departure} className="w-full">
          <p className="text-black font-normal text-lg">
            {departure === "from" ? "From" : "To"}
          </p>
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
        <p className="text-black font-normal text-lg">Departure</p>
        {loading ? <InputSkeleton /> : datePickerComponent}
      </div>
      <div>
        <p className="text-black font-normal text-lg">Passengers</p>
        {loading ? (
          <InputSkeleton />
        ) : (
          <PassengerSelect updateUrl={updateUrl} />
        )}
      </div>
      <Button
        type="submit"
        className={cn(
          "p-6 flex items-center gap-2 text-base w-full sm:col-span-2 h-14 lg:col-span-1",
          {
            hidden: updateUrl,
          }
        )}
        disabled={isSubmitting}
        onClick={onSearch}
      >
        {isSubmitting ? "Searching..." : "Search"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SearchForm;
