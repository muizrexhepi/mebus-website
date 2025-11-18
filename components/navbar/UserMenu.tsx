"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { Bookmark, LogOut, Menu, User } from "lucide-react";
import {
  FaAlignCenter,
  FaBell,
  FaBookmark,
  FaBus,
  FaCreditCard,
  FaHeadphones,
  FaKey,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";
import useIsMobile from "../hooks/use-mobile";

const UserNavbarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { user } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      window.dispatchEvent(new Event("userChange"));
    } catch (error) {}
  };

  const sidebarLinks = [
    {
      href: "/account/personal-info",
      icon: FaUser,
      label: t("sidebar.passengerDetails"),
    },
    {
      href: "/account/bookings",
      icon: FaBookmark,
      label: t("sidebar.yourBookings"),
    },
    {
      href: "/account/data-security",
      icon: FaKey,
      label: t("dataAndSecurity.title"),
    },
    {
      label: "Notifications",
      href: "/account/notifications",
      icon: FaBell,
    },
    {
      href: "/bus",
      icon: FaBus,
      label: t("nav.busdestinations"),
    },
    {
      href: "/bus-operators",
      icon: FaAlignCenter,
      label: t("nav.busoperators"),
    },
    // {
    //   label: "Discount codes",
    //   href: "/account/discount-codes",
    //   icon: FaTicketAlt,
    // },

    {
      label: t("footer.links.customersupport"),
      href: "/help",
      icon: FaHeadphones,
    },
    {
      label: t("nav.contact"),
      href: "/help/contact-support",
      icon: IoMdContact,
    },
  ];

  const MenuTrigger = (
    <Button
      aria-haspopup="true"
      aria-expanded="false"
      aria-label={t("nav.menu")}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:shadow-md transition-shadow"
      variant="ghost"
    >
      <Menu className="text-gray-700" size={16} />
      <Avatar className="h-7 w-7 border border-gray-200">
        <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
        <AvatarFallback className="bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm">
          {user?.name?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
    </Button>
  );

  const MenuItems = (
    <div className="flex flex-col">
      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="bg-gradient-to-r from-rose-500 to-orange-500 text-white">
                {user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="py-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors",
                "hover:bg-gray-100",
                pathname === link.href ? "bg-gray-100 font-medium" : ""
              )}
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="h-5 w-5 text-gray-600" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-auto p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-700 hover:bg-gray-100 hover:text-gray-900 font-normal h-10 px-1 text-base"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.logout")}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{MenuTrigger}</SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[360px] p-0 border-l shadow-xl"
        >
          <SheetHeader className="p-4 text-left border-b">
            <SheetTitle className="flex items-center">
              <Image
                src="/assets/icons/dark-logo.svg"
                alt="GoBusly"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
            {MenuItems}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{MenuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl mt-2 p-0 shadow-lg border border-gray-100"
      >
        {user && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="bg-gradient-to-r from-rose-500 to-orange-500 text-white">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="py-2">
          {sidebarLinks.slice(0, 5).map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="py-2.5 px-3 rounded-md cursor-pointer"
            >
              <Link href={link.href} className="flex items-center gap-3">
                <link.icon className="h-4 w-4 text-gray-600" />
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <div className="py-2">
          {/* {sidebarLinks.slice(5).map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="py-2.5 px-3 rounded-md cursor-pointer"
            >
              <Link href={link.href} className="flex items-center gap-3">
                <link.icon className="h-4 w-4 text-gray-600" />
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))} */}

          <DropdownMenuItem
            className="py-2.5 px-3 rounded-md cursor-pointer text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("auth.logout")}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
