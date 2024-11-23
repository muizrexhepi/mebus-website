import { FlexFeature } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const flexFeatures: FlexFeature[] = [
  {
    name: "flexFeatures.premium.name",
    value: "premium",
    price: 4,
    features: [
      "flexFeatures.premium.cancel",
      "flexFeatures.premium.change",
      "flexFeatures.premium.reschedule",
    ],
  },
  {
    name: "flexFeatures.basic.name",
    value: "basic",
    price: 2,
    features: ["flexFeatures.basic.cancel", "flexFeatures.basic.change"],
  },
  {
    name: "flexFeatures.no_flex.name",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

const TravelFlex: React.FC = () => {
  const { t } = useTranslation();
  const { selectedFlex, setSelectedFlex, setFlexPrice } = useCheckoutStore();

  const handleFlexSelection = (flex: FlexFeature) => {
    setSelectedFlex(flex.value);
    setFlexPrice(flex.price);
  };

  return (
    <div className="flex flex-col gap-4">
      {flexFeatures.map((flex, index) => (
        <div
          key={flex.value}
          className={`rounded-xl border p-4 cursor-pointer ${
            selectedFlex === flex.value
              ? "border-primary-bg bg-secondary-bg/20"
              : "border-gray-300"
          }`}
          onClick={() => handleFlexSelection(flex)}
        >
          <div
            className={cn("flex justify-between items-center mb-2", {
              "mb-0": index === 2,
            })}
          >
            <p className="font-medium text-black">{t(flex.name)}</p>
            <p className="font-medium text-primary-bg">
              {flex.price > 0 ? `+ ${flex.price}€` : t("extrasInfo.free")}
            </p>
          </div>
          <ul className="text-sm text-gray-600">
            {flex.features.map((featureKey, index) => (
              <li key={index} className="flex items-center gap-2 mb-1">
                <Check size={16} className="text-primary-bg" />
                {t(featureKey)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Extras: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col rounded-xl shadow-md bg-white p-4 gap-4">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
          2
        </span>
        <p className="text-[#353535] font-medium text-lg">
          {t("extrasInfo.title")}
        </p>
      </div>
      <p className="text-sm text-gray-600">{t("extrasInfo.description")}</p>
      <TravelFlex />
    </div>
  );
};

export default Extras;
