"use client";
import { account } from "@/appwrite.config";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import useUser from "@/components/hooks/use-user";

export default function PersonalInfo() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingInfo, setEditingInfo] = useState<any>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const { toast } = useToast();

  const PATIENT_INFO = [
    {
      label: "Full Name",
      value: user?.patientInfo?.fullName || "Not provided",
      action: user?.patientInfo?.fullName ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ fullName: newValue });
      },
    },
    {
      label: "Date of Birth",
      value: user?.patientInfo?.dateOfBirth || "Not provided",
      action: user?.patientInfo?.dateOfBirth ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ dateOfBirth: newValue });
      },
    },
    {
      label: "Gender",
      value: user?.patientInfo?.gender || "Not provided",
      action: user?.patientInfo?.gender ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ gender: newValue });
      },
    },
    {
      label: "Emergency Contact",
      value: user?.patientInfo?.emergencyContact || "Not provided",
      action: user?.patientInfo?.emergencyContact ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ emergencyContact: newValue });
      },
    },
    {
      label: "Allergies",
      value: user?.patientInfo?.allergies || "Not provided",
      action: user?.patientInfo?.allergies ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ allergies: newValue });
      },
    },
    {
      label: "Current Medications",
      value: user?.patientInfo?.currentMedications || "Not provided",
      action: user?.patientInfo?.currentMedications ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ currentMedications: newValue });
      },
    },
    {
      label: "Past Medical History",
      value: user?.patientInfo?.pastMedicalHistory || "Not provided",
      action: user?.patientInfo?.pastMedicalHistory ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ pastMedicalHistory: newValue });
      },
    },
    {
      label: "Family Medical History",
      value: user?.patientInfo?.familyMedicalHistory || "Not provided",
      action: user?.patientInfo?.familyMedicalHistory ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ familyMedicalHistory: newValue });
      },
    },
    {
      label: "Primary Physician",
      value: user?.patientInfo?.primaryPhysician || "Not provided",
      action: user?.patientInfo?.primaryPhysician ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ primaryPhysician: newValue });
      },
    },
    {
      label: "Insurance Provider",
      value: user?.patientInfo?.insuranceProvider || "Not provided",
      action: user?.patientInfo?.insuranceProvider ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ insuranceProvider: newValue });
      },
    },
    {
      label: "Insurance Policy Number",
      value: user?.patientInfo?.insurancePolicyNumber || "Not provided",
      action: user?.patientInfo?.insurancePolicyNumber ? "Edit" : "Add",
      update: async (newValue: string) => {
        await account.updatePrefs({ insurancePolicyNumber: newValue });
      },
    },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (editingInfo) {
      try {
        await editingInfo.update(editedValue);
        setEditingInfo(null);
        toast({ description: "Changes saved successfully." });
      } catch (error) {
        console.error("Failed to save changes:", error);
        toast({
          description: "Failed to save changes. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Patient Info</h2>
        </div>
        <div className="space-y-6">
          {PATIENT_INFO.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
            >
              <div>
                <div className="text-base">{item.label}</div>
                <div className="text-neutral-800/60 max-w-2xl text-sm">
                  {isLoading ? <Skeleton className="w-24 h-5" /> : item.value}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingInfo(item);
                  setEditedValue(item.value);
                }}
              >
                {item.action}
              </Button>
            </div>
          ))}
          <Dialog
            open={editingInfo !== null}
            onOpenChange={() => setEditingInfo(null)}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit {editingInfo?.label}</DialogTitle>
                <DialogDescription>
                  Enter your updated value below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {editingInfo?.label}
                  </Label>
                  <Input
                    id="name"
                    value={editedValue}
                    className="col-span-3"
                    onChange={handleValueChange}
                  />
                  {/* )} */}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
