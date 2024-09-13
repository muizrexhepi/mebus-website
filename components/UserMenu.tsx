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
import { useNavbarStore } from "@/store";

const UserNavbarMenu = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isClinic, setIsClinic] = useState<boolean>(false);
  const { setOpenLogin, setOpenRegister } = useNavbarStore();

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
    try {
      await account.deleteSessions();
      window.dispatchEvent(new Event("userChange"));
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 px-3 h-10 w-fit rounded-full cursor-pointer bg-white/30 hover:bg-white/20 transition-colors">
          <Menu color="white" />
          <UserCircle color="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl mt-2">
        {isClinic ? (
          <DropdownMenuItem onClick={() => router.push("/agency/account")}>
            Account
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/account")}>
            Account
          </DropdownMenuItem>
        )}
        {/* {isClinic ? (
          <DropdownMenuItem onClick={() => router.push("/agency/dashboard")}>
            Dashboard
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => router.push("https://www.portal.mebus.com")}
          >
            Operator login
          </DropdownMenuItem>
        )} */}
        <DropdownMenuItem onClick={() => router.push("/bookings")}>
          Bookings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/help")}>
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/contact")}>
          Contact Us
        </DropdownMenuItem>
        {!user && (
          <>
            <DropdownMenuItem onClick={() => setOpenLogin(true)}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenRegister(true)}>
              Sign Up
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbarMenu;
