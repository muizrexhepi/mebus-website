"use client";

import { NAV_LINKS } from "@/lib/data";
import { Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = () => {
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
          onClick={() => router.push("?language")}
        >
          <span className="p-1.5 bg-white rounded-full">
            <Globe className="w-5 h-5" />
          </span>
          <p className="uppercase text-white/90 font-medium text-base">EN</p>
        </Button>
        <Button
          variant={"ghost"}
          className="text-white hover:text-white text-base hover:bg-white/20 transition-colors"
          onClick={() => router.push("/login")}
        >
          Log in
        </Button>
        <Button
          className="text-black bg-white hover:bg-white/90 text-base"
          onClick={() => router.push("/register")}
        >
          Sign up
        </Button>
      </div>
      <Menu className="w-6 h-6 text-white lg:hidden" />
    </div>
  );
};

export default Navbar;
