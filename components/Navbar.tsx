"use client";

import { NAV_LINKS } from "@/lib/data";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { useCallback, useEffect, useState } from "react";
import { account } from "@/appwrite.config";
import UserNavbarMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";
import { useNavbarStore } from "@/store";
import LanguageDialog from "./LanguageDialog";
import ResetPasswordForm from "./forms/ResetForm";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  const [user, setUser] = useState<any>(null);

  const { openLogin, openRegister, openReset, setOpenLanguages } =
    useNavbarStore();

  const fetchUser = useCallback(async () => {
    if (user) return;
    try {
      const fetchedUser = await account.get();
      setUser(fetchedUser);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();

    const handleUserChange = () => {
      fetchUser();
    };

    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, [fetchUser]);

  return (
    <div className={cn("w-full flex justify-between items-center", className)}>
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <h1 className="font-semibold text-2xl text-white/95">Busly</h1>
        </Link>
        <div className="lg:flex gap-6 items-center hidden">
          {NAV_LINKS.map((link, index) => (
            <Link href={link.url} key={index} className="text-white/95 text-lg">
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageDialog />

        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>

      {/* Modal Components */}
      <LoginForm isOpen={openLogin} />
      <RegisterForm isOpen={openRegister} />
      <ResetPasswordForm isOpen={openReset} />
    </div>
  );
};

export default Navbar;
