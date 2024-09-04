import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./daterange-picker";
import PassengerSelect from "./passenger-select";
import CitySelect from "./city-select";
import InputSkeleton from "./input-skeleton";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

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
  control?: any;
  countries?: CountryGroup[];
  type: SELECT_TYPE;
  departure?: string;
  defaultValue?: any;
  cityOptions?: any;
  name: string;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomSelectProps;
}) => {
  const { departure, countries } = props;
  switch (props.type) {
    case SELECT_TYPE.SELECT:
      return (
        <FormControl>
          <CitySelect
            field={field}
            departure={departure}
            countries={countries}
          />
        </FormControl>
      );
    case SELECT_TYPE.DATE_PICKER:
      return (
        <FormControl>
          <DatePicker field={field} />
        </FormControl>
      );
    case SELECT_TYPE.DATE_RANGE_PICKER:
      return (
        <FormControl>
          <DateRangePicker field={field} />
        </FormControl>
      );
    case SELECT_TYPE.PASSENGER_SELECT:
      return (
        <FormControl>
          <PassengerSelect field={field} />
        </FormControl>
      );
    case SELECT_TYPE.SKELETON:
      return <InputSkeleton />;
    default:
      break;
  }
};

const CustomFormField = (props: CustomSelectProps) => {
  const { control, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
