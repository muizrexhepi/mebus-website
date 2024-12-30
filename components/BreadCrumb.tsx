"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function SettingsBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").slice(1);

  const formatSegment = (segment: string) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Breadcrumb className={`${pathname === "/account" && "hidden"}`}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbLink
                href={isLast ? undefined : href}
                className={`${
                  isLast
                    ? "font-medium text-transparent button-gradient bg-clip-text"
                    : "font-medium text-black hover:underline"
                } capitalize`}
              >
                {formatSegment(segment)}
              </BreadcrumbLink>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
