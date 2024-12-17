import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { XCircleIcon } from "lucide-react";
import Link from "next/link";

export const RefundedMessage = () => (
  <div className="container mx-auto py-8 px-4">
    <Card className="w-full max-w-3xl mx-auto border-red-200">
      <CardHeader>
        <CardTitle className="text-red-600">
          Booking Refunded or Canceled
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <XCircleIcon className="text-red-500" />
          <p>
            This booking has been refunded or canceled and is no longer valid.
          </p>
        </div>
        <Button asChild variant={"primary"}>
          <Link
            href="/"
            className="mt-4 px-4 py-2 text-white rounded-md inline-block text-center"
          >
            Go to Home
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);
