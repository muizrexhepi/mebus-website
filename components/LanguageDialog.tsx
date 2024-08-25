import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

const LanguageDialog = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();

  const handleLanguageSelect = (language: string) => {
    console.log(`Selected language: ${language}`);
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => router.push("/")}>
      <DialogContent>
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
