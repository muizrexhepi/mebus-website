import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Metadata } from "next";
import HelpPageClient from "@/components/help/HelpPageClient";

export const metadata: Metadata = {
  title: "Help Center | Busly - Your Reliable Bus Booking Service",
  description:
    "Find answers to your questions and get support for your bus bookings with Busly. Access our knowledge base, learn how to use our services, and reach out for assistance.",
};

export default function HelpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>
      <HelpPageClient />
      <SecondaryFooter />
    </div>
  );
}
