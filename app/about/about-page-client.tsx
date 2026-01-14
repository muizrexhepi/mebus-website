"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Zap,
  Code2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Network,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function AboutPageClient() {
  const { t } = useTranslation();

  const STATS = [
    { label: t("about.stats.countries"), value: "14+", icon: Globe },
    { label: t("about.stats.seats"), value: "5,000+", icon: Zap },
    { label: t("about.stats.engineers"), value: "20+", icon: Code2 },
    { label: t("about.stats.operators"), value: "35+", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-white font-roboto">
      <section className="pt-12 pb-16 max-w-6xl mx-auto paddingX">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-gray-900 mb-6 leading-[1.1]">
            {t("about.hero.title_start")}{" "}
            <span className="text-primary-accent">
              {t("about.hero.title_accent")}
            </span>{" "}
            <br />
            {t("about.hero.title_end")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {t("about.hero.desc")}
          </p>
        </div>

        <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <Image
            src="/assets/images/about-bg.avif"
            alt="GoBusly Network"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
            <div className="flex items-center gap-3 text-white/90 font-medium">
              <Network className="w-5 h-5 text-primary-accent" />
              <span>{t("about.hero.image_caption")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto paddingX">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            {t("about.stats.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="text-primary-accent mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="py-20 max-w-6xl mx-auto paddingX">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("about.engineering.title")}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t("about.engineering.desc")}
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-primary-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {t("about.engineering.ai_title")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("about.engineering.ai_desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] bg-gray-900 rounded-2xl p-8 flex flex-col justify-end text-white overflow-hidden">
            <Code2 className="absolute top-0 right-0 p-10 opacity-10 w-48 h-48" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                {t("about.engineering.vs_title")}
              </h3>
              <p className="text-gray-400 mb-6 italic">
                &quot;{t("about.engineering.vs_desc")}&quot;
              </p>
              <Link
                href="/flixbus-vs-gobusly"
                className="inline-flex items-center text-primary-accent font-bold hover:gap-3 transition-all"
              >
                {t("about.engineering.vs_link")}{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto paddingX">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("about.management.title")}
            </h2>
            <p className="text-gray-500 mt-2">
              {t("about.management.subtitle")}
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-[400px] md:h-auto">
                <Image
                  src="/assets/images/mrez.webp"
                  alt="Founders"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-16 flex flex-col justify-center space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Muiz Rexhepi
                  </h3>
                  <p className="text-primary-accent font-bold text-xs uppercase tracking-widest mb-4">
                    Co-Founder & CEO
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm italic">
                    {t("about.management.muiz_bio")}
                  </p>
                </div>
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Etnik Zeqiri
                  </h3>
                  <p className="text-primary-accent font-bold text-xs uppercase tracking-widest mb-4">
                    Co-Founder & CTO
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm italic">
                    {t("about.management.etnik_bio")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto paddingX">
        <div className="bg-gray-900 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("about.cta.title")}
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
            {t("about.cta.desc")}
          </p>
          <Link
            href="/bus"
            className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
          >
            {t("about.cta.button")} <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
