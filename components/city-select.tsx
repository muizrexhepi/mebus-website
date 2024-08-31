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
import { cn } from "@/lib/utils";

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
}

const CitySelect: React.FC<CustomSelectProps> = ({
  countries,
  departure = "from",
  empty,
}) => {
  const { setFrom, setTo } = useSearchStore();

  const handleSelect = (value: string) => {
    console.log({value})
    if (departure === "from") {
      setFrom(value);
    } else if (departure === "to") {
      setTo(value);
    }
  };

  //TO DO IF EMPTY

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger
        className={cn(
          "outline-none h-14 hover:bg-accent transition-colors text-base truncate",
          {
            "bg-destructive": !empty,
          }
        )}
      >
        <div className="flex items-center">
          <BusFrontIcon className="mr-2 h-5 w-5" />
          <SelectValue
            defaultValue={countries && countries[0]?.name}
            placeholder={departure === "from" ? "From" : "To"}
          />
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
