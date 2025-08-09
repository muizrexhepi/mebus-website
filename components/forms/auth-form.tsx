"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { z } from "zod";
import type { FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "../hooks/use-toast";
import { useNavbarStore } from "@/store";

const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email cannot be blank");

export default function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [formState, setFormState] = useState<"initial" | "email" | "otp">(
    "initial"
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenLogin } = useNavbarStore();

  const validateEmail = (value: string): boolean => {
    try {
      emailSchema.parse(value);
      setEmailError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      return false;
    }
  };

  // Check if user is on checkout page
  const isOnCheckout = pathname?.includes("/checkout");

  // API calls
  const sendEmailOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/otp/send`,
        { email }
      );

      if (response.status === 200) {
        toast({
          title: "Verification code sent",
          description: "Please check your email for the code",
        });
        setFormState("otp");
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast({
        title: "Failed to send verification code",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      // Use NextAuth's signIn method with the credentials provider
      const result = await signIn("email-otp", {
        email,
        otp,
        redirect: false,
      });

      if (result?.ok) {
        // Close the login dialog
        setOpenLogin(false);

        // Show success message
        toast({
          title: "Successfully logged in!",
          description: isOnCheckout
            ? "You can now complete your booking"
            : "Welcome back!",
        });

        // Only redirect if NOT on checkout page
        if (!isOnCheckout) {
          router.push("/");
        }
        // If on checkout, stay on the page - the user data will refresh automatically
      } else {
        toast({
          title: "Verification failed",
          description: "Invalid or expired code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handlers
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      await sendEmailOtp();
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      await verifyOTP();
    }
  };

  // Navigation handler
  const handleBackClick = () => {
    if (formState === "otp") {
      setFormState("email");
      setOtp("");
    } else {
      setFormState("initial");
      setEmail("");
      setEmailError("");
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    await sendEmailOtp();
  };

  return (
    <div className="w-full space-y-6 py-32 sm:py-0">
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

      {/* Back button */}
      {formState !== "initial" && (
        <button
          className="p-0 absolute top-6 sm:top-0 left-4 sm:left-6"
          onClick={handleBackClick}
        >
          <ArrowLeft className="size-6 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="sr-only">Go back</span>
        </button>
      )}

      {/* Title */}
      <div className="space-y-2 text-center pt-4">
        <h2 className="text-2xl font-medium tracking-tight">
          {formState === "otp"
            ? "Enter Verification Code"
            : formState === "email"
            ? "Sign in with Email"
            : "Welcome back"}
        </h2>
        {isOnCheckout && (
          <p className="text-sm text-muted-foreground">
            Login to save your booking and continue checkout
          </p>
        )}
      </div>

      {/* OTP form */}
      {formState === "otp" ? (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              Enter the 4-digit code sent to {email}
            </p>
            <div className="flex justify-center my-4">
              <InputOTP
                maxLength={4}
                value={otp}
                onChange={setOtp}
                className="w-full"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12" />
                  <InputOTPSlot index={1} className="size-12" />
                  <InputOTPSlot index={2} className="size-12" />
                  <InputOTPSlot index={3} className="size-12" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full h-12"
            disabled={otp.length !== 4 || isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : isOnCheckout ? (
              "Login & Continue Checkout"
            ) : (
              "Verify Code"
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Didn't receive the code?{" "}
            <Button
              variant="link"
              type="button"
              className="p-0 h-auto font-normal"
              onClick={handleResendOtp}
              disabled={isLoading}
            >
              Resend code
            </Button>
          </p>
        </form>
      ) : formState === "email" ? (
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
              disabled={isLoading}
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Continue with Email"
            )}
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
            onClick={() => setFormState("email")}
          >
            <Mail className="mr-2 size-5" />
            Continue with Email
          </Button>
        </div>
      )}

      {/* Terms and policy */}
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
