"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { account } from "@/appwrite.config";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PaymentMethodCard from "./_components/payment-method-card";
import { PaymentMethod } from "@stripe/stripe-js";
import { useToast } from "@/components/hooks/use-toast";
import { useAuth } from "@/components/providers/auth-provider";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const enum CardNetwork {
  Visa = "visa",
  Mastercard = "mastercard",
  AmericanExpress = "americanexpress",
  Discover = "discover",
  UnionPay = "unionpay",
  Default = "default",
}

const cardColors: Record<CardNetwork, { bg: string; text: string }> = {
  [CardNetwork.Visa]: { bg: "bg-blue-600", text: "text-white" },
  [CardNetwork.Mastercard]: {
    bg: "bg-gradient-to-r from-red-500 to-yellow-500",
    text: "text-white",
  },
  [CardNetwork.AmericanExpress]: { bg: "bg-blue-900", text: "text-white" },
  [CardNetwork.Discover]: { bg: "bg-orange-500", text: "text-white" },
  [CardNetwork.UnionPay]: { bg: "bg-red-600", text: "text-white" },
  [CardNetwork.Default]: { bg: "bg-gray-800", text: "text-white" },
};

function WalletPageContent() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const [newMethodDialogOpen, setNewMethodDialogOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [customerFound, setCustomerFound] = useState<boolean>(false);
  const { user, loading } = useAuth();
  const [newCardDetails, setNewCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        if (!user?.stripe_customer_id) {
          setCustomerFound(false);
          return console.info("No such customer");
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${user?.stripe_customer_id}`
        );
        if (!response.ok) {
          setCustomerFound(false);
        }
        const data: any = await response.json();
        setPaymentMethods(data.data.data);
        setCustomerFound(true);
      } catch (err) {
        setCustomerFound(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentMethods();
  }, [user]);

  const handleAddNewMethod = async () => {
    try {
      // Implement actual API call to add payment method
      console.log("Adding new payment method:", newCardDetails);

      // Reset dialog and form
      setNewMethodDialogOpen(false);
      setNewCardDetails({
        cardNumber: "",
        expiry: "",
        cvc: "",
      });
    } catch (error) {
      console.error("Failed to add payment method", error);
      setError("Failed to add payment method");
    }
  };

  const removePaymentMethod = async (pm_id: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/pm/detach/${pm_id}/${user?._id}`
      );

      setPaymentMethods((prevMethods) =>
        prevMethods.filter((method) => method.id !== pm_id)
      );
    } catch (error) {
      console.error("Failed to remove payment method", error);
      setError("Failed to remove payment method");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewCardDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveCardInfo = async () => {
    if (!stripe || !elements) {
      toast({
        description: "Stripe is not initialized",
        variant: "destructive",
      });
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        toast({
          description: "Card details not found",
          variant: "destructive",
        });
        return;
      }

      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: user?.name || undefined,
            email: user?.email || undefined,
          },
        });

      if (stripeError) {
        toast({
          description: stripeError.message || "Failed to save payment method",
          variant: "destructive",
        });
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-setup-intent?customer_id=${user?.stripe_customer_id}&user_id=${user?._id}`,
        {
          payment_method_id: paymentMethod?.id,
        }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${user?.stripe_customer_id}`
      );
      const data: any = await response.json();
      setPaymentMethods(data.data.data);

      setNewMethodDialogOpen(false);

      toast({
        description: "Payment method saved successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        description:
          error?.response?.data?.message || "Failed to save payment method",
        variant: "destructive",
      });
    }
  };

  if (isLoading || loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {t("account.wallet")}
            </h2>
            <p className="text-muted-foreground mt-2">
              {t("wallet.managePaymentMethods")}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setNewMethodDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm font-medium">
              {t("wallet.addPaymentMethod")}
            </span>
          </Button>
        </div>

        {paymentMethods?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">
              {t("account.noPaymentMethodsAdded")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 ">
            {paymentMethods?.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                onRemove={removePaymentMethod}
              />
            ))}
          </div>
        )}

        <Dialog
          open={newMethodDialogOpen}
          onOpenChange={setNewMethodDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {t("wallet.addPaymentMethod")}
              </DialogTitle>
              <DialogDescription>
                {t("wallet.enterCardDetails")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaveCardInfo}
                className="w-full"
              >
                {t("wallet.addPaymentMethod")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Elements stripe={stripePromise}>
      <WalletPageContent />
    </Elements>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 mb-3" />
          <Skeleton className="h-6 w-60" />
        </div>
        <Skeleton className="h-10 w-48 mb-6" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-[230px]">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
