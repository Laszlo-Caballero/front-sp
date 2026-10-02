"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserAuthData, LoginSuccessResponse } from "../types/auth.types";
import { AuthContextType } from "../types/auth-context.types";

const AuthContext = createContext<AuthContextType | null>(null);

const USER_STORAGE_KEY = "user_data";
const TOKEN_COOKIE_KEY = "token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get(TOKEN_COOKIE_KEY) || null;
    const savedUserStr = localStorage.getItem(USER_STORAGE_KEY);

    if (savedToken && savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr) as UserAuthData;
        setUser(parsedUser);
        setToken(savedToken);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        Cookies.remove(TOKEN_COOKIE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (authData: LoginSuccessResponse) => {
    const { token: newToken, user: newUser } = authData;

    Cookies.set(TOKEN_COOKIE_KEY, newToken, { expires: 1 });
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    setToken(null);
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
}
