"use client";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Booking } from "@/models/booking";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { RetrievedBookingDetails } from "./RetreivedBookingDetails";

export function RetrieveBooking() {
  const [formData, setFormData] = useState({
    bookingNumber: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [retrievedBooking, setRetrievedBooking] = useState<Booking | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "booking-number" ? "bookingNumber" : "email"]: value,
    }));
  };

  const handleRetrieveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get<{ data: Booking }>(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/retreive/id-email/${formData.bookingNumber}/${formData.email}`
      );
      setRetrievedBooking(response.data.data);
    } catch (error: any) {
      console.error({ error });
      setError(
        error.response?.data?.message ||
          "Failed to retrieve booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseBookingDetails = () => {
    setRetrievedBooking(null);
    setFormData({ bookingNumber: "", email: "" });
  };

  return (
    <>
      {!retrievedBooking ? (
        <Card className="w-full max-w-[600px] mx-auto shadow-sm">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl font-bold text-[#0a1e47]">
              Retrieve your booking
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Enter your booking number and email address below and we'll find
              your ticket for you. We sent your booking number to you in your
              confirmation email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRetrieveBooking} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-number"
                    className="text-sm font-medium text-gray-700"
                  >
                    Booking number
                  </label>
                  <Input
                    id="booking-number"
                    type="text"
                    className="bg-gray-50"
                    value={formData.bookingNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-gray-50"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              {error && <FormError message={error} />}
              <Button
                type="submit"
                className="w-full bg-[#ff7b7b] hover:bg-[#ff6b6b] text-white font-medium h-12 rounded-lg"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin mx-auto" />
                ) : (
                  "Retrieve booking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <RetrievedBookingDetails
          booking={retrievedBooking}
          onClose={handleCloseBookingDetails}
        />
      )}
    </>
  );
}
