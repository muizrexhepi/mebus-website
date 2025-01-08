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
      { name: "FAQ", link: "/faq" },
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
  email: "travel@gobusly.com",
  phone1: "+383 38 616 161",
  phone2: "+383 49 939 015",
};

const SOCIAL_LINKS = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Instagram, link: "https://instagram.com" },
  { icon: Linkedin, link: "https://linkedin.com" },
];

const PAYMENT_METHODS = [
  { name: "Mastercard", path: "/assets/icons/mastercard.svg" },
  { name: "Visa", path: "/assets/icons/visa.svg" },
  { name: "Stripe", path: "/assets/icons/stripe.svg" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-12 pb-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/icons/dark-logo.svg"
                alt="GoBusly Logo"
                width={160}
                height={50}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-gray-600">
              {t("footer.missionStatement")}
            </p>
            <div className="flex items-center gap-4 mt-4">
              {PAYMENT_METHODS.map((method) => (
                <Image
                  key={method.name}
                  src={method.path}
                  alt={`${method.name} Logo`}
                  width={method.name === "Stripe" ? 40 : 30}
                  height={method.name === "Stripe" ? 40 : 30}
                  className="object-contain"
                />
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {t(`footer.sections.${section.title.toLowerCase()}`)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone1}`}
                  className="group flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{CONTACT_INFO.phone1}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone2}`}
                  className="group flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{CONTACT_INFO.phone2}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="text-xs text-gray-500">{t("footer.copyright")}</p>
            {/* <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">{social.icon.name}</span>
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
