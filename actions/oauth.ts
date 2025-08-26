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
    // console.error("Google login error:", error);
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
    // console.error("Facebook login error:", error);
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
      // console.error("NextAuth sign-in error:", result.error);
      return { success: false, message: result.error };
    }

    return { success: true, message: "Check your email for the magic link" };
  } catch (error) {
    // console.error("Email login error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
