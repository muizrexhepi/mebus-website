import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import ClientMebusDiscountOffers from "@/components/help/DiscountTabs";

export const metadata = {
  title: "GoBusly - Discounts and Offers",
  description:
    "Discover exclusive discounts, deals, and special offers for your next bus trip with GoBusly. Save more on your travels today!",
  keywords:
    "GoBusly, Discounts, Bus Deals, Offers, Special Offers, Bus Travel Savings, Travel Discounts",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Discounts and Offers",
    description:
      "Explore GoBusly discounts and special offers to save on your bus bookings. Check out the latest deals today!",
    url: "https://www.GoBusly.eu/discounts",
    type: "website",
    images: [
      {
        url: "https://www.GoBusly.eu/images/discounts-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Discounts and Offers",
      },
    ],
  },
};

const offers = {
  current: [
    {
      title: "Early Bird Special",
      description:
        "Book your trip at least 14 days in advance and save up to 20%",
      code: "EARLYBIRD20",
      icon: "CalendarDays",
      expiry: "2024-12-31",
    },
    {
      title: "Group Discount",
      description: "Travel with 4 or more people and each person gets 15% off",
      code: "GROUP15",
      icon: "Users",
      expiry: "2024-12-31",
    },
    {
      title: "Student Saver",
      description: "Students get 10% off all trips with valid student ID",
      code: "STUDENT10",
      icon: "Zap",
      expiry: "2024-12-31",
    },
  ],
  upcoming: [
    {
      title: "Summer Sale",
      description: "Get 25% off all trips during July and August",
      code: "SUMMER25",
      icon: "Percent",
      expiry: "2024-08-31",
    },
  ],
};

export default function MebusDiscountOffers() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Discount Offers</h1>

      <ClientMebusDiscountOffers offers={offers} />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How to Redeem Offers</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Choose your desired trip on the GoBusly app or website</li>
          <li>Proceed to the checkout page</li>
          <li>Enter the offer code in the designated field</li>
          <li>The discount will be applied to your total fare</li>
          <li>Complete your booking to secure the discounted rate</li>
        </ol>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Offers cannot be combined with other promotions or discounts</li>
          <li>
            Discounts are subject to availability and may change without notice
          </li>
          <li>
            Offer codes must be entered at the time of booking and cannot be
            applied retroactively
          </li>
          <li>
          GoBusly reserves the right to modify or cancel offers at any time
          </li>
          <li>
            Additional terms may apply to specific offers. Please check offer
            details for more information
          </li>
        </ul>
      </div>

      <SecondaryFooter className="max-w-6xl mt-16" />
    </div>
  );
}
