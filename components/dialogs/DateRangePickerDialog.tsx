import React from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

interface DateRangePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: DateRange | undefined;
  onSelect: SelectRangeEventHandler;
}

const DateRangePickerDialog: React.FC<DateRangePickerDialogProps> = ({
  isOpen,
  onClose,
  date,
  onSelect,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
        <DialogHeader className="space-y-4 h-fit px-4">
          <DialogTitle>{t("searchForm.departure", "Departure")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="p-4">
            <Calendar
              mode="range"
              selected={date}
              onSelect={onSelect}
              numberOfMonths={2}
              className="w-full"
            />
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="px-4 py-8 absolute bottom-0 bg-white left-0 w-full border-t">
            <Button
              onClick={() => onClose()}
              className="w-full h-12 button-gradient text-base"
            >
              {t("datePicker.confirm", "Confirm")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateRangePickerDialog;
