import { FlexFeature, flexFeatures } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store";
import { Check } from "lucide-react";

const TravelFlex: React.FC = () => {
  const { selectedFlex, setSelectedFlex, setFlexPrice } = useCheckoutStore();

  const handleFlexSelection = (flex: FlexFeature) => {
    setSelectedFlex(flex.value);
    setFlexPrice(flex.price);
  };

  return (
    <div className="flex flex-col gap-4">
      {flexFeatures.map((flex, index) => (
        <div
          key={flex.name}
          className={`rounded-xl border p-4 cursor-pointer ${
            selectedFlex === flex.value
              ? "border-emerald-700 bg-emerald-50"
              : "border-gray-300"
          }`}
          onClick={() => handleFlexSelection(flex)}
        >
          <div
            className={cn("flex justify-between items-center mb-2", {
              "mb-0": index == 2,
            })}
          >
            <p className="font-medium text-black">{flex.name}</p>
            <p className="font-medium text-emerald-700">
              {flex.price > 0 ? `+ ${flex.price}€` : "Free"}
            </p>
          </div>
          <ul className="text-sm text-gray-600">
            {flex.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 mb-1">
                <Check size={16} className="text-emerald-700" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Extras: React.FC = () => {
  return (
    <div className="flex flex-col rounded-xl shadow-md bg-white p-4 gap-4">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
          2
        </span>
        <p className="text-[#353535] font-medium text-lg">
          Travel Flex Options
        </p>
      </div>
      <p className="text-sm text-gray-600">
        Choose from different flexibility options to cancel or modify your trip
        based on your needs.
      </p>
      <TravelFlex />
    </div>
  );
};

export default Extras;
