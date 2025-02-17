"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PassengerData } from "@/components/hooks/use-passengers";
import useSearchStore, { useCheckoutStore } from "@/store";
import PassengerSelector from "./PassengerSelector";
import { CalendarIcon, CalendarX2Icon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { passengerSchema } from "@/schemas";
import { z } from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  error?: string;
  onBlur: () => void;
}

type ValidationErrors = {
  [key in keyof PassengerData]?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  required,
  error,
  onBlur,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };
  return (
    <div className="space-y-1">
      <p className="font-normal text-sm text-black/70">{label}</p>
      {type === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal h-12 ${
                error
                  ? "border-red-500 bg-red-500/10"
                  : "bg-primary-bg/5 border-none"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(new Date(value), "PPP")
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <style>
              {`
                .react-datepicker {
                  font-family: inherit;
                  border: none;
                  border-radius: 0.5rem;
                  overflow: hidden;
                }
                .react-datepicker__header {
                  background-color: white;
                  border-bottom: 1px solid #e2e8f0;
                  padding-top: 1rem;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 0.5rem;
                }
                .react-datepicker__current-month {
                  font-weight: 600;
                  font-size: 1rem;
                  margin-bottom: 0.5rem;  margin-bottom: 0.5rem; 

                }
                .react-datepicker__day-name {
                  color: #64748b;
                  font-weight: 500;
                  width: 2.5rem;
                  margin: 0.2rem;
                }
                .react-datepicker__day {
                  width: 2.5rem;
                  height: 2.5rem;
                  line-height: 2.5rem;
                  margin: 0.2rem;
                  border-radius: 0.375rem;
                  color: #1e293b;
                }
                .react-datepicker__day:hover {
                  background-color: #f1f5f9;
                }
                .react-datepicker__day--selected {
                  background-color: hsl(var(--primary)) !important;
                  color: white !important;
                }
                .react-datepicker__day--keyboard-selected {
                  background-color: hsl(var(--primary)) !important;
                  color: white !important;
                }
                .react-datepicker__navigation {
                  top: 1rem;
                }
                .react-datepicker__navigation-icon::before {
                  border-color: #64748b;
                }
                .react-datepicker__year-dropdown-container,
                .react-datepicker__month-dropdown-container {
                  margin: 0 0.5rem;
                }
                .react-datepicker__month-select,
                .react-datepicker__year-select {
                  padding: 0.25rem;
                  border-radius: 0.375rem;
                  border: 1px solid #e2e8f0;
                  background-color: white;
                }
              `}
            </style>
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              inline
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              showMonthDropdown
              dropdownMode="select"
              calendarClassName="shadow-lg"
              minDate={new Date(1930, 0, 1)}
              maxDate={new Date()}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Input
          type={type}
          className={`font-normal text-black rounded-lg h-12 bg-primary-bg/5 p-2 ${
            error ? "border-red-500 bg-red-500/10" : "border-none"
          }`}
          placeholder={placeholder}
          value={value as string}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const PassengerInfo: React.FC = () => {
  const { t } = useTranslation();
  const { passengers, setPassengers } = useCheckoutStore((state) => ({
    passengers: state.passengers,
    setPassengers: state.setPassengers,
  }));
  const [validationErrors, setValidationErrors] = useState<ValidationErrors[]>(
    []
  );
  const { passengers: passengersAmount, setPassengers: setPassengersAmount } =
    useSearchStore();

  const { adults, children } = {
    adults: passengersAmount.adults || 1,
    children: passengersAmount.children || 0,
  };

  const { user } = useAuth();
  console.log({ user });
  useEffect(() => {
    const useUserInfo = user ?? false;

    if (useUserInfo) {
      console.log({ user });
      passengers[0] = {
        ...passengers[0],
        first_name: user.name.split(" ")[0] || "",
        last_name: user.name.split(" ")[1] || "",
        email: user.email,
        phone: user.phone || "",
      };
    }
  }, [user]);

  useEffect(() => {
    if (passengers.length === adults + children) {
      return;
    }

    const newPassengers: PassengerData[] = [];

    for (let i = 0; i < adults + children; i++) {
      if (i < passengers.length) {
        newPassengers.push(passengers[i]);
      } else {
        newPassengers.push({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          birthdate: "",
          age: i < adults ? 33 : 0,
          price: 0,
        });
      }
    }

    setPassengers(newPassengers);
  }, [adults, children, setPassengers, passengers]);

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
    console.log({ passengers });
    setValidationErrors(Array(adults + children).fill({}));
    setPassengers(updatedPassengers);
  };

  const validatePassenger = (index: number, field: keyof PassengerData) => {
    const passengerData = passengers[index];
    const fieldSchema = passengerSchema.shape[field];

    try {
      fieldSchema.parse(passengerData[field]);
      setValidationErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = { ...newErrors[index], [field]: undefined };
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => {
          const newErrors = [...prev];
          newErrors[index] = {
            ...newErrors[index],
            [field]: error.errors[0]?.message || `Invalid ${field}`,
          };
          return newErrors;
        });
      }
    }
  };

  console.log({ passengers });

  const renderPassengerInputs = (passengerIndex: number, isChild: boolean) => {
    const passenger = passengers[passengerIndex];
    const errors = validationErrors[passengerIndex] || {};

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
            value={passenger.first_name || ""}
            onBlur={() => validatePassenger(passengerIndex, "first_name")}
            onChange={(value) => {
              // const lastName = passenger.first_name
              //   .split(" ")
              //   .slice(1)
              //   .join(" ");
              updatePassenger(
                passengerIndex,
                "first_name",
                value
                // `${value} ${lastName}`.trim()
              );
            }}
            error={errors.first_name}
            required={true}
          />
          <InputField
            label={t("passengerInfo.lastName")}
            placeholder={t("passengerInfo.lastNamePlaceholder")}
            type="text"
            value={passenger.last_name || ""}
            onBlur={() => validatePassenger(passengerIndex, "last_name")}
            onChange={(value) => {
              // const firstName = passenger.last_name.split(" ")[0];
              updatePassenger(
                passengerIndex,
                "last_name",
                value
                // `${firstName} ${value}`.trim()
              );
            }}
            error={errors.last_name}
            required={true}
          />
          {passengerIndex === 0 && (
            <>
              <InputField
                label={t("passengerInfo.email")}
                placeholder={t("passengerInfo.emailPlaceholder")}
                type="email"
                value={passenger.email}
                onBlur={() => validatePassenger(passengerIndex, "email")}
                onChange={(value) =>
                  updatePassenger(passengerIndex, "email", value)
                }
                error={errors.email}
                required={true}
              />
              <InputField
                label={t("passengerInfo.phoneNumber")}
                placeholder={t("passengerInfo.phoneNumberPlaceholder")}
                type="tel"
                value={passenger.phone}
                onBlur={() => validatePassenger(passengerIndex, "phone")}
                onChange={(value) =>
                  updatePassenger(passengerIndex, "phone", value)
                }
                error={errors.phone}
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
              onBlur={() => validatePassenger(passengerIndex, "birthdate")}
              onChange={(value) =>
                updatePassenger(passengerIndex, "birthdate", value)
              }
              error={errors.birthdate}
              required={true}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-4 gap-2">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
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
