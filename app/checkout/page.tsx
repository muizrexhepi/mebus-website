import Footer from "@/components/Footer";
import CheckoutForm from "@/components/forms/CheckoutForm";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | GoBusly",
};

const Checkout = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-center items-center bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95 px-4 sm:px-8 xl:px-20 py-4">
        <SecondaryNavbar />
      </div>
      <div className="min-h-screen px-4 sm:px-8 max-w-6xl mx-auto py-8 xl:px-0 space-y-4">
        <CheckoutForm />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Checkout;
