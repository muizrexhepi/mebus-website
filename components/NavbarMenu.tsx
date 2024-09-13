"use client";
import { Menu, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useNavbarStore } from "@/store";

const NavbarMenu = () => {
  const router = useRouter();
  const { setOpenLogin, setOpenRegister } = useNavbarStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 px-3 h-10 w-fit rounded-full cursor-pointer bg-white/30 hover:bg-white/20">
          <Menu color="white" />
          <UserCircle color="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl mt-2">
        <DropdownMenuItem onClick={() => setOpenLogin(true)}>
          Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenRegister(true)}>
          Sign Up
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/search")}>
          Search for Buses
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/about")}>
          About Us
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/help")}>
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/contact")}>
          Contact Us
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
