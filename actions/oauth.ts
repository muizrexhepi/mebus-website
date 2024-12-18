import { account } from "@/appwrite.config";
import { OAuthProvider } from "appwrite";
import axios from "axios";

export async function handleGoogleLogin() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    // 'http://localhost:3000?oauth=true',
    // 'http://localhost:3000/fail',
    process.env.NEXT_PUBLIC_BASE_URL + "?oauth=true",
    `${process.env.NEXT_PUBLIC_BASE_URL}/fail`
  )
}


export async function handleFacebookLogin() {
  account.createOAuth2Session(
    OAuthProvider.Facebook,
    // 'http://localhost:3000?oauth=true',
    // 'http://localhost:3000/fail',
    process.env.NEXT_PUBLIC_BASE_URL + "?oauth=true",
    `${process.env.NEXT_PUBLIC_BASE_URL}/fail`
  );
}

export async function handleOauthCallback() {
  try {
    const user = await account.get();
    const newUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create/db?oauth=true`, {
      name: user.name,
      email: user.email,
      password: null,
      appwrite_id: user.$id
    })

    return newUser;
  } catch (error) {
    console.error(error);
  }
}


export interface IOauthCallbackUser {
  name: string;
  email: string;
  password?: string;
  appwrite_id?: string;
}