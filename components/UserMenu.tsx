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
import { account } from "@/appwrite.config";
import { useEffect, useState } from "react";

const UserNavbarMenu = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isClinic, setIsClinic] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const user = await account.get();
      if (user.labels.includes("agency")) {
        setIsClinic(true);
      }
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSessions();
    window.dispatchEvent(new Event("userChange"));
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 px-3 h-10 w-fit rounded-full border cursor-pointer bg-white hover:bg-white/95 transition-colors">
          <Menu color="black" />
          <UserCircle color="black" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isClinic ? (
          <DropdownMenuItem onClick={() => router.push("/agency/account")}>
            Account
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/account")}>
            Account
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        <DropdownMenuSeparator />
        {isClinic ? (
          <DropdownMenuItem onClick={() => router.push("/agency/dashboard")}>
            Dashboard
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/agency/register")}>
            Register as a clinic
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push("/agency/subscribe")}>
          Subscribe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
