import { account } from "@/appwrite.config";
import { OAuthProvider } from "appwrite";
import { createUser } from "./users";
import axios from "axios";
import { environment } from "@/environment";

export async function handleGoogleLogin() {
  const user = await account.get();
  console.log({user})
  const newUser = await axios.post(`${environment.apiurl}/user/create/db`,{
    name:user.name,
    email:user.email,
    password: null,
    appwrite_id: user.$id
  })

  console.log({newUser})
  
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