"use client";

import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Booking } from "@/models/booking";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import PrintableBooking from "./PrintableBooking";
import axios from "axios";
interface DownloadableBookingPDFProps {
  booking: Booking;
}

export default function DownloadableBookingPDF({
  booking,
}: DownloadableBookingPDFProps) {
  const bookingRef = useRef<HTMLDivElement>(null);


  const downloadPdf = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/booking/download/pdf/e-ticket/${booking._id}`,
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ticket.pdf');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
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
        <Button onClick={downloadPdf} variant={"primary"}>
          Download PDF
        </Button>
      </div>
      <div className="w-full">
        <PrintableBooking booking={booking} ref={bookingRef} />
      </div>
    </div>
  );
}
