"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { useToast } from "./hooks/use-toast";
import Image from "next/image";

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { name: "Bus Routes", link: "/routes" },
      { name: "Travel Flex Options", link: "/help/travel-flex" },
      { name: "Customer Support", link: "/help/contact-support" },
      { name: "Luggage Policy", link: "/help/luggage-policy" },
      { name: "Discount Offers", link: "/discounts" },
      { name: "Help", link: "/help" },
    ],
  },
  {
    title: "Partners",
    links: [
      { name: "Partner Application", link: "/partners/apply" },
      { name: "Become a Partner", link: "/partners/overview" },
      { name: "Active Operators", link: "/partners/active-operators" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", link: "/legal/privacy-policy" },
      { name: "Terms of Service", link: "/legal/terms-of-service" },
      { name: "Cookie Policy", link: "/legal/cookie-policy" },
      { name: "Data Policy", link: "/legal/data-policy" },
    ],
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 400) {
        toast({
          // title: t("footer.subscribe.errorMessage.alreadySubscribed"),
          description: t("footer.subscribe.errorMessage.alreadySubscribed"),
          variant: "destructive",
        });
      } else if (response.ok) {
        toast({
          title: t("footer.subscribe.successMessage"),
          description: t("footer.subscribe.successMessage"),
        });
        setEmail("");
      } else {
        const data = await response.json();
        toast({
          title: t("footer.subscribe.errorMessage.genericError"),
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        // title: t("footer.subscribe.errorMessage.genericError"),
        description: t("footer.subscribe.errorMessage.genericError"),
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section
      className={`paddingX py-8 bg-neutral-900 flex justify-center items-center flex-col relative`}
    >
      <div
        className={`flex justify-center items-start md:flex-row flex-col mb-8 w-full max-w-6xl`}
      >
        <div className="flex-1 w-full flex-col sm:flex sm:flex-row sm:items-center md:items-start justify-between md:justify-start md:flex-col mr-10">
          <Link href="/">
            <Image
              src={"/assets/icons/logo.svg"}
              alt="Logo"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
          <p
            className={`font-normal text-white/70 text-[18px] leading-[30.8px] mt-4 max-w-[310px]`}
          >
            {t("footer.missionStatement")}
          </p>
          <div className="flex flex-col sm:my-0 my-4 space-y-4 pt-2 min-w-[250px] w-full sm:w-full">
            <h1 className="font-medium text-lg text-white">
              {t("footer.getUpdates")}
            </h1>
            <form
              onSubmit={handleSubscribe}
              className="space-y-2 w-full sm:w-[80%]"
            >
              <label htmlFor="email-input" className="sr-only">
                {t("footer.emailAddress")}
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  className="w-full h-12 px-4 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder={t("footer.subscribe.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="absolute right-1 top-1 bg-white text-neutral-900 hover:bg-white/90"
                  disabled={isSubscribing}
                >
                  {isSubscribing
                    ? t("footer.subscribe.subscribing")
                    : t("footer.subscribe.subscribeButton")}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 z-[2]">
          {FOOTER_LINKS.map((footerLink, index) => (
            <div
              key={index}
              className="flex flex-col sm:my-0 my-4 min-w-[150px]"
            >
              <h1 className="font-normal text-lg text-white">
                {t(`footer.sections.${footerLink.title.toLowerCase()}`)}
              </h1>
              <ul className="list-none mt-4">
                {footerLink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-base tracking-wide text-white/70 cursor-pointer truncate line-clamp-1 ${
                      index !== footerLink.links.length - 1 ? "mb-3" : "mb-0"
                    }`}
                  >
                    <Link href={link.link}>
                      {t(
                        `footer.links.${link.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}`
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-start md:items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3e45] max-w-6xl">
        <p className="font-normal text-sm text-center leading-[27px] text-white/70">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-0 text-white/70 text-sm">
          <p>{t("footer.customerSupport")}</p>
          <p className="hidden md:inline">|</p>
          <p>{t("footer.securePayment")}</p>
          <p className="hidden md:inline">|</p>
          <Link href="/help" className="hover:text-white transition-colors">
            {t("footer.helpFAQ")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
