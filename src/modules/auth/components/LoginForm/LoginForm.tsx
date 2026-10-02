"use client";

import { useLoginForm } from "../../hooks/useLoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Info, CreditCard, KeyRound, Eye, EyeOff, Building2, Lock } from "lucide-react";

export function LoginForm() {
  const { form, isLoading, showPassword, toggleShowPassword, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="w-full max-w-md flex flex-col gap-5 items-center">
      {/* Top Header Badge & Title */}
      <div className="flex flex-col items-center text-center gap-3 w-full">
        <div className="relative">
          <div className="size-16 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="size-9 text-emerald-400" />
          </div>
          <span className="absolute bottom-0 right-0 size-4 bg-blue-600 rounded-full border-2 border-white" />
        </div>

        <Badge variant="secondary" className="gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200/60 font-semibold rounded-full text-xs uppercase tracking-wide">
          <ShieldCheck className="size-3.5 text-blue-700" />
          Proceso Electoral Oficial
        </Badge>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sistema de Conteo Rápido
          </h1>
          <p className="text-sm font-semibold text-blue-600">
            Elecciones Regionales La Libertad 2026
          </p>
        </div>

        <div className="w-full bg-slate-100/80 text-slate-600 text-xs px-4 py-2.5 rounded-lg border border-slate-200/70 flex items-center justify-center gap-2">
          <Lock className="size-3.5 shrink-0 text-slate-500" />
          <span>Acceso restringido para coordinadores y personeros acreditados de mesa.</span>
        </div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full shadow-lg border-slate-200/80 bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col gap-5">
          {/* Info Notice */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex gap-3 items-start">
            <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Info className="size-4" />
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              Su usuario determina automáticamente el <strong className="font-semibold text-slate-900">Local de Votación</strong> y <strong className="font-semibold text-slate-900">Número de Mesa</strong> asignado según el padrón oficial.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Field: DNI */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dni" className="text-xs font-semibold text-slate-800">
                DNI del Operador / Personero
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400 pointer-events-none">
                  <CreditCard className="size-5" />
                </div>
                <Input
                  id="dni"
                  type="text"
                  maxLength={8}
                  placeholder="Ingrese 8 dígitos"
                  className={`pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-blue-600 ${
                    errors.dni ? "border-red-500 bg-red-50/30" : ""
                  }`}
                  {...register("dni")}
                />
              </div>
              {errors.dni ? (
                <p className="text-xs text-red-500 font-medium">{errors.dni.message}</p>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CreditCard className="size-3" />
                  <span>Documento Nacional de Identidad vigente</span>
                </div>
              )}
            </div>

            {/* Field: Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-slate-800">
                  Código de Acreditación (PIN)
                </label>
                <span className="text-[11px] text-slate-400">Clave de mesa</span>
              </div>
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
              {errors.password ? (
                <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="size-3" />
                  <span>Credencial emitida por la Oficina Descentralizada (ODPE)</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all rounded-xl"
            >
              {isLoading ? "INGRESANDO..." : "INGRESAR AL SISTEMA"}
            </Button>
          </form>

          {/* Help Footer */}
          <div className="flex justify-center pt-1">
            <a
              href="#soporte"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              <Info className="size-3.5" />
              <span>¿Problemas con su acreditación? Contactar coordinador</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Circunscripción Footer Card */}
      <Card className="w-full bg-slate-100/90 border-slate-200/80 shadow-none rounded-xl">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building2 className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">
                Circunscripción La Libertad
              </span>
              <span className="text-[11px] text-slate-500">
                Sede Trujillo • ODPE Central
              </span>
            </div>
          </div>
          <Badge className="bg-white text-blue-600 border border-slate-200 shadow-2xs font-bold text-[10px] px-2.5 py-0.5 rounded-full gap-1">
            <span className="size-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
            ONLINE
          </Badge>
        </CardContent>
      </Card>

      {/* Legal & Version Info */}
      <div className="flex flex-col items-center gap-1 text-center text-[11px] text-slate-400 px-4">
        <div className="flex items-center gap-1.5 font-medium text-slate-500">
          <Lock className="size-3 text-blue-600" />
          <span>Cifrado de extremo a extremo (SHA-256 / TLS 1.3)</span>
        </div>
        <p className="mt-1">Versión v2.4.1 • La Libertad, Perú</p>
        <p className="leading-tight text-[10px] text-slate-400 max-w-xs">
          Uso exclusivo institucional bajo la Ley Orgánica de Elecciones N° 26859.
        </p>
      </div>
    </div>
  );
}
