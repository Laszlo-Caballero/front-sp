"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/modules/auth";
import { getResumenGeneralService } from "../services/resumen-general.service";
import {
  ResumenGeneralFilters,
  ResumenGeneralResumen,
  ResumenGeneralVoto,
} from "../types/resumen-general.types";

export function useResumenGeneralData() {
  const { token } = useAuth();
  const [data, setData] = useState<ResumenGeneralVoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ResumenGeneralFilters>({
    busqueda: "",
    distrito: "TODOS",
    estadoActa: "TODOS",
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const responseData = await getResumenGeneralService(token || undefined);
      setData(responseData);
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          "Error al cargar los datos de resumen general"
        : "Ocurrió un error inesperado al conectar con el servidor";

      toast.error("Error de carga", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const distritos = useMemo(() => {
    const list = Array.from(
      new Set(data.map((item) => item.Distrito).filter(Boolean)),
    ).sort();
    return ["TODOS", ...list];
  }, [data]);

  const estadosActa = useMemo(() => {
    const list = Array.from(
      new Set(
        data
          .map((item) => item.EstadoActa)
          .filter((val): val is string => Boolean(val)),
      ),
    ).sort();
    return ["TODOS", ...list];
  }, [data]);

  const filteredData = useMemo(() => {
    const query = filters.busqueda.trim().toLowerCase();

    return data.filter((item) => {
      const matchDistrito =
        filters.distrito === "TODOS" || item.Distrito === filters.distrito;

      const matchEstado =
        filters.estadoActa === "TODOS" ||
        (item.EstadoActa || "SIN ESTADO") === filters.estadoActa;

      if (!matchDistrito || !matchEstado) {
        return false;
      }

      if (!query) {
        return true;
      }

      const numMesa = item.Numero_Mesa ? item.Numero_Mesa.toLowerCase() : "";
      const nomLocal = item.Nombre_Local ? item.Nombre_Local.toLowerCase() : "";
      const distrito = item.Distrito ? item.Distrito.toLowerCase() : "";

      return (
        numMesa.includes(query) ||
        nomLocal.includes(query) ||
        distrito.includes(query)
      );
    });
  }, [data, filters]);

  const stats: ResumenGeneralResumen = useMemo(() => {
    return filteredData.reduce<ResumenGeneralResumen>(
      (acc, item) => {
        acc.totalMesas += 1;
        acc.totalElectores += item.Electores_Por_Mesa || 0;
        acc.totalCiudadanosVotaron += item.TotalCiudadanosVotaron || 0;
        acc.totalVotosValidos += item.TotalVotosValidos || 0;
        return acc;
      },
      {
        totalMesas: 0,
        totalElectores: 0,
        totalCiudadanosVotaron: 0,
        totalVotosValidos: 0,
      },
    );
  }, [filteredData]);

  return {
    data: filteredData,
    rawData: data,
    isLoading,
    filters,
    setFilters,
    distritos,
    estadosActa,
    stats,
    refetch: fetchData,
  };
}
