import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  BarChart,
  Link as LinkIcon,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GoBusly | Affiliate Program",
  description:
    "Join the GoBusly Affiliate Program and earn commissions by promoting our bus ticket booking service.",
};

export default function AffiliateProgram() {
  return (
    <div className="mx-auto xl:px-0 pt-20">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16 max-w-6xl mx-auto px-4 sm:px-8 xl:px-0">
        <div className="lg:w-1/2">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            Join Our Affiliate Program
            <br />
            <span className="text-primary">Earn While You Promote</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Become a GoBusly affiliate and earn commissions by promoting our bus
            ticket booking service to your audience.
          </p>
          <Link href="/affiliates/apply">
            <Button size="lg" className="font-semibold">
              Become an Affiliate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2">
          <Image
            width={1920}
            height={1080}
            src="/assets/images/affiliateProgram.jpg"
            alt="Affiliate program"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Why become a GoBusly affiliate?
          </h2>
          <p className="text-center mb-12 text-lg max-w-2xl mx-auto">
            Join our affiliate program and start earning commissions by
            promoting our reliable bus ticket booking service.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 xl:px-0">
            {[
              {
                icon: <DollarSign className="w-8 h-8 mb-4 text-primary" />,
                title: "Competitive Commissions",
                description:
                  "Earn attractive commissions on every successful booking made through your unique affiliate link.",
              },
              {
                icon: <Globe className="w-8 h-8 mb-4 text-primary" />,
                title: "Wide Range of Routes",
                description:
                  "Promote bus tickets for a vast network of routes, increasing your earning potential.",
              },
              {
                icon: <Users className="w-8 h-8 mb-4 text-primary" />,
                title: "Dedicated Support",
                description:
                  "Get personalized support from our affiliate management team to maximize your success.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 mb-4 text-primary" />,
                title: "Performance Bonuses",
                description:
                  "Earn additional rewards and bonuses as you hit performance milestones.",
              },
              {
                icon: <BarChart className="w-8 h-8 mb-4 text-primary" />,
                title: "Real-time Reporting",
                description:
                  "Access detailed analytics and reports to track your performance and earnings.",
              },
              {
                icon: <LinkIcon className="w-8 h-8 mb-4 text-primary" />,
                title: "Easy Integration",
                description:
                  "Seamlessly integrate our affiliate links and banners into your website or social media.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <CardTitle className="flex flex-col items-start">
                    {benefit.icon}
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 flex max-w-6xl mx-auto flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-8 xl:px-0">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">
            How to become a GoBusly affiliate
          </h2>
          <p className="mb-8 text-lg">
            Start earning commissions with GoBusly in just a few simple steps
          </p>
          <div className="space-y-8">
            {[
              {
                title: "Sign Up",
                description:
                  "Complete our affiliate application form with your details and promotional channels.",
              },
              {
                title: "Get Approved",
                description:
                  "Our team will review your application and approve your account if you meet our criteria.",
              },
              {
                title: "Promote",
                description:
                  "Use your unique affiliate link and promotional materials to advertise GoBusly to your audience.",
              },
              {
                title: "Earn",
                description:
                  "Track your performance and earn commissions for every successful booking made through your link.",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="rounded-full border-2 border-primary text-primary w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            width={1920}
            height={1080}
            src="/assets/images/affiliateProgramProcess.jpg"
            alt="Affiliate program process"
            className="rounded-lg shadow-lg h-[400px]"
          />
        </div>
      </section>

      <section className="py-16 bg-primary max-w-6xl mx-auto text-white text-center rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Ready to start earning?</h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg px-4 xl:px-0">
          Join the GoBusly Affiliate Program today and start earning commissions
          by promoting our reliable bus ticket booking service. Turn your
          audience into revenue!
        </p>
        <Link href="/affiliates/apply">
          <Button
            size="lg"
            className="font-semibold bg-white text-primary hover:bg-gray-100"
          >
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      <SecondaryFooter />
    </div>
  );
}
