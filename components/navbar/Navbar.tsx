"use client";

import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import useUser from "../hooks/use-user";
import UserNavbarMenu from "./UserMenu";
import LanguageSelector from "@/components/dialogs/LanguageDialog";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <header
      className={cn("w-full flex justify-between items-center", className)}
    >
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Logo"
            width={140}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        {/* <div className="lg:flex gap-6 items-center hidden">
          {NAV_LINKS.map((link, index) => (
            <Link href={link.url} key={index} className="text-white/95 text-lg">
              {t(`nav.${link.name.toLowerCase()}`)}{" "}
            </Link>
          ))}
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        <LanguageSelector />
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </header>
  );
};

export default Navbar;
