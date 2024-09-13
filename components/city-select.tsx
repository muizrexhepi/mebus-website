"use client";

import useSearchStore from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Select, { SingleValue } from "react-select";

interface CityOption {
  value: string;
  label: string;
  city: string;
}

interface CountryGroup {
  name: string;
  cities: CityOption[];
}

interface CustomSelectProps {
  countries?: CountryGroup[];
  departure?: string;
  field: any;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  countries,
  departure = "from",
  field,
}) => {
  const { setFrom, setTo } = useSearchStore();

  const handleSelect = (option: SingleValue<CityOption>) => {
    if (option) {
      const value = option.value || "";
      const city = option.city || "";

      if (departure === "from") {
        setFrom(city);
        console.log({ city });
      } else if (departure === "to") {
        setTo(city);
      }

      field.onChange(value);
    }
  };

  const cityOptions = countries?.flatMap((country) => country.cities) || [];
  const searchParams = useSearchParams();

  const fromCity = searchParams.get("departureStation");
  const arrivalCity = searchParams.get("arrivalStation");

  useEffect(() => {
    if (departure === "from") {
      setFrom(cityOptions[0]?.city || "");
      field.onChange(cityOptions[0]?.value || "");
    } else if (departure === "to") {
      setTo(cityOptions[1]?.city || "");
      field.onChange(cityOptions[1]?.value || "");
    }
  }, []);

  useEffect(() => {
    findDefaultStation();
  }, []);

  const findDefaultStation = () => {
    if (departure === "from" && fromCity) {
      const defaultFrom = cityOptions.find((city) =>
        city.value.includes(fromCity)
      );
      if (defaultFrom) {
        field.onChange(fromCity);
        setFrom(defaultFrom.city);
      }
    } else if (departure === "to" && arrivalCity) {
      const defaultTo = cityOptions.find((city) =>
        city.value.includes(arrivalCity)
      );
      if (defaultTo) {
        field.onChange(arrivalCity);
        setTo(defaultTo.city);
      }
    }
  };

  return (
    <div className="relative">
      <Select
        value={cityOptions.find((option) => option.value === field.value)}
        onChange={handleSelect}
        styles={{
          container: (provided) => ({
            ...provided,
            outline: "none",
          }),
          control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            minHeight: "3.5rem",
            borderColor: state.isFocused ? "#efefef" : "#efefef",
            backgroundColor: state.isFocused ? "var(--accent)" : "#fff",
            boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : "none",
            borderRadius: "var(--radius)",
            padding: "0.25rem",
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
            ? cityOptions.find((city) => city.value.includes(fromCity || ""))
            : cityOptions.find((city) => city.value.includes(arrivalCity || ""))
        }
        options={cityOptions}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
