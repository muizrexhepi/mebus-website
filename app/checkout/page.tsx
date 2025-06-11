import CheckoutForm from "@/components/forms/CheckoutForm";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Metadata } from "next";
import { MobileCheckoutBlock } from "../search/_components/checkout-mobile-header";

export const metadata: Metadata = {
  title: "Checkout | GoBusly",
};

const Checkout = () => {
  return (
    <div className="min-h-screen bg-primary-bg/5">
      {" "}
      <MobileCheckoutBlock />
      <div className="min-h-screen max-w-6xl paddingX mx-auto py-8 space-y-4">
        <CheckoutForm />
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default Checkout;
