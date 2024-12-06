import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store";

interface FlexFeature {
  name: string;
  value: string;
  price: number;
  features: string[];
}

const flexFeatures: FlexFeature[] = [
  {
    name: "Premium Flex",
    value: "premium",
    price: 4,
    features: [
      "Cancel your trip up to 48 hours before departure",
      "Change trip details up to 24 hours before departure",
      "Reschedule your booking up to 3 days before departure",
    ],
  },
  {
    name: "Basic Flex",
    value: "basic",
    price: 2,
    features: [
      "Cancel your trip up to 5 days before departure",
      "Change trip details up to 3 days before departure",
    ],
  },
  {
    name: "No Flexibility",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

export default function TravelFlex() {
  const { selectedFlex, setSelectedFlex, setFlexPrice } = useCheckoutStore();

  const handleFlexSelection = (flex: FlexFeature) => {
    setSelectedFlex(flex.value);
    setFlexPrice(flex.price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
            2
          </span>
          <p className="text-[#353535] font-medium text-lg">
            Travel Flex Options
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Choose from different flexibility options to cancel or modify your
          trip based on your needs.
        </p>

        <div className="space-y-4">
          {flexFeatures.map((flex, index) => (
            <div
              key={flex.value}
              className={cn(
                "rounded-lg border p-4 cursor-pointer transition-colors",
                selectedFlex === flex.value
                  ? "border-emerald-700 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50/50"
              )}
              onClick={() => handleFlexSelection(flex)}
            >
              <div
                className={cn("flex justify-between items-center mb-2", {
                  "mb-0": flex.features.length === 0,
                })}
              >
                <p className="font-medium text-black">{flex.name}</p>
                <p className="font-medium text-emerald-700">
                  {flex.price > 0 ? `+ ${flex.price}€` : "Free"}
                </p>
              </div>
              {flex.features.length > 0 && (
                <ul className="text-sm text-gray-600">
                  {flex.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 mb-1"
                    >
                      <Check
                        size={16}
                        className="text-emerald-700 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
