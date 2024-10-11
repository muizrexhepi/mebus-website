"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useNavbarStore } from "@/store";
import LanguageDialog from "./LanguageDialog";
import { useCallback, useEffect, useState } from "react";
import { account } from "@/appwrite.config";
import UserNavbarMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";

const SecondaryNavbar = () => {
  const [user, setUser] = useState<any>(null);
  const { setOpenLanguages } = useNavbarStore();

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
