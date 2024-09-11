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
        <div className="flex items-center space-x-2 px-3 h-10 w-fit rounded-full border cursor-pointer hover:bg-white/20">
          <Menu color="white" />
          <UserCircle color="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setOpenLogin(true)}>
          Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenRegister(true)}>
          Sign up
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/clinic/register")}>
          Register as a clinic
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/clinic/subscribe")}>
          Subscribe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
