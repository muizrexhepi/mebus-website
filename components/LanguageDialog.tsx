import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavbarStore } from "@/store";
import { Globe } from "lucide-react";

const languages = [
  "English",
  "French",
  "German",
  "Albanian",
  "Italian",
  "Spanish",
  "Chinese",
  "Japanese",
];

const LanguageDropdown = () => {
  const { openLanguages, setOpenLanguages } = useNavbarStore();

  const handleLanguageSelect = (language: string) => {
    console.log(`Selected language: ${language}`);
    setOpenLanguages(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-3 rounded-full hover:bg-white/20 px-2.5 transition-colors cursor-pointer"
        >
          {" "}
          <Globe className="w-5 h-5" color="white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((language, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleLanguageSelect(language)}
          >
            {language}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
