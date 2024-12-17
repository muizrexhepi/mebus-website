"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { account } from "@/appwrite.config";
import RegisterForm from "../forms/RegisterForm";
import ResetPasswordForm from "../forms/ResetForm";
import { LoginDialog } from "../dialogs/login-dialog";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  login: (data: any) => void;
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
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUser = await account.get();
      setUser(fetchedUser);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();

    const handleUserChange = () => {
      fetchUser();
    };

    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, [fetchUser]);

  const login = (data: any) => {
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      <LoginDialog />
      <RegisterForm />
      <ResetPasswordForm />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
