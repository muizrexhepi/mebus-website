"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaHome, FaBookmark, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { HelpCircle, LifeBuoyIcon } from "lucide-react";

const mobileTabLinks = [
  {
    labelKey: "searchForm.searchButton.default",
    href: "/",
    icon: FaHome,
  },
  {
    labelKey: "nav.bookings",
    href: "/account/bookings",
    icon: FaBookmark,
  },
  // {
  //   labelKey: "nav.help",
  //   href: "/help",
  //   icon: LifeBuoyIcon,
  // },
  {
    labelKey: "nav.account",
    href: "/account",
    icon: FaUser,
  },
];

const MobileTabs = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const shouldShowTabs =
    pathname !== "/checkout" && !pathname.includes("/search");

  if (!shouldShowTabs) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white border-t border-gray-200 ">
        <div className="flex justify-around items-center py-1">
          {mobileTabLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/account" &&
                pathname.includes("/account") &&
                pathname !== "/account/bookings") ||
              (link.href === "/help" && pathname.includes("/help"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 transition-colors duration-200",
                  "min-w-[60px]"
                )}
              >
                <div className="flex items-center justify-center mb-1">
                  <link.icon
                    className={cn(
                      "h-6 w-6 transition-colors duration-200",
                      isActive ? "text-[#ff007f] " : "text-gray-400"
                    )}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(to top right, #ff6700, #ff007f)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : {}
                    }
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-200",
                    isActive
                      ? "text-transparent bg-gradient-to-tr from-[#ff6700] to-[#ff007f] bg-clip-text font-semibold"
                      : "text-gray-500"
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(to top right, #ff6700, #ff007f)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {t(link.labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileTabs;
