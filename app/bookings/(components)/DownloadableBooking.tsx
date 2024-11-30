"use client";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Booking } from "@/models/booking";
import { Button } from "@/components/ui/button";
import PrintableBooking from "./PrintableBooking";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface DownloadableBookingPDFProps {
  booking: Booking;
}

export default function DownloadableBookingPDF({
  booking,
}: DownloadableBookingPDFProps) {
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (bookingRef.current) {
      const canvas = await html2canvas(bookingRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`booking-${booking._id}.pdf`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-start gap-2 items-center">
        <Link href="/bookings">
          <Button variant="outline" className="">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <Button onClick={handleDownload} variant={"primary"}>
          Download PDF
        </Button>
      </div>
      <div ref={bookingRef}>
        <PrintableBooking booking={booking} />
      </div>
    </div>
  );
}
