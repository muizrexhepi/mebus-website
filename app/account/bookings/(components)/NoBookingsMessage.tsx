"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface NoBookingsMessageProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

export function NoBookingsMessage({
  isLoading,
  isAuthenticated,
  onLoginClick,
}: NoBookingsMessageProps) {
  const { t } = useTranslation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {t("login.getFullExperience", "Log in to view your bookings")}
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md">
          {t(
            "login.experienceDescription",
            "Sign in or create an account to access your past and upcoming bus ticket bookings."
          )}
        </p>
        <Button onClick={onLoginClick} variant={"primary"} size={"lg"}>
          {t("login.signInButton", "Sign In or Register")}
        </Button>
        <Image
          src="/assets/icons/no-bookings.svg"
          alt="Login required illustration"
          width={200}
          height={200}
          className="mb-8"
        />
      </div>
    );
  }

  // Authenticated but no bookings
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Image
        src="/assets/icons/no-bookings.svg"
        alt="No bookings found illustration"
        width={200}
        height={200}
        className="mb-8"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {t("bookings.noBookingsFound", "No Bookings Found")}
      </h2>
      <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md">
        {t(
          "bookings.noBookingsDescription",
          "You don't have any bus ticket bookings yet. Start exploring and book your next trip!"
        )}
      </p>
      <Button
        asChild
        className="bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 px-8 py-6 text-lg rounded-lg shadow-lg"
      >
        <Link href="/">{t("bookings.bookNewTicket", "Book a New Ticket")}</Link>
      </Button>
    </div>
  );
}
