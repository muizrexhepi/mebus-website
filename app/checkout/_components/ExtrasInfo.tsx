"use client";

import { useCurrency } from "@/components/providers/currency-provider";
import { FlexFeature } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const flexFeatures: FlexFeature[] = [
  {
    name: "services.priority.name",
    value: "premium",
    price: 4,
    features: [
      "services.priority.fullRefund",
      "services.priority.dateChange",
      "services.priority.support",
    ],
  },
  {
    name: "services.standard.name",
    value: "basic",
    price: 2,
    features: [
      "services.standard.partialRefund",
      "services.standard.dateChange",
    ],
  },
  {
    name: "services.basic.name",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

const FlexOption: React.FC<{
  flex: FlexFeature;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ flex, isSelected, onSelect }) => {
  const { t } = useTranslation();
  const { currency, convertFromEUR } = useCurrency();

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 ease-in-out",
        isSelected
          ? `bg-gray-50 border-gray-300`
          : "border-gray-100 bg-white hover:border-gray-200"
      )}
      onClick={onSelect}
    >
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-center mb-3 last:mb-0">
          <div className="flex items-center gap-3">
            <h3
              className={cn(
                "font-medium",
                isSelected
                  ? "button-gradient bg-clip-text text-transparent"
                  : "text-gray-800 group-hover:text-black"
              )}
            >
              {t(flex.name)}
            </h3>
          </div>
          <p
            className={cn(
              "font-bold",
              isSelected
                ? "button-gradient bg-clip-text text-transparent"
                : "text-primary-bg group-hover:text-primary-bg/80"
            )}
          >
            {flex.price > 0
              ? `+ ${currency.symbol}${convertFromEUR(flex.price).toFixed(2)}`
              : t("extrasInfo.free")}
          </p>
        </div>

        {flex.features.length > 0 && (
          <ul className="space-y-2">
            {flex.features.map((featureKey) => (
              <li
                key={featureKey}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  isSelected
                    ? "text-black/90"
                    : "text-gray-600 group-hover:text-gray-800"
                )}
              >
                <Check
                  size={16}
                  className={cn(
                    "shrink-0",
                    isSelected ? "text-black" : "text-primary-bg"
                  )}
                />
                <span>{t(featureKey)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const TravelFlex: React.FC = () => {
  const { selectedFlex, setSelectedFlex, setFlexPrice } = useCheckoutStore();
  const { convertFromEUR } = useCurrency();

  const handleFlexSelection = (flex: FlexFeature) => {
    setSelectedFlex(flex.value);
    setFlexPrice(convertFromEUR(flex.price));
  };

  return (
    <div className="grid gap-4">
      {flexFeatures.map((flex) => (
        <FlexOption
          key={flex.value}
          flex={flex}
          isSelected={selectedFlex === flex.value}
          onSelect={() => handleFlexSelection(flex)}
        />
      ))}
    </div>
  );
};

const Extras: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 gap-4">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
          2
        </span>
        <div className="flex items-center gap-2">
          {/* <Sparkles size={20} className="text-primary-bg" /> */}
          <p className="text-[#353535] font-medium text-lg">
            {t("services.title")}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600">{t("services.description")}</p>
      <TravelFlex />
    </div>
  );
};

export default Extras;
