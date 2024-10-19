import LoginPage from "@/components/auth/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Busly",
  description:
    "Access your Busly account. Book bus tickets, manage your trips, and enjoy seamless travel planning.",
  keywords: "login, sign in, Busly account, bus booking, travel planning",
  openGraph: {
    title: "Login to Your Busly Account",
    description:
      "Access your Busly account to book bus tickets, manage your trips, and enjoy seamless travel planning.",
    type: "website",
    url: "https://www.busly.com/login",
    images: [
      {
        url: "https://www.busly.com/og-image-login.jpg",
        width: 1200,
        height: 630,
        alt: "Busly Login",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Your Busly Account",
    description:
      "Access your Busly account to book bus tickets, manage your trips, and enjoy seamless travel planning.",
    images: ["https://www.busly.com/twitter-image-login.jpg"],
  },
};

export default function LoginServerPage() {
  return (
    <main>
      <LoginPage />
    </main>
  );
}
