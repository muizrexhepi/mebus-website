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

const Navbar = () => {
  const searchParams = useSearchParams();
  const login = searchParams.get("login");
  const register = searchParams.get("register");
  const reset = searchParams.get("reset");
  const language = searchParams.get("language");
  const router = useRouter();

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
      <div className="hidden md:flex items-center gap-4">
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
        <Button
          variant={"ghost"}
          className="text-white hover:text-white text-base hover:bg-white/20 transition-colors"
          onClick={() => router.push("/?login=true")}
        >
          Log in
        </Button>
        <Button
          className="text-black bg-white hover:bg-white/90 text-base"
          onClick={() => router.push("/?register=true")}
        >
          Sign up
        </Button>
        <LoginForm isOpen={login === "true"} />
        <RegisterForm isOpen={register === "true"} />
        <ResetPasswordForm isOpen={reset === "true"} />
        <LanguageDialog isOpen={language === "true"} />
      </div>
      <Menu className="w-6 h-6 text-white lg:hidden" />
    </div>
  );
};

export default Navbar;
