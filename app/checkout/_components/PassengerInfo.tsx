"use client";

import type React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { PassengerData } from "@/components/hooks/use-passengers";
import useSearchStore, { useCheckoutStore } from "@/store";
import PassengerSelector from "./PassengerSelector";
import { CalendarIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import PhoneInput from "./PhoneInput";
import { Country } from "@/constants/country";

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

interface PhoneFieldProps {
  label: string;
  placeholder: string;
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (country: Country) => void;
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
      const formattedDate = date?.toISOString()?.split("T")[0];
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };

  const handleInputChange = (value: string) => {
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
                  ? "border-none bg-red-500/10"
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
            error ? "border-none bg-red-500/10" : "border-none"
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

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  placeholder,
  value,
  countryCode,
  onChange,
  onCountryChange,
  required,
  error,
  onBlur,
}) => {
  return (
    <PhoneInput
      label={label}
      placeholder={placeholder}
      value={value}
      countryCode={countryCode}
      onChange={onChange}
      onCountryChange={onCountryChange}
      required={required}
      error={error}
      onBlur={onBlur}
    />
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
  const [useUserInfo, setUseUserInfo] = useState(false);
  const { passengers: passengersAmount, setPassengers: setPassengersAmount } =
    useSearchStore();
  const { user } = useAuth();
  const { adults, children, totalPassengers } = useMemo(() => {
    const adults = Math.max(1, passengersAmount.adults || 1);
    const children = Math.max(0, passengersAmount.children || 0);
    return {
      adults,
      children,
      totalPassengers: adults + children,
    };
  }, [passengersAmount.adults, passengersAmount.children]);

  const initializePassengers = useCallback(
    (count: number): PassengerData[] => {
      return Array.from({ length: count }, (_, i) => {
        const existingPassenger = passengers[i];

        const basePassenger: PassengerData = {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          countryCode: "+389", // Default to North Macedonia
          birthdate: "",
          age: i < adults ? 33 : 0,
          price: 0,
        };

        if (existingPassenger) {
          return {
            ...basePassenger,
            ...existingPassenger,
            countryCode: existingPassenger.countryCode || "+389",
          };
        }

        if (i === 0 && user && useUserInfo) {
          const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
          return {
            ...basePassenger,
            first_name: firstName,
            last_name: lastName,
            email: user.email || "",
            phone: user.phone || "",
            countryCode: user.countryCode || "+389",
          };
        }

        return basePassenger;
      });
    },
    [adults, passengers, user, useUserInfo]
  );

  // Handle passenger count changes - fix for race condition
  useEffect(() => {
    const newPassengerCount = totalPassengers;

    // Only update if the count actually changed or if passengers array is empty
    if (passengers.length !== newPassengerCount) {
      const newPassengers = initializePassengers(newPassengerCount);
      setPassengers(newPassengers);

      // Reset validation errors for new passenger count
      setValidationErrors(Array(newPassengerCount).fill({}));
    }
  }, [totalPassengers, initializePassengers, setPassengers, passengers.length]);

  // Handle user info toggle for main passenger
  useEffect(() => {
    if (!user || passengers.length === 0) return;

    const updatedPassengers = [...passengers];
    const firstPassenger = updatedPassengers[0];

    if (useUserInfo) {
      // Fill with user data
      const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
      updatedPassengers[0] = {
        ...firstPassenger,
        first_name: firstName,
        last_name: lastName,
        email: user.email || firstPassenger.email,
        phone: user.phone || firstPassenger.phone,
        countryCode: user.countryCode || firstPassenger.countryCode || "+389",
      };
    } else {
      // Clear user-specific data but keep manually entered data
      if (firstPassenger.first_name === user.name?.split(" ")[0]) {
        updatedPassengers[0] = {
          ...firstPassenger,
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          countryCode: "+389",
        };
      }
    }

    setPassengers(updatedPassengers);
  }, [useUserInfo, user, setPassengers]);

  const updatePassenger = useCallback(
    (index: number, field: keyof PassengerData, value: string | Country) => {
      const updatedPassengers = [...passengers];

      if (field === "countryCode" && typeof value === "object") {
        // Handle country selection from Country object
        updatedPassengers[index] = {
          ...updatedPassengers[index],
          countryCode: value.dialCode,
        };
      } else if (field === "birthdate" && typeof value === "string") {
        // Handle birthdate and calculate age
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const mDiff = today.getMonth() - birthDate.getMonth();
        if (
          mDiff < 0 ||
          (mDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        updatedPassengers[index] = {
          ...updatedPassengers[index],
          birthdate: value,
          age: age,
        };
      } else if (typeof value === "string") {
        updatedPassengers[index] = {
          ...updatedPassengers[index],
          [field]: value,
        };
      }

      setValidationErrors((prev) => {
        const newErrors = [...prev];
        if (newErrors[index]) {
          newErrors[index] = { ...newErrors[index], [field]: undefined };
        }
        return newErrors;
      });

      setPassengers(updatedPassengers);
    },
    [passengers, setPassengers]
  );

  const validatePassenger = useCallback(
    (index: number, field: keyof PassengerData) => {
      const passengerData = passengers[index];
      if (!passengerData) return;

      let errorMessage = "";

      // Basic validation rules
      switch (field) {
        case "first_name":
        case "last_name":
          if (!passengerData[field] || passengerData[field].trim().length < 2) {
            errorMessage = t(
              `validation.${{ field }}Required`,
              `${field.replace("_", " ")} is required`
            );
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!passengerData[field] || !emailRegex.test(passengerData[field])) {
            errorMessage = t(
              "validation.emailInvalid",
              "Please enter a valid email address"
            );
          }
          break;
        case "phone":
          if (!passengerData[field] || passengerData[field].trim().length < 8) {
            errorMessage = t(
              "validation.phoneInvalid",
              "Please enter a valid phone number"
            );
          }
          break;
        case "birthdate":
          if (!passengerData[field]) {
            errorMessage = t(
              "validation.birthdateRequired",
              "Birthdate is required"
            );
          } else {
            const birthDate = new Date(passengerData[field]);
            const now = new Date();
            if (birthDate >= now) {
              errorMessage = t(
                "validation.birthdateInvalid",
                "Please enter a valid birthdate"
              );
            }
          }
          break;
        default:
          break;
      }

      setValidationErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = {
          ...newErrors[index],
          [field]: errorMessage || undefined,
        };
        return newErrors;
      });
    },
    [passengers, t]
  );

  const removePassenger = useCallback(
    (index: number, isChild: boolean) => {
      if (isChild) {
        setPassengersAmount({ adults, children: Math.max(0, children - 1) });
      } else {
        setPassengersAmount({ children, adults: Math.max(1, adults - 1) });
      }
    },
    [adults, children, setPassengersAmount]
  );

  const renderPassengerInputs = (index: number, isChild: boolean) => {
    const passenger = passengers[index];
    const errors = validationErrors[index] || {};

    if (!passenger) return null;

    return (
      <div key={`passenger-${index}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <p className="font-medium text-black">
              {isChild
                ? `${t("passengerInfo.child")} ${index - adults + 1}`
                : `${t("passengerInfo.adult")} ${index + 1}`}
            </p>
            {index === 0 && user && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1">
                <Switch
                  id="use-user-info"
                  checked={useUserInfo}
                  onCheckedChange={setUseUserInfo}
                />
                <label
                  htmlFor="use-user-info"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {t("passengerInfo.useMyInfo", "Use my info")}
                </label>
              </div>
            )}
          </div>
          {index !== 0 && (
            <button
              onClick={() => removePassenger(index, isChild)}
              className="bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={16} className="text-neutral-700" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
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

              <PhoneField
                label={t("passengerInfo.phoneNumber")}
                placeholder={t("passengerInfo.phoneNumberPlaceholder")}
                value={passenger.phone}
                countryCode={passenger.countryCode || "+389"}
                onChange={(value) => updatePassenger(index, "phone", value)}
                onCountryChange={(country) =>
                  updatePassenger(index, "countryCode", country)
                }
                onBlur={() => validatePassenger(index, "phone")}
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

  // Render loading state while passengers are being initialized
  if (passengers.length !== totalPassengers) {
    return (
      <div className="flex flex-col bg-white rounded-xl p-4 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
            1
          </span>
          <p className="text-[#353535] font-medium text-lg">
            {t("passengerInfo.title")}
          </p>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: totalPassengers }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-xl p-4 gap-4">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
          1
        </span>
        <p className="text-[#353535] font-medium text-lg">
          {t("passengerInfo.title")}
        </p>
      </div>
      <p className="text-sm text-gray-600">{t("passengerInfo.instructions")}</p>

      <div className="space-y-6">
        {passengers.map((_, index) =>
          renderPassengerInputs(index, index >= adults)
        )}
      </div>

      <PassengerSelector />
    </div>
  );
};

export default PassengerInfo;
