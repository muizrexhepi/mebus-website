'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CreditCard, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { account } from '@/appwrite.config';

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

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const user = await account.get()
        console.log({acc: user})
        const response = await fetch(`http://localhost:1234/payment/customer/retrieve-payment-methods/${user.prefs.stripe_customer_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }
        const data: any = await response.json();
        console.log(data.data)
        setPaymentMethods(data.data.data);
      } catch (err) {
        setError('Error fetching payment methods');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentMethods();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wallet</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods?.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}
        <AddPaymentMethodCard />
      </div>
    </div>
  );
}

function PaymentMethodCard({ method }: { method: PaymentMethod }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2" />
          {method.card.brand.toUpperCase()} ••••{method.card.last4}
        </CardTitle>
        <CardDescription>Expires {method.card.exp_month}/{method.card.exp_year}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">Manage</Button>
      </CardContent>
    </Card>
  );
}

function AddPaymentMethodCard() {
  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <CardContent>
        <Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center">
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
    <div className="container mx-auto px-4 py-8">
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

