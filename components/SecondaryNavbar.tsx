"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Globe } from "lucide-react";

const SecondaryNavbar = () => {
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
    </div>
  );
};

export default SecondaryNavbar;
