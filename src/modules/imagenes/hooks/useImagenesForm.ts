"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { imagenesSchema, ImagenesFormValues } from "../schemas/imagenes.schema";
import { subirActasService, getActasService } from "../services/imagenes.service";
import { EvidenciaImagenItem, TransmitirActaErrorResponse, ActaImagenExistente } from "../types/imagenes.types";
import { useAuth } from "@/modules/auth";

export function useImagenesForm(initialActas?: ActaImagenExistente[]) {
  const { user, token, selectedMesa, nroMesa } = useAuth();
  const router = useRouter();
  const [imagenes, setImagenes] = useState<EvidenciaImagenItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(!initialActas);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<ImagenesFormValues>({
    resolver: zodResolver(imagenesSchema) as any,
    defaultValues: {
      declaracionJurada: false,
    },
  });

  const { control, setValue, handleSubmit } = form;
  const declaracionJurada = useWatch({ control, name: "declaracionJurada" }) || false;

  useEffect(() => {
    async function loadInitialActas() {
      if (initialActas && initialActas.length > 0) {
        const items: EvidenciaImagenItem[] = initialActas.map((acta, idx) => ({
          id: `existente-${acta.IdImagen}`,
          previewUrl: acta.RutaArchivo,
          titulo: `Página ${idx + 1} (${idx === 0 ? "Resultados" : "Firmas y Obs."})`,
          subtitulo: idx === 0 ? "Escrutinio Registrado" : "Firmas Registradas",
          isExisting: true,
        }));
        setImagenes(items);
        setIsLoadingInitial(false);
        return;
      }

      if (!nroMesa) {
        setIsLoadingInitial(false);
        return;
      }

      try {
        setIsLoadingInitial(true);
        const data = await getActasService(nroMesa, token || undefined);
        if (data && data.length > 0) {
          const items: EvidenciaImagenItem[] = data.map((acta, idx) => ({
            id: `existente-${acta.IdImagen}`,
            previewUrl: acta.RutaArchivo,
            titulo: `Página ${idx + 1} (${idx === 0 ? "Resultados" : "Firmas y Obs."})`,
            subtitulo: idx === 0 ? "Escrutinio Registrado" : "Firmas Registradas",
            isExisting: true,
          }));
          setImagenes(items);
        }
      } catch {
        // Silencioso en caso de no contar con actas previas
      } finally {
        setIsLoadingInitial(false);
      }
    }

    loadInitialActas();
  }, [initialActas, token, nroMesa]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);
    const newItems: EvidenciaImagenItem[] = filesArray.map((file, idx) => {
      const currentCount = imagenes.length + idx + 1;
      return {
        id: `${file.name}-${Date.now()}-${idx}`,
        file,
        previewUrl: URL.createObjectURL(file),
        titulo: `Página ${currentCount} (${currentCount === 1 ? "Resultados" : "Firmas y Obs."})`,
        subtitulo: currentCount === 1 ? "Escrutinio validado" : "Firmas detectadas",
        isExisting: false,
      };
    });

    setImagenes((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removeImagen = (id: string) => {
    setImagenes((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      if (selectedImageIndex >= updated.length) {
        setSelectedImageIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  const activeImagen = imagenes[selectedImageIndex] || null;

  const onSubmit = handleSubmit(async () => {
    if (!nroMesa) {
      toast.error("Número de mesa no seleccionado", {
        description: "Debe seleccionar un número de mesa antes de transmitir las imágenes.",
      });
      return;
    }

    const nuevasImagenes = imagenes.filter((img) => !img.isExisting && img.file);

    if (nuevasImagenes.length === 0) {
      toast.error("Nuevas imágenes requeridas", {
        description: "Debe adjuntar al menos una nueva fotografía para realizar el envío.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      nuevasImagenes.forEach((img) => {
        if (img.file) {
          formData.append("files", img.file);
        }
      });

      const response = await subirActasService(nroMesa, formData, token || undefined);
      toast.success("Transmisión Exitosa", {
        description: response.message || "Acta electoral transmitida correctamente",
      });

      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as TransmitirActaErrorResponse;
        const errorMessage = errorData.message || "Error al transmitir las imágenes del acta.";
        toast.error("Error de Transmisión", {
          description: errorMessage,
        });
      } else {
        toast.error("Error de Conexión", {
          description: "Ocurrió un error al intentar comunicarse con el servidor.",
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
    imagenes,
    activeImagen,
    selectedImageIndex,
    setSelectedImageIndex,
    declaracionJurada,
    setValue,
    handleFileChange,
    removeImagen,
    isLoadingInitial,
    isSubmitting,
    onSubmit,
  };
}
