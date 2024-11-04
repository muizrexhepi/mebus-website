"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schemas";
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
import Link from "next/link";
import { Loader } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useNavbarStore } from "@/store";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ isOpen }: { isOpen: boolean }) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { setOpenReset, setOpenLogin } = useNavbarStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      const user = {
        email: values.email,
      };

      const promise = account.createRecovery(
        user.email,
        "https://mebus-website.vercel.app/reset"
      );

      promise.then(
        function (response) {
          setSuccess("Email verification sent!");
          setIsLoading(false);
        },
        function (error) {
        }
      );
      setError("");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpenReset(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Reset your password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="h-3 w-3 animate-spin" /> : "Send"}
            </Button>
          </form>
        </Form>
        <Button
          variant="link"
          onClick={() => {
            router.push("/");
            setOpenReset(false);
            setOpenLogin(true);
          }}
          className="text-sm text-center font-semibold text-indigo-500"
        >
          Return to login
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordForm;
