import ResetPasswordPage from "@/components/auth/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Busly",
  description:
    "Reset your Busly account password. Secure your account and regain access to our bus booking and travel planning services.",
  keywords: "reset password, forgot password, Busly account, account recovery",
  openGraph: {
    title: "Reset Your Busly Account Password",
    description:
      "Securely reset your Busly account password and regain access to our bus booking and travel planning services.",
    type: "website",
    url: "https://www.busly.com/reset-password",
    images: [
      {
        url: "https://www.busly.com/og-image-reset-password.jpg",
        width: 1200,
        height: 630,
        alt: "Busly Reset Password",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Your Busly Account Password",
    description:
      "Securely reset your Busly account password and regain access to our bus booking and travel planning services.",
    images: ["https://www.busly.com/twitter-image-reset-password.jpg"],
  },
};

export default function ResetPasswordServerPage() {
  return (
    <main>
      <ResetPasswordPage />
    </main>
  );
}
