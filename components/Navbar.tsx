"use client";

import { NAV_LINKS } from "@/lib/data";
import Link from "next/link";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import UserNavbarMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";
import { useNavbarStore } from "@/store";
import LanguageDialog from "./LanguageDialog";
import ResetPasswordForm from "./forms/ResetForm";
import { cn } from "@/lib/utils";
import useUser from "./hooks/use-user";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useUser();
  const { openLogin, openRegister, openReset } = useNavbarStore();
  const { t } = useTranslation();

  return (
    <div className={cn("w-full flex justify-between items-center", className)}>
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Logo"
            width={100}
            height={40}
            className="object-contain"
            priority
          />
        </Link>
        <div className="lg:flex gap-6 items-center hidden">
          {NAV_LINKS.map((link, index) => (
            <Link href={link.url} key={index} className="text-white/95 text-lg">
              {t(`nav.${link.name.toLowerCase()}`)}{" "}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageDialog />
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>

      <LoginForm isOpen={openLogin} />
      <RegisterForm isOpen={openRegister} />
      <ResetPasswordForm isOpen={openReset} />
    </div>
  );
};

export default Navbar;
