import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import HowToBook from "../_components/how-to-book";

export const metadata: Metadata = {
  title: "How to Book - Help Center",
  description:
    "Learn how to book your bus ticket step by step. Get tips for a smooth booking process and find answers to common questions.",
};

export default function HowToBookPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <HowToBook />
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
