"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, RefreshCw } from "lucide-react";
import { ResumenGeneralFiltersProps } from "./ResumenGeneralFilters.types";
import { useResumenGeneralFilters } from "./useResumenGeneralFilters";

export function ResumenGeneralFilters({
  distritos,
  estadosActa,
  onFilterChange,
  onRefresh,
  isLoading,
}: ResumenGeneralFiltersProps) {
  const { form, handleReset } = useResumenGeneralFilters({ onFilterChange });
  const { register } = form;

  return (
    <div className="bg-card border border-border/60 rounded-xl p-4 mb-6 shadow-xs">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              {...register("busqueda")}
              placeholder="Buscar por Mesa, Local o Distrito..."
              className="pl-9 bg-background"
            />
          </div>

          <select
            {...register("distrito")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
          >
            {distritos.map((dist) => (
              <option key={dist} value={dist}>
                Distrito: {dist}
              </option>
            ))}
          </select>

          <select
            {...register("estadoActa")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
          >
            {estadosActa.map((est) => (
              <option key={est} value={est}>
                Estado: {est}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpiar
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}
