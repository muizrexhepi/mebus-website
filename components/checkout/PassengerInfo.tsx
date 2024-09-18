"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import {
  PassengerData,
  getPassengersFromStorage,
  setPassengersToStorage,
} from "@/components/hooks/use-passengers";

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
    <Input
      type={type}
      className="font-normal text-black rounded-lg border-gray-300 border p-2"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const PassengerInfoContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  const [firstAdultEmail, setFirstAdultEmail] = useState("");
  const [firstAdultPhone, setFirstAdultPhone] = useState("");

  const { adults, children } = {
    adults: parseInt(searchParams.get("adults") || "0"),
    children: parseInt(searchParams.get("children") || "0"),
  };

  useEffect(() => {
    const storedPassengers = getPassengersFromStorage();
    if (storedPassengers.length === adults + children) {
      setPassengers(storedPassengers);
    } else {
      const initialPassengers: PassengerData[] = [
        ...Array(adults).fill({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
          age: 33,
        }),
        ...Array(children).fill({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
          age: 0,
        }),
      ];
      setPassengers(initialPassengers);
      setPassengersToStorage(initialPassengers);
    }
  }, [adults, children]);

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

    if (index === 0 && (field === "email" || field === "phone")) {
      if (field === "email") setFirstAdultEmail(value);
      if (field === "phone") setFirstAdultPhone(value);
      updatedPassengers.forEach((passenger) => {
        passenger[field] = value;
      });
    }
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
    setPassengersToStorage(updatedPassengers);
    window.dispatchEvent(new Event("passengersUpdated"));
  };

  const renderPassengerInputs = (passengerIndex: number, isChild: boolean) => {
    const passenger = passengers[passengerIndex];
    const isFirstAdult = passengerIndex === 0 && !isChild;

    return (
      <div key={passengerIndex} className="border-t border-gray-200 pt-4 mt-2">
        <p className="font-medium text-black mb-2">
          {isChild
            ? `Child ${passengerIndex - adults + 1}`
            : `Adult ${passengerIndex + 1}`}
        </p>
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
          <InputField
            label="First Name"
            placeholder="John"
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
            label="Last Name"
            placeholder="Doe"
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
          {isFirstAdult && (
            <>
              <InputField
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                value={passenger.email}
                onChange={(value) =>
                  updatePassenger(passengerIndex, "email", value)
                }
                required={true}
              />
              <InputField
                label="Phone number"
                placeholder="+123 456 78"
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
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
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
    <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-2">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
          1
        </span>
        <p className="text-[#353535] font-medium text-lg">Passengers</p>
      </div>
      {passengers.map((_, index) =>
        renderPassengerInputs(index, index >= adults)
      )}
    </div>
  );
};

export default function PassengerInfo() {
  return (
    <Suspense fallback={<p>Loading passenger information...</p>}>
      <PassengerInfoContent />
    </Suspense>
  );
}
