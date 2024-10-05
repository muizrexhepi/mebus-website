import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
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
      <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
        <DialogHeader className="space-y-4 h-fit px-4">
          <DialogTitle>Select number of passengers</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto px-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium text-accent-foreground">Adults</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => decrementPassengers("adults")}
                  disabled={passengers.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 w-8 text-center">
                  {passengers.adults}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => incrementPassengers("adults")}
                  disabled={passengers.adults >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-medium text-accent-foreground">
                Children
              </span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => decrementPassengers("children")}
                  disabled={passengers.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 w-8 text-center">
                  {passengers.children}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => incrementPassengers("children")}
                  disabled={passengers.children >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="p-4 absolute bottom-4 left-0 w-full border-t">
            <Button onClick={() => onClose()} className="w-full">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PassengerSelectDialog;
