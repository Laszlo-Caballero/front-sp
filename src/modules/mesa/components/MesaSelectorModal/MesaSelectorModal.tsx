"use client";

import { useMesaSelectorModal } from "./useMesaSelectorModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, ArrowRight, ShieldCheck, LogOut } from "lucide-react";

export interface MesaSelectorModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  canClose?: boolean;
}

export function MesaSelectorModal({
  isOpen,
  onOpenChange,
  canClose = false,
}: MesaSelectorModalProps) {
  const { form, isLoading, logout, onSubmit } = useMesaSelectorModal(() => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  });

  const { register, formState: { errors } } = form;

  return (
    <Dialog open={isOpen} onOpenChange={canClose ? onOpenChange : () => {}}>
      <DialogContent
        showCloseButton={canClose}
        className="sm:max-w-md bg-white border-slate-200 rounded-2xl p-6"
      >
        <DialogHeader className="flex flex-col gap-2 items-center text-center">
          <div className="size-12 rounded-2xl bg-blue-900 text-blue-400 flex items-center justify-center shadow-md">
            <Building2 className="size-6" />
          </div>
          <DialogTitle className="text-xl font-extrabold text-slate-900">
            Selección de Mesa de Votación
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Ingrese el número de mesa para cargar los datos e iniciar las operaciones de sufragio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nroMesaModal" className="text-xs font-bold text-slate-800">
              Número de Mesa
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none">
                <Search className="size-4" />
              </div>
              <Input
                id="nroMesaModal"
                type="text"
                placeholder="Ej. 102030"
                className={`pl-9 h-12 bg-slate-50 border-slate-200 text-slate-900 font-extrabold text-base focus-visible:ring-blue-600 ${
                  errors.nroMesa ? "border-red-500 bg-red-50/30" : ""
                }`}
                {...register("nroMesa")}
              />
            </div>
            {errors.nroMesa ? (
              <p className="text-xs text-red-500 font-medium">{errors.nroMesa.message}</p>
            ) : (
              <span className="text-[11px] text-slate-500">
                Se validará la existencia de la mesa en el padrón electoral.
              </span>
            )}
          </div>

          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-blue-600 shrink-0" />
            <span className="text-[11px] text-slate-700">
              Esta mesa se guardará localmente para la posterior transmisión de votos y actas.
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-xl shadow-md gap-2"
            >
              <span>{isLoading ? "CONSULTANDO..." : "CONFIRMAR MESA"}</span>
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={logout}
              className="h-10 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 font-semibold text-xs rounded-xl gap-2"
            >
              <LogOut className="size-4 text-red-500" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
