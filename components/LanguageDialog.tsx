import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavbarStore } from "@/store";

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

const LanguageDialog = () => {
  const { openLanguages, setOpenLanguages } = useNavbarStore();

  const handleLanguageSelect = (language: string) => {
    console.log(`Selected language: ${language}`);
    setOpenLanguages(false);
  };

  return (
    <Dialog open={openLanguages} onOpenChange={() => setOpenLanguages(false)}>
      <DialogContent className="flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle>Select Your Language</DialogTitle>
          <DialogDescription>Choose a language to continue.</DialogDescription>
        </DialogHeader>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
          {languages.map((language, index) => (
            <Button
              key={index}
              variant={"outline"}
              onClick={() => handleLanguageSelect(language)}
              className="w-full"
            >
              {language}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageDialog;
