"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  FileText,
  Wallet,
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentSuccessStore } from "@/store";
import axios from "axios";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";

const SuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const { isPaymentSuccess, bookingDetails } = usePaymentSuccessStore();
  const [walletSupport, setWalletSupport] = useState<{
    supported: boolean;
    platform: "ios" | "google" | null;
  }>({ supported: false, platform: null });
  const { user } = useAuth();
  // Detect wallet support based on platform
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isChrome =
      /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);

    if (isIOS) setWalletSupport({ supported: true, platform: "ios" });
    else if (isChrome)
      setWalletSupport({ supported: true, platform: "google" });
    else setWalletSupport({ supported: false, platform: null });
  }, []);

  if (!isPaymentSuccess || !bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 text-red-500 text-2xl font-bold">!</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("paymentSuccess.paymentFailed")}
            </h1>
            <p className="text-gray-600">
              {t("paymentSuccess.somethingWentWrong")}
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/">{t("paymentSuccess.returnHome")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const downloadPdf = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/booking/download/pdf/e-ticket/${bookingDetails.bookingId}`,
        responseType: "blob",
        headers: { Accept: "application/pdf" },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${bookingDetails.bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // optionally handle error
    }
  };

  const addToWallet = async () => {
    try {
      const endpoint =
        walletSupport.platform === "ios"
          ? `${process.env.NEXT_PUBLIC_API_URL}/wallet/ios/${bookingDetails.bookingId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/wallet/google/${bookingDetails.bookingId}`;

      const response = await axios.post(endpoint);
      if (response.data?.saveUrl) window.open(response.data.saveUrl, "_blank");
    } catch (error) {
      // optionally handle error
    }
  };

  // 🔹 Auto-download only once per booking (per browser session)
  useEffect(() => {
    if (!bookingDetails) return;

    const storageKey = `ticket-downloaded-${bookingDetails.bookingId}`;
    const alreadyDownloaded =
      typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;

    if (!alreadyDownloaded) {
      downloadPdf().then(() => {
        sessionStorage.setItem(storageKey, "true");
      });
    }
  }, [bookingDetails]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle
              className="h-8 w-8 text-green-600"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("paymentSuccess.paymentSuccessful")}
          </h1>
          <p className="text-gray-600">{t("paymentSuccess.thankYou")}</p>
        </div>

        {/* Journey Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              {t("paymentSuccess.yourJourney")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Route */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {t("paymentSuccess.from")}
                </div>
                <div className="font-medium text-gray-900 text-sm">
                  {bookingDetails.departureStation}
                </div>
              </div>

              <div className="flex-shrink-0 mx-4">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
                  {t("paymentSuccess.to")}
                  <MapPin className="w-4 h-4 ml-1" />
                </div>
                <div className="font-medium text-gray-900 text-sm">
                  {bookingDetails.arrivalStation}
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center text-gray-600 text-xs mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {t("paymentSuccess.date")}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {bookingDetails.departureDate.toLocaleDateString()}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center text-gray-600 text-xs mb-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {t("paymentSuccess.time")}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {moment.utc(bookingDetails?.departureDate).format("HH:mm")}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-1">
                {t("paymentSuccess.operator")}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {bookingDetails.operator || "Bus Operator"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction / Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {user ? (
              <Button asChild variant="outline" className="h-12">
                <Link href="/account/bookings">
                  <FileText className="w-4 h-4 mr-2" />
                  {t("paymentSuccess.myBookings")}
                </Link>
              </Button>
            ) : (
              <Button onClick={downloadPdf} variant="outline" className="h-12">
                <FileText className="w-4 h-4 mr-2" />
                {t("actions.downloadBooking")}
              </Button>
            )}

            {walletSupport.supported && (
              <Button onClick={addToWallet} variant="primary" className="h-12">
                <Wallet className="w-4 h-4 mr-2" />
                {t("paymentSuccess.addToWallet")}
              </Button>
            )}
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              {t("paymentSuccess.transactionDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t("paymentSuccess.bookingId")}
              </span>
              <span className="text-sm font-mono text-gray-900">
                {bookingDetails.bookingId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t("paymentSuccess.paymentId")}
              </span>
              <span className="text-xs font-mono text-gray-900">
                {bookingDetails.transactionId?.slice(-12) || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-medium text-gray-900">
                {t("paymentSuccess.amountPaid")}
              </span>
              <span className="font-bold text-lg text-gray-900">
                €{bookingDetails.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">{t("paymentSuccess.proTip")}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
