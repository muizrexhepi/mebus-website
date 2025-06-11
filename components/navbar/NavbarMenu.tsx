"use client";

import { Menu, UserCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavbarStore } from "@/store";

// Icons
import { FaRoute } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import useIsMobile from "../hooks/use-mobile";

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

  const MenuTrigger = (
    <Button
      aria-haspopup="true"
      aria-expanded="false"
      aria-label={t("nav.menu")}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 bg-white hover:shadow-md transition-all duration-200 hover:border-gray-400"
      variant="ghost"
    >
      <Menu className="text-gray-600" size={16} />
      <UserCircle className="text-gray-600" size={20} />
    </Button>
  );

  const MobileMenuContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <Image
          src="/assets/icons/dark-logo.svg"
          alt="GoBusly"
          width={120}
          height={40}
          className="object-contain"
          priority
        />
      </div>

      {/* Main CTA */}
      <div className="p-6">
        <Button
          className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg"
          onClick={handleSignUp}
        >
          {t("auth.signUp")}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6 space-y-3">
        <Button
          className="w-full h-11 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          variant="outline"
          onClick={handleLogin}
        >
          {t("auth.login")}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 space-y-1">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-4">
              <link.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                {link.label}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
          </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="p-6 border-t border-gray-100 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 py-2"
          >
            {t("footer.about")}
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-gray-900 py-2"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms"
            className="text-gray-600 hover:text-gray-900 py-2"
          >
            {t("footer.terms")}
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900 py-2">
            {t("footer.faq")}
          </Link>
        </div>
      </div>
    </div>
  );

  const DesktopMenuContent = (
    <div className="py-2">
      {/* Navigation Links */}
      {navigationLinks.map((link) => (
        <DropdownMenuItem
          key={link.href}
          asChild
          className="py-3 px-4 cursor-pointer font-medium"
        >
          <Link href={link.href} className="flex items-center gap-3">
            <link.icon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{link.label}</span>
          </Link>
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator className="my-2" />

      {/* Auth Buttons */}
      <div className="p-3 space-y-2">
        <Button
          className="w-full h-10 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          variant="outline"
          onClick={handleLogin}
        >
          {t("auth.login")}
        </Button>
        <Button
          className="w-full h-10 rounded-lg font-semibold bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0"
          onClick={handleSignUp}
        >
          {t("auth.signUp")}
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
          className="w-full sm:w-[380px] p-0 border-l shadow-xl"
        >
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
        className="w-72 rounded-xl mt-2 p-0 shadow-xl border border-gray-100"
      >
        {DesktopMenuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
