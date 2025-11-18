"use client";

import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import UserNavbarMenu from "./UserMenu";
import LanguageSelector from "@/components/dialogs/LanguageDialog";
import { NAV_LINKS } from "@/lib/data";
import { useAuth } from "../providers/auth-provider";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const path = usePathname();

  return (
    <header
      className={cn(
        "w-full flex justify-between items-center py-4 px-6 bg-white",
        className,
        {
          "hidden md:flex":
            path.includes("/search") || path.includes("/checkout"),
        }
      )}
    >
      <div className="flex items-center gap-12">
        <Link href={"/"} className="flex-shrink-0">
          <Image
            src={"/assets/icons/dark-logo.svg"}
            alt="Logo"
            width={140}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-1 items-center">
          {NAV_LINKS.map((link, index) => {
            // Handle Bus dropdown
            if (link.name === "Bus" && link.dropdown) {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        // Added group class to handle icon rotation on open state
                        "group flex items-center gap-1 px-4 py-2 text-gray-700 text-sm font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all outline-none",
                        {
                          "text-primary bg-primary/5": path.includes("/bus"),
                        }
                      )}
                    >
                      {t(`nav.${link.name.toLowerCase()}`)}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          // Rotates the icon when the dropdown is open (data-state is handled by Radix)
                          "group-data-[state=open]:rotate-180"
                        )}
                      />
                    </button>
                  </DropdownMenuTrigger>

                  {/* MATCHING USER MENU STYLES:
                     - rounded-xl
                     - shadow-lg
                     - border-gray-100
                     - mt-2 
                  */}
                  <DropdownMenuContent
                    align="start"
                    className="w-64 rounded-xl mt-2 p-1 shadow-lg border border-gray-100 bg-white"
                  >
                    <div className="py-1">
                      {link.dropdown.map((item, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          asChild
                          className="py-2.5 px-3 rounded-md cursor-pointer focus:bg-gray-50 focus:text-gray-900"
                        >
                          <Link
                            href={item.url}
                            className="flex flex-col items-start"
                          >
                            <span className="text-sm font-medium text-start w-full text-gray-700">
                              {t(`nav.${item.name.toLowerCase()}`)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {t(`nav.${item.name.toLowerCase()}_description`)}
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            // Regular links
            return (
              <Link
                href={link.url}
                key={index}
                className={cn(
                  "px-4 py-2 text-gray-700 text-sm font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all",
                  {
                    "text-primary bg-primary/5": path === link.url,
                  }
                )}
              >
                {t(`nav.${link.name.toLowerCase()}`)}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector />
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </header>
  );
};

export default Navbar;
