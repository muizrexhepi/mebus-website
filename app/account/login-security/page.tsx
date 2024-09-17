"use client";
import { deleteUser } from "@/actions/users";
import { account } from "@/appwrite.config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

export default function LoginSecurity() {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false); // For AlertDialog
  const { toast } = useToast();
  const router = useRouter();

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSavePassword = async () => {
    try {
      await account.updatePassword(newPassword, oldPassword);
      setOldPassword("");
      setNewPassword("");
      toast({ description: "Password updated successfully." });
    } catch (error) {
      console.error("Failed to update password:", error);
      toast({
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmailVerification = async () => {
    try {
      await account.createVerification(
        "http://localhost:3000/email-verification"
      );
      toast({ description: "Email sent successfully." });
    } catch (error) {
      console.error("Failed to update password:", error);
      toast({
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const deleted = await deleteUser(user?.$id);
      console.log({ deleted });
      toast({ description: "Account deleted successfully." });
      router.push("/");
      setIsAlertOpen(false); // Close the alert dialog on success
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast({
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Login Security</h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">Password</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">*****</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit password</DialogTitle>
                  <DialogDescription>
                    Make changes to your password here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="oldPassword" className="text-right">
                      Old Password
                    </Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      placeholder="***"
                      className="col-span-3"
                      onChange={handleOldPasswordChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPassword" className="text-right">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      placeholder="***"
                      className="col-span-3"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSavePassword}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold">Account</h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div className="text-base">Verify Email</div>
            {user?.emailVerification ? (
              <Button
                disabled
                variant="outline"
                size="sm"
                onClick={handleEmailVerification}
              >
                Verified
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailVerification}
              >
                Verify
              </Button>
            )}
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div className="text-base">Delete Account</div>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsAlertOpen(true)}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to
                    delete your account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
