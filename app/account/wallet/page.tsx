"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CreditCard, 
  Plus, 
  Trash2 
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
  DialogFooter 
} from "@/components/ui/dialog";
import { account } from "@/appwrite.config";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
  };
}

export default function WalletPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
          const user = await account.get()
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${user?.prefs?.stripe_customer_id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch payment methods");
          }
          const data: any = await response.json();
          console.log(data.data);
          setPaymentMethods(data.data.data);
      } catch (err) {
        setError("Error fetching payment methods");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentMethods();
  }, []);

  const removePaymentMethod = async (pm_id: string) => {
    try {
      const user = await account.get()
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/pm/detach/${pm_id}/${user?.$id}`)
      
      // Update local state to remove the payment method
      setPaymentMethods(prevMethods => 
        prevMethods.filter(method => method.id !== pm_id)
      );
    } catch (error) {
      console.error("Failed to remove payment method", error);
      // Optionally, set an error state or show a toast notification
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("account.wallet")}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods?.map((method) => (
          <PaymentMethodCard 
            key={method.id} 
            method={method} 
            onRemove={removePaymentMethod} 
          />
        ))}
        <AddPaymentMethodCard />
      </div>
    </div>
  );
}

function PaymentMethodCard({ 
  method, 
  onRemove 
}: { 
  method: PaymentMethod, 
  onRemove: (pm_id: string) => void 
}) {
  const {t} = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2" />
          {method.card.brand.toUpperCase()} ••••{method.card.last4}
        </CardTitle>
        <CardDescription>
          {t("account.pmExpires")} {method.card.exp_month}/{method.card.exp_year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t("account.removePm")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("account.removePm")}</DialogTitle>
              <DialogDescription>
                {t("account.removePmAreYouSure", {
                  brand: method.card.brand.toUpperCase(),
                  last4: method.card.last4
                })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {t("actions.cancel")}
                </Button>
              </DialogClose>
              <Button 
                variant="destructive"
                onClick={() => onRemove(method.id)}
              >
                {t("actions.confirmCancellation")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function AddPaymentMethodCard() {
  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <CardContent>
        <Button
          variant="ghost"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <Plus className="h-12 w-12 mb-2" />
          <span>Add Payment Method</span>
        </Button>
      </CardContent>
    </Card>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-10 w-48 mb-6" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}