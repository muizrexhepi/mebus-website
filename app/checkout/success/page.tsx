"use client";

import React from "react";
import { CheckCircle, Download, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentSuccessStore } from "@/store";
import { jsPDF } from "jspdf";
import axios from "axios";

const SuccessPage: React.FC = () => {
  const { isPaymentSuccess, bookingDetails } = usePaymentSuccessStore();

  if (!isPaymentSuccess || !bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong with your payment. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const downloadPDF = async () => {
    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/download/pdf/e-ticket/${bookingDetails.bookingId}`
    );
    console.log({ req });
  };

  // const downloadPDF = () => {

  //   const doc = new jsPDF();
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  //   const margin = 20;
  //   let yPos = margin;

  //   const addText = (
  //     text: string,
  //     fontSize: number,
  //     isBold: boolean = false
  //   ) => {
  //     doc.setFontSize(fontSize);
  //     doc.setFont(isBold ? "bold" : "normal");
  //     doc.text(text, margin, yPos);
  //     yPos += fontSize / 2 + 5;
  //   };

  //   addText("Payment Confirmation", 24, true);
  //   yPos += 10;

  //   addText("Transaction Details", 16, true);
  //   addText(`Booking ID: ${bookingDetails.bookingId}`, 12);
  //   addText(`Payment Intent ID: ${bookingDetails.transactionId || "N/A"}`, 12);
  //   addText(`Amount Paid: $${bookingDetails.price.toFixed(2)}`, 12);
  //   yPos += 10;

  //   addText("Travel Details", 16, true);
  //   addText(`From: ${bookingDetails.departureStation}`, 12);
  //   addText(`To: ${bookingDetails.arrivalStation}`, 12);
  //   addText(`Departure: ${bookingDetails.departureDate.toLocaleString()}`, 12);
  //   addText(`Operator: ${bookingDetails.operator || "Unknown Operator"}`, 12);

  //   doc.setFontSize(10);
  //   doc.text(
  //     "Thank you for choosing our service!",
  //     margin,
  //     pageHeight - margin
  //   );

  //   doc.save("ticket.pdf");
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle
              className="h-10 w-10 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Below are the details of your
            successful transaction.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Booking ID:</span>
              <span className="text-muted-foreground">
                {bookingDetails.bookingId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Intent ID:</span>
              <span className="text-muted-foreground">
                {bookingDetails.transactionId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount Paid:</span>
              <span className="text-muted-foreground">
                ${bookingDetails.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Travel Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">From:</span>
              <span className="text-muted-foreground">
                {bookingDetails.departureStation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">To:</span>
              <span className="text-muted-foreground">
                {bookingDetails.arrivalStation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Departure:</span>
              <span className="text-muted-foreground">
                {bookingDetails.departureDate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Operator:</span>
              <span className="text-muted-foreground">
                {bookingDetails.operator || "Unknown Operator"}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/bookings">
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              View My Bookings
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={downloadPDF}
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Download Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
