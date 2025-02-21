import { Metadata } from "next";
import BookingsDashboardClient from "./(components)/BookingsDashboardClient";

export const metadata: Metadata = {
  title: "My Bookings | Manage Your Travel Reservations",
  description:
    "View and manage all your upcoming and past travel bookings, modify travel dates, and access booking details.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/account/bookings`,
  },
  openGraph: {
    title: "My Bookings Dashboard",
    description: "Manage all your travel bookings in one place",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/bookings`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "travel bookings",
    "flight reservations",
    "manage bookings",
    "travel itinerary",
    "booking dashboard",
  ],
};

const BookingsPage = () => {
  return <BookingsDashboardClient />;
};

export default BookingsPage;
