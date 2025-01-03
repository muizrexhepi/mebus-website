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
      className={cn(
        "w-full flex justify-between items-center bg-transparent",
        className,
        { "hidden md:flex": path.includes("/search") }
      )}
    >
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/dark-logo.svg"}
            alt="Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className="text-gray-700 text-base hover:text-gray-900 transition-colors"
            >
              {t(`nav.${link.name.toLowerCase()}`)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        {user ? (
          <UserNavbarMenu />
        ) : (
          <>
            <NavbarMenu />
            {/* <div className="hidden md:flex gap-2 items-center">
              <Button
                onClick={handleRegister}
                variant="default"
                className="border bg-white border-[#ff5b37] hover:bg-[#ff5b37]/5 hover:border-[#ff4520] text-[#ff4520] rounded-full px-6"
              >
                {t("register.signUpButton")}
              </Button>
              <Button
                onClick={handleLogin}
                variant="default"
                className="bg-[#ff5b37] hover:bg-[#ff4520] text-white rounded-full px-6"
              >
                {t("auth.login")}
              </Button>
            </div> */}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
