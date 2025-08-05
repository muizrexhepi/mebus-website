"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoTabs from "./InfoTabs";
import Link from "next/link";
import { QUICK_LINKS } from "@/lib/data";
import { useTranslation } from "react-i18next";

const HelpPageClient = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("helpPage.title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t("helpPage.description")}
        </p>
      </div>

      <div className="mb-12">
        <InfoTabs />
      </div>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {t("helpPage.quickLinksTitle")}
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            {t("helpPage.quickLinksDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {QUICK_LINKS.map((link) => (
              <Link
                href={`/help/${link.name}`}
                key={link.name}
                className="block"
              >
                <Button
                  variant="ghost"
                  className="flex items-center justify-start h-auto w-full py-4 px-6 rounded-none border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <link.icon className="h-5 w-5 mr-4 text-gray-600 flex-shrink-0" />
                  <span className="text-base font-medium text-gray-900 text-left flex-grow">
                    {t(`helpPage.quickLinks.${link.label}`)}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPageClient;
