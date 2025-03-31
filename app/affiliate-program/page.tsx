"use client";

import Link from "next/link";
import {
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  GiftIcon,
  Globe,
  HelpCircle,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AffiliateApplicationForm } from "./(components)/affiliate-application-form";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function AffiliateProgram() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl paddingX mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <nav className="hidden md:flex gap-6">
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#benefits"
              >
                {t("affiliateProgramPage.benefits")}
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#how-it-works"
              >
                {t("affiliateProgramPage.howItWorks")}
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#commissions"
              >
                {t("affiliateProgramPage.commissions")}
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#faq"
              >
                {t("affiliateProgramPage.faq")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="hidden sm:flex bg-[#ef4444] hover:bg-[#ef4444]/90 text-white"
            >
              <a href="#apply-now">{t("affiliateProgramPage.applyNow")}</a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="max-w-6xl paddingX mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    {t("affiliateProgramPage.heroTitle")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t("affiliateProgramPage.heroDescription")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#ef4444] hover:bg-[#ef4444]/90 text-white"
                  >
                    <a href="#apply-now">
                      {t("affiliateProgramPage.becomeAffiliate")}
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#how-it-works">
                      {t("affiliateProgramPage.learnMore")}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>{t("affiliateProgramPage.freeToJoin")}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>{t("affiliateProgramPage.monthlyPayments")}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>{t("affiliateProgramPage.realTimeTracking")}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt={t("affiliateProgramPage.heroImageAlt")}
                  className="rounded-xl object-cover"
                  height="550"
                  src="/assets/icons/affiliate-program-hero.svg"
                  width="500"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.benefits")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.whyJoin")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.whyJoinDescription")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="pb-2">
                  <Percent className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.competitiveCommissions")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "affiliateProgramPage.competitiveCommissionsDescription"
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <TrendingUp className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.advancedAnalytics")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.advancedAnalyticsDescription")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.cookieTracking")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.cookieTrackingDescription")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <DollarSign className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.fastPayments")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.fastPaymentsDescription")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <GiftIcon className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.marketingResources")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.marketingResourcesDescription")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <HelpCircle className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>
                    {t("affiliateProgramPage.dedicatedSupport")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.dedicatedSupportDescription")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.process")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.howItWorks")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.howItWorksDescription")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  1
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("affiliateProgramPage.apply")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.applyDescription")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  2
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("affiliateProgramPage.promote")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.promoteDescription")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  3
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("affiliateProgramPage.earn")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("affiliateProgramPage.earnDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section id="commissions" className="w-full py-12 md:py-24 lg:py-32">
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.earnings")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.commissionStructure")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.commissionStructureDescription")}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">
                    {t("affiliateProgramPage.monthlySales")}
                  </TabsTrigger>
                  <TabsTrigger value="lifetime">
                    {t("affiliateProgramPage.lifetimeSales")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("affiliateProgramPage.monthlyCommissionRates")}
                      </CardTitle>
                      <CardDescription>
                        {t("affiliateProgramPage.monthlyCommissionDescription")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.tier1Tickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.startingCommission")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">1%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.tier2Tickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.mediumVolumeRate")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">2%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.tier3Tickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.highVolumeRate")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">3.5%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.tier4Tickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.premiumPartnerRate")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-[#ef4444]">
                            5%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="lifetime" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("affiliateProgramPage.lifetimeCommissionRates")}
                      </CardTitle>
                      <CardDescription>
                        {t(
                          "affiliateProgramPage.lifetimeCommissionDescription"
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.bronzeTierTickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.bronzeTier")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">1.5%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.silverTierTickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.silverTier")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">2.5%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.goldTierTickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.goldTier")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">4%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              {t("affiliateProgramPage.platinumTierTickets")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("affiliateProgramPage.platinumTier")}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-[#ef4444]">
                            5%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.testimonials")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.successfulAffiliates")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.successfulAffiliatesDescription")}
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="border-0 bg-background shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
                        <img
                          alt={t("affiliateProgramPage.testimonial1Name")}
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {t("affiliateProgramPage.testimonial1Name")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("affiliateProgramPage.testimonial1Role")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("affiliateProgramPage.testimonial1Quote")}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-[#ef4444]"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-background shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
                        <img
                          alt={t("affiliateProgramPage.testimonial2Name")}
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {t("affiliateProgramPage.testimonial2Name")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("affiliateProgramPage.testimonial2Role")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("affiliateProgramPage.testimonial2Quote")}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-[#ef4444]"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-background shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
                        <img
                          alt={t("affiliateProgramPage.testimonial3Name")}
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {t("affiliateProgramPage.testimonial3Name")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("affiliateProgramPage.testimonial3Role")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("affiliateProgramPage.testimonial3Quote")}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-[#ef4444]"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.faq")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.faqTitle")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.faqDescription")}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion1")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer1")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion2")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer2")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion3")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer3")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion4")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer4")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion5")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer5")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    {t("affiliateProgramPage.faqQuestion6")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("affiliateProgramPage.faqAnswer6")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section
          id="apply-now"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="max-w-6xl paddingX mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {t("affiliateProgramPage.apply")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("affiliateProgramPage.becomeAffiliate")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("affiliateProgramPage.becomeAffiliateDescription")}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-2xl">
              <AffiliateApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
