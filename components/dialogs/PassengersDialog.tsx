"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import useSearchStore from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PassengerSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PassengerSelectDialog: React.FC<PassengerSelectDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { passengers, setPassengers } = useSearchStore();

  const updatePassengers = (updatedPassengers: typeof passengers) => {
    setPassengers(updatedPassengers);
  };

  const incrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    updatedPassengers[type] = Math.min(passengers[type] + 1, 9);
    updatePassengers(updatedPassengers);
  };

  const decrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    updatedPassengers[type] = Math.max(
      passengers[type] - 1,
      type === "adults" ? 1 : 0
    );
    updatePassengers(updatedPassengers);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton={true}
        className="sm:max-w-[425px] h-full sm:h-[90vh] max-h-[100vh] flex flex-col p-0 gap-0 rounded-none sm:rounded-2xl"
      >
        {/* Header */}
        <DialogHeader className="bg-gray-50 px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <DialogTitle className="text-lg font-medium text-gray-900">
              Select number of passengers
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {/* Adults */}
              <div className="flex items-center justify-between py-6 border-b border-gray-200">
                <div>
                  <span className="text-lg font-medium text-gray-900">
                    Adults
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Age 13 or above</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 bg-transparent"
                    onClick={() => decrementPassengers("adults")}
                    disabled={passengers.adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">
                    {passengers.adults}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 bg-transparent"
                    onClick={() => incrementPassengers("adults")}
                    disabled={passengers.adults >= 9}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between py-6 border-b border-gray-200">
                <div>
                  <span className="text-lg font-medium text-gray-900">
                    Children
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Age 2-12</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 bg-transparent"
                    onClick={() => decrementPassengers("children")}
                    disabled={passengers.children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">
                    {passengers.children}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 bg-transparent"
                    onClick={() => incrementPassengers("children")}
                    disabled={passengers.children >= 9}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  Your age at the time of travel must meet the requirements for
                  the selected ticket type. Some bus operators have restrictions
                  on minors traveling alone.
                </p>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <Button
              onClick={onClose}
              variant={"primary"}
              className="w-full h-12 text-white rounded-xl"
            >
              Confirm ({passengers.adults + passengers.children} passenger
              {passengers.adults + passengers.children !== 1 ? "s" : ""})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PassengerSelectDialog;
