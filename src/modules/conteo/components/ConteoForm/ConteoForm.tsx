"use client";

import { useConteoForm } from "../../hooks/useConteoForm";
import { ConteoPartidosSkeleton } from "../ConteoPartidosSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Minus,
  Plus,
  Building2,
  ArrowRight,
} from "lucide-react";

export function ConteoForm() {
  const {
    form,
    user,
    partidos,
    isLoadingPartidos,
    isSubmitting,
    subtotalNoPreferenciales,
    totalVotosValidosPartidos,
    totalVotosIngresados,
    diferenciaActa,
    isActaCuadrada,
    incrementCounter,
    decrementCounter,
    incrementPartidoCounter,
    decrementPartidoCounter,
    onSubmit,
  } = useConteoForm();

  const { register, watch } = form;

  const mesaNumero = user?.mesa?.Numero_Mesa || "045812";
  const localNombre = user?.mesa?.Nombre_Local || "I.E. SAN JUAN - TRUJILLO";
  const totalCiudadanos = Number(watch("totalCiudadanos")) || 0;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 pb-20">
      {/* Top Header Bar */}
      <header className="bg-slate-950 text-white rounded-2xl p-3 shadow-lg flex items-center justify-between sticky top-2 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-9 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800">
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">CUSTODIA ELECTORAL</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-1.5 py-0 h-4">
                ● ONLINE
              </Badge>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Digitación Votos</span>
          </div>
        </div>

        <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
          <UserCheck className="size-4" />
        </div>
      </header>

      {/* Subheader info card */}
      <div className="bg-blue-950 text-white rounded-xl p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 text-blue-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold tracking-wide">Mesa N° {mesaNumero}</span>
            <span className="text-[11px] text-blue-200 truncate max-w-[200px] sm:max-w-xs">{localNombre}</span>
          </div>
        </div>
        <Badge className="bg-blue-800/80 text-blue-100 border border-blue-600/50 text-[10px] uppercase font-bold tracking-wider px-2 py-1">
          FASE DIGITACIÓN
        </Badge>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* SECTION 1: Cabecera de Sufragio */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h2 className="text-base font-bold text-slate-900">Cabecera de Sufragio</h2>
            </div>
            <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
              OBLIGATORIO
            </Badge>
          </div>

          {/* Total Ciudadanos que Votaron (Readonly) */}
          <Card className="border-slate-200/90 shadow-xs rounded-2xl bg-white">
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">Total Ciudadanos que Votaron</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Padrón de Mesa</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Ingrese la cifra asentada en la sección de sufragio al cierre de la mesa.
              </p>

              <div className="relative flex items-center">
                <Input
                  type="number"
                  readOnly
                  disabled
                  className="h-14 text-center text-2xl font-extrabold bg-slate-100/80 border-slate-200 rounded-xl text-slate-900 focus-visible:ring-blue-600 pr-16 cursor-not-allowed opacity-100 select-none"
                  {...register("totalCiudadanos", { valueAsNumber: true })}
                />
                <span className="absolute right-4 text-xs font-medium text-slate-400 pointer-events-none">
                  electores
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Counters: Blanco, Nulos, Impugnados, Impugnados SP */}
          <Card className="border-slate-200/90 shadow-xs rounded-2xl bg-white">
            <CardContent className="p-4 flex flex-col gap-4">
              {/* Votos en Blanco */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-slate-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Votos en Blanco</span>
                    <span className="text-[10px] text-slate-400">Sin preferencia marcada</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => decrementCounter("votosBlanco")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min={0}
                    className="h-10 w-16 text-center text-base font-extrabold bg-slate-100/90 border-slate-200 rounded-xl"
                    {...register("votosBlanco", { valueAsNumber: true })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => incrementCounter("votosBlanco")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Votos Nulos */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Votos Nulos</span>
                    <span className="text-[10px] text-slate-400">Signos viciados o roturas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => decrementCounter("votosNulos")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min={0}
                    className="h-10 w-16 text-center text-base font-extrabold bg-slate-100/90 border-slate-200 rounded-xl"
                    {...register("votosNulos", { valueAsNumber: true })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => incrementCounter("votosNulos")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Votos Impugnados */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-blue-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Votos Impugnados</span>
                    <span className="text-[10px] text-slate-400">Reclamados en sobre</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => decrementCounter("votosImpugnados")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min={0}
                    className="h-10 w-16 text-center text-base font-extrabold bg-slate-100/90 border-slate-200 rounded-xl"
                    {...register("votosImpugnados", { valueAsNumber: true })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => incrementCounter("votosImpugnados")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Votos Impugnados Somos Perú */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-pink-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      Votos Impugnados Somos Perú
                    </span>
                    <span className="text-[10px] text-slate-400">Reclamados en sobre</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => decrementCounter("votosImpugnadosSp")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min={0}
                    className="h-10 w-16 text-center text-base font-extrabold bg-slate-100/90 border-slate-200 rounded-xl"
                    {...register("votosImpugnadosSp", { valueAsNumber: true })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => incrementCounter("votosImpugnadosSp")}
                    className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subtotal no-preferenciales display */}
          <div className="bg-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Subtotal no-preferenciales:</span>
            <span className="text-lg font-extrabold text-slate-900">{subtotalNoPreferenciales}</span>
          </div>
        </div>

        {/* SECTION 2: Votos Válidos por Organización */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h2 className="text-base font-bold text-slate-900">Votos Válidos por Organización</h2>
            </div>
            <span className="text-xs font-bold text-blue-600">{partidos.length} Agrupaciones</span>
          </div>

          <p className="text-xs text-slate-500 leading-tight">
            Cédula Regional de La Libertad. Ingrese con exactitud la cifra indicada en el pliego.
          </p>

          {isLoadingPartidos ? (
            <ConteoPartidosSkeleton />
          ) : (
            <div className="flex flex-col gap-2.5">
              {partidos.map((partido) => (
                <Card key={partido.IdPartido} className="border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors bg-white rounded-2xl">
                  <CardContent className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700 font-extrabold text-sm shadow-2xs">
                        <Building2 className="size-5 text-slate-600" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {partido.NombrePartido}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium truncate">
                          {partido.Siglas}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => decrementPartidoCounter(partido.IdPartido)}
                        className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <Input
                        type="number"
                        min={0}
                        className="h-11 w-16 text-center text-lg font-extrabold bg-slate-100/90 border-slate-200 rounded-xl text-slate-900 focus-visible:ring-blue-600 shrink-0"
                        {...register(`votosPartidos.${partido.IdPartido}` as const, {
                          valueAsNumber: true,
                        })}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => incrementPartidoCounter(partido.IdPartido)}
                        className="size-9 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Resumen de Ecuación Electoral */}
        <Card className="border-slate-200/90 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Resumen de Ecuación Electoral</span>
              <Badge
                className={
                  isActaCuadrada
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    : "bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full"
                }
              >
                {isActaCuadrada ? "EQUILIBRADO" : "DESCUADRADO"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-100/80 rounded-xl p-2.5 flex flex-col">
                <span className="text-[10px] text-slate-500 font-medium">Votos Válidos:</span>
                <span className="text-sm font-extrabold text-slate-900">{totalVotosValidosPartidos}</span>
              </div>
              <div className="bg-slate-100/80 rounded-xl p-2.5 flex flex-col">
                <span className="text-[10px] text-slate-500 font-medium">Votos Especiales:</span>
                <span className="text-sm font-extrabold text-slate-900">{subtotalNoPreferenciales}</span>
              </div>
            </div>

            <div className="bg-slate-100/90 rounded-xl p-3 flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-2">
                {isActaCuadrada ? (
                  <CheckCircle2 className="size-5 text-blue-600 shrink-0" />
                ) : (
                  <AlertCircle className="size-5 text-amber-600 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    Acta Cuadrada ({totalVotosIngresados}/{totalCiudadanos})
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {isActaCuadrada
                      ? "Coincidencia matemática perfecta"
                      : "La sumatoria debe ser igual al total de electores"}
                  </span>
                </div>
              </div>
              <span className={`text-xl font-black ${isActaCuadrada ? "text-slate-900" : "text-amber-600"}`}>
                {diferenciaActa}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Footer Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-center">
          <div className="w-full max-w-xl flex items-center gap-3">
            <Button variant="outline" size="icon" type="button" className="size-12 rounded-xl border-slate-300 text-slate-700">
              <ArrowLeft className="size-5" />
            </Button>

            <Button
              type="submit"
              disabled={!isActaCuadrada || isSubmitting}
              className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide rounded-xl shadow-md shadow-blue-600/20 gap-2 transition-colors"
            >
              <span>{isSubmitting ? "REGISTRANDO..." : "CONTINUAR A VERIFICACIÓN"}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
