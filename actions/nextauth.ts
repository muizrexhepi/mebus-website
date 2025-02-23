import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email";
import axios from "axios";
import { DefaultSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

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
    console.log(userData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create/db?oauth=true`,
      userData
    );
    console.log("User creation response:", response.data);
    return true;
  } catch (error: any) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );

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
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
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
      console.log({ user, account });

      return createUserInDB({
        name: user.name || null,
        email: user.email || null,
        password: null,
        profile_picture:
          account?.provider === "facebook" ? null : user.image || null,
      });
    },

    async session({ session }) {
      console.log("Session callback:", session);
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};
