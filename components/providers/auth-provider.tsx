"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import RegisterForm from "../forms/RegisterForm";
import ResetPasswordForm from "../forms/ResetForm";
import { LoginDialog } from "../dialogs/login-dialog";

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
  const [loading, setLoading] = useState(true);

  console.log({ session });

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        isAuthenticated: !!session,
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
