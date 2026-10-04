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
import { Building2, Search, ArrowRight, LogOut, PlusCircle, ArrowLeft } from "lucide-react";

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
  const {
    searchForm,
    createForm,
    isLoading,
    isCreateMode,
    logout,
    handleCancelCreate,
    onSubmitSearch,
    onSubmitCreate,
  } = useMesaSelectorModal(() => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  });

  const {
    register: registerSearch,
    formState: { errors: errorsSearch },
  } = searchForm;

  const {
    register: registerCreate,
    formState: { errors: errorsCreate },
  } = createForm;

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
            {isCreateMode ? "Registrar Nueva Mesa" : "Selección de Mesa"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {isCreateMode
              ? "Complete la información requerida para dar de alta la mesa."
              : "Ingrese el número de mesa para continuar."}
          </DialogDescription>
        </DialogHeader>

        {isCreateMode ? (
          <form onSubmit={onSubmitCreate} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="createNroMesa" className="text-xs font-bold text-slate-800">
                Número de Mesa
              </label>
              <Input
                id="createNroMesa"
                type="text"
                readOnly
                className="h-11 bg-slate-100 border-slate-200 text-slate-900 font-extrabold text-base cursor-not-allowed opacity-90"
                {...registerCreate("nroMesa")}
              />
              {errorsCreate.nroMesa && (
                <p className="text-xs text-red-500 font-medium">{errorsCreate.nroMesa.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="createDistrito" className="text-xs font-bold text-slate-800">
                Distrito
              </label>
              <Input
                id="createDistrito"
                type="text"
                placeholder="Ej. Trujillo"
                className={`h-11 bg-slate-50 border-slate-200 text-slate-900 font-medium text-sm focus-visible:ring-blue-600 ${
                  errorsCreate.distrito ? "border-red-500 bg-red-50/30" : ""
                }`}
                {...registerCreate("distrito")}
              />
              {errorsCreate.distrito && (
                <p className="text-xs text-red-500 font-medium">{errorsCreate.distrito.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="createCapacidad" className="text-xs font-bold text-slate-800">
                Capacidad (Electores por Mesa)
              </label>
              <Input
                id="createCapacidad"
                type="number"
                min={1}
                placeholder="Ej. 299"
                className={`h-11 bg-slate-50 border-slate-200 text-slate-900 font-medium text-sm focus-visible:ring-blue-600 ${
                  errorsCreate.capacidad ? "border-red-500 bg-red-50/30" : ""
                }`}
                {...registerCreate("capacidad", { valueAsNumber: true })}
              />
              {errorsCreate.capacidad && (
                <p className="text-xs text-red-500 font-medium">{errorsCreate.capacidad.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-xl shadow-md gap-2"
              >
                <PlusCircle className="size-4" />
                <span>{isLoading ? "REGISTRANDO..." : "REGISTRAR Y SELECCIONAR"}</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleCancelCreate}
                className="h-10 w-full text-slate-600 hover:bg-slate-100 font-semibold text-xs rounded-xl gap-2"
              >
                <ArrowLeft className="size-4 text-slate-500" />
                <span>Volver a Buscar</span>
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmitSearch} className="flex flex-col gap-4 mt-2">
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
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Ej. 102030"
                  className={`pl-9 h-12 bg-slate-50 border-slate-200 text-slate-900 font-extrabold text-base focus-visible:ring-blue-600 ${
                    errorsSearch.nroMesa ? "border-red-500 bg-red-50/30" : ""
                  }`}
                  {...registerSearch("nroMesa", {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    },
                  })}
                />
              </div>
              {errorsSearch.nroMesa && (
                <p className="text-xs text-red-500 font-medium">{errorsSearch.nroMesa.message}</p>
              )}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
