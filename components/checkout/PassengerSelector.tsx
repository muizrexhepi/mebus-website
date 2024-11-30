import React from "react";
import { UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSearchStore from "@/store";
import { useTranslation } from "react-i18next";

const AddPassenger = () => {
  const { passengers, setPassengers } = useSearchStore((state) => ({
    passengers: state.passengers,
    setPassengers: state.setPassengers,
  }));

  const { t } = useTranslation();

  const addPassenger = (type: "adults" | "children") => {
    console.log("adding", type);
    setPassengers({
      ...passengers,
      [type]: passengers[type] + 1,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-fit">
          <UserPlus className="mr-2 h-4 w-4" />
          {t("passengerInfo.addPassenger")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => addPassenger("adults")}>
          <User className="mr-2 h-4 w-4" />
          <span>{t("passengerInfo.adult")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addPassenger("children")}>
          <User className="mr-2 h-4 w-4" />
          <span>{t("passengerInfo.child")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddPassenger;
