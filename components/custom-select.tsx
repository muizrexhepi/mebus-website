import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./daterange-picker";
import PassengerSelect from "./passenger-select";
import CitySelect from "./city-select";
import InputSkeleton from "./input-skeleton";

export enum SELECT_TYPE {
  PASSENGER_SELECT = "input",
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
  departure?: string;
  empty?: true | false;
  defaultValue?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  countries,
  type,
  departure,
  empty,
  defaultValue,
}) => {
  switch (type) {
    case SELECT_TYPE.SELECT:
      return (
        <CitySelect
          countries={countries}
          departure={departure}
          empty={empty}
          defaultValue={defaultValue}
        />
      );
    case SELECT_TYPE.DATE_PICKER:
      return <DatePicker />;
    case SELECT_TYPE.DATE_RANGE_PICKER:
      return <DateRangePicker />;
    case SELECT_TYPE.PASSENGER_SELECT:
      return <PassengerSelect />;
    case SELECT_TYPE.SKELETON:
      return <InputSkeleton />;
    default:
      break;
  }
};

export default CustomSelect;
