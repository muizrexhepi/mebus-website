"use client";
import React, { createContext, useContext, useState } from "react";
import RegisterForm from "./forms/RegisterForm";
import ResetPasswordForm from "./forms/ResetForm";
import { LoginDialog } from "./dialogs/login-dialog";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (data: any) => {
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <LoginDialog />
      <RegisterForm />
      <ResetPasswordForm />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
