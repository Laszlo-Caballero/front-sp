"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/modules/auth";
import { useResumenGeneralData } from "../../hooks/useResumenGeneralData";

export function useResumenGeneralPage() {
  const { user, logout } = useAuth();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const {
    data,
    isLoading,
    distritos,
    estadosActa,
    stats,
    setFilters,
    refetch,
  } = useResumenGeneralData();

  const handleExportExcel = async () => {
    if (!data || data.length === 0) {
      toast.error("Exportación no disponible", {
        description: "No hay registros disponibles para exportar.",
      });
      return;
    }

    try {
      setIsExporting(true);
      const response = await fetch("/api/export-excel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ocurrió un error al descargar el reporte Excel");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resumen_General_Votos_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Éxito", {
        description: "El reporte en Excel se ha generado correctamente.",
      });
    } catch {
      toast.error("Error", {
        description: "No se pudo generar la exportación a Excel.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
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
  };
}


