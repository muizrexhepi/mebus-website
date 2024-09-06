import CheckoutForm from "@/components/forms/CheckoutForm";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mebus | Checkout",
};

const Checkout = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-center items-center bg-neutral-900 px-4 sm:px-8 xl:px-20 py-4">
        <Navbar />
      </div>
      <div className="min-h-screen px-4 sm:px-8 max-w-6xl mx-auto py-8 space-y-4">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
