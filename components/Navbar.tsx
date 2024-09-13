"use client";

import { NAV_LINKS } from "@/lib/data";
import { Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { useEffect, useState } from "react";
import { account } from "@/appwrite.config";
import UserMenu from "./UserMenu";
import UserNavbarMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";
import { useNavbarStore } from "@/store";
import LanguageDialog from "./LanguageDialog";
import ResetPasswordForm from "./forms/ResetForm";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const { openLogin, openRegister, openReset, setOpenLanguages } =
    useNavbarStore();

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
      console.log({ user });
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      fetchUser();
    };

    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <h1 className="font-semibold text-2xl text-white/95">Mebus</h1>
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
        <Button
          variant={"ghost"}
          className="flex items-center gap-3 rounded-full hover:bg-white/20 px-2.5 transition-colors cursor-pointer"
          onClick={() => setOpenLanguages(true)}
        >
          <Globe className="w-5 h-5" color="white" />
        </Button>
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
      <LoginForm isOpen={openLogin} />
      <RegisterForm isOpen={openRegister} />
      <LanguageDialog />
      <ResetPasswordForm isOpen={openReset} />
    </div>
  );
};

export default Navbar;
