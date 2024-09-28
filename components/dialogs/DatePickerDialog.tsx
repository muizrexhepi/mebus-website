import React from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  isReturnDate: boolean;
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  isOpen,
  onClose,
  date,
  onSelect,
  isReturnDate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-full sm:h-auto">
        <DialogHeader>
          <DialogTitle>
            Select {isReturnDate ? "Return" : "Departure"} Date
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onSelect(newDate);
              onClose();
            }}
            initialFocus
          />
        </div>
        {date && (
          <div className="mt-4 text-center">
            <p>Selected Date: {format(date, "PPP")}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
