import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { DefaultSession } from "next-auth";
import { ChevronsLeftRight } from "lucide-react";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"]; // No more `id`
  }
}

export interface IUser {
  name: string;
  email: string;
  password?: string | null;
  auth_id: string;
}

const createUserInDB = async (userData: {
  name: string | null;
  email: string | null;
  password: null;
  profile_picture: string | null;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create/db?oauth=true`,
      userData
    );
    // console.log("User creation response:", response.data);
    return true;
  } catch (error: any) {
    // console.error(
    //   "Error creating user:",
    //   error.response?.data || error.message
    // );

    if (error.response?.data?.message === "User exists") {
      return true;
    }
    return false;
  }
};

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        try {
          // Call your backend OTP validation endpoint
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/otp/validate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                otp: credentials.otp,
              }),
            }
          );

          if (!response.ok) return null;

          const userData = await response.json();
          return {
            id: userData.id || userData._id,
            name: userData.name,
            email: credentials.email,
            image: userData.profile_picture || null,
          };
        } catch (error) {
          // console.error("Error in OTP verification:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // console.log({ user, account });
      if (account?.provider === "email-otp") {
        return true;
      }
      return createUserInDB({
        name: user.name || null,
        email: user.email || null,
        password: null,
        profile_picture:
          account?.provider === "facebook" ? null : user.image || null,
      });
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Add any other user data you want in the JWT
      }
      return token;
    },
    async session({ session }) {
      // console.log("Session callback:", session);
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
