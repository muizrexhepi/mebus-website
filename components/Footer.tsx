"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "About Us", link: "/about" },
      { name: "Contact", link: "/contact" },
      { name: "FAQ", link: "/help" },
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

const CONTACT_INFO = {
  email: "contact@gobusly.com",
  phone1: "+389 76 224 065",
  phone2: "+389 70 250 259",
};

const SOCIAL_LINKS = [
  { icon: Facebook, link: "https://facebook.com", name: "Facebook" },
  { icon: Twitter, link: "https://twitter.com", name: "Twitter" },
  { icon: Instagram, link: "https://instagram.com", name: "Instagram" },
  { icon: Linkedin, link: "https://linkedin.com", name: "LinkedIn" },
];

const PAYMENT_METHODS = [
  { name: "Mastercard", path: "/assets/icons/mastercard.svg" },
  { name: "Visa", path: "/assets/icons/visa.svg" },
  { name: "Stripe", path: "/assets/icons/stripe.svg" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-[1440px] pt-12 pb-8 paddingX">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/icons/dark-logo.svg"
                alt="GoBusly Logo"
                width={120}
                height={50}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="text-base leading-6 max-w-80">
              {t("footer.missionStatement")}
            </p>
            <div className="flex items-center space-x-4">
              {PAYMENT_METHODS.map((method) => (
                <Image
                  key={method.name}
                  src={method.path}
                  alt={`${method.name} Logo`}
                  width={method.name === "Stripe" ? 50 : 40}
                  height={method.name === "Stripe" ? 50 : 40}
                  className="object-contain"
                />
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              {FOOTER_LINKS.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                    {t(`footer.sections.${section.title.toLowerCase()}`)}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.link}
                          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t(`footer.sections.${FOOTER_LINKS[2].title.toLowerCase()}`)}
                </h3>
                <ul className="mt-4 space-y-4">
                  {FOOTER_LINKS[2].links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
              <div className="mt-8 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t("footer.contact")}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2 shrink-0" />
                      <span>{CONTACT_INFO.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone1}`}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{CONTACT_INFO.phone1}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone2}`}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{CONTACT_INFO.phone2}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col justify-between items-center gap-4 sm:flex-row sm:gap-0">
            <p className="text-sm text-gray-600">{t("footer.copyright")}</p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-600 transition-colors border rounded-xl size-10 flex items-center justify-center"
                  >
                    <span className="sr-only">{social.name}</span>
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
