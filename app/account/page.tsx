"use client";
import Link from "next/link";
import { ComponentType, SVGProps, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
interface AccountSetting {
  href: string;
  icon: IconComponent;
  title: string;
  description?: string;
}

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirect to home or login page
    }
  }, [isAuthenticated, router]);

  const ACCOUNT_SETTINGS: AccountSetting[] = [
    {
      href: "/account/personal-info",
      icon: FaUser,
      title: t("sidebar.passengerDetails"),
    },
    {
      href: "/account/bookings",
      icon: FaBookmark,
      title: t("sidebar.yourBookings"),
    },
    {
      href: "/account/wallet",
      icon: FaCreditCard,
      title: t("sidebar.paymentMethods"),
    },
    {
      href: "/account/discount-codes",
      icon: FaTicketAlt,
      title: t("sidebar.discountCodes"),
    },
    {
      href: "/account/notifications",
      icon: FaBell,
      title: t("sidebar.notifications"),
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block max-w-5xl mx-auto space-y-8 md:space-y-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{t("account.account")}</h1>
          {isAuthenticated ? (
            <div>
              <p className="text-xl font-medium">
                {user?.name}, <span className="font-normal">{user?.email}</span>
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
            </div>
          )}
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
          {isAuthenticated ? (
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
          ) : (
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="bg-white">
          {ACCOUNT_SETTINGS.map((link, index) => (
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
