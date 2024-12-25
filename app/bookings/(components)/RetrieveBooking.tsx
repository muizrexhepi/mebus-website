import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RetrieveBooking() {
  return (
    <Card className="w-full max-w-[600px] mx-auto shadow-sm">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold text-[#0a1e47]">
          Retrieve your booking
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Enter your booking number and email address below and we'll find your
          ticket for you. We sent your booking number to you in your
          confirmation email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="booking-number"
                className="text-sm font-medium text-gray-700"
              >
                Booking number
              </label>
              <Input id="booking-number" type="text" className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input id="email" type="email" className="bg-gray-50" />
            </div>
          </div>
          <Button
            className="w-full bg-[#ff7b7b] hover:bg-[#ff6b6b] text-white font-medium py-6"
            variant="primary"
          >
            Retrieve booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
