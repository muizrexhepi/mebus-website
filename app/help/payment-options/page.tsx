import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Payment Options - Help Center | GoBusly",
  description:
    "Learn about the different payment methods available for booking your bus tickets with GoBusly. Manage your payment preferences and explore upcoming payment options.",
  keywords:
    "GoBusly, Payment Options, Bus Ticket Payment, Payment Methods, Manage Payment Preferences, Payment Choices, Bus Booking, Upcoming Payment Methods",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Payment Options - Help Center | GoBusly",
    description:
      "Explore the various payment methods available for your GoBusly bus bookings. Learn how to manage your payment preferences and discover future payment options.",
    url: "https://www.gobusly.com/help/payment-options",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/payment-options-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Payment Options",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Options - Help Center | GoBusly",
    description:
      "Discover all the payment methods available for booking your GoBusly bus tickets. Learn how to manage payment preferences and upcoming options.",
  },
};

export default function PaymentOptionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Payment Options
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accepted Payment Methods</CardTitle>
            <CardDescription>
              Learn about the payment options currently available on our
              platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Card Payments:</strong> You can pay for your bookings
                using credit or debit cards. We support all major card
                providers.
              </li>
              <li>
                <strong>Account Balance:</strong> Deposit money to your account
                in advance to pay for bookings without needing to enter your
                card details every time. Your account balance will be
                automatically applied to future purchases.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* How to Add Funds Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Add Funds to Your Account</CardTitle>
            <CardDescription>
              Add funds to your account balance for faster and easier future
              payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Adding funds to your account is the best choice for frequent
              travelers. Here&apos;s why:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                Faster bookings: No need to enter card details for every
                purchase
              </li>
              <li>Convenience: Your deposited money is always ready for use</li>
              <li>
                Security: Reduce the frequency of online card transactions
              </li>
              <li>Budget management: Easily track your travel spending</li>
            </ul>
            <p className="mb-4 text-muted-foreground">
              If you travel often, having a funded account means you&apos;re
              always ready to book without fumbling for your card or worrying
              about transaction limits.
            </p>
            <p className="font-semibold mb-4">Here&apos;s how to add funds:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our platform</li>
              <li>
                Navigate to the &quot;Account&quot; then click
                &quot;Deposit&quot; section
              </li>
              <li>
                Select &quot;Deposit Funds&quot; and enter the amount you&apos;d
                like to add
              </li>
              <li>Complete the deposit using your credit or debit card</li>
              <li>
                Your account balance will be updated, and you can use it for
                future bookings
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payment Options</CardTitle>
            <CardDescription>
              We are constantly working to improve your payment experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Soon, we&apos;ll be introducing more convenient payment methods to
              give you flexibility and choice.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Mobile Payment Options (e.g., Apple Pay, Google Pay)</li>
              <li>PayPal and other e-wallet services</li>
              <li>Bank Transfers</li>
              <li>Local payment methods based on your region</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Stay tuned for updates as we expand our payment options to make
              your experience even better.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
