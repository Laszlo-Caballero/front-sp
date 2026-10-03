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
  const { user, token, selectedMesa, nroMesa } = useAuth();
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [isLoadingPartidos, setIsLoadingPartidos] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const electoresDefault = selectedMesa?.Electores_Por_Mesa ?? user?.mesa?.Electores_Por_Mesa ?? 248;

  const form = useForm<ConteoFormValues>({
    resolver: zodResolver(conteoSchema) as any,
    defaultValues: {
      totalCiudadanos: electoresDefault,
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
    if (selectedMesa?.Electores_Por_Mesa) {
      setValue("totalCiudadanos", selectedMesa.Electores_Por_Mesa);
    }
    if (nroMesa) {
      setValue("nroMesa", nroMesa);
    }
  }, [selectedMesa, nroMesa, setValue]);

  const votosBlanco = Number(useWatch({ control, name: "votosBlanco" })) || 0;
  const votosNulos = Number(useWatch({ control, name: "votosNulos" })) || 0;
  const votosImpugnados =
    Number(useWatch({ control, name: "votosImpugnados" })) || 0;
  const votosImpugnadosSp =
    Number(useWatch({ control, name: "votosImpugnadosSp" })) || 0;
  const totalCiudadanos =
    Number(useWatch({ control, name: "totalCiudadanos" })) || 0;
  const votosPartidosMap = useWatch({ control, name: "votosPartidos" }) || {};

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

  const subtotalNoPreferenciales =
    votosBlanco + votosNulos + votosImpugnados + votosImpugnadosSp;

  const totalVotosValidosPartidos = Object.values(
    votosPartidosMap,
  ).reduce<number>((acc, curr) => acc + (Number(curr) || 0), 0);

  const totalVotosIngresados =
    totalVotosValidosPartidos + subtotalNoPreferenciales;
  const diferenciaActa = totalCiudadanos - totalVotosIngresados;
  const isActaCuadrada = totalVotosIngresados === totalCiudadanos;

  const incrementCounter = (
    fieldName:
      | "votosBlanco"
      | "votosNulos"
      | "votosImpugnados"
      | "votosImpugnadosSp",
  ) => {
    const currentValue = Number(form.getValues(fieldName)) || 0;
    setValue(fieldName, currentValue + 1);
  };

  const decrementCounter = (
    fieldName:
      | "votosBlanco"
      | "votosNulos"
      | "votosImpugnados"
      | "votosImpugnadosSp",
  ) => {
    const currentValue = Number(form.getValues(fieldName)) || 0;
    if (currentValue > 0) {
      setValue(fieldName, currentValue - 1);
    }
  };

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

  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const response = await registrarVotosService(
        { ...values, nroMesa: nroMesa || values.nroMesa },
        token || undefined
      );
      toast.success("Registro de Votos", {
        description: response.message || "Votos registrados correctamente",
      });
      router.push("/imagenes");
    } catch (error: unknown) {
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
  });

  return {
    form,
    user,
    selectedMesa,
    partidos,
    isLoadingPartidos,
    isSubmitting,
    subtotalNoPreferenciales,
    totalVotosValidosPartidos,
    totalVotosIngresados,
    diferenciaActa,
    isActaCuadrada,
    incrementCounter,
    decrementCounter,
    incrementPartidoCounter,
    decrementPartidoCounter,
    onSubmit,
  };
}
