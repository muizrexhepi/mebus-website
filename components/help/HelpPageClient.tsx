"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HelpForm from "../forms/HelpForm";
import InfoTabs from "./InfoTabs";
import Link from "next/link";
import { QUICK_LINKS } from "@/lib/data";
import { useTranslation } from "react-i18next";

const HelpPageClient = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-neutral-900">
        {t("helpPage.title")}
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        {t("helpPage.description")}
      </p>

      {/* <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("helpPage.howCanWeHelp")}
          </CardTitle>
          <CardDescription>{t("helpPage.searchOrBrowse")}</CardDescription>
        </CardHeader>
        <CardContent>
          <HelpForm />
        </CardContent>
      </Card> */}

      <InfoTabs />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("helpPage.quickLinksTitle")}
          </CardTitle>
          <CardDescription>
            {t("helpPage.quickLinksDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link href={`/help/${link.name}`} key={link.name}>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 w-full"
                >
                  <link.icon className="h-6 w-6 mb-2" />
                  {t(`helpPage.quickLinks.${link.label}`)}
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
