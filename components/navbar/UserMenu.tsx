"use client";

import { Menu, UserCircle } from "lucide-react";
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
import { useTranslation } from "react-i18next"; // Add translation hook
import Image from "next/image";

const UserNavbarMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation(); // Initialize translation

  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      window.dispatchEvent(new Event("userChange"));
      router.push("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const MenuTrigger = (
    <Button
      aria-haspopup="true"
      aria-expanded="false"
      aria-label={t("nav.routes")}
      className="flex items-center space-x-2 px-3 py-1 h-10 rounded-2xl border border-border bg-[#f3f4f6] hover:bg-[#f3f4f6]/95 outline-none transition-colors"
    >
      <Menu className="text-gray-600" size={18} />
      <UserCircle className="text-gray-600" size={18} />
    </Button>
  );

  const MenuItems = (
    <>
      <div className="space-y-2 py-2 text-base">
        <Link
          href="/account"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.account")} {/* Translated "Account" */}
        </Link>
        <Link
          href="/bookings"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.bookings")} {/* Translated "Bookings" */}
        </Link>
        <Link
          href="/help"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("footer.links.customersupport")}{" "}
          {/* Translated "Help & Support" */}
        </Link>
        <Link
          href="/help/contact-support"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {t("nav.contact")} {/* Translated "Contact Us" */}
        </Link>
        <Separator className="!mb-4" />
        <div className="px-4">
          <Button
            className="button-gradient w-full h-12 text-base text-white rounded-lg"
            onClick={handleLogout}
          >
            {t("auth.logout")} {/* Translated "Logout" */}
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
      <DropdownMenuContent align="end" className="w-42 rounded-lg mt-2">
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full">
            {t("nav.account")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help" className="w-full">
            {t("footer.links.customersupport")}{" "}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help/contact-support" className="w-full">
            {t("nav.contact")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
