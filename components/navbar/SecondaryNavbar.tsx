"use client";

import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import Image from "next/image";
import UserNavbarMenu from "./UserMenu";
import LanguageSelector from "../dialogs/LanguageDialog";
import { useAuth } from "../providers/auth-provider";

const SecondaryNavbar = () => {
  const { user } = useAuth();
  return (
    <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
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
      <div className="flex items-center gap-2">
        <LanguageSelector />

        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </div>
  );
};

export default SecondaryNavbar;
