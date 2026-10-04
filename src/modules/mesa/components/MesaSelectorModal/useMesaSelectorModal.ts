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
import {
  createMesaSchema,
  CreateMesaFormValues,
} from "@/modules/mesa/schemas/create-mesa.schema";
import {
  getMesaByNroService,
  createMesaService,
} from "@/modules/mesa/services/mesa.service";
import { useAuth } from "@/modules/auth";
import { MesaDetails } from "@/modules/mesa/types/mesa.types";

export function useMesaSelectorModal(onSuccess?: () => void) {
  const { user, token, setMesaSelected, selectedMesa, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const searchForm = useForm<MesaSelectorFormValues>({
    resolver: zodResolver(mesaSelectorSchema),
    defaultValues: {
      nroMesa: selectedMesa?.Numero_Mesa || "",
    },
  });

  const createForm = useForm<CreateMesaFormValues>({
    resolver: zodResolver(createMesaSchema),
    defaultValues: {
      nroMesa: "",
      distrito: "",
      capacidad: 299,
    },
  });

  const onSubmitSearch = async (values: MesaSelectorFormValues) => {
    setIsLoading(true);
    const nro = values.nroMesa.trim();
    try {
      const mesaDetails = await getMesaByNroService(nro, token || undefined);

      setMesaSelected(mesaDetails);
      toast.success("Mesa asignada", {
        description: `Mesa N° ${mesaDetails.Numero_Mesa} (${mesaDetails.Nombre_Local}) seleccionada correctamente.`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (user?.role === "admin") {
        toast.info("Mesa no encontrada", {
          description: "La mesa no existe. Complete el formulario para registrarla.",
        });
        createForm.reset({
          nroMesa: nro,
          distrito: "",
          capacidad: 299,
        });
        setIsCreateMode(true);
      } else {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          toast.error("Mesa no encontrada", {
            description: "No se encontró información para el número de mesa ingresado.",
          });
        } else {
          toast.error("Error al consultar mesa", {
            description: "Ocurrió un error al obtener la información de la mesa.",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitCreate = async (values: CreateMesaFormValues) => {
    setIsLoading(true);
    try {
      const res = await createMesaService(
        {
          nroMesa: values.nroMesa.trim(),
          distrito: values.distrito.trim(),
          capacidad: Number(values.capacidad),
        },
        token || undefined
      );

      const newMesaDetails: MesaDetails = {
        Numero_Mesa: res?.Numero_Mesa || values.nroMesa.trim(),
        Distrito: res?.Distrito || values.distrito.trim(),
        Electores_Por_Mesa: res?.Electores_Por_Mesa ?? Number(values.capacidad),
        Nombre_Local: res?.Nombre_Local || `Mesa ${values.nroMesa.trim()} - ${values.distrito.trim()}`,
        Direccion: res?.Direccion || values.distrito.trim(),
        Local: res?.Local || values.distrito.trim(),
        DNI_Personero: res?.DNI_Personero || "",
      };

      setMesaSelected(newMesaDetails);
      toast.success("Mesa registrada", {
        description: `La mesa N° ${newMesaDetails.Numero_Mesa} fue registrada y asignada correctamente.`,
      });

      setIsCreateMode(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error("Error al registrar mesa", {
          description: String(error.response.data.message),
        });
      } else {
        toast.error("Error al registrar mesa", {
          description: "Ocurrió un error al intentar crear la mesa.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCreate = () => {
    setIsCreateMode(false);
  };

  return {
    searchForm,
    createForm,
    isLoading,
    isCreateMode,
    isAdmin: user?.role === "admin",
    logout,
    handleCancelCreate,
    onSubmitSearch: searchForm.handleSubmit(onSubmitSearch),
    onSubmitCreate: createForm.handleSubmit(onSubmitCreate),
  };
}
