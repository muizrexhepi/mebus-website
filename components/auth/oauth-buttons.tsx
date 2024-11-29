import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";

export const OauthButtons = ({ isLoading }: { isLoading: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className="grid  gap-4">
      <Button
        className="w-full h-12 rounded-xl"
        onClick={handleGoogleLogin}
        variant="outline"
        disabled={isLoading}
      >
        <Image
          src="/assets/icons/googleIcon.svg"
          width={20}
          height={20}
          alt="Google icon"
          className="mr-2"
        />
        {t("login.googleButton")}
      </Button>
      <Button
        className="w-full h-12 rounded-xl"
        onClick={handleFacebookLogin}
        variant="outline"
        disabled={isLoading}
      >
        <Image
          src="/assets/icons/facebookIcon.svg"
          width={20}
          height={20}
          alt="Facebook icon"
          className="mr-2"
        />
        {t("login.facebookButton")}
      </Button>
    </div>
  );
};
