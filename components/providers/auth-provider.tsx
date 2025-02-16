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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/get/email?email=${
            session.user.email
          }&session=${JSON.stringify(session.user)}`
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
        loading,
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
