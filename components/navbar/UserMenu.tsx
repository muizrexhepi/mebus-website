"use client";

import { LogOut, Menu, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account } from "@/appwrite.config";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import useIsMobile from "../hooks/use-mobile";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useAuth } from "../providers/auth-provider";
import { signOut } from "next-auth/react";

const UserNavbarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      window.dispatchEvent(new Event("userChange"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
            <img src={user.image} />
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
        <Link
          href="/account"
          className="block px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.account")}
        </Link>
        <Link
          href="/bookings"
          className="block px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.bookings")}
        </Link>
        <Link
          href="/help"
          className="block px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          {t("footer.links.customersupport")}{" "}
        </Link>
        <Link
          href="/help/contact-support"
          className="block px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.contact")}
        </Link>
        <Separator />
        <div className="px-4 flex items-center gap-2 py-1">
          <LogOut className="text-primary-accent size-4" />

          <Button
            variant={"ghost"}
            className="block px-0 h-fit button-gradient text-transparent hover:text-transparent bg-clip-text"
            onClick={handleLogout}
          >
            {t("auth.logout")}
          </Button>
        </div>
        <Separator />
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
            <SheetTitle className="text-2xl font-bold pt-2">
              <Image
                src={"/assets/icons/dark-logo.svg"}
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
          <Link href="/account" className="w-full !cursor-pointer px-4">
            {t("nav.account")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link href="/help" className="w-full !cursor-pointer px-4">
            {t("footer.links.customersupport")}{" "}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2 rounded-none">
          <Link href="/bookings" className="w-full !cursor-pointer px-4">
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
