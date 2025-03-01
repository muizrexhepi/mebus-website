import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function NoTicketsAvailable() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center max-w-lg mx-auto text-center space-y-8 p-6">
      {/* Illustration */}
      <div className="relative w-52 h-52 bg-gray-100 rounded-full flex items-center justify-center">
        <Image
          className="object-cover w-full h-full"
          src={"/assets/icons/man-illustration.svg"}
          width={150}
          height={150}
          alt={t("searchedTickets.noTicketsAvailableIllustrationAlt")}
        />
      </div>

      {/* Text content */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {t("searchedTickets.noTicketsAvailable")}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mx-auto">
          {t("searchedTickets.noTicketsAvailableTryAgain")}
        </p>
      </div>
    </div>
  );
}
