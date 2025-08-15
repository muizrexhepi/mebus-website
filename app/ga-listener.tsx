"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-RLCE6W4KDQ";

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path:
          pathname + (searchParams.toString() ? `?${searchParams}` : ""),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
