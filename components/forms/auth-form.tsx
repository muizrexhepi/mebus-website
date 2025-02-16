"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { FaApple } from "react-icons/fa";

const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email cannot be blank");

export default function AuthForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

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

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    if (!emailError) {
      // handleEmailLogin(email)
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
    <div className="w-full space-y-6 py-32 sm:py-0 ">
      {/* Logo */}
      <div className="lg:hidden flex justify-center">
        <Image
          src="/assets/icons/icon.svg"
          alt="Logo"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

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
        <h2 className="text-2xl font-medium tracking-tight">
          {showEmailForm ? "Sign in with Email" : "Welcome back"}
        </h2>
        {/* <p className="text-sm text-muted-foreground">
          {showEmailForm
            ? "Enter your email to sign in"
            : "Sign in to your account"}
        </p> */}
      </div>

      {emailSent ? (
        <div className="text-center text-sm text-muted-foreground">
          <p>We've sent you an email with a login link.</p>
          <p className="mt-1">
            Didn't receive it? Check your spam folder or{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setEmailSent(false)}
            >
              try another email address
            </Button>
          </p>
        </div>
      ) : showEmailForm ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              className={`h-12 ${emailError ? "border-red-500" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>
          <Button type="submit" className="w-full h-12">
            Continue with Email
          </Button>
        </form>
      ) : (
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 font-normal border-[1px] hover:bg-muted/50"
            onClick={handleGoogleLogin}
          >
            <Image
              src="/assets/icons/googleIcon.svg"
              width={20}
              height={20}
              alt="Google icon"
              className="mr-2"
            />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 font-normal border-[1px] hover:bg-muted/50"
            onClick={handleFacebookLogin}
          >
            <Image
              src="/assets/icons/facebookIcon.svg"
              width={20}
              height={20}
              alt="Facebook icon"
              className="mr-2"
            />
            Continue with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 font-normal border-[1px] hover:bg-muted/50"
            onClick={handleFacebookLogin}
          >
            <FaApple className="mr-2" size={20} />
            {/* <Image
              src="/assets/icons/facebookIcon.svg"
              width={20}
              height={20}
              alt="Facebook icon"
              className="mr-2"
            /> */}
            Continue with Apple
          </Button>
        </div>
      )}

      <p className="text-sm text-primary-bg/70 text-center">
        By creating an account you agree to our{" "}
        <Link
          className="text-transparent button-gradient bg-clip-text"
          href={"/legal/terms-of-service"}
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-transparent button-gradient bg-clip-text"
          href={"/legal/privacy-policy"}
        >
          Privacy Policy
        </Link>
        .{" "}
      </p>
    </div>
  );
}
