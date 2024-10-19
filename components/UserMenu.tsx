"use client";

import { Menu, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account } from "@/appwrite.config";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import useIsMobile from "./hooks/use-mobile";

const UserNavbarMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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
      variant="ghost"
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="User menu"
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
          href="/account"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Account
        </Link>
        <Link
          href="/bookings"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Bookings
        </Link>
        <Link
          href="/help"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Help & Support
        </Link>
        <Link
          href="/contact"
          className="block px-4 py-2 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </Link>
        <Separator className="!mb-4" />
        <div className="px-4">
          <Button className="w-full" onClick={handleLogout}>
            Logout
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
          className="w-[300px] sm:w-[400px] bg-white p-0 z-[99]"
        >
          <SheetHeader className="p-4 text-left border-b">
            <SheetTitle className="text-2xl font-bold">Busly</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col h-full">{MenuItems}</nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{MenuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-42 rounded-xl mt-2">
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full">
            Account
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/bookings" className="w-full">
            Bookings
          </Link>
        </DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Link href="/help" className="w-full">
            Help & Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contact" className="w-full">
            Contact Us
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
