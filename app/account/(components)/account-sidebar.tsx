"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaBell, FaBookmark, FaCreditCard, FaUser } from "react-icons/fa";

const sidebarLinks = [
  {
    label: "Passenger details",
    href: "/account/personal-info",
    icon: FaUser,
  },
  {
    label: "Your bookings",
    href: "/bookings",
    icon: FaBookmark,
  },
  {
    label: "Payment methods",
    href: "/account/wallet",
    icon: FaCreditCard,
  },
  {
    label: "Notifications",
    href: "/account/notifications",
    icon: FaBell,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-[240px] hidden md:block flex-shrink-0 shadow h-fit rounded-xl overflow-hidden">
      <ul className="divide-y">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
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
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
