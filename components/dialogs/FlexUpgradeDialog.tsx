import { useState, useEffect } from "react";
import { CalendarIcon, CreditCard, EuroIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/forms/PaymentForm";

// Assuming these types are defined elsewhere in your project
type Booking = any;
type AvailableDate = any;

interface FlexUpgradeSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  booking: Booking;
  availableDates: AvailableDate[];
  selectedDate: Date | undefined;
  isDateDisabled: (date: Date) => boolean;
  handleDateSelect: (date: Date | undefined) => void;
  handleSelectDepartureDate: (date: AvailableDate) => void;
  isExtraPaymentNeeded: boolean;
  stripePromise: any;
  isPaymentSuccess: boolean;
  priceToBePaid: number;
  handleChangeDepartureDate: () => void;
}

export function FlexUpgradeSheet({
  isOpen,
  setIsOpen,
  booking,
  availableDates,
  selectedDate,
  isDateDisabled,
  handleDateSelect,
  handleSelectDepartureDate,
  isExtraPaymentNeeded,
  stripePromise,
  isPaymentSuccess,
  priceToBePaid,
  handleChangeDepartureDate,
}: FlexUpgradeSheetProps) {
  const [newDepartureDate, setNewDepartureDate] = useState<AvailableDate>();
  const [filteredDates, setFilteredDates] = useState<AvailableDate[]>([]);

  useEffect(() => {
    const today = new Date();
    const todayDates = availableDates.filter(
      (date) =>
        new Date(date.departure_date).toDateString() === today.toDateString()
    );
    setFilteredDates(todayDates.length > 0 ? todayDates : availableDates);
  }, [availableDates]);

  const calculatePrice = (booking: Booking, date: AvailableDate) => {
    const totalNewPrice = date.price * booking?.passengers?.length;
    const priceDifference = totalNewPrice - booking.price;
    return priceDifference > 0 ? Number(priceDifference.toFixed(2)) : 0;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-[900px] p-0">
        <ScrollArea className="h-full w-full">
          <div className="p-6">
            <SheetHeader className="mb-6">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl font-semibold">
                  Change Travel Date
                </SheetTitle>

              </div>
            </SheetHeader>
            <div className="space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
              <div className="lg:w-1/2 space-y-2">
                <h3 className="text-lg font-medium">Select a new date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    handleDateSelect(date);
                    if (date) {
                      const dateStr = date.toDateString();
                      const filtered = availableDates?.filter(
                        (d) =>
                          new Date(d.departure_date).toDateString() === dateStr
                      );
                      setFilteredDates(
                        filtered.length > 0 ? filtered : availableDates
                      );
                    }
                  }}
                  disabled={isDateDisabled}
                  className="rounded-md border w-full"
                />
              </div>
              <div className="lg:w-1/2 space-y-2">
                <h3 className="text-lg font-medium">
                  Available travel options
                </h3>
                <ScrollArea className="h-[400px] w-full">
                  {filteredDates?.map((date: AvailableDate, index: number) => (
                    <Card
                      key={index}
                      className={`mb-2 cursor-pointer transition-all ${newDepartureDate?._id === date?._id
                        ? "border-primary"
                        : ""
                        }`}
                      onClick={() => {
                        setNewDepartureDate(date);
                        handleSelectDepartureDate(date);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">
                              {format(new Date(date?.departure_date), "PPP")}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            {date?.operator_info?.name || "Unknown Operator"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <EuroIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">
                              {calculatePrice(booking, date)} for{" "}
                              {booking?.passengers?.length} passengers
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Departs at{" "}
                            {format(new Date(date?.departure_date), "HH:mm")}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </div>
            </div>
            {isExtraPaymentNeeded && (
              <div className="space-y-4 mt-6">
                <Separator />
                <h3 className="text-lg font-medium">Payment Information</h3>
                {!isPaymentSuccess && (
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      redirect={false}
                      bookingId={booking?._id}
                      totalPrice={priceToBePaid}
                    />
                  </Elements>
                )}
                {isPaymentSuccess && (
                  <p className="text-green-600 font-medium">
                    Payment successful!
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleChangeDepartureDate}
                disabled={isPaymentSuccess}
              >
                {isExtraPaymentNeeded ? "Pay and Change Date" : "Change Date"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
