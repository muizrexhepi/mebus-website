"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import {
  FaBell,
  FaBookmark,
  FaCreditCard,
  FaUser,
  FaTicketAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "@/components/providers/auth-provider";
import { useNavbarStore } from "@/store";
import { Button } from "@/components/ui/button";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface AccountSetting {
  href: string;
  icon: IconComponent;
  title: string;
  description?: string;
}

const ACCOUNT_SETTINGS: AccountSetting[] = [
  {
    href: "/account/personal-info",
    icon: FaUser,
    title: "sidebar.passengerDetails",
  },
  {
    href: "/account/bookings",
    icon: FaBookmark,
    title: "sidebar.yourBookings",
  },
  {
    href: "/account/wallet",
    icon: FaCreditCard,
    title: "sidebar.paymentMethods",
  },
  {
    href: "/account/discount-codes",
    icon: FaTicketAlt,
    title: "sidebar.discountCodes",
  },
  {
    href: "/account/notifications",
    icon: FaBell,
    title: "sidebar.notifications",
  },
];

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { setOpenLogin } = useNavbarStore();

  // Show loading state (skeletons) while authentication status is being checked
  if (isAuthenticated === null) {
    return (
      <div className="w-full">
        {/* Desktop view loading state */}
        <div className="hidden md:block max-w-5xl mx-auto space-y-8 md:space-y-16">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">{t("account.account")}</h1>
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACCOUNT_SETTINGS.map((link) => (
              <div
                key={link.title}
                className="bg-white shadow min-h-[150px] rounded-lg p-4"
              >
                <div className="h-full flex flex-col justify-between items-start">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile view loading state */}
        <div className="md:hidden">
          <div className="bg-white pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
          <div className="bg-white">
            {ACCOUNT_SETTINGS.map((link) => (
              <div
                key={link.title}
                className="flex items-center justify-between py-4 border-b border-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
            ))}
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    );
  }

  // Show unauthenticated state if user is not logged in
  if (!isAuthenticated) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
        <h1 className="text-3xl font-semibold mb-4">
          {t("account.notLoggedInTitle", "Access your account")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t(
            "account.notLoggedInDescription",
            "Sign in or create an account to view your bookings, personal info, and more."
          )}
        </p>
        <Button
          variant={"primary"}
          onClick={() => setOpenLogin(true)}
          className="h-12 px-8 text-lg"
        >
          {t("account.signInOrRegister", "Sign in or Register")}
        </Button>
      </div>
    );
  }

  // Authenticated view (original content)
  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block max-w-5xl mx-auto space-y-8 md:space-y-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{t("account.account")}</h1>
          <div>
            <p className="text-xl font-medium">
              {user?.name}, <span className="font-normal">{user?.email}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ACCOUNT_SETTINGS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="bg-white shadow min-h-[150px] rounded-lg p-4 hover:bg-gray-50 transition-colors"
              prefetch={false}
            >
              <div className="h-full flex flex-col justify-between items-start">
                {link.icon && (
                  <link.icon
                    className="w-8 h-8"
                    style={{
                      background:
                        "linear-gradient(to top right, #ff6700, #ff007f)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  />
                )}
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">{link.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile view */}
      <div className="md:hidden">
        {/* User Profile Section */}
        <div className="bg-white pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#ff6700] to-[#ff007f] rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
        {/* Menu Items */}
        <div className="bg-white">
          {ACCOUNT_SETTINGS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-25 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {link.title}
                  </h3>
                </div>
              </div>
              <FaChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
        {/* Bottom spacing to avoid tab bar overlap */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
