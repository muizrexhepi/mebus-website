"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { PassengerData } from "@/components/hooks/use-passengers";
import useSearchStore, { useCheckoutStore } from "@/store";
import PassengerSelector from "./PassengerSelector";
import { CalendarIcon, X } from "lucide-react";
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
import { useAbandonedCheckout } from "@/components/hooks/use-abandoned-checkout";

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
  // 🚨 Get resetTimeout from abandoned checkout hook
  const { resetTimeout } = useAbandonedCheckout();

  const handleDateChange = (date: Date | null) => {
    resetTimeout(); // Reset timer on date change
    if (date) {
      const formattedDate = date?.toISOString()?.split("T")[0];
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };

  const handleInputChange = (value: string) => {
    resetTimeout(); // Reset timer on input change
    onChange(value);
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
                  margin-bottom: 0.5rem;
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
          onChange={(e) => handleInputChange(e.target.value)}
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
  const { resetTimeout } = useAbandonedCheckout();

  // Set user data to first passenger
  useEffect(() => {
    if (!user || passengers.length === 0) return;

    const [firstName = "", lastName = ""] = user.name?.split(" ") || [];

    const updated = {
      ...passengers[0],
      first_name: firstName,
      last_name: lastName,
      email: user.email || "",
      phone: user.phone || "",
    };

    const newPassengers = [...passengers];
    newPassengers[0] = updated;
    setPassengers(newPassengers);
  }, [user]);

  // Ensure passenger count matches adults + children
  useEffect(() => {
    const expected = adults + children;
    if (passengers.length === expected) return;

    const newPassengers: PassengerData[] = Array.from(
      { length: expected },
      (_, i) => {
        return (
          passengers[i] || {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            birthdate: "",
            age: i < adults ? 33 : 0,
            price: 0,
          }
        );
      }
    );

    setPassengers(newPassengers);
  }, [adults, children]);

  useEffect(() => {
    console.log("👥 Passengers updated:", passengers);
  }, [passengers]);

  const updatePassenger = (
    index: number,
    field: keyof PassengerData,
    value: string
  ) => {
    resetTimeout();

    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };

    if (field === "birthdate") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const mDiff = today.getMonth() - birthDate.getMonth();
      if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedPassengers[index].age = age;
    }

    if (field === "email" && value && index === 0) {
      console.log("📧 Email entered, abandoned checkout tracking will start");
    }

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
    } catch (error: any) {
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

  const renderPassengerInputs = (index: number, isChild: boolean) => {
    const passenger = passengers[index];
    const errors = validationErrors[index] || {};

    const removePassenger = () => {
      resetTimeout();
      if (isChild) {
        setPassengersAmount({ adults, children: Math.max(0, children - 1) });
      } else {
        setPassengersAmount({ children, adults: Math.max(1, adults - 1) });
      }
    };

    return (
      <div key={index}>
        <div className="flex items-center justify-between">
          <p className="font-medium text-black mb-2">
            {isChild
              ? `${t("passengerInfo.child")} ${index - adults + 1}`
              : `${t("passengerInfo.adult")} ${index + 1}`}
          </p>
          {index !== 0 && (
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
            value={passenger.first_name}
            onBlur={() => validatePassenger(index, "first_name")}
            onChange={(value) => updatePassenger(index, "first_name", value)}
            error={errors.first_name}
            required
          />

          <InputField
            label={t("passengerInfo.lastName")}
            placeholder={t("passengerInfo.lastNamePlaceholder")}
            type="text"
            value={passenger.last_name}
            onBlur={() => validatePassenger(index, "last_name")}
            onChange={(value) => updatePassenger(index, "last_name", value)}
            error={errors.last_name}
            required
          />

          {index === 0 && (
            <>
              <InputField
                label={t("passengerInfo.email")}
                placeholder={t("passengerInfo.emailPlaceholder")}
                type="email"
                value={passenger.email}
                onBlur={() => validatePassenger(index, "email")}
                onChange={(value) => updatePassenger(index, "email", value)}
                error={errors.email}
                required
              />
              <InputField
                label={t("passengerInfo.phoneNumber")}
                placeholder={t("passengerInfo.phoneNumberPlaceholder")}
                type="tel"
                value={passenger.phone}
                onBlur={() => validatePassenger(index, "phone")}
                onChange={(value) => updatePassenger(index, "phone", value)}
                error={errors.phone}
                required
              />
            </>
          )}

          {isChild && (
            <InputField
              label={t("passengerInfo.birthdate")}
              placeholder={t("passengerInfo.birthdatePlaceholder")}
              type="date"
              value={passenger.birthdate}
              onBlur={() => validatePassenger(index, "birthdate")}
              onChange={(value) => updatePassenger(index, "birthdate", value)}
              error={errors.birthdate}
              required
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
