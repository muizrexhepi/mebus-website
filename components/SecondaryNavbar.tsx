"use client";

import { NAV_LINKS } from "@/lib/data";
import { Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { Button } from "./ui/button";
import ResetPasswordForm from "./forms/ResetForm";
import LanguageDialog from "./LanguageDialog";

const SecondaryNavbar = () => {
  const searchParams = useSearchParams();
  const login = searchParams.get("login");
  const register = searchParams.get("register");
  const reset = searchParams.get("reset");
  const language = searchParams.get("language");
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
      <Link href={"/"}>
        <h1 className="font-semibold text-2xl text-white/95">Mebus</h1>
      </Link>

      <Button
        variant={"ghost"}
        className="flex items-center gap-3 py-1 px-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
        onClick={() => router.push("/?language=true")}
      >
        <span className="p-1.5 bg-white rounded-full">
          <Globe className="w-5 h-5" />
        </span>
        <p className="uppercase text-white/90 font-medium text-base">EN</p>
      </Button>

      <Menu className="w-6 h-6 text-white lg:hidden" />
    </div>
  );
};

export default SecondaryNavbar;
