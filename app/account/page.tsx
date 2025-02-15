"use client";
import Link from "next/link";
import { ComponentType, SVGProps, useEffect, useLayoutEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Book, Lock, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
interface AccountSetting {
  href: string;
  icon: IconComponent;
  title: string;
  description: string;
}

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  // Redirect to home if the user is not authenticated
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirect to home or login page
    }
  }, [isAuthenticated, router]);

  const ACCOUNT_SETTINGS: AccountSetting[] = [
    {
      href: "/account/personal-info",
      icon: User,
      title: t("account.profile"),
      description: t("account.profileDesc"),
    },
    {
      href: "/account/login-security",
      icon: Lock,
      title: t("account.security"),
      description: t("account.securityDesc"),
    },
    {
      href: "/bookings",
      icon: Book,
      title: t("account.bookings"),
      description: t("account.bookingsDesc"),
    },
    {
      href: "/account/wallet",
      icon: Wallet,
      title: t("account.wallet"),
      description: t("account.walletDesc"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{t("account.account")}</h1>
        {isAuthenticated ? (
          <div>
            <p className="text-xl font-medium">
              {user?.name}, <span className="font-normal">{user?.email}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACCOUNT_SETTINGS.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="bg-white shadow min-h-[150px] rounded-lg p-4 hover:bg-gray-50 transition-colors"
            prefetch={false}
          >
            <div className="h-full flex flex-col justify-between items-start">
              {link.icon && <link.icon className="w-8 h-8 text-primary" />}
              <div className="space-y-1">
                <h2 className="text-lg font-medium">{link.title}</h2>
                <p className="text-neutral-800/60 text-sm">
                  {link.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
