import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BusFrontIcon } from "lucide-react";
import useSearchStore from "@/store";

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
  departure?: "from" | "to";
}

const CitySelect: React.FC<CustomSelectProps> = ({
  countries,
  departure = "from",
}) => {
  const { setFrom, setTo } = useSearchStore();

  const handleSelect = (value: string) => {
    if (departure === "from") {
      setFrom(value);
    } else if (departure === "to") {
      setTo(value);
    }
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="outline-none h-14 hover:bg-accent transition-colors text-base truncate">
        <div className="flex items-center">
          <BusFrontIcon className="mr-2 h-5 w-5" />
          <SelectValue placeholder={departure === "from" ? "From" : "To"} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {countries &&
          countries.map((country, index) => (
            <SelectGroup key={index}>
              <SelectLabel>{country.name}</SelectLabel>
              {country.cities.map((city, cityIndex) => (
                <SelectItem key={cityIndex} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CitySelect;
