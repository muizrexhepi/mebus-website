"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function SettingsBreadcrumb() {
  const pathname = usePathname();
  const breadCrumblink = pathname.split("/").splice(2);

  const formattedLink = breadCrumblink
    .join(" ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Breadcrumb className={`${pathname == "/account" && "hidden"}`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/account"
            className="font-medium text-black hover:underline"
          >
            Account
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize">
            {formattedLink}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
