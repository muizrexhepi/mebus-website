"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import RegisterForm from "../forms/RegisterForm";
import ResetPasswordForm from "../forms/ResetForm";
import { LoginDialog } from "../dialogs/login-dialog";
import axios from "axios";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
  updateUserInfo: (info: any) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserByEmail = async () => {
      if (!session?.user?.email) return;
      try {
        if (session?.user?.image) {
          session.user.image = session.user.image
            .replace(/\r?\n|\r/g, "")
            .trim();
        }

        const sanitizedSession = JSON.stringify(session.user);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/get/email?email=${
            session.user.email
          }&session=${encodeURIComponent(sanitizedSession)}`
        );

        console.log({ user: res.data });
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, [session, status]);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const updateUserInfo = (updatedInfo: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      ...updatedInfo,
    }));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
        loading,
        updateUserInfo,
      }}
    >
      <LoginDialog />
      <RegisterForm />
      <ResetPasswordForm />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
