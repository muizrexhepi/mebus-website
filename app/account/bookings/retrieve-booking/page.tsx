import React from "react";
import { RetrieveBooking } from "../(components)/RetrieveBooking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retrieve Booking | GoBusly",
  description:
    "Easily retrieve your bus booking details with GoBusly. Enter your booking reference and email to access your travel information quickly.",
  keywords:
    "GoBusly, Retrieve Booking, Bus Ticket Lookup, Booking Reference, Travel Details, Bus Ticket Support, GoBusly Booking, Manage Booking",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Retrieve Booking | GoBusly",
    description:
      "Access your GoBusly bus booking details by entering your booking reference and email. Retrieve travel information quickly and easily.",
    url: "https://www.gobusly.com/account/bookings/retrieve-booking",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/retrieve-booking-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Retrieve Booking | GoBusly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retrieve Booking | GoBusly",
    description:
      "Quickly retrieve your GoBusly bus booking details. Access your travel information by entering your booking reference and email.",
  },
};

const RetrieveBookingPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <RetrieveBooking />
    </div>
  );
};

export default RetrieveBookingPage;
