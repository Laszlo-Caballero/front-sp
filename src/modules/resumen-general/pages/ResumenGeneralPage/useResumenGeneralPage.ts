"use client";

import { useResumenGeneralData } from "../../hooks/useResumenGeneralData";

export function useResumenGeneralPage() {
  const {
    data,
    isLoading,
    distritos,
    estadosActa,
    stats,
    setFilters,
    refetch,
  } = useResumenGeneralData();

  return {
    data,
    isLoading,
    distritos,
    estadosActa,
    stats,
    setFilters,
    refetch,
  };
}
