"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import {
  mesaSelectorSchema,
  MesaSelectorFormValues,
} from "@/modules/mesa/schemas/mesa-selector.schema";
import { getMesaByNroService } from "@/modules/mesa/services/mesa.service";
import { useAuth } from "@/modules/auth";

export function useMesaSelectorModal(onSuccess?: () => void) {
  const { token, setMesaSelected, selectedMesa } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MesaSelectorFormValues>({
    resolver: zodResolver(mesaSelectorSchema),
    defaultValues: {
      nroMesa: selectedMesa?.Numero_Mesa || "",
    },
  });

  const onSubmit = async (values: MesaSelectorFormValues) => {
    setIsLoading(true);
    try {
      const mesaDetails = await getMesaByNroService(values.nroMesa.trim(), token || undefined);

      setMesaSelected(mesaDetails);
      toast.success("Mesa asignada", {
        description: `Mesa N° ${mesaDetails.Numero_Mesa} (${mesaDetails.Nombre_Local}) seleccionada correctamente.`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Mesa no encontrada", {
          description: "No se encontró información para el número de mesa ingresado.",
        });
      } else {
        toast.error("Error al consultar mesa", {
          description: "Ocurrió un error al obtener la información de la mesa.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
