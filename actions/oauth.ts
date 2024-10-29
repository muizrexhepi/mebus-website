import { account } from "@/appwrite.config";
import { OAuthProvider } from "appwrite";
import { createUser } from "./users";
import axios from "axios";
import { environment } from "@/environment";

export async function handleGoogleLogin() {  
    account.createOAuth2Session(
      OAuthProvider.Google,
      environment.domainurl + "?oauth=true",
      `${environment.domainurl}/fail`
    )
}

export async function handleGoogleCallback() {
  try {
    const user = await account.get();
    const newUser = await axios.post(`${environment.apiurl}/user/create/db`,{
      name: user.name,
      email: user.email,
      password: null,
      appwrite_id: user.$id
    })
  
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function handleFacebookLogin() {
    account.createOAuth2Session(
      OAuthProvider.Facebook,
      // 'http://localhost:3000',
      // 'http://localhost:3000/fail',
      environment.domainurl,
      `${environment.domainurl}/fail`
    );
  }


  export interface IOauthCallbackUser {
    name: string;
    email: string;
    password?: string;
    appwrite_id?: string;
  }