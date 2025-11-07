"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { QUICK_LINKS } from "@/lib/data";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const HelpPageClient = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 max-w-4xl mx-auto">
      <div className="mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
          {t("helpPage.title")}
        </h1>
        <p className="text-base text-gray-600 max-w-2xl">
          {t("helpPage.description")}
        </p>
      </div>

      {/* --- Consolidated FAQ Section --- */}
      <div className="mb-12 max-w-4xl mx-auto px-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {/* ... (AccordionItems remain the same) ... */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t("infoTabs.aboutService")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.aboutServiceContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              {t("infoTabs.routesDestinations")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.routesDestinationsContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              {t("infoTabs.luggagePolicy")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.luggagePolicyContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              {t("infoTabs.petPolicy")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.petPolicyContent")}
            </AccordionContent>
          </AccordionItem>

          {/* --- Booking Process Questions --- */}
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              {t("infoTabs.howToBook")}
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-2">
                {Object.keys(
                  t("infoTabs.howToBookSteps", { returnObjects: true })
                ).map((step) => (
                  <li key={step}>{t(`infoTabs.howToBookSteps.${step}`)}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              {t("infoTabs.paymentMethods")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.paymentMethodsContent.title")}
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.keys(
                  t("infoTabs.paymentMethodsContent.methods", {
                    returnObjects: true,
                  })
                ).map((method) => (
                  <li key={method}>
                    {t(`infoTabs.paymentMethodsContent.methods.${method}`)}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">
              {t("infoTabs.seatSelection")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.seatSelectionContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-left">
              {t("infoTabs.groupBookings")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.groupBookingsContent")}
            </AccordionContent>
          </AccordionItem>

          {/* --- Manage Bookings Questions --- */}
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-left">
              {t("infoTabs.modifyBooking")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.modifyBookingSteps.intro")}
              <ol className="list-decimal list-inside mt-2 space-y-1">
                {Object.keys(
                  t("infoTabs.modifyBookingSteps", { returnObjects: true })
                )
                  .filter((key) => !isNaN(Number(key)))
                  .map((step) => (
                    <li key={step}>
                      {t(`infoTabs.modifyBookingSteps.${step}`)}
                    </li>
                  ))}
              </ol>
              <p className="mt-2">{t("infoTabs.modifyBookingSteps.note")}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-left">
              {t("infoTabs.cancellationPolicy")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.cancellationPolicyContent.intro")}
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.keys(
                  t("infoTabs.cancellationPolicyContent.policies", {
                    returnObjects: true,
                  })
                ).map((policy) => (
                  <li key={policy}>
                    {t(`infoTabs.cancellationPolicyContent.policies.${policy}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                {t("infoTabs.cancellationPolicyContent.instructions")}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger className="text-left">
              {t("infoTabs.refundProcess")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.refundProcessContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger className="text-left">
              {t("infoTabs.lostTicket")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.lostTicketContent")}
            </AccordionContent>
          </AccordionItem>

          {/* --- Other FAQs --- */}
          <AccordionItem value="item-13">
            <AccordionTrigger className="text-left">
              {t("infoTabs.arrivalTime")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.arrivalTimeContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14">
            <AccordionTrigger className="text-left">
              {t("infoTabs.changeName")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.changeNameContent")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-15">
            <AccordionTrigger className="text-left">
              {t("infoTabs.missBus")}
            </AccordionTrigger>
            <AccordionContent>{t("infoTabs.missBusContent")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-16">
            <AccordionTrigger className="text-left">
              {t("infoTabs.powerOutlets")}
            </AccordionTrigger>
            <AccordionContent>
              {t("infoTabs.powerOutletsContent")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* --- Quick Links Section (Simplified and Cleaned) --- */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mx-4">
        {" "}
        {/* Removed Card, added shadow/bg directly */}
        <div className="px-6 pt-6 pb-4">
          {" "}
          {/* CardHeader adjusted to a simple div */}
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("helpPage.quickLinksTitle")}
          </h2>
          <p className="text-black/60 text-base mt-1">
            {t("helpPage.quickLinksDescription")}
          </p>
        </div>
        {/* Removed grid container classes for a clean list look */}
        <div>
          {QUICK_LINKS.map((link, index) => (
            <Link href={`/help/${link.name}`} key={link.name} className="block">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center justify-start h-auto w-full py-4 px-6 rounded-none bg-white hover:bg-gray-50 transition-colors text-left",
                  // ADDED: Subtle bottom border for list separation
                  { "border-b border-gray-100": index < QUICK_LINKS.length - 1 }
                )}
              >
                <link.icon className="h-5 w-5 mr-4 text-black/60 flex-shrink-0" />
                <span className="text-base font-normal text-gray-700 flex-grow text-left">
                  {" "}
                  {/* Adjusted text color slightly */}
                  {t(`helpPage.quickLinks.${link.label}`)}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPageClient;
