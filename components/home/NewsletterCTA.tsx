"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormEvent, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function NewsletterCTA() {
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
      console.log({ error });
      toast({
        description: t("footer.subscribe.errorMessage.genericError"),
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  return (
    <section className="bg-white py-20 paddingX">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full">
            <span className="text-sm font-medium text-primary">
              {t("CTA.badgeText")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 leading-tight max-w-3xl mx-auto">
            {t("CTA.title")}
          </h1>
        </div>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
          onSubmit={handleSubscribe}
        >
          <Input
            type="email"
            placeholder={t("CTA.emailPlaceholder")}
            className="h-12 px-4 bg-primary-bg/5 rounded-lg placeholder:text-gray-500"
            required
          />
          <Button
            type="submit"
            disabled={isSubscribing}
            className="h-12 px-8 w-full sm:w-auto shrink-0 text-white button-gradient rounded-lg font-medium"
          >
            {isSubscribing ? (
              <Loader2 className="size-5 animate-spin mx-auto" />
            ) : (
              t("CTA.buttonText")
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
