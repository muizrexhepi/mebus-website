import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
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

const ResetPasswordForm = ({ isOpen }: { isOpen: boolean }) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    console.log(values);
    try {
      const user = {
        email: values.email,
      };

      const promise = account.createRecovery(
        user.email,
        "http://localhost:3000/reset"
      );

      promise.then(
        function (response) {
          console.log({ succes: response }); // Success
          setSuccess("Email verification sent!");
          setIsLoading(false);
        },
        function (error) {
          console.log({ failure: error }); // Failure
        }
      );
      setError("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={() => router.push("/")}>
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
        <Link
          className="text-sm text-center font-semibold text-indigo-500"
          href="/?login=true"
        >
          Return to login
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordForm;
