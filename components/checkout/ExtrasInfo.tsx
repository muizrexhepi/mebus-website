import { flexFeatures } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";

const TravelFlex: React.FC = () => {
  const [selectedFlex, setSelectedFlex] = useState<string | null>(null);

  useEffect(() => {
    const storedFlex = localStorage.getItem("flex_options");
    if (storedFlex) {
      setSelectedFlex(storedFlex);
    }
  }, []);

  const handleFlexSelection = (flexName: string) => {
    setSelectedFlex(flexName);

    localStorage.setItem("flex_options", flexName);

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
