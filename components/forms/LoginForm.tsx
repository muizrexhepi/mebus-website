"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";
import { useNavbarStore } from "@/store";
import { loginUser } from "@/actions/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthenticationFactor } from "appwrite";
import moment from "moment-timezone";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const MFAVerificationSchema = z.object({
  mfaCode: z.string().min(1, { message: "MFA code is required" }),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mfaChallenge, setMfaChallenge] = useState<{
    challengeId: string;
    type: AuthenticationFactor;
  } | null>(null);
  const { setOpenLogin, openLogin, setOpenReset } = useNavbarStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openOTP, setOpenOTP] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<any>();
  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mfaForm = useForm<z.infer<typeof MFAVerificationSchema>>({
    resolver: zodResolver(MFAVerificationSchema),
    defaultValues: {
      mfaCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await loginUser(values);

      if (!result.success || !result.credentials) {
        setError(result.error || t("login.errors.generic"));
        return;
      }

      try {
        const session = await account.createEmailPasswordSession(
          result.credentials.email,
          result.credentials.password
        );

        window.dispatchEvent(new Event("userChange"));
        setOpenLogin(false);
        setError("");
      } catch (appwriteError: any) {
        if (appwriteError.type === "user_more_factors_required") {
          const factors = await account.listMfaFactors();

          if (factors.email) {
            try {
              const challenge = await account.createMfaChallenge(
                AuthenticationFactor.Email
              );
              const expiresAt = moment.utc(challenge.expire);
              const now = moment.utc();
              const timeRemaining = moment.duration(expiresAt.diff(now));

              const timerInterval = setInterval(() => {
                const currentTime = moment.utc();
                const remainingDuration = moment.duration(
                  expiresAt.diff(currentTime)
                );

                if (remainingDuration.asSeconds() <= 0) {
                  // Timer has expired
                  clearInterval(timerInterval);
                  setOpenOTP(false);
                  setError(t("login.errors.mfaChallengeExpired"));
                  return;
                }

                // Update timer state
                setRemainingTime({
                  minutes: remainingDuration.minutes(),
                  seconds: remainingDuration.seconds(),
                });
              }, 1000);

              console.log({ challenge });
              setOpenOTP(true);
              setMfaChallenge({
                challengeId: challenge.$id,
                type: AuthenticationFactor.Email,
              });
            } catch (challengeError) {
              console.error("MFA challenge creation failed:", challengeError);
              setOpenOTP(false);
              setError(t("login.errors.mfaChallengeFailed"));
            }
          } else if (factors.totp) {
            setMfaChallenge({
              challengeId: "",
              type: AuthenticationFactor.Totp,
            });
            setOpenOTP(true);
          } else {
            setError(t("login.errors.noMfaMethodAvailable"));
          }
        } else {
          console.error("Appwrite session creation failed:", appwriteError);
          setError(appwriteError.message || t("login.errors.generic"));
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || t("login.errors.generic"));
      setOpenOTP(false);
    } finally {
      setOpenOTP(false);
      setIsLoading(false);
    }
  };

  const onMFAVerify = async (values: z.infer<typeof MFAVerificationSchema>) => {
    if (!mfaChallenge) return;

    setIsLoading(true);
    try {
      if (mfaChallenge.type === AuthenticationFactor.Email) {
        await account.updateMfaChallenge(
          mfaChallenge.challengeId,
          values.mfaCode
        );

        setOpenLogin(false);
        window.dispatchEvent(new Event("userChange"));
      } else if (mfaChallenge.type === AuthenticationFactor.Totp) {
        console.log("TOTP verification not implemented");
        setError(t("login.errors.totpNotSupported"));
      }
    } catch (error: any) {
      console.error("MFA verification failed:", error);
      setError(error.message || t("login.errors.mfaVerificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (mfaChallenge) {
    return (
      <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <Form {...mfaForm}>
            <form
              onSubmit={mfaForm.handleSubmit(onMFAVerify)}
              className="space-y-4"
            >
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">
                  {t("login.mfaVerification")}
                </h2>
                <p className="text-muted-foreground">
                  {mfaChallenge.type === AuthenticationFactor.Email
                    ? t("login.mfaEmailDescription")
                    : t("login.mfaTotpDescription")}
                </p>
              </div>

              <FormField
                control={mfaForm.control}
                name="mfaCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      {t("login.mfaCode")}
                      {remainingTime && (
                        <p className="text-primary-bg font-semibold text-sm text-center">
                          {remainingTime.minutes.toString().padStart(2, "0")} :
                          {remainingTime.seconds.toString().padStart(2, "0")}
                        </p>
                      )}
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        disabled={isLoading}
                        pattern={REGEXP_ONLY_DIGITS}
                        className="flex-1"
                        {...field}
                      >
                        <InputOTPGroup className="flex flex-grow h-12">
                          <InputOTPSlot
                            index={0}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                          <InputOTPSlot
                            index={1}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                          <InputOTPSlot
                            index={2}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="flex flex-grow h-12">
                          <InputOTPSlot
                            index={3}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                          <InputOTPSlot
                            index={4}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                          <InputOTPSlot
                            index={5}
                            className="flex-grow h-full bg-primary-bg/5"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                      {/* <Input
                        {...field}
                        disabled={isLoading}
                        placeholder={t("login.mfaCodePlaceholder")}
                        className="w-full h-12 bg-primary-bg/5 border-none rounded-xl px-4"
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />

              <Button
                className="w-full h-12 rounded-xl"
                type="submit"
                variant={"primary"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  t("login.verifyButton")
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  // Regular login form
  return (
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
      <DialogContent className="sm:max-w-[900px] p-0 h-screen sm:h-fit">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left Side - Branding (unchanged) */}
          <div className="hidden lg:flex flex-col justify-center w-full items-center p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex justify-center items-center flex-col mx-auto space-y-6">
              <Image
                src="/assets/icons/icon.svg"
                width={250}
                height={250}
                alt="logo"
                className="mb-8"
              />

              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">
                  {t("login.getFullExperience")}
                </h2>
                <p className="text-muted-foreground">
                  {t("login.experienceDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-6 sm:p-8 my-auto">
            <div className="max-w-[360px] mx-auto space-y-6">
              <div className="space-y-2 text-center lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight">
                  {t("login.title")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("login.subtitle")}
                </p>
              </div>

              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Email and Password fields (unchanged) */}
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>{t("login.email.label")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            type="email"
                            placeholder={t("login.email.placeholder")}
                            className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-xl border-none ring-0 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <div className="flex items-center justify-between">
                          <FormLabel>{t("login.password.label")}</FormLabel>
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => {
                              setOpenReset(true);
                              setOpenLogin(false);
                            }}
                            className="font-medium px-0 text-primary-accent transition-colors hover:no-underline"
                            size="sm"
                          >
                            {t("login.forgotPassword")}
                          </Button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isLoading}
                              type={showPassword ? "text" : "password"}
                              placeholder={t("register.password.placeholder")}
                              className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-xl border-none ring-0 text-base"
                            />
                            {!showPassword ? (
                              <Eye
                                className={cn(
                                  "absolute right-3 top-3 cursor-pointer text-primary/70",
                                  {
                                    hidden: !field.value,
                                  }
                                )}
                                onClick={togglePassword}
                              />
                            ) : (
                              <EyeOff
                                className={cn(
                                  "absolute right-3 top-3 cursor-pointer text-primary/70",
                                  {
                                    hidden: !field.value,
                                  }
                                )}
                                onClick={togglePassword}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <Button
                    className="w-full h-12 rounded-xl button-gradient text-base"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      t("login.signInButton")
                    )}
                  </Button>
                </form>
              </Form>

              {/* Rest of the component remains unchanged */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("login.orContinueWith")}
                  </span>
                </div>
              </div>
              <div className="grid gap-4">
                <Button
                  className="w-full h-12 rounded-xl"
                  onClick={handleGoogleLogin}
                  variant="outline"
                  disabled={isLoading}
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
                  className="w-full h-12 rounded-xl"
                  onClick={handleFacebookLogin}
                  variant="outline"
                  disabled={isLoading}
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
              </div>
              <p className="text-sm text-primary-bg/70 text-center">
                By signing in you agree to our{" "}
                <Link
                  className="text-primary-accent"
                  href={"/legal/terms-of-service"}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="text-primary-accent"
                  href={"/legal/privacy-policy"}
                >
                  Privacy Policy
                </Link>
                .{" "}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
