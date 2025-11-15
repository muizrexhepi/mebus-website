"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "Contact", link: "/help/contact-support" },
      { name: "FAQ", link: "/help/faq" },
      { name: "Help", link: "/help" },
    ],
  },
  {
    title: "Partners",
    links: [
      { name: "Partner Application", link: "/partners/apply" },
      { name: "Become a Partner", link: "/partners/overview" },
      { name: "Affiliate Program", link: "/affiliate-program" },
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
  { icon: Instagram, link: "https://instagram.com/gobusly", name: "Instagram" },
];

const PAYMENT_METHODS = [
  { name: "Mastercard", path: "/assets/icons/mastercard.svg" },
  { name: "Visa", path: "/assets/icons/visa.svg" },
  { name: "Stripe", path: "/assets/icons/stripe.svg" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/assets/icons/dark-logo.svg"
                  alt="GoBusly Logo"
                  width={140}
                  height={40}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
              <p className="text-base text-gray-600 leading-relaxed max-w-xs">
                {t("footer.missionStatement")}
              </p>

              {/* App Store Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">
                  {t("footer.downloadApp")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://apps.apple.com/za/app/gobusly/id6753230552"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105"
                  >
                    <img
                      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1234567890"
                      alt="Download on the App Store"
                      className="h-11"
                    />
                  </a>
                  {/* <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105 opacity-50 pointer-events-none"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-11"
                    />
                  </a> */}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  {t("footer.paymentMethods")}
                </p>
                <div className="flex items-center gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.name} className="grayscale opacity-60">
                      <Image
                        src={method.path}
                        alt={`${method.name} Logo`}
                        width={method.name === "Stripe" ? 50 : 40}
                        height={method.name === "Stripe" ? 50 : 40}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {FOOTER_LINKS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    {t(`footer.sections.${section.title.toLowerCase()}`)}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.link}
                          target={
                            link.link.includes("support.gobusly.com")
                              ? "_blank"
                              : undefined
                          }
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

              {/* Contact Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  {t("footer.contact")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors block"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone1}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors block"
                    >
                      {CONTACT_INFO.phone1}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone2}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors block"
                    >
                      {CONTACT_INFO.phone2}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">{t("footer.copyright")}</p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
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
