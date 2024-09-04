"use client";

import useSearchStore from "@/store";
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
      console.log({ value });

      if (departure === "from") {
        console.log({ city });
        setFrom(city);
      } else if (departure === "to") {
        console.log({ city });

        setTo(city);
      }

      field.onChange(value);
    }
  };

  const cityOptions = countries?.flatMap((country) => country.cities) || [];

  useEffect(() => {
    if (departure === "from") {
      field.onChange(cityOptions[0].value);
    } else if (departure === "to") {
      field.onChange(cityOptions[1].value);
    }
  }, []);

  return (
    <div className="relative">
      <Select
        value={cityOptions.find((option) => option.value === field.value)}
        onChange={handleSelect}
        classNamePrefix="react-select"
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
            backgroundColor: state.isFocused ? "var(--foreground)" : "#fff",
            boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : "none",
            borderRadius: "var(--radius)",
            padding: "0.25rem",
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
            color: "var(--foreground)", // ShadCN foreground color for group headings
            fontWeight: "600", // Font weight for group headings
          }),
          option: (provided, state) => ({
            ...provided,
            padding: "0.5rem 1rem",
            backgroundColor: state.isFocused
              ? "var(--muted)" // ShadCN background color for hovered item
              : state.isSelected
              ? "var(--primary)" // ShadCN background color for selected item
              : "var(--background)", // Default background color
            color: state.isSelected
              ? "var(--primary-foreground)"
              : "var(--foreground)", // Text color for selected item
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--muted)", // ShadCN background color for hovered item
            },
          }),
        }}
        defaultValue={departure === "from" ? cityOptions[0] : cityOptions[1]}
        options={cityOptions}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
