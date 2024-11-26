import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import HowToBook from "../_components/how-to-book";

export const metadata: Metadata = {
  title: "How to Book - Help Center | GoBusly",
  description:
    "Learn how to book your bus ticket step by step with GoBusly. Get tips for a smooth booking process and find answers to common questions to make your travel easier.",
  keywords:
    "GoBusly, How to Book, Bus Ticket Booking, Step-by-Step Guide, Booking Process, Customer Support, Travel Tips, Common Questions",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "How to Book - Help Center | GoBusly",
    description:
      "Follow our step-by-step guide to booking a bus ticket with GoBusly. Get helpful tips and answers to frequently asked questions for a seamless booking experience.",
    url: "https://www.gobusly.com/help/how-to-book",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/how-to-book-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly How to Book Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Book - Help Center | GoBusly",
    description:
      "Discover how to easily book your bus ticket with GoBusly. Our step-by-step guide and FAQs ensure a smooth booking process.",
  },
};

export default function HowToBookPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div> */}
      <HowToBook />
      {/* <SecondaryFooter className="max-w-4xl" /> */}
    </div>
  );
}
