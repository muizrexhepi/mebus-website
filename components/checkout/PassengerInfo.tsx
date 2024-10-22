"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PassengerData } from "@/components/hooks/use-passengers";
import useSearchStore, { useCheckoutStore } from "@/store";
import PassengerSelector from "./PassengerSelector";
import { X } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useUser from "../hooks/use-user";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  required,
}) => (
  <div className="space-y-1">
    <p className="font-normal text-sm text-black/70">{label}</p>
    {type === "tel" ? (
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="MK"
        value={value}
        onChange={(value) => onChange(value || "")}
        className="font-normal text-black rounded-lg border-gray-300 border p-2 bg-white"
      />
    ) : (
      <Input
        type={type}
        className="font-normal text-black rounded-lg border-gray-300 border p-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    )}
  </div>
);

const PassengerInfo: React.FC = () => {
  const { t } = useTranslation();
  const { passengers, setPassengers } = useCheckoutStore((state) => ({
    passengers: state.passengers,
    setPassengers: state.setPassengers,
  }));

  const { passengers: passengersAmount, setPassengers: setPassengersAmount } =
    useSearchStore();

  const { adults, children } = {
    adults: passengersAmount.adults || 1,
    children: passengersAmount.children || 0,
  };

  const { user } = useUser();

  useEffect(() => {
    if (passengers.length === adults + children) {
      return;
    }

    const initialPassengers: PassengerData[] = [
      ...Array(adults).fill({
        full_name: "",
        email: "",
        phone: "",
        birthdate: "",
        age: 33,
        price: 0,
      }),
      ...Array(children).fill({
        full_name: "",
        email: "",
        phone: "",
        birthdate: "",
        age: 0,
        price: 0,
      }),
    ];

    if (user && initialPassengers.length > 0) {
      initialPassengers[0] = {
        ...initialPassengers[0],
        full_name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || "",
      };
    }

    setPassengers(initialPassengers);
  }, [adults, children, setPassengers, user]);

  const updatePassenger = (
    index: number,
    field: keyof PassengerData,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };

    if (field === "birthdate") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      updatedPassengers[index].age = age;
    }

    setPassengers(updatedPassengers);
  };

  const renderPassengerInputs = (passengerIndex: number, isChild: boolean) => {
    const passenger = passengers[passengerIndex];

    const removePassenger = () => {
      if (isChild) {
        setPassengersAmount({ adults, children: children - 1 });
      } else {
        setPassengersAmount({ children, adults: adults - 1 });
      }
    };

    return (
      <div key={passengerIndex} className="">
        <div className="flex items-center justify-between">
          <p className="font-medium text-black mb-2">
            {isChild
              ? `${t("passengerInfo.child")} ${passengerIndex - adults + 1}`
              : `${t("passengerInfo.adult")} ${passengerIndex + 1}`}
          </p>
          {passengerIndex !== 0 && (
            <button
              onClick={removePassenger}
              className="bg-gray-100 p-1.5 rounded-full"
            >
              <X size={16} className="text-neutral-700" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
          <InputField
            label={t("passengerInfo.firstName")}
            placeholder={t("passengerInfo.firstNamePlaceholder")}
            type="text"
            value={passenger.full_name.split(" ")[0] || ""}
            onChange={(value) => {
              const lastName = passenger.full_name
                .split(" ")
                .slice(1)
                .join(" ");
              updatePassenger(
                passengerIndex,
                "full_name",
                `${value} ${lastName}`.trim()
              );
            }}
            required={true}
          />
          <InputField
            label={t("passengerInfo.lastName")}
            placeholder={t("passengerInfo.lastNamePlaceholder")}
            type="text"
            value={passenger.full_name.split(" ").slice(1).join(" ") || ""}
            onChange={(value) => {
              const firstName = passenger.full_name.split(" ")[0];
              updatePassenger(
                passengerIndex,
                "full_name",
                `${firstName} ${value}`.trim()
              );
            }}
            required={true}
          />
          {passengerIndex === 0 && (
            <>
              <InputField
                label={t("passengerInfo.email")}
                placeholder={t("passengerInfo.emailPlaceholder")}
                type="email"
                value={passenger.email}
                onChange={(value) =>
                  updatePassenger(passengerIndex, "email", value)
                }
                required={true}
              />
              <InputField
                label={t("passengerInfo.phoneNumber")}
                placeholder={t("passengerInfo.phoneNumberPlaceholder")}
                type="tel"
                value={passenger.phone}
                onChange={(value) =>
                  updatePassenger(passengerIndex, "phone", value)
                }
                required={true}
              />
            </>
          )}
          {isChild && (
            <InputField
              label={t("passengerInfo.birthdate")}
              placeholder={t("passengerInfo.birthdatePlaceholder")}
              type="date"
              value={passenger.birthdate}
              onChange={(value) =>
                updatePassenger(passengerIndex, "birthdate", value)
              }
              required={true}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col shadow-md bg-white rounded-xl p-4 gap-2">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
          1
        </span>
        <p className="text-[#353535] font-medium text-lg">
          {t("passengerInfo.title")}
        </p>
      </div>
      <p className="text-sm text-gray-600">{t("passengerInfo.instructions")}</p>
      <div className="space-y-3">
        {passengers.map((_, index) =>
          renderPassengerInputs(index, index >= adults)
        )}
      </div>
      <PassengerSelector />
    </div>
  );
};

export default PassengerInfo;
