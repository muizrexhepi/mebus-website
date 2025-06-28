"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
    firstName: "",
    lastName: "",
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
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message:
            t("contactForm.desc") ||
            "Thank you for contacting us! We've received your message and will get back to you within 24 hours.",
        });
        setFormData({
          firstName: "",
          lastName: "",
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
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-fit">
      <div className="p-8 shadow-md rounded-xl bg-white">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first-name">{t("passengerInfo.firstName")}</Label>
              <Input
                id="first-name"
                name="firstName"
                placeholder={t("passengerInfo.firstNamePlaceholder")}
                value={formData.firstName}
                onChange={handleChange}
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none focus:ring-2 focus:ring-primary-bg/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">{t("passengerInfo.lastName")}</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder={t("passengerInfo.lastNamePlaceholder")}
                value={formData.lastName}
                onChange={handleChange}
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none focus:ring-2 focus:ring-primary-bg/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("passengerInfo.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("passengerInfo.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 bg-primary-bg/5 rounded-lg border-none focus:ring-2 focus:ring-primary-bg/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("contactForm.subject")}</Label>
            <Select
              name="subject"
              value={formData.subject}
              onValueChange={handleSubjectChange}
              required
            >
              <SelectTrigger className="h-12 bg-primary-bg/5 rounded-lg border-none ">
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

          <div className="space-y-2">
            <Label htmlFor="message">{t("contactForm.message")}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("contactForm.messagePlaceholder")}
              value={formData.message}
              onChange={handleChange}
              required
              className="min-h-[120px] resize-none bg-primary-bg/5 rounded-lg border-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg button-gradient text-white transition-transform hover:scale-[1.02]"
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
            className={`mt-6 p-4 rounded-lg ${
              submitStatus.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </div>
  );
}
