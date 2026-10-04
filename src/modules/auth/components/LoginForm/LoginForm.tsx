"use client";

import { useLoginForm } from "../../hooks/useLoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, CreditCard, KeyRound, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const { form, isLoading, showPassword, toggleShowPassword, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="w-full max-w-md flex flex-col gap-5 items-center">
      <div className="flex flex-col items-center text-center gap-3 w-full">
        <div className="relative">
          <div className="size-16 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="size-9 text-emerald-400" />
          </div>
          <span className="absolute bottom-0 right-0 size-4 bg-blue-600 rounded-full border-2 border-white" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sistema de Conteo Rápido
          </h1>
        </div>
      </div>

      <Card className="w-full shadow-lg border-slate-200/80 bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col gap-5">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dni" className="text-xs font-semibold text-slate-800">
                DNI / Usuario
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400 pointer-events-none">
                  <CreditCard className="size-5" />
                </div>
                <Input
                  id="dni"
                  type="text"
                  maxLength={8}
                  placeholder="Ingrese DNI"
                  className={`pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-blue-600 ${
                    errors.dni ? "border-red-500 bg-red-50/30" : ""
                  }`}
                  {...register("dni")}
                />
              </div>
              {errors.dni && (
                <p className="text-xs text-red-500 font-medium">{errors.dni.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-800">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400 pointer-events-none">
                  <KeyRound className="size-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-blue-600 ${
                    errors.password ? "border-red-500 bg-red-50/30" : ""
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all rounded-xl"
            >
              {isLoading ? "INGRESANDO..." : "INGRESAR AL SISTEMA"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

