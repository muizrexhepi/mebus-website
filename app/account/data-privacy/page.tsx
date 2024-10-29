"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/hooks/use-toast";
import useUser from "@/components/hooks/use-user";

export default function DataAndPrivacy() {
  const { user, loading } = useUser();
  const [password, setPassword] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDataDeletionRequest = async () => {
    try {
      // Here you would typically send the data deletion request to your backend
      // For this example, we'll just show a success message
      toast({ description: "Data deletion request submitted successfully." });
      setPassword("");
      setIsAlertOpen(false);
    } catch (error) {
      console.error("Failed to submit data deletion request:", error);
      toast({
        description:
          "Failed to submit data deletion request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDataExport = async () => {
    try {
      // Here you would typically trigger a data export process
      // For this example, we'll just show a success message
      toast({
        description:
          "Data export request submitted. You'll receive an email shortly.",
      });
    } catch (error) {
      console.error("Failed to request data export:", error);
      toast({
        description: "Failed to request data export. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Data and Privacy</h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">Data Export</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                Download a copy of your personal data
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleDataExport}>
              Export Data
            </Button>
          </div>

          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">Request Data Deletion</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                Permanently delete all your data from our systems
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request Data Deletion</DialogTitle>
                  <DialogDescription>
                    This action will permanently delete all your data. Please
                    enter your password to confirm.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="Enter your password"
                      className="col-span-3"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" disabled={!password}>
                        Confirm Deletion
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. All of your data will be
                          permanently deleted from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsAlertOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDataDeletionRequest}>
                          Yes, delete my data
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
