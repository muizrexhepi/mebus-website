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
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./daterange-picker";

export enum SELECT_TYPE {
  INPUT = "input",
  TEXTAREA = "textarea",
  DATE_RANGE_PICKER = "dateRangePicker",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
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
  type: SELECT_TYPE;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ countries, type }) => {
  switch (type) {
    case SELECT_TYPE.SELECT:
      return (
        <Select>
          <SelectTrigger className="outline-none h-14 hover:bg-accent transition-colors text-base truncate">
            <div className="flex items-center">
              <BusFrontIcon className="mr-2 h-5 w-5" />
              <SelectValue placeholder="Berlin" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {countries &&
              countries.map((country, index) => (
                <SelectGroup key={index}>
                  <SelectLabel>{country.name}</SelectLabel>
                  {country.cities.map((city, index) => (
                    <SelectItem key={index} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </Select>
      );
    case SELECT_TYPE.DATE_PICKER:
      return <DatePicker />;
    case SELECT_TYPE.DATE_RANGE_PICKER:
      return <DateRangePicker />;
    default:
      break;
  }
};

export default CustomSelect;
