import { Suspense } from "react";
import { Metadata } from "next";
import LoginPage from "@/components/auth/login-page";
import { Loader2 } from "lucide-react";

// Move metadata to a separate constant to avoid re-computation
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
    // Use relative paths for images to leverage Next.js Image Optimization
    images: [
      {
        url: "/images/og-image-login.jpg",
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
    images: ["/images/twitter-image-login.jpg"],
  },
};

function LoginPageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default function LoginServerPage() {
  return (
    <main>
      <Suspense fallback={<LoginPageLoading />}>
        <LoginPage />
      </Suspense>
    </main>
  );
}
