"use client";

import { Menu, UserCircle, ChevronRight, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
import { useNavbarStore } from "@/store";
import { cn } from "@/lib/utils";

// Icons
import { FaRoute, FaBus } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import useIsMobile from "../hooks/use-mobile";

// Removed the isScrolled prop from the signature
const NavbarMenu = () => {
  const { t } = useTranslation();
  const { setOpenLogin } = useNavbarStore();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogin = () => {
    setOpenLogin(true);
    setIsOpen(false);
  };

  const handleSignUp = () => {
    setOpenLogin(true);
    setIsOpen(false);
  };

  const navigationLinks = [
    {
      label: t("nav.bus"),
      href: "/bus",
      icon: FaBus,
    },
    {
      label: t("nav.routes"),
      href: "/routes",
      icon: FaRoute,
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

  // Reverted to a fixed, clean button style
  const MenuTrigger = (
    <Button
      aria-haspopup="true"
      aria-expanded="false"
      aria-label={t("nav.menu")}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:shadow-md transition-shadow"
      variant="ghost"
    >
      <Menu className="text-gray-700" size={16} />
      <UserCircle className="text-gray-700" size={20} />
    </Button>
  );

  const MobileMenuContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Auth Section - Now using standard button variants */}
      <div className="p-4 border-b bg-gray-50/50">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleLogin}
            // Use variant="outline"
            variant="outline"
            className="w-full justify-center gap-2 bg-white border-gray-200 text-gray-700"
          >
            <LogIn size={16} />
            {t("auth.login")}
          </Button>
          <Button
            onClick={handleSignUp}
            variant="primary"
            className="w-full justify-center gap-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-rose-500), var(--color-orange-500))",
            }}
          >
            <UserPlus size={16} />
            {t("auth.signUp")}
          </Button>
        </div>
      </div>

      {/* Navigation Links - Cleaned up to match UserNavbarMenu padding/style */}
      <div className="flex-1 overflow-y-auto py-2">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center justify-between px-4 py-3 transition-colors",
              "hover:bg-gray-100 active:bg-gray-200"
            )}
          >
            <div className="flex items-center gap-3">
              <link.icon className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700 font-medium">{link.label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </Link>
        ))}
      </div>

      {/* Footer (Legal & Info) */}
      <div className="p-4 border-t bg-gray-50 pb-20">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <Link
            href="/about"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("footer.links.privacypolicy")}
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("footer.links.termsofservice")}
          </Link>
          <Link
            href="/help"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("footer.links.faq")}
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">© 2025 GoBusly</p>
        </div>
      </div>
    </div>
  );

  const DesktopMenuContent = (
    <div className="py-2">
      <div className="px-3 pt-1 pb-3 space-y-2">
        <Button
          variant="outline"
          className="w-full h-9 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 text-gray-700"
          onClick={handleLogin}
        >
          {t("auth.login")}
        </Button>
        <Button
          variant="primary"
          className="w-full h-9 rounded-lg font-semibold"
          onClick={handleSignUp}
        >
          {t("auth.signUp")}
        </Button>
      </div>

      <DropdownMenuSeparator />

      <div className="py-2">
        {navigationLinks.map((link) => (
          <DropdownMenuItem
            key={link.href}
            asChild
            className="py-2.5 px-3 rounded-md cursor-pointer focus:bg-gray-100"
          >
            <Link href={link.href} className="flex items-center gap-3">
              <link.icon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{link.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </div>
    </div>
  );

  // --- Render ---
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{MenuTrigger}</SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[360px] p-0 border-l shadow-xl bg-white"
        >
          <SheetHeader className="p-4 text-left border-b flex flex-row justify-between items-center space-y-0">
            <SheetTitle>
              <Image
                src="/assets/icons/dark-logo.svg"
                alt="GoBusly"
                width={120}
                height={32}
                className="object-contain"
                priority
              />
            </SheetTitle>
          </SheetHeader>
          {MobileMenuContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{MenuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl mt-2 p-0 shadow-lg border border-gray-100 bg-white"
      >
        {DesktopMenuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
