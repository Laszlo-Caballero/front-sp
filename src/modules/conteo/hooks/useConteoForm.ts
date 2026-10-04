"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { conteoSchema, ConteoFormValues } from "../schemas/conteo.schema";
import {
  getPartidosService,
  registrarVotosService,
} from "../services/conteo.service";
import { Partido, RegistroVotosErrorResponse } from "../types/conteo.types";
import { useAuth } from "@/modules/auth";
import { useRouter } from "next/navigation";

export function useConteoForm() {
  const { user, token, selectedMesa, nroMesa, logout, clearMesaSelected } = useAuth();
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [isLoadingPartidos, setIsLoadingPartidos] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<ConteoFormValues>({
    resolver: zodResolver(conteoSchema),
    defaultValues: {
      totalCiudadanos: 0,
      votosBlanco: 0,
      votosNulos: 0,
      votosImpugnados: 0,
      votosImpugnadosSp: 0,
      votosPartidos: {},
      nroMesa: nroMesa || "",
    },
  });

  const { control, setValue, handleSubmit } = form;

  useEffect(() => {
    if (nroMesa) {
      setValue("nroMesa", nroMesa);
    }
  }, [nroMesa, setValue]);

  const votosPartidosMap = useWatch({ control, name: "votosPartidos" }) || {};
  const votosImpugnadosSp = Number(useWatch({ control, name: "votosImpugnadosSp" })) || 0;

  useEffect(() => {
    async function loadPartidos() {
      try {
        setIsLoadingPartidos(true);
        const data = await getPartidosService(token || undefined);
        setPartidos(data);

        const initialPartidosMap: Record<string, number> = {};
        data.forEach((p) => {
          initialPartidosMap[p.IdPartido] = 0;
        });
        setValue("votosPartidos", initialPartidosMap);
      } catch {
        toast.error("Error de carga", {
          description: "No se pudieron obtener las organizaciones políticas.",
        });
      } finally {
        setIsLoadingPartidos(false);
      }
    }

    loadPartidos();
  }, [token, setValue]);

  const totalVotosValidosPartidos = Object.values(
    votosPartidosMap,
  ).reduce<number>((acc, curr) => acc + (Number(curr) || 0), 0);

  const totalVotosIngresados = totalVotosValidosPartidos + votosImpugnadosSp;

  const incrementPartidoCounter = (partidoId: number) => {
    const current = Number(form.getValues(`votosPartidos.${partidoId}`)) || 0;
    setValue(`votosPartidos.${partidoId}`, current + 1);
  };

  const decrementPartidoCounter = (partidoId: number) => {
    const current = Number(form.getValues(`votosPartidos.${partidoId}`)) || 0;
    if (current > 0) {
      setValue(`votosPartidos.${partidoId}`, current - 1);
    }
  };

  const incrementImpugnadosSpCounter = () => {
    const current = Number(form.getValues("votosImpugnadosSp")) || 0;
    setValue("votosImpugnadosSp", current + 1);
  };

  const decrementImpugnadosSpCounter = () => {
    const current = Number(form.getValues("votosImpugnadosSp")) || 0;
    if (current > 0) {
      setValue("votosImpugnadosSp", current - 1);
    }
  };

  const router = useRouter();

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const executeSubmit = async (values: ConteoFormValues) => {
    setIsSubmitting(true);
    setIsConfirmOpen(false);
    try {
      const payload: ConteoFormValues = {
        ...values,
        nroMesa: nroMesa || values.nroMesa,
        totalCiudadanos: 0,
        votosBlanco: 0,
        votosNulos: 0,
        votosImpugnados: 0,
        votosImpugnadosSp: Number(values.votosImpugnadosSp) || 0,
      };
      const response = await registrarVotosService(payload, token || undefined);
      toast.success("Registro de Votos", {
        description: response.message || "Votos registrados correctamente",
      });
      router.push("/imagenes");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as RegistroVotosErrorResponse;
        const errorMessage =
          errorData.message || "Ocurrió un error al registrar los votos";
        toast.error("Error al Registrar Votos", {
          description: errorMessage,
        });
      } else {
        toast.error("Error de Conexión", {
          description:
            "Ocurrió un error al intentar comunicarse con el servidor.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = handleSubmit(executeSubmit);

  return {
    form,
    user,
    selectedMesa,
    partidos,
    isLoadingPartidos,
    isSubmitting,
    isConfirmOpen,
    totalVotosValidosPartidos,
    totalVotosIngresados,
    incrementPartidoCounter,
    decrementPartidoCounter,
    incrementImpugnadosSpCounter,
    decrementImpugnadosSpCounter,
    handleOpenConfirm,
    handleCloseConfirm,
    onSubmit,
    logout,
    clearMesaSelected,
  };
}
