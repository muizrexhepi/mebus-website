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
}

interface OptionProps {
  value: string | undefined;
  label: string;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to } = useSearchStore();
  const [showRecent, setShowRecent] = useState(false);
  const [defaultFrom, setDefaultFrom] = useState<OptionProps>();
  const [defaultTo, setDefaultTo] = useState<OptionProps>();

  useEffect(() => {
    const savedFrom = localStorage.getItem("fromCity");
    const savedFromValue = localStorage.getItem("fromValue");
    const savedTo = localStorage.getItem("toCity");
    const savedToValue = localStorage.getItem("toValue");

    if (savedFrom && savedFromValue && savedTo && savedToValue) {
      console.log("Setting From:", savedFrom, savedFromValue);
      setFromCity(savedFrom);
      setFrom(savedFromValue);
      setDefaultFrom({ label: savedFrom, value: savedFromValue });

      console.log("Setting To:", savedTo, savedToValue);
      setToCity(savedTo);
      setTo(savedToValue);
      setDefaultTo({ label: savedTo, value: savedToValue });
    }
  }, []);

  const handleSelect = (option: SingleValue<OptionProps>) => {
    if (option) {
      const value = option.value || "";
      const label = option.label || "";
      console.log({ option });
      if (departure === "from") {
        setFromCity(label);
        setFrom(value);
        localStorage.setItem("fromCity", label);
        localStorage.setItem("fromValue", value);

        const recentFromStations = JSON.parse(
          localStorage.getItem("recentFromStations") || "[]"
        );
        const updatedRecentFromStations = [
          { _id: value, city: label },
          ...recentFromStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        localStorage.setItem(
          "recentFromStations",
          JSON.stringify(updatedRecentFromStations)
        );
      } else if (departure === "to") {
        setToCity(label);
        setTo(value);
        localStorage.setItem("toCity", label);
        localStorage.setItem("toValue", value);

        const recentToStations = JSON.parse(
          localStorage.getItem("recentToStations") || "[]"
        );
        const updatedRecentToStations = [
          { _id: value, city: label },
          ...recentToStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        localStorage.setItem(
          "recentToStations",
          JSON.stringify(updatedRecentToStations)
        );
      }

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
        value={options.find(
          (option) => option.value === (departure === "from" ? from : to)
        )}
        defaultValue={departure === "from" ? defaultFrom : defaultTo}
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
        options={
          recentFromOptions.length > 0 && recentToOptions.length > 0
            ? [
                ...(showRecent
                  ? [
                      {
                        label: "Recent Searches",
                        options:
                          departure === "from"
                            ? recentFromOptions
                            : recentToOptions,
                      },
                    ]
                  : options),
              ]
            : options
        }
        formatOptionLabel={formatOptionLabel}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
