// app/ga-listener.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-RLCE6W4KDQ";

function GAInner() {
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

export default function GAListener() {
  return (
    <Suspense fallback={null}>
      <GAInner />
    </Suspense>
  );
}
