import { account } from "@/appwrite.config";
import { OAuthProvider } from "appwrite";

export async function handleGoogleLogin() {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "https://mebus-website.vercel.app",
      "https://mebus-website.vercel.app/fail"
    );
  }

export async function handleFacebookLogin() {
    account.createOAuth2Session(
      OAuthProvider.Facebook,
      "https://mebus-website.vercel.app",
      "https://mebus-website.vercel.app/fail"
    );
  }