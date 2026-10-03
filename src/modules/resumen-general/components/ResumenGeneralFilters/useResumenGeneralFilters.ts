"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resumenGeneralFiltersSchema,
  ResumenGeneralFiltersFormValues,
} from "../../schemas/resumen-general-filters.schema";
import { ResumenGeneralFiltersProps } from "./ResumenGeneralFilters.types";

export function useResumenGeneralFilters({
  onFilterChange,
}: Pick<ResumenGeneralFiltersProps, "onFilterChange">) {
  const form = useForm<ResumenGeneralFiltersFormValues>({
    resolver: zodResolver(resumenGeneralFiltersSchema),
    defaultValues: {
      busqueda: "",
      distrito: "TODOS",
      estadoActa: "TODOS",
    },
  });

  const { watch, reset } = form;

  useEffect(() => {
    const subscription = watch((values) => {
      onFilterChange({
        busqueda: values.busqueda || "",
        distrito: values.distrito || "TODOS",
        estadoActa: values.estadoActa || "TODOS",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, onFilterChange]);

  const handleReset = () => {
    reset({
      busqueda: "",
      distrito: "TODOS",
      estadoActa: "TODOS",
    });
  };

  return {
    form,
    handleReset,
  };
}
