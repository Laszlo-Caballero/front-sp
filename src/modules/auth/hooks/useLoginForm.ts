"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { loginSchema, LoginFormValues } from "../schemas/login.schema";
import { loginService } from "../services/auth.service";
import { LoginErrorResponse } from "../types/auth.types";
import { useAuth } from "../context/AuthContext";

export function useLoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await loginService(values);

      if (response.token) {
        login(response);
        toast.success("Autenticación exitosa", {
          description: "Bienvenido al sistema",
        });
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as LoginErrorResponse;
        const errorMessage = errorData.message || "Error al iniciar sesión";
        toast.error("Error de Acreditación", {
          description: errorMessage,
        });
      } else {
        toast.error("Error de Conexión", {
          description:
            "Ocurrió un error al intentar conectarse con el servidor.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    showPassword,
    toggleShowPassword,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
