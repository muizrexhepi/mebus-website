"use client";

import { CheckCircle, Download, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentSuccessStore } from "@/store";
import { jsPDF } from "jspdf";

const SuccessPage: React.FC = () => {
  const { isPaymentSuccess, bookingDetails } = usePaymentSuccessStore();

  if (!isPaymentSuccess || !bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Payment Failed</CardTitle>
            <p className="text-muted-foreground">
              Something went wrong with your payment. Please try again.
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Function to generate and download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Set up styles
    const titleFont = 20;
    const subtitleFont = 16;
    const normalFont = 12;
    const lineHeight = 10;
    let yPos = 20;

    // Helper function to add centered text
    const addCenteredText = (text: string, font: number, y: number) => {
      doc.setFontSize(font);
      const textWidth =
        (doc.getStringUnitWidth(text) * font) / doc.internal.scaleFactor;
      const xPos = (pageWidth - textWidth) / 2;
      doc.text(text, xPos, y);
    };

    // Add header
    addCenteredText("Payment Successful!", titleFont, yPos);
    yPos += lineHeight * 2;

    // Add logo (replace with your actual logo path)
    // doc.addImage("/path/to/your/logo.png", "PNG", 20, yPos, 40, 40);
    // yPos += 50;

    // Add Payment Details
    doc.setFontSize(subtitleFont);
    doc.text("Payment Details", 20, yPos);
    yPos += lineHeight;

    doc.setFontSize(normalFont);
    doc.text(`Booking ID: ${bookingDetails.bookingId}`, 20, yPos);
    yPos += lineHeight;
    doc.text(
      `Payment Intent ID: ${bookingDetails.transactionId || "N/A"}`,
      20,
      yPos
    );
    yPos += lineHeight;
    doc.text(`Amount Paid: $${bookingDetails.price.toFixed(2)}`, 20, yPos);
    yPos += lineHeight * 2;

    // Add Travel Details
    doc.setFontSize(subtitleFont);
    doc.text("Travel Details", 20, yPos);
    yPos += lineHeight;

    doc.setFontSize(normalFont);
    doc.text(`From: ${bookingDetails.departureStation}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`To: ${bookingDetails.arrivalStation}`, 20, yPos);
    yPos += lineHeight;
    doc.text(
      `Departure: ${bookingDetails.departureDate.toLocaleString()}`,
      20,
      yPos
    );
    yPos += lineHeight;
    doc.text(
      `Operator: ${bookingDetails.operator || "Unknown Operator"}`,
      20,
      yPos
    );
    yPos += lineHeight * 2;

    // Add footer
    doc.setFontSize(normalFont);
    doc.text("Thank you for choosing our service!", 20, yPos);

    // Save the PDF
    doc.save("ticket.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle
              className="h-10 w-10 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Payment Successful!
          </CardTitle>
          <p className="text-muted-foreground">
            Thank you for your purchase. Below are the details of your
            successful transaction.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transaction Details */}
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

          {/* Travel Details */}
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

          {/* Buttons for Next Actions */}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
