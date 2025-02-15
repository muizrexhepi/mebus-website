import { account } from "@/appwrite.config";
import { OAuthProvider } from "appwrite";
import axios from "axios";
import { signIn } from "next-auth/react";

export async function handleGoogleLogin() {
  try {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: true,
    });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

export async function handleFacebookLogin() {
  try {
    await signIn("facebook", {
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: true,
    });
  } catch (error) {
    console.error("Facebook login error:", error);
    throw error;
  }
}

export async function handleEmailLogin(email: string) {
  try {
    if (!email) throw new Error("Email is required");

    const result = await signIn("email", {
      email,
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL || "/",
      redirect: false, // Ensure you handle the response properly
    });

    if (result?.error) {
      console.error("NextAuth sign-in error:", result.error);
      return { success: false, message: result.error };
    }

    return { success: true, message: "Check your email for the magic link" };
  } catch (error) {
    console.error("Email login error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// export async function handleGoogleLogin() {
//   if (/Mobi|Android/i.test(navigator.userAgent)) {
//     await new Promise((resolve) => setTimeout(resolve, 100));
//   }
//   account.createOAuth2Session(
//     OAuthProvider.Google,
//     // 'http://localhost:3000?oauth=true',
//     // 'http://localhost:3000/fail',
//     process.env.NEXT_PUBLIC_BASE_URL + "?oauth=true",
//     `${process.env.NEXT_PUBLIC_BASE_URL}/fail`
//   );
// }

// export async function handleFacebookLogin() {
//   if (/Mobi|Android/i.test(navigator.userAgent)) {
//     await new Promise((resolve) => setTimeout(resolve, 100));
//   }
//   account.createOAuth2Session(
//     OAuthProvider.Facebook,
//     // 'http://localhost:3000?oauth=true',
//     // 'http://localhost:3000/fail',q
//     process.env.NEXT_PUBLIC_BASE_URL + "?oauth=true",
//     `${process.env.NEXT_PUBLIC_BASE_URL}/fail`
//   );
// }

export async function handleOauthCallback() {
  try {
    const user = await account.get();
    const newUser = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create/db?oauth=true`,
      {
        name: user.name,
        email: user.email,
        password: null,
        appwrite_id: user.$id,
      }
    );

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
