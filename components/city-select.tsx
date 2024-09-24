"use client";

import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import Cookies from "js-cookie";

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
  field: any;
}

interface OptionProps {
  value: string | undefined;
  label: string;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure = "from",
  field,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to } = useSearchStore();
  const [showRecent, setShowRecent] = useState(false);

  const handleSelect = (option: SingleValue<OptionProps>) => {
    if (option) {
      const value = option.value || "";
      const label = option.label || "";

      if (departure === "from") {
        setFromCity(label);
        setFrom(value);

        const recentFromStations = JSON.parse(
          Cookies.get("recentFromStations") || "[]"
        );
        const updatedRecentFromStations = [
          { _id: value, city: label },
          ...recentFromStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        Cookies.set(
          "recentFromStations",
          JSON.stringify(updatedRecentFromStations)
        );
      } else if (departure === "to") {
        setToCity(label);
        setTo(value);

        const recentToStations = JSON.parse(
          Cookies.get("recentToStations") || "[]"
        );
        const updatedRecentToStations = [
          { _id: value, city: label },
          ...recentToStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        Cookies.set(
          "recentToStations",
          JSON.stringify(updatedRecentToStations)
        );
      }

      field.onChange(value);
      setShowRecent(false);
    }
  };

  const getRecentStations = (
    cookieName: "recentFromStations" | "recentToStations"
  ) => {
    const recentStations = JSON.parse(Cookies.get(cookieName) || "[]");
    return recentStations.map((station: { _id: string; city: string }) => ({
      value: station._id,
      label: station.city,
    }));
  };

  useEffect(() => {
    if (departure === "from") {
      if (!recentFromOptions) {
        setFrom(stations[0]?.city || "");
        field.onChange(stations[0]?._id || "");
      } else {
        setFrom(recentFromOptions[0]?.label || "");
        field.onChange(recentFromOptions[0]?.value || "");
      }
    } else if (departure === "to") {
      if (!recentToOptions) {
        setTo(stations[1]?.city || "");
        field.onChange(stations[1]?._id || "");
      } else {
        setTo(recentToOptions[0]?.label || "");
        field.onChange(recentToOptions[0]?.value || "");
      }
    }
  }, []);

  useEffect(() => {
    findDefaultStation();
  }, []);

  const findDefaultStation = () => {
    if (departure === "from" && from) {
      const defaultFrom = stations.find((station) =>
        station._id?.includes(from)
      );
      if (defaultFrom) {
        if (!recentFromOptions) {
          field.onChange(from);
          setFromCity(defaultFrom.city);
        } else {
          field.onChange(recentFromOptions[0].value);
          setFromCity(recentFromOptions[0].label);
        }
      }
    } else if (departure === "to" && to) {
      const defaultTo = stations.find((station) => station._id?.includes(to));
      if (defaultTo) {
        if (!recentToOptions) {
          field.onChange(to);
          setToCity(defaultTo.city);
        } else {
          field.onChange(recentToOptions[0].value);
          setToCity(recentToOptions[0].label);
        }
      }
    }
  };

  const options = stations.map((station) => ({
    value: station._id,
    label: station.city,
  }));

  const recentFromOptions = getRecentStations("recentFromStations");
  const recentToOptions = getRecentStations("recentToStations");

  useEffect(() => {
    if (!recentFromOptions && !recentToOptions) {
      setShowRecent(false);
      return;
    }
    setShowRecent(true);
  }, []);

  const formatOptionLabel = ({ label }: { label: string }) => (
    <div className="flex items-center space-x-2">
      <MapPin className="w-6 h-6 text-primary" />
      <span>{label}</span>
    </div>
  );

  const handleInputChange = (inputValue: string) => {
    setShowRecent(!inputValue);
  };

  return (
    <div className="relative">
      <Select
        key={departure}
        value={options.find((option) => option.value === field.value)}
        onChange={handleSelect}
        onInputChange={handleInputChange}
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
              ? "#efefef"
              : state.isSelected
              ? "var(--primary)"
              : "var(--background)",
            color: state.isSelected
              ? "var(--primary-foreground)"
              : "var(--foreground)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#efefef",
            },
          }),
        }}
        defaultValue={
          departure === "from"
            ? options.find((option) => option.value === from)
            : options.find((option) => option.value === to)
        }
        options={[
          ...(showRecent
            ? [
                {
                  label: "Recent Searches",
                  options:
                    departure === "from" ? recentFromOptions : recentToOptions,
                },
              ]
            : options),
        ]}
        formatOptionLabel={formatOptionLabel}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
