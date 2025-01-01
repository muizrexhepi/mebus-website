"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message:
            "Your message has been sent successfully. We will get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">Send Us a Message</CardTitle>
        <CardDescription>
          We&apos;ll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="first-name">{t("passengerInfo.firstName")}</Label>
              <Input
                id="first-name"
                name="name"
                placeholder={t("passengerInfo.firstNamePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last-name">{t("passengerInfo.lastName")}</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder={t("passengerInfo.lastNamePlaceholder")}
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">{t("passengerInfo.email")}</Label>
            <Input
              id="email"
              name="email"
              placeholder={t("passengerInfo.emailPlaceholder")}
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 bg-primary-bg/5 rounded-lg border-none"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subject">{t("contactForm.subject")}</Label>
            <Select
              name="subject"
              value={formData.subject}
              onValueChange={handleSubjectChange}
              required
            >
              <SelectTrigger className="h-12 bg-primary-bg/5 rounded-lg border-none">
                <SelectValue placeholder={t("contactForm.selectSubject")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booking">
                  {t("contactForm.subjectOptions.bookingInquiry")}
                </SelectItem>
                <SelectItem value="refund">
                  {t("contactForm.subjectOptions.refundRequest")}
                </SelectItem>
                <SelectItem value="complaint">
                  {t("contactForm.subjectOptions.complaint")}
                </SelectItem>
                <SelectItem value="feedback">
                  {t("contactForm.subjectOptions.feedback")}
                </SelectItem>
                <SelectItem value="other">
                  {t("contactForm.subjectOptions.other")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">{t("contactForm.message")}</Label>
            <Textarea
              className="resize-none bg-primary-bg/5 rounded-lg border-none"
              id="message"
              name="message"
              placeholder={t("contactForm.messagePlaceholder")}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg button-gradient text-white"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-5 mx-auto" />
            ) : (
              t("contactForm.sendMessage")
            )}
          </Button>
        </form>
        {submitStatus.message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              submitStatus.success
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
