"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPinIcon,
  LeafIcon,
  SmartphoneIcon,
  ClockIcon,
  HeartIcon,
  GlobeIcon,
  CurrencyIcon,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("aboutSection.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CurrencyIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.budget.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.budget.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <MapPinIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.network.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.network.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <SmartphoneIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.booking.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.booking.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <ClockIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.punctuality.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.punctuality.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <HeartIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.comfort.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.comfort.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <LeafIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              {t("aboutSection.cards.eco.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("aboutSection.cards.eco.description")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">
          {t("aboutSection.callToAction.title")}
        </h3>
        <p className="text-gray-600 mb-6">
          {t("aboutSection.callToAction.description")}
        </p>
        <Link href="/routes">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary-dark"
          >
            <GlobeIcon className="mr-2 h-5 w-5" />
            {t("aboutSection.callToAction.button")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
