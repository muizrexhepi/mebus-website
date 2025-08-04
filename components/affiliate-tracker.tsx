// AffiliateTracker.tsx
"use client";
import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function AffiliateTracker() {
  const searchParams = useSearchParams();
  const affiliateCode = searchParams.get("affiliate_code");
  const origin = searchParams.get("origin");

  const incrementAffiliateViews = useCallback(async () => {
    if (!affiliateCode) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/views/add`,
        {
          affiliate_code: affiliateCode,
          origin,
        }
      );
    } catch (error) {
      console.error("Failed to increment affiliate views:", error);
    }
  }, [affiliateCode, origin]);

  useEffect(() => {
    if (!affiliateCode) return;

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    const affiliateData = {
      code: affiliateCode,
      expires: expires.getTime(),
    };

    const storedAffiliate = localStorage.getItem("affiliate");
    if (!storedAffiliate || JSON.stringify(affiliateData) !== storedAffiliate) {
      localStorage.setItem("affiliate", JSON.stringify(affiliateData));
      incrementAffiliateViews();
    }
  }, [affiliateCode, incrementAffiliateViews]);

  return null;
}
