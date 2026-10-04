"use client";

import { ShieldCheck, LogOut, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ResumenGeneralStats } from "../../components/ResumenGeneralStats";
import { ResumenGeneralFilters } from "../../components/ResumenGeneralFilters";
import { ResumenGeneralTable } from "../../components/ResumenGeneralTable";
import { ResumenGeneralSkeletonTable } from "../../components/ResumenGeneralSkeletonTable";
import { useResumenGeneralPage } from "./useResumenGeneralPage";

export function ResumenGeneralPage() {
  const {
    user,
    logout,
    data,
    isLoading,
    isExporting,
    distritos,
    estadosActa,
    stats,
    setFilters,
    refetch,
    handleExportExcel,
  } = useResumenGeneralPage();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 pb-12 p-4 md:p-6">
      <header className="bg-slate-950 text-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="size-6 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-white uppercase">
              Resumen General
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Reporte de Votos
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-white">
              {user?.NombreCompleto || "Usuario"}
            </span>
            <span className="text-[11px] text-slate-400">
              DNI: {user?.DNI || "--------"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold"
          >
            <LogOut className="size-4 text-red-400" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-6 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="size-6 text-blue-600" />
              Resumen General de Votos
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Consolidado de mesas de votación y conteo de votos.
            </p>
          </div>

          <ResumenGeneralStats stats={stats} />

          <ResumenGeneralFilters
            distritos={distritos}
            estadosActa={estadosActa}
            onFilterChange={setFilters}
            onRefresh={refetch}
            onExportExcel={handleExportExcel}
            isLoading={isLoading}
            isExporting={isExporting}
          />

          {isLoading ? (
            <ResumenGeneralSkeletonTable />
          ) : (
            <ResumenGeneralTable data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
