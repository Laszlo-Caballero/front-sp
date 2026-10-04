"use client";

import { useConteoForm } from "../../hooks/useConteoForm";
import { ConteoPartidosSkeleton } from "../ConteoPartidosSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ShieldCheck,
  Minus,
  Plus,
  Building2,
  ArrowRight,
  LogOut,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export function ConteoForm() {
  const {
    form,
    user,
    selectedMesa,
    partidos,
    isLoadingPartidos,
    isSubmitting,
    isConfirmOpen,
    totalVotosValidosPartidos,
    totalVotosIngresados,
    incrementPartidoCounter,
    decrementPartidoCounter,
    incrementImpugnadosSpCounter,
    decrementImpugnadosSpCounter,
    handleOpenConfirm,
    handleCloseConfirm,
    onSubmit,
    logout,
    clearMesaSelected,
  } = useConteoForm();

  const { register } = form;

  const mesaNumero = selectedMesa?.Numero_Mesa || user?.mesa?.Numero_Mesa || "Sin seleccionar";
  const localNombre = selectedMesa?.Nombre_Local || user?.mesa?.Nombre_Local || "Local no especificado";

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 pb-20">
      <header className="bg-slate-950 text-white rounded-2xl p-3 shadow-lg flex items-center justify-between sticky top-2 z-20">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="size-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-white uppercase">
              Conteo de Votos
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Digitación</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearMesaSelected}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold px-2.5 h-8"
          >
            <Building2 className="size-3.5 text-blue-400" />
            <span className="hidden sm:inline">Cambiar Mesa</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold px-2.5 h-8"
          >
            <LogOut className="size-3.5 text-red-400" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      <div className="bg-blue-950 text-white rounded-xl p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 text-blue-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold tracking-wide">Mesa N° {mesaNumero}</span>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h2 className="text-base font-bold text-slate-900">Votos Válidos por Organización</h2>
            </div>
            <span className="text-xs font-bold text-blue-600">{partidos.length} Agrupaciones</span>
          </div>

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

              <Card className="border-pink-200/80 bg-pink-50/40 shadow-2xs rounded-2xl mt-2">
                <CardContent className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center shrink-0 text-pink-700 font-extrabold text-sm shadow-2xs">
                      <AlertTriangle className="size-5 text-pink-600" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-pink-950 truncate">
                        Votos Impugnados Somos Perú
                      </span>
                      <span className="text-[11px] text-pink-700/80 font-medium truncate">
                        Impugnados específicos
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decrementImpugnadosSpCounter}
                      className="size-9 rounded-xl border-pink-300 text-pink-900 hover:bg-pink-100"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <Input
                      type="number"
                      min={0}
                      className="h-11 w-16 text-center text-lg font-extrabold bg-white border-pink-200 rounded-xl text-pink-950 focus-visible:ring-pink-600 shrink-0"
                      {...register("votosImpugnadosSp", { valueAsNumber: true })}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={incrementImpugnadosSpCounter}
                      className="size-9 rounded-xl border-pink-300 text-pink-900 hover:bg-pink-100"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Card className="border-slate-200/90 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Total Votos Ingresados</span>
            <span className="text-xl font-extrabold text-blue-600">{totalVotosIngresados}</span>
          </CardContent>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-center">
          <div className="w-full max-w-xl flex items-center gap-3">
            <Button variant="outline" size="icon" type="button" className="size-12 rounded-xl border-slate-300 text-slate-700">
              <ArrowLeft className="size-5" />
            </Button>

            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleOpenConfirm}
              className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide rounded-xl shadow-md shadow-blue-600/20 gap-2 transition-colors"
            >
              <span>{isSubmitting ? "REGISTRANDO..." : "CONTINUAR A VERIFICACIÓN"}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={isConfirmOpen} onOpenChange={(open) => !open && handleCloseConfirm()}>
        <DialogContent className="max-w-md bg-white border-slate-200 rounded-2xl p-6">
          <DialogHeader className="flex flex-col gap-2 items-center text-center">
            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <AlertCircle className="size-6" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-slate-900">
              ¿Confirmar registro de votos?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Está a punto de guardar un total de <strong className="font-bold text-slate-800">{totalVotosIngresados}</strong> votos para la Mesa N° {mesaNumero}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-xl shadow-md gap-2"
            >
              <span>{isSubmitting ? "ENVIANDO..." : "CONFIRMAR Y ENVIAR"}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={handleCloseConfirm}
              className="h-10 w-full text-slate-600 hover:bg-slate-100 font-semibold text-xs rounded-xl"
            >
              <span>Cancelar</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
