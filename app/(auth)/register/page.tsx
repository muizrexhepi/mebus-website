import RegisterPage from "@/app/(auth)/_components/register-page";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register | GoBusly",
  description:
    "Create your GoBusly account. Start booking bus tickets, planning trips, and enjoying hassle-free travel.",
  keywords:
    "register, sign up, create account, GoBusly account, bus booking, travel planning",
  openGraph: {
    title: "Create Your GoBusly Account",
    description:
      "Join GoBusly to start booking bus tickets, planning trips, and enjoying hassle-free travel.",
    type: "website",
    url: "https://www.GoBusly.com/register",
    images: [
      {
        url: "https://www.GoBusly.com/og-image-register.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your GoBusly Account",
    description:
      "Join GoBusly to start booking bus tickets, planning trips, and enjoying hassle-free travel.",
    images: ["https://www.GoBusly.com/twitter-image-register.jpg"],
  },
};

function RegisterPageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default function RegisterServerPage() {
  return (
    <main>
      <Suspense fallback={<RegisterPageLoading />}>
        <RegisterPage />
      </Suspense>
    </main>
  );
}
