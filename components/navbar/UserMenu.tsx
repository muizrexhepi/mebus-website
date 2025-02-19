"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { LogOut, Menu, UserCircle } from "lucide-react";
import {
  FaBell,
  FaBookmark,
  FaCreditCard,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

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
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/components/providers/auth-provider";
import useIsMobile from "@/components/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { IoMdContact } from "react-icons/io";

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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarLinks = [
    {
      label: "Passenger details",
      href: "/account/personal-info",
      icon: FaUser,
    },
    {
      label: "Your bookings",
      href: "/account/bookings",
      icon: FaBookmark,
    },
    {
      label: "Payment methods",
      href: "/account/wallet",
      icon: FaCreditCard,
    },
    {
      label: "Discount codes",
      href: "/account/discount-codes",
      icon: FaTicketAlt,
    },
    {
      label: "Notifications",
      href: "/account/notifications",
      icon: FaBell,
    },
    {
      label: t("footer.links.customersupport"),
      href: "/help",
      icon: BiSupport,
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
      aria-label={t("nav.routes")}
      className="flex items-center space-x-2 px-3 py-3 rounded-full border border-border bg-white hover:bg-white hover:shadow outline-none transition"
    >
      <Menu className="text-gray-500" size={18} />
      {user ? (
        <div className="size-7 bg-white border rounded-full flex justify-center items-center">
          {user?.image ? (
            <img
              src={user.image || "/placeholder.svg"}
              alt={user.name}
              className="rounded-full"
            />
          ) : (
            <p className="font-medium text-black text-base">{user?.name[0]}</p>
          )}
        </div>
      ) : (
        <UserCircle className="text-gray-500" size={18} />
      )}
    </Button>
  );

  const MenuItems = (
    <>
      <div className="space-y-2 py-2 text-sm font-normal">
        {isMobile && (
          <>
            {sidebarLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 transition-colors",
                    "hover:bg-accent"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            {/* <Separator className="my-2" /> */}
          </>
        )}

        <Separator className="my-2" />
        <div className="px-4 flex items-center gap-3">
          <LogOut className="text-primary-accent size-4" />
          <Button
            variant="ghost"
            className="block px-0 h-fit button-gradient text-transparent hover:text-transparent bg-clip-text"
            onClick={handleLogout}
          >
            {t("auth.logout")}
          </Button>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{MenuTrigger}</SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] bg-[#f3f4f6] p-0 z-[99]"
        >
          <SheetHeader className="p-4 text-left border-b">
            <SheetTitle className="text-2xl font-bold">
              <Image
                src="/assets/icons/dark-logo.svg"
                alt="Logo"
                width={120}
                height={60}
                className="object-contain"
                priority
              />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col h-full">{MenuItems}</nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{MenuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-lg mt-2 px-0">
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link
            href="/account/personal-info"
            className="w-full !cursor-pointer px-4"
          >
            {t("nav.account")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link href="/help" className="w-full !cursor-pointer px-4">
            {t("footer.links.customersupport")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link
            href="/account/bookings"
            className="w-full !cursor-pointer px-4"
          >
            {t("nav.bookings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link
            href="/help/contact-support"
            className="w-full !cursor-pointer px-4"
          >
            {t("nav.contact")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="!cursor-pointer rounded-none py-2"
        >
          <span className="px-2">{t("auth.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
