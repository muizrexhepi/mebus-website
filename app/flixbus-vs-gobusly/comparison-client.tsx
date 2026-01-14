"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function FlixbusVsGobuslyClient() {
  const { t } = useTranslation();

  const COMPARISON = [
    {
      f: t("comparison.table.f1"),
      g: t("comparison.table.f1_g"),
      flix: t("comparison.table.f1_f"),
    },
    {
      f: t("comparison.table.f2"),
      g: t("comparison.table.f2_g"),
      flix: t("comparison.table.f2_f"),
    },
    {
      f: t("comparison.table.f3"),
      g: t("comparison.table.f3_g"),
      flix: t("comparison.table.f3_f"),
    },
    {
      f: t("comparison.table.f4"),
      g: t("comparison.table.f4_g"),
      flix: t("comparison.table.f4_f"),
    },
  ];

  return (
    <div className="min-h-screen bg-white font-roboto">
      <section className="pt-16 pb-12 max-w-6xl mx-auto paddingX text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t("comparison.hero.title_start")}{" "}
          <span className="text-primary-accent opacity-80">
            {t("comparison.hero.title_accent")}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t("comparison.hero.desc_start")}{" "}
          <span className="font-bold text-gray-900">
            {t("comparison.hero.desc_accent")}
          </span>
        </p>
      </section>

      <section className="py-12 max-w-6xl mx-auto paddingX">
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-6 text-sm font-bold uppercase text-gray-500">
                  {t("comparison.table.feature")}
                </th>
                <th className="p-6 text-sm font-bold uppercase text-primary-accent bg-blue-50/50">
                  {t("comparison.table.gobusly")}
                </th>
                <th className="p-6 text-sm font-bold uppercase text-gray-500">
                  {t("comparison.table.flixbus")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COMPARISON.map((item, i) => (
                <tr key={i}>
                  <td className="p-6 font-bold text-gray-900">{item.f}</td>
                  <td className="p-6 text-gray-700 bg-blue-50/20">
                    <div className="flex gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {item.g}
                    </div>
                  </td>
                  <td className="p-6 text-gray-500 italic">
                    <div className="flex gap-2">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      {item.flix}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto paddingX">
        <div className="bg-gray-900 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="relative w-full md:w-1/2 h-[400px] md:h-auto">
            <Image
              src="/assets/images/mrez.webp"
              alt="GoBusly Founders"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="p-10 md:p-16 w-full md:w-1/2 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 italic text-primary-accent">
              &quot;{t("comparison.founders_quote")}&quot;
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t("comparison.founders_sub")}
            </p>
            <p className="font-bold">Muiz Rexhepi & Etnik Zeqiri</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
