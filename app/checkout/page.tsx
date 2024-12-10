import CheckoutForm from "@/components/forms/CheckoutForm";
import Navbar from "@/components/navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | GoBusly",
};

const Checkout = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-center items-center bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95 px-4 sm:px-8 xl:px-20 py-4">
        <Navbar className="max-w-7xl mx-auto paddingX" />
      </div>
      <div className="min-h-screen max-w-7xl paddingX mx-auto py-8 space-y-4">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
