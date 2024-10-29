"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCOUNT_SETTINGS } from "@/lib/data";
import axios from "axios";
import { environment } from "@/environment";
import { Symbols } from "@/symbols";
import useUser from "@/components/hooks/use-user";

export default function Component() {
  const { user } = useUser();
  const [accountBalanceInCents, setAccountBalanceInCents] = useState<number>(0);

  useEffect(() => {
    if (user) {
      try {
        const fetchAccountBalance = async () => {
          const accountBalance = await axios.get(
            `${environment.apiurl}/user/${user.$id}?select=balance_in_cents`
          );
          setAccountBalanceInCents(accountBalance.data.data.balance_in_cents);
          console.log({ user, accountBalance: accountBalance.data.data });
        };

        fetchAccountBalance();
      } catch (error) {
        console.log({ error });
      }
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Account</h1>
        {user ? (
          <div>
            <p className="text-xl font-medium">
              {user?.name}, <span className="font-normal">{user?.email}</span>
            </p>
            <p className="text-xl font-medium">
              Account balance:{" "}
              <span className="font-normal">
                {Symbols.EURO} {(accountBalanceInCents / 100).toFixed(2) || 0.0}
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-[25%]" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACCOUNT_SETTINGS.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="bg-white shadow-md min-h-[150px] rounded-lg p-4 hover:bg-gray-100 transition-colors"
            prefetch={false}
          >
            <div className="h-full flex flex-col justify-between items-start">
              <link.icon className="w-8 h-8 text-primary" />
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
