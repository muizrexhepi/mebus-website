import type { Metadata } from "next";
import CheckoutClientPage from "./_components/checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout ",
};

const Checkout = () => {
  return <CheckoutClientPage />;
};

export default Checkout;
