"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  getResumenVotosService,
  deleteVotosService,
} from "../services/dashboard.service";
import { MesaResumenItem, ResumenMetadata } from "../types/dashboard.types";
import { useAuth } from "@/modules/auth";

export function useDashboardTable(initialSearch: string = "02802") {
  const { token, user, logout } = useAuth();
  const [data, setData] = useState<MesaResumenItem[]>([]);
  const [metadata, setMetadata] = useState<ResumenMetadata>({
    totalItems: 0,
    itemCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [page, setPage] = useState<number>(1);
  const [searchMesa, setSearchMesa] = useState<string>(initialSearch);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMesa, setSelectedMesa] = useState<MesaResumenItem | null>(null);
  const [mesaToDelete, setMesaToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchResumen = useCallback(
    async (currentPage: number, search: string) => {
      try {
        setIsLoading(true);
        const response = await getResumenVotosService(
          {
            page: currentPage,
            limit: 10,
            nroMesa: search.trim() || undefined,
          },
          token || undefined
        );

        setData(response.data);
        setMetadata(response.metadata);
      } catch {
        toast.error("Error al cargar datos", {
          description: "No se pudo obtener el resumen de mesas e imágenes.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchResumen(page, searchMesa);
  }, [page, searchMesa, fetchResumen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchMesa(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchMesa("");
    setPage(1);
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= metadata.totalPages) {
      setPage(newPage);
    }
  };

  const confirmDeleteVotos = async () => {
    if (!mesaToDelete) return;
    try {
      setIsDeleting(true);
      await deleteVotosService(mesaToDelete, token || undefined);
      toast.success("Votos eliminados correctamente", {
        description: `Se han eliminado los votos registrados para la mesa ${mesaToDelete}.`,
      });
      setMesaToDelete(null);
      fetchResumen(page, searchMesa);
    } catch {
      toast.error("Error al eliminar los votos", {
        description: `No se pudo eliminar los votos de la mesa ${mesaToDelete}.`,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    data,
    metadata,
    page,
    searchMesa,
    searchInput,
    setSearchInput,
    isLoading,
    selectedMesa,
    setSelectedMesa,
    mesaToDelete,
    setMesaToDelete,
    isDeleting,
    confirmDeleteVotos,
    handleSearchSubmit,
    handleClearSearch,
    goToPage,
    user,
    logout,
  };
}

