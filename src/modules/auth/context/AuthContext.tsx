"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserAuthData, LoginSuccessResponse } from "../types/auth.types";
import { AuthContextType } from "../types/auth-context.types";
import { MesaDetails } from "@/modules/mesa/types/mesa.types";

interface JwtPayload {
  dni?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

function decodeJwtToken(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

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

    if (savedToken) {
      try {
        const payload = decodeJwtToken(savedToken);
        let userObj: UserAuthData;

        if (savedUserStr) {
          userObj = JSON.parse(savedUserStr) as UserAuthData;
        } else if (payload) {
          userObj = {
            DNI: payload.dni || "",
            role: payload.role || "user",
            NombreCompleto: payload.dni ? `Usuario (${payload.dni})` : "Usuario",
          };
        } else {
          throw new Error("Token inválido");
        }

        setUser(userObj);
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
    const newToken = authData.token;
    const payload = decodeJwtToken(newToken);
    const userFromToken: UserAuthData = {
      DNI: payload?.dni || "",
      role: payload?.role || "user",
      NombreCompleto: payload?.dni ? `Usuario (${payload.dni})` : "Usuario",
    };

    Cookies.set(TOKEN_COOKIE_KEY, newToken, { expires: 1 });
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userFromToken));

    setToken(newToken);
    setUser(userFromToken);
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

