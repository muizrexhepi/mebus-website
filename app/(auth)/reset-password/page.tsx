import ResetPasswordPage from "@/app/(auth)/_components/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | GoBusly",
  description:
    "Reset your GoBusly account password. Secure your account and regain access to our bus booking and travel planning services.",
  keywords:
    "reset password, forgot password, GoBusly account, account recovery",
  openGraph: {
    title: "Reset Your GoBusly Account Password",
    description:
      "Securely reset your GoBusly account password and regain access to our bus booking and travel planning services.",
    type: "website",
    url: "https://www.gobusly.com/reset-password",
    images: [
      {
        url: "https://www.gobusly.com/og-image-reset-password.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Reset Password",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Your GoBusly Account Password",
    description:
      "Securely reset your GoBusly account password and regain access to our bus booking and travel planning services.",
    images: ["https://www.gobusly.com/twitter-image-reset-password.jpg"],
  },
};

export default function ResetPasswordServerPage() {
  return (
    <main>
      <ResetPasswordPage />
    </main>
  );
}
