import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";

interface FlexFeature {
  name: string;
  price: number;
  value: string;
  features: string[];
}

const TravelFlex: React.FC = () => {
  const [selectedFlex, setSelectedFlex] = useState<string | null>(null);

  const flexFeatures: FlexFeature[] = [
    {
      name: "Premium Flex",
      value: "premium",
      price: 4,
      features: [
        "Cancel your trip up to 48 hours before departure",
        "Change trip details up to 24 hours before departure",
        "Customer support assistance",
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

  useEffect(() => {
    const storedFlex = localStorage.getItem("flex_options");
    if (storedFlex) {
      setSelectedFlex(storedFlex);
    }
  }, []);

  const handleFlexSelection = (flexName: string) => {
    setSelectedFlex(flexName);

    localStorage.setItem("flex_options", flexName);

    // Throw a custom event with the selected flex name
    const event = new CustomEvent("flexOptionChanged", { detail: flexName });
    window.dispatchEvent(event);
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
          onClick={() => handleFlexSelection(flex.value)}
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
    <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-4">
      <div className="flex items-center gap-4">
        <span className="border border-emerald-700 rounded-xl h-8 w-8 flex justify-center items-center text-black">
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
