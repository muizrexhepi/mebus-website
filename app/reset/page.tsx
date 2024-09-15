"use client";
import React, { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ResetPasswordConfirmSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof ResetPasswordConfirmSchema>>({
    resolver: zodResolver(ResetPasswordConfirmSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ResetPasswordConfirmSchema>
  ) => {
    setIsLoading(true);
    console.log(values);
    try {
      const promise = account.updateRecovery(userId!, secret!, values.password);

      promise.then(
        function (response) {
          setSuccess("Password changed succsefully!");
          console.log(response); // Success
          setIsLoading(false);
        },
        function (error) {
          setIsLoading(false);
          setError(error?.message || "Something went wrong!");
          console.log(error); // Failure
        }
      );
      setError("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="py-40 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="h-3 w-3 animate-spin" />
                ) : (
                  "Reset"
                )}
              </Button>
            </form>
          </Form>
          <Link
            className="text-sm text-center flex justify-center pt-3 font-semibold text-indigo-500"
            href="/?login=true"
          >
            Return to login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading email verification information...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
