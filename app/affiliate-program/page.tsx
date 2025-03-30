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

export default function AffiliateProgram() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl paddingX mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <nav className="hidden md:flex gap-6">
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#benefits"
              >
                Benefits
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#how-it-works"
              >
                How It Works
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#commissions"
              >
                Commissions
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#ef4444]"
                href="#faq"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="hidden sm:flex bg-[#ef4444] hover:bg-[#ef4444]/90 text-white"
            >
              <a href="#apply-now">Apply Now</a>
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
                    Earn With Every Booking
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our affiliate program and earn up to 5% commission on
                    every ticket sold. It&apos;s easy to start and even easier
                    to get paid.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#ef4444] hover:bg-[#ef4444]/90 text-white"
                  >
                    <a href="#apply-now">Become an Affiliate</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#how-it-works">
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>Monthly payments</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-[#ef4444]" />
                    <span>Real-time tracking</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Affiliate Program Hero Image"
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
                  Benefits
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Join Our Affiliate Program?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our affiliate program is designed to maximize your earnings
                  with minimal effort. Here&apos;s why thousands of affiliates
                  choose us.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="pb-2">
                  <Percent className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>Competitive Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Earn up to 5% on every ticket sold through your affiliate
                    link, with tiered rates for higher volumes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <TrendingUp className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track performance in real-time with detailed reports on
                    clicks, conversions, and commissions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>30-Day Cookie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our 30-day cookie tracking ensures you get credited even if
                    customers book days after clicking your link.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <DollarSign className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>Fast Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get paid monthly with no minimum threshold. Choose from
                    multiple payment methods including PayPal and bank transfer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <GiftIcon className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>Marketing Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access exclusive banners, text links, and promotional
                    content to boost your conversion rates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <HelpCircle className="h-6 w-6 text-[#ef4444] mb-2" />
                  <CardTitle>Dedicated Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get personalized support from our dedicated affiliate team
                    to help optimize your performance.
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
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started with our affiliate program is simple. Follow
                  these steps to begin earning commissions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  1
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Apply</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the simple application form with your details.
                    We&apos;ll review and approve qualified applicants within 24
                    hours.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  2
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Promote</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your unique affiliate link and marketing materials to
                    promote GoBusly on your website, blog, or social media.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white">
                  3
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Earn</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your performance in real-time and receive commissions
                    for every successful booking made through your links.
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
                  Earnings
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Commission Structure
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our tiered commission structure rewards your performance. The
                  more you sell, the higher your commission rate.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Sales</TabsTrigger>
                  <TabsTrigger value="lifetime">Lifetime Sales</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Commission Rates</CardTitle>
                      <CardDescription>
                        Based on your sales volume each month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              1-50 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Starting commission rate
                            </div>
                          </div>
                          <div className="text-2xl font-bold">1%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              51-200 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Medium volume rate
                            </div>
                          </div>
                          <div className="text-2xl font-bold">2%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              201-500 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              High volume rate
                            </div>
                          </div>
                          <div className="text-2xl font-bold">3.5%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              500+ Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Premium partner rate
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
                      <CardTitle>Lifetime Commission Rates</CardTitle>
                      <CardDescription>
                        Based on your total sales over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              51-500 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Bronze tier
                            </div>
                          </div>
                          <div className="text-2xl font-bold">1.5%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              501-2000 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Silver tier
                            </div>
                          </div>
                          <div className="text-2xl font-bold">2.5%</div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              2001-5000 Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Gold tier
                            </div>
                          </div>
                          <div className="text-2xl font-bold">4%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-base font-medium">
                              5000+ Tickets
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Platinum tier
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
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Successful Affiliates
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our partners who are earning commissions by
                  promoting GoBusly.
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
                          alt="Travel Blogger Sarah"
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          Travel Blogger
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &quot;The GoBusly affiliate program has been a perfect fit
                      for my travel blog. The commission rates are competitive,
                      and my readers love the service. I&apos;ve been earning
                      consistently for over a year now.&quot;
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
                          alt="Mark Davidson"
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mark Davidson</p>
                        <p className="text-xs text-muted-foreground">
                          Travel Deals Website
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &quot;I run a deals website and the GoBusly affiliate
                      program has been one of our top performers. Their tracking
                      is reliable, payments are always on time, and their
                      support team is responsive.&quot;
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
                          alt="Elena Rodriguez"
                          className="aspect-square h-full w-full object-cover"
                          height="48"
                          src="/placeholder.svg?height=48&width=48"
                          width="48"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Elena Rodriguez</p>
                        <p className="text-xs text-muted-foreground">
                          Social Media Influencer
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &quot;As a travel influencer, I&apos;m very selective
                      about the brands I partner with. GoBusly has been
                      fantastic - easy to promote, great service for my
                      followers, and the commissions have become a significant
                      part of my income.&quot;
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
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get answers to the most common questions about our affiliate
                  program.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Who can join the GoBusly affiliate program?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our affiliate program is open to website owners, bloggers,
                    content creators, and social media influencers with an
                    audience interested in travel. We review all applications to
                    ensure alignment with our brand values.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How and when do I get paid?
                  </AccordionTrigger>
                  <AccordionContent>
                    We pay commissions on a monthly basis. Payments are
                    processed by the 15th of each month for the previous
                    month&apos;s earnings. We offer multiple payment methods
                    including PayPal, bank transfer, and more.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Is there a minimum payout threshold?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we have a minimum payout threshold of $25. Once your
                    earnings reach this amount, you&apos;ll receive payment in
                    the next payment cycle. Earnings below the threshold will
                    roll over to the next month.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I track my referrals and commissions?
                  </AccordionTrigger>
                  <AccordionContent>
                    You&apos;ll have access to a comprehensive dashboard that
                    shows real-time data on clicks, conversions, and
                    commissions. Our tracking is cookie-based and lasts for 30
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    What promotional materials do you provide?
                  </AccordionTrigger>
                  <AccordionContent>
                    We provide a variety of marketing materials including
                    banners, text links, product images, and promotional
                    content. You can also request custom materials for specific
                    campaigns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Can I promote through paid advertising?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, affiliates can use paid advertising channels such as
                    Google Ads, social media ads, etc. However, there are some
                    restrictions on brand bidding and trademark usage. Please
                    review our terms and conditions for details.
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
                  Apply
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Become an Affiliate
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to start earning? Fill out the application form below
                  and join our affiliate program today.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-2xl">
              <AffiliateApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-12">
        <div className="max-w-6xl paddingX mx-auto">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <div className="flex flex-col gap-3 lg:w-1/3">
              <Link className="flex items-center space-x-2" href="/">
                <span className="inline-block font-bold text-xl">
                  <span className="text-[#ef4444]">Go</span>
                  <span>Busly</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Join the leading affiliate program in bus travel and start
                earning commissions today.
              </p>
              <div className="flex gap-4 text-muted-foreground">
                <Link href="#" className="hover:text-[#ef4444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="hover:text-[#ef4444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="hover:text-[#ef4444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wide">
                  Program
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#benefits"
                    >
                      Benefits
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#how-it-works"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#commissions"
                    >
                      Commissions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#faq"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wide">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wide">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground hover:text-[#ef4444] transition-colors"
                      href="#"
                    >
                      Affiliate Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row lg:gap-10 mt-10">
            <p className="text-xs text-muted-foreground">
              © 2025 GoBusly. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Designed with ♥ for affiliates worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
