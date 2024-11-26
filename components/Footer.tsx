"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { useToast } from "./hooks/use-toast";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { name: "Bus Routes", link: "/routes" },
      { name: "Travel Flex Options", link: "/help/travel-flex" },
      { name: "Customer Support", link: "/help/contact-support" },
      { name: "Luggage Policy", link: "/help/luggage-policy" },
      // { name: "Discount Offers", link: "/discounts" },
      { name: "Help", link: "/help" },
    ],
  },
  {
    title: "Partners",
    links: [
      { name: "Partner Application", link: "/partners/apply" },
      { name: "Become a Partner", link: "/partners/overview" },
      { name: "Active Operators", link: "/partners/active-operators" },
      // { name: "Partnership Benefits", link: "/partners/benefits" },
      // { name: "Success Stories", link: "/partners/success-stories" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", link: "/legal/privacy-policy" },
      { name: "Terms of Service", link: "/legal/terms-of-service" },
      { name: "Cookie Policy", link: "/legal/cookie-policy" },
      { name: "Data Policy", link: "/legal/data-policy" },
      // { name: "Accessibility", link: "/legal/accessibility" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Instagram, link: "https://instagram.com" },
  { icon: Linkedin, link: "https://linkedin.com" },
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
          description: t("footer.subscribe.errorMessage.alreadySubscribed"),
          variant: "destructive",
        });
      } else if (response.ok) {
        toast({
          description: t("footer.subscribe.successMessage"),
        });
        setEmail("");
      } else {
        const data = await response.json();
        toast({
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: t("footer.subscribe.errorMessage.genericError"),
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95">
      {/* Newsletter Section */}
      <div className="w-full bg-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-0 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-white text-xl font-medium mb-2">
              {t("footer.subscribe.title")}
            </h3>
            <p className="text-white/70 max-w-lg">
              {t("footer.subscribe.description")}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-[400px]">
            <div className="relative">
              <input
                type="email"
                className="w-full h-12 px-4 pr-32 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
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
                {isSubscribing ? (
                  t("footer.subscribe.subscribing")
                ) : (
                  <div className="flex items-center gap-2">
                    {t("footer.subscribe.subscribeButton")}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/assets/icons/logo.svg"
                alt="GoBusly Logo"
                width={160}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-white/85 text-base leading-relaxed">
              {t("footer.missionStatement")}
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((footerLink, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-medium text-white">
                {t(`footer.sections.${footerLink.title.toLowerCase()}`)}
              </h3>
              <ul className="space-y-3">
                {footerLink.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {/* <ChevronRight
                        className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        color="white"
                      /> */}
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

        {/* Contact Information */}
        {/* <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="flex items-center gap-3 text-white/70 ">
              <MapPin className="w-5 h-5 shrink-0" />
              <p>North Macedonia, Tetovo 1200</p>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Phone className="w-5 h-5" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="w-5 h-5" />
              <p>support@gobusly.com</p>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span>{t("footer.customerSupport")}</span>
            <span className="hidden md:inline">|</span>
            <span>{t("footer.securePayment")}</span>
            <span className="hidden md:inline">|</span>
            <Link href="/help" className="hover:text-white transition-colors">
              {t("footer.helpFAQ")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
