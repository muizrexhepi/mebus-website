"use client";

import { Menu, UserCircle } from "lucide-react";
import Link from "next/link";
import { useNavbarStore } from "@/store";
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
import { useTranslation } from "react-i18next"; // Importing the translation hook
import Image from "next/image";

const NavbarMenu = () => {
  const { t } = useTranslation(); // Using the translation hook
  const { setOpenLogin, setOpenRegister } = useNavbarStore();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogin = () => {
    setOpenLogin(true);
    setIsOpen(false);
  };

  const handleSignUp = () => {
    setOpenRegister(true);
    setIsOpen(false);
  };

  const MenuTrigger = (
    <Button
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Open menu"
      variant="ghost"
      className="flex items-center space-x-2 px-3 h-10 w-fit rounded-full bg-white/30 hover:bg-white/20 transition-colors"
    >
      <Menu color="white" />
      <UserCircle color="white" />
    </Button>
  );

  const MenuItems = (
    <>
      <div className="space-y-2 py-2">
        <Link
          href="/routes"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.routes")}
        </Link>
        <Link
          href="/bookings"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.bookings")}
        </Link>
        {/* <Link
          href="/about"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.about")}
        </Link> */}
        <Link
          href="/help"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.help")}
        </Link>
        <Link
          href="/help/contact-support"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.contact")}
        </Link>
        <Separator className="!mb-4" />
        <div className="flex flex-col gap-2 w-full px-4">
          <Button
            className="w-full h-12 rounded-lg"
            variant={"outline"}
            onClick={handleLogin}
          >
            {t("auth.login")}
          </Button>
          <Button
            className="w-full h-12 rounded-lg button-gradient"
            onClick={handleSignUp}
          >
            {t("auth.signUp")}
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
          className="w-full sm:w-[400px] bg-white p-0 z-[99]"
        >
          <SheetHeader className="p-4 text-left border-b">
            <SheetTitle className="text-2xl font-bold pt-2">
              <Image
                src={"/assets/icons/dark-logo.svg"}
                alt="Logo"
                width={140}
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
      <DropdownMenuContent align="end" className="w-42 rounded-lg mt-2">
        <DropdownMenuItem asChild>
          <Link href="/help" className="w-full">
            {t("nav.help")} {/* Translated 'Help & Support' */}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help/contact-support" className="w-full">
            {t("nav.contact")} {/* Translated 'Contact Us' */}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogin}>
          {t("auth.login")} {/* Translated 'Login' */}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSignUp}>
          {t("auth.signUp")} {/* Translated 'Sign Up' */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
