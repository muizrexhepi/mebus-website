"use client";

import type React from "react";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, LogOut, HelpCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useNavbarStore } from "@/store";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { FaBookmark, FaHeadphones, FaKey, FaUser } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface AccountSetting {
  href: string;
  icon: IconComponent;
  title: string;
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
    href: "/account/data-security",
    icon: FaKey,
    title: "dataAndSecurity.title", // Updated for translation
  },
  // {
  //   href: "/account/discount-codes",
  //   icon: Ticket,
  //   title: "sidebar.discountCodes",
  // },
  // {
  //   href: "/account/notifications",
  //   icon: Bell,
  //   title: "sidebar.notifications",
  // },
  {
    href: "https://support.gobusly.com/contact",
    icon: FaHeadphones,
    title: "helpPage.quickLinks.contactSupport",
  },
];

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { setOpenLogin } = useNavbarStore();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      window.dispatchEvent(new Event("userChange"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUnauthenticatedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenLogin(true);
  };

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block max-w-5xl mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {t("account.account")}
          </h1>
          {isAuthenticated ? (
            <p className="text-xl text-gray-700">
              {user?.name},{" "}
              <span className="font-normal text-gray-600">{user?.email}</span>
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <p className="text-lg text-muted-foreground">
                {t(
                  "account.notLoggedInDescription",
                  "Create an account or sign in to manage your bookings and profile."
                )}
              </p>
              <Button
                variant="default"
                onClick={() => setOpenLogin(true)}
                className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700"
              >
                {t("account.signInOrRegister", "Sign In or Register")}
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCOUNT_SETTINGS.map((link) => {
            const isExternal = link.href.startsWith("http");
            const isSupportLink =
              link.href === "https://support.gobusly.com/contact";

            if (!isAuthenticated && !isSupportLink) {
              return (
                <button
                  key={link.title}
                  onClick={handleUnauthenticatedClick}
                  className="block w-full"
                >
                  <Card className="h-full flex flex-col justify-between items-start p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-0 flex flex-col justify-between items-start h-full w-full">
                      <link.icon className="w-10 h-10 mb-4 text-gray-400" />
                      <h2 className="text-xl font-semibold text-gray-600">
                        {t(link.title)}
                      </h2>
                    </CardContent>
                  </Card>
                </button>
              );
            }

            return (
              <Link
                key={link.title}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block"
                prefetch={false}
              >
                <Card className="h-full flex flex-col justify-between items-start p-6 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-0 flex flex-col justify-between items-start h-full w-full">
                    <link.icon
                      className="w-10 h-10 mb-4"
                      style={{
                        background:
                          "linear-gradient(to top right, #ff6700, #ff007f)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {t(link.title)}
                    </h2>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {/* Header */}
        <div className=" pt-6 pb-4 border-b border-gray-200">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#ff6700] to-[#ff007f] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-3">
                {t("login.getFullExperience", "Log in to view your bookings")}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md">
                {t(
                  "login.experienceDescription",
                  "Sign in or create an account to access your past and upcoming bus ticket bookings."
                )}
              </p>
              <Button variant="primary" onClick={() => setOpenLogin(true)}>
                {t("auth.login")}
              </Button>
            </div>
          )}
        </div>

        {/* Account Menu */}
        <div className=" mt-4">
          {ACCOUNT_SETTINGS.map((link) => {
            const isExternal = link.href.startsWith("http");
            const isSupportLink =
              link.href === "https://support.gobusly.com/contact";

            if (!isAuthenticated && !isSupportLink) {
              return (
                <button
                  key={link.title}
                  onClick={() => setOpenLogin(true)}
                  className="w-full flex items-center justify-between py-4 border-b  border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <link.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-base font-normal text-gray-600">
                      {t(link.title)}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              );
            }

            return (
              <Link
                key={link.title}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                prefetch={false}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-base font-normal text-gray-900">
                    {t(link.title)}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            );
          })}

          {/* Logout Button */}
          {isAuthenticated && (
            <button
              className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors w-full"
              onClick={handleLogout}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-base font-medium text-red-600">
                  {t("auth.logout")}
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        {/* Bottom spacing to avoid tab bar overlap */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
