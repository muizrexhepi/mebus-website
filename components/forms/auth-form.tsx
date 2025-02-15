"use client";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  handleEmailLogin,
  handleFacebookLogin,
  handleGoogleLogin,
} from "@/actions/oauth";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { z } from "zod";
import type React from "react";

const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email cannot be blank");

export default function AuthForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { t } = useTranslation();

  const validateEmail = (value: string) => {
    try {
      emailSchema.parse(value);
      setEmailError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    if (!emailError) {
      handleEmailLogin(email);
      setEmailSent(true);
    }
  };

  const handleBackClick = () => {
    setShowEmailForm(false);
    setEmailSent(false);
    setEmail("");
    setEmailError("");
  };

  return (
    <div className="w-full space-y-6">
      {showEmailForm && (
        <Button
          variant="ghost"
          className="w-8 h-8 p-0 -ml-2"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
      )}

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {showEmailForm ? "Sign in with Email" : "Welcome back"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {showEmailForm
            ? "Enter your email to sign in"
            : "Sign in to your account"}
        </p>
      </div>

      {emailSent ? (
        <div className="text-center text-sm text-muted-foreground">
          <p>We've sent you an email with a login link.</p>
          <p>Didn't receive it? Check your spam folder or</p>
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => setEmailSent(false)}
          >
            try another email address
          </Button>
        </div>
      ) : showEmailForm ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              className={`font-normal text-black rounded-lg h-12 bg-primary-bg/5 px-4 ${
                emailError ? "border-red-500 bg-red-500/10" : "border-none"
              }`}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>
          <Button type="submit" className="w-full h-12" variant={"primary"}>
            Continue with Email
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <Button
            className="w-full h-12"
            onClick={handleGoogleLogin}
            variant="outline"
          >
            <Image
              src="/assets/icons/googleIcon.svg"
              width={20}
              height={20}
              alt="Google icon"
              className="mr-2"
            />
            {t("login.googleButton")}
          </Button>
          <Button
            className="w-full h-12"
            onClick={handleFacebookLogin}
            variant="outline"
          >
            <Image
              src="/assets/icons/facebookIcon.svg"
              width={20}
              height={20}
              alt="Facebook icon"
              className="mr-2"
            />
            {t("login.facebookButton")}
          </Button>
          <Button className="w-full h-12" onClick={() => {}} variant="outline">
            <FaApple size={20} className="mr-2" />
            {t("login.appleButton", "Continue with Apple")}
          </Button>
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => setShowEmailForm(true)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Email
          </Button>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <Button variant="link" className="p-0 h-auto text-xs font-normal">
          Terms of Use
        </Button>{" "}
        and{" "}
        <Button variant="link" className="p-0 h-auto text-xs font-normal">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
}
