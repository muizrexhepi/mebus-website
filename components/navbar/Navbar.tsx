"use client";

import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import UserNavbarMenu from "./UserMenu";
import LanguageSelector from "@/components/dialogs/LanguageDialog";
import { NAV_LINKS } from "@/lib/data";
import { useAuth } from "../providers/auth-provider";
import { usePathname } from "next/navigation";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const path = usePathname();

  return (
    <header
      className={cn("w-full flex justify-between items-center", className, {
        "hidden md:flex": path.includes("/search")||path.includes('/checkout'),
      })}
    >
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/dark-logo.svg"}
            alt="Logo"
            width={140}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        {/* <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className="text-gray-700 text-base hover:text-gray-900 transition-colors"
            >
              {t(`nav.${link.name.toLowerCase()}`)}
            </Link>
          ))}
        </nav> */}
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </header>
  );
};

export default Navbar;
