"use client";

import { ResumenGeneralStats } from "../../components/ResumenGeneralStats";
import { ResumenGeneralFilters } from "../../components/ResumenGeneralFilters";
import { ResumenGeneralTable } from "../../components/ResumenGeneralTable";
import { ResumenGeneralSkeletonTable } from "../../components/ResumenGeneralSkeletonTable";
import { useResumenGeneralPage } from "./useResumenGeneralPage";

export function ResumenGeneralPage() {
  const {
    data,
    isLoading,
    distritos,
    estadosActa,
    stats,
    setFilters,
    refetch,
  } = useResumenGeneralPage();

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Resumen General de Votos
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Consolidado en tiempo real de mesas de votación y conteo de votos.
        </p>
      </div>

      <ResumenGeneralStats stats={stats} />

      <ResumenGeneralFilters
        distritos={distritos}
        estadosActa={estadosActa}
        onFilterChange={setFilters}
        onRefresh={refetch}
        isLoading={isLoading}
      />

      {isLoading ? (
        <ResumenGeneralSkeletonTable />
      ) : (
        <ResumenGeneralTable data={data} />
      )}
    </div>
  );
}
