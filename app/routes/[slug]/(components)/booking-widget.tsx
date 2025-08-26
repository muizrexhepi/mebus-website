"use client";

import { useState } from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingWidgetProps {
  fromCity: string;
  toCity: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  compact?: boolean;
}

export default function BookingWidget({
  fromCity,
  toCity,
  selectedDate,
  onDateChange,
  compact = false,
}: BookingWidgetProps) {
  const [passengers, setPassengers] = useState(1);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  const handleSearch = () => {
    // Handle search logic
  };

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="departure-date" className="text-sm">
              Departure
            </Label>
            <Input
              id="departure-date"
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="passengers" className="text-sm">
              Passengers
            </Label>
            <Select
              value={passengers.toString()}
              onValueChange={(value) => setPassengers(Number.parseInt(value))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "passenger" : "passengers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleSearch}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Search Buses
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Label htmlFor="route" className="text-sm font-medium">
              Route
            </Label>
            <div className="mt-1 flex items-center space-x-2 p-3 border rounded-md bg-gray-50">
              <span className="font-medium">{fromCity}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{toCity}</span>
            </div>
          </div>

          <div>
            <Label htmlFor="departure-date" className="text-sm font-medium">
              Departure
            </Label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="departure-date"
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => onDateChange(new Date(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="passengers" className="text-sm font-medium">
              Passengers
            </Label>
            <div className="mt-1 relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Select
                value={passengers.toString()}
                onValueChange={(value) => setPassengers(Number.parseInt(value))}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "passenger" : "passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Search Buses
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
