"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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

  return (
    <footer className="bg-gradient-to-b from-primary-bg/80 to-primary-bg/90">
      <div className="max-w-6xl mx-auto paddingX  py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-start justify-items-start md:justify-items-end">
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
            {/* <div className="flex items-center gap-4">
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
                    </div> */}
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <Image
                src={"/assets/icons/mastercard.svg"}
                width={30}
                height={30}
                alt="Mastercard Logo"
              />
              <Image
                src={"/assets/icons/visa.svg"}
                width={30}
                height={30}
                alt="Visa Logo"
              />
              <Image
                src={"/assets/icons/stripe.svg"}
                width={40}
                height={40}
                alt="Stripe Logo"
              />
            </div>
          </div>

          {FOOTER_LINKS.map((footerLink, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-normal text-white">
                {t(`footer.sections.${footerLink.title.toLowerCase()}`)}
              </h3>
              <ul className="space-y-3">
                {footerLink.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      className="text-white/70 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
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

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            {t("footer.copyright", { year: new Date().getFullYear() })}
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
          {/* <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span>{t("footer.customerSupport")}</span>
            <span className="hidden md:inline">|</span>
            <span>{t("footer.securePayment")}</span>
            <span className="hidden md:inline">|</span>
            <Link href="/help" className="hover:text-white transition-colors">
              {t("footer.helpFAQ")}
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
