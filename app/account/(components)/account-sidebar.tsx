"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FaBell,
  FaBookmark,
  FaCreditCard,
  FaUser,
  FaTicketAlt,
  FaKey,
} from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import i18n hook

const sidebarLinks = [
  {
    labelKey: "personalInfo.title", // Updated for translation
    href: "/account/personal-info",
    icon: FaUser,
  },
  {
    labelKey: "sidebar.yourBookings", // Updated for translation
    href: "/account/bookings",
    icon: FaBookmark,
  },
  {
    labelKey: "dataAndSecurity.title", // Updated for translation
    href: "/account/data-security",
    icon: FaKey,
  },
  // {
  //   labelKey: "sidebar.paymentMethods", // Updated for translation
  //   href: "/account/wallet",
  //   icon: FaCreditCard,
  // },
  // {
  //   labelKey: "sidebar.discountCodes", // Updated for translation
  //   href: "/account/discount-codes",
  //   icon: FaTicketAlt,
  // },
  {
    labelKey: "sidebar.notifications", // Updated for translation
    href: "/account/notifications",
    icon: FaBell,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation(); // Use the translation hook

  return (
    <nav className="w-[240px] hidden md:block flex-shrink-0 shadow-sm h-fit rounded-xl overflow-hidden bg-white">
      <ul className="divide-y">
        {sidebarLinks.map((link) => {
          const isActive = pathname.includes(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center text-primary-bg gap-3 p-4 text-sm transition-colors",
                  "hover:bg-accent",
                  isActive ? "font-semibold" : "font-normal"
                )}
              >
                <link.icon className="h-4 w-4" />
                {t(link.labelKey)} {/* Use translation here */}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
