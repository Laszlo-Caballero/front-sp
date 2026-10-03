"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserAuthData, LoginSuccessResponse } from "../types/auth.types";
import { AuthContextType } from "../types/auth-context.types";
import { MesaDetails } from "@/modules/mesa/types/mesa.types";

const AuthContext = createContext<AuthContextType | null>(null);

const USER_STORAGE_KEY = "user_data";
const TOKEN_COOKIE_KEY = "token";
const MESA_STORAGE_KEY = "nro_mesa_data";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedMesa, setSelectedMesa] = useState<MesaDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get(TOKEN_COOKIE_KEY) || null;
    const savedUserStr = localStorage.getItem(USER_STORAGE_KEY);
    const savedMesaStr = localStorage.getItem(MESA_STORAGE_KEY);

    if (savedToken && savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr) as UserAuthData;
        setUser(parsedUser);
        setToken(savedToken);

        if (savedMesaStr) {
          const parsedMesa = JSON.parse(savedMesaStr) as MesaDetails;
          setSelectedMesa(parsedMesa);
        }
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(MESA_STORAGE_KEY);
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

  const setMesaSelected = (mesa: MesaDetails) => {
    localStorage.setItem(MESA_STORAGE_KEY, JSON.stringify(mesa));
    setSelectedMesa(mesa);
  };

  const clearMesaSelected = () => {
    localStorage.removeItem(MESA_STORAGE_KEY);
    setSelectedMesa(null);
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(MESA_STORAGE_KEY);

    setToken(null);
    setUser(null);
    setSelectedMesa(null);
    router.push("/auth");
  };

  const nroMesa = selectedMesa ? selectedMesa.Numero_Mesa : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        selectedMesa,
        nroMesa,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        logout,
        setMesaSelected,
        clearMesaSelected,
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
