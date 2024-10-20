"use client";

import Link from "next/link";
import LanguageDialog from "./LanguageDialog";
import UserNavbarMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";
import useUser from "./hooks/use-user";

const SecondaryNavbar = () => {
  const { user } = useUser();
  return (
    <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
      <Link href={"/"}>
        <h1 className="font-semibold text-2xl text-white/95">Busly</h1>
      </Link>
      <div className="flex items-center gap-2">
        <LanguageDialog />

        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </div>
  );
};

export default SecondaryNavbar;
