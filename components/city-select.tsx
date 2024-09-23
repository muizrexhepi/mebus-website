"use client";

import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Select, { SingleValue } from "react-select";

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
  field: any;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure = "from",
  field,
}) => {
  const { setFrom, setTo } = useSearchStore();

  const handleSelect = (
    option: SingleValue<{ value: string | undefined; label: string }>
  ) => {
    if (option) {
      const value = option.value || "";
      const label = option.label || "";

      if (departure === "from") {
        setFrom(label);
        console.log({ label });
      } else if (departure === "to") {
        setTo(label);
      }

      field.onChange(value);
    }
  };

  const searchParams = useSearchParams();
  const fromCity = searchParams.get("departureStation");
  const arrivalCity = searchParams.get("arrivalStation");

  useEffect(() => {
    if (departure === "from") {
      setFrom(stations[0]?.city || "");
      field.onChange(stations[0]?._id || "");
    } else if (departure === "to") {
      setTo(stations[1]?.city || "");
      field.onChange(stations[1]?._id || "");
    }
  }, []);

  useEffect(() => {
    findDefaultStation();
  }, []);

  const findDefaultStation = () => {
    if (departure === "from" && fromCity) {
      const defaultFrom = stations.find((station) =>
        station._id?.includes(fromCity)
      );
      if (defaultFrom) {
        field.onChange(fromCity);
        setFrom(defaultFrom.city);
      }
    } else if (departure === "to" && arrivalCity) {
      const defaultTo = stations.find((station) =>
        station._id?.includes(arrivalCity)
      );
      if (defaultTo) {
        field.onChange(arrivalCity);
        setTo(defaultTo.city);
      }
    }
  };

  const options = stations.map((station) => ({
    value: station._id,
    label: station.city,
  }));

  const formatOptionLabel = ({ label }: { label: string }) => (
    <div className="flex items-center space-x-2">
      <MapPin className="w-6 h-6 text-primary" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="relative">
      <Select
        value={options.find((option) => option.value === field.value)}
        onChange={handleSelect}
        styles={{
          container: (provided) => ({
            ...provided,
            outline: "none",
          }),
          control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            textTransform: "capitalize",
            minHeight: "3.5rem",
            borderColor: state.isFocused ? "#efefef" : "#efefef",
            backgroundColor: state.isFocused ? "var(--accent)" : "#fff",
            boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : "none",
            borderRadius: "var(--radius)",
            "&:hover": {
              backgroundColor: "rgb",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 1rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "var(--muted-foreground)",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 20,
            marginTop: "0.5rem",
            borderRadius: "var(--radius)",
            border: `1px solid var(--border)`,
          }),
          menuList: (provided) => ({
            ...provided,
            padding: "0.5rem 0",
          }),
          groupHeading: (provided) => ({
            ...provided,
            padding: "0 1rem",
            color: "var(--foreground)",
            fontWeight: "600",
          }),
          option: (provided, state) => ({
            ...provided,
            padding: "0.5rem 1rem",
            textTransform: "capitalize",
            backgroundColor: state.isFocused
              ? "var(--muted)"
              : state.isSelected
              ? "var(--primary)"
              : "var(--background)",
            color: state.isSelected
              ? "var(--primary-foreground)"
              : "var(--foreground)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--muted)",
            },
          }),
        }}
        defaultValue={
          departure === "from"
            ? options.find((option) => option.value === fromCity)
            : options.find((option) => option.value === arrivalCity)
        }
        options={options}
        formatOptionLabel={formatOptionLabel}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
