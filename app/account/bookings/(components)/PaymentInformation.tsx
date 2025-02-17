import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";
import { Booking } from "@/models/booking";

const PaymentInformation = ({ booking }: { booking: Booking }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCardIcon className="mr-2" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Price:</span>
          <span className="text-2xl font-bold">
            ${booking.price.toFixed(2)}
          </span>
        </div>
        {booking.charge && (
          <>
            <div className="space-y-2">
              <div className="font-semibold">Charge Details:</div>
              <div className="flex justify-between">
                <span>Amount Charged:</span>
                <span>${(booking.charge.amount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Currency:</span>
                <span>{booking.charge.currency.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Card:</span>
                <div className="flex items-center space-x-2">
                  <CreditCardIcon className="text-primary" />
                  <span>
                    {booking.charge.payment_method_details.card.brand.toUpperCase()}{" "}
                    ** {booking.charge.payment_method_details.card.last4}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInformation;
