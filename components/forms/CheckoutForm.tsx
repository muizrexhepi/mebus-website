"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useAbandonedCheckout } from "../hooks/use-abandoned-checkout";
import PassengerInfo from "@/app/checkout/_components/PassengerInfo";
import Extras from "@/app/checkout/_components/ExtrasInfo";
import PaymentMethod from "@/app/checkout/_components/PaymentMethod";
import OrderSummary from "@/app/checkout/_components/OrderSummary";
import LoginCTA from "@/app/checkout/_components/LoginCTA";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const ResumeCheckoutAlert = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const resumeSessionId = searchParams.get("resume");

  useEffect(() => {
    if (resumeSessionId) {
      console.log("🔄 Resuming checkout session:", resumeSessionId);

      toast({
        title: "Welcome back! 👋",
        description:
          "We've saved your booking details. Complete your purchase below.",
        duration: 5000,
      });
    }
  }, [resumeSessionId, toast]);

  if (!resumeSessionId) {
    return null;
  }

  return (
    <Alert className="mb-6 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        <strong>Welcome back!</strong> We've saved your booking details.
        Complete your purchase below to secure your seats.
      </AlertDescription>
    </Alert>
  );
};

const CheckoutForm = () => {
  const { sessionId, resetTimeout } = useAbandonedCheckout();

  useEffect(() => {
    if (!resetTimeout) return;

    const handleUserActivity = () => {
      resetTimeout();
    };

    const events = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "input",
      "change",
      "focus",
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimeout]);

  return (
    <div className="space-y-6">
      <ResumeCheckoutAlert />

      <div className="relative mx-auto flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-[2] flex flex-col gap-4">
          {" "}
          <LoginCTA />
          <PassengerInfo />
          <Extras />
          <PaymentMethod />
        </div>

        <div className="hidden flex-1 md:flex flex-col gap-4 sticky top-10 h-fit">
          <OrderSummary />

          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-xs">
              <p>
                <strong>Session ID:</strong> {sessionId || "Not generated"}
              </p>
              <p></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
