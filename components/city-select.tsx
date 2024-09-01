import { BusFrontIcon } from "lucide-react";
import useSearchStore from "@/store";
import Select, { SingleValue } from "react-select";

interface CityOption {
  value: string;
  label: string;
}

interface CountryGroup {
  name: string;
  cities: CityOption[];
}

interface CustomSelectProps {
  countries?: CountryGroup[];
  departure?: string;
  empty?: true | false;
  defaultValue?: any;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  countries,
  departure = "from",
  empty,
  defaultValue,
}) => {
  const { setFrom, setTo } = useSearchStore();

  const handleSelect = (option: SingleValue<CityOption>) => {
    if (option) {
      const value = option.value || "";
      console.log({ value });

      if (departure === "from") {
        setFrom(value);
      } else if (departure === "to") {
        setTo(value);
      }
    }
  };

  // Flatten cities into a single array
  const cityOptions = countries?.flatMap((country) => country.cities) || [];

  console.log({ cityOptions });

  return (
    <div className="relative">
      <Select
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
        defaultValue={
          defaultValue ||
          (departure === "from" ? cityOptions[0] : cityOptions[1])
        }
        options={cityOptions}
        onChange={handleSelect}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
