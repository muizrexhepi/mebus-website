"use client";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const PAGE_TITLES: Record<string, string> = {
  "/account": "account.account",
  "/account/personal-info": "sidebar.passengerDetails",
  "/account/bookings": "sidebar.yourBookings",
  "/account/wallet": "sidebar.paymentMethods",
  "/account/discount-codes": "sidebar.discountCodes",
  "/account/notifications": "sidebar.notifications",
  "/account/login-security": "account.security",
};

export function AccountHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  // Only show on mobile for account pages
  const shouldShow = pathname.includes("/account");

  if (!shouldShow) {
    return null;
  }

  const pageTitle = PAGE_TITLES[pathname] || "account.account";

  const handleBack = () => {
    if (pathname === "/account") {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handleBack}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors",
            {
              hidden:
                pathname === "/account" || pathname === "/account/bookings",
            }
          )}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">
          {t(pageTitle)}
        </h1>

        {/* Empty div for balance */}
        <div
          className={cn("w-8", {
            hidden: pathname === "/account" || pathname === "/account/bookings",
          })}
        />
      </div>
    </div>
  );
}
