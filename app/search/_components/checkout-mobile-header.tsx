"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Edit3 } from "lucide-react";

export const MobileCheckoutBlock = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full py-3 sticky top-0 bg-white z-50 md:hidden paddingX border-b">
      <div className="flex justify-between items-center gap-4">
        <button onClick={handleBack} className="p-1">
          <ChevronLeft color="black" size={25} />
        </button>

        <div className="flex items-center text-black gap-2 font-medium text-base">
          <span className="capitalize">{t("checkout.title", "Checkout")}</span>
        </div>

        <Edit3 size={20} color="black" className="invisible" />
      </div>
    </div>
  );
};
