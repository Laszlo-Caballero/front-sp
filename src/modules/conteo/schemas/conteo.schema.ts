import { z } from "zod";

export const conteoSchema = z.object({
  totalCiudadanos: z.number().min(0, "El valor debe ser positivo"),
  votosBlanco: z.number().min(0, "El valor no puede ser negativo"),
  votosNulos: z.number().min(0, "El valor no puede ser negativo"),
  votosImpugnados: z.number().min(0, "El valor no puede ser negativo"),
  votosImpugnadosSp: z.number().min(0, "El valor no puede ser negativo"),
  votosPartidos: z.record(
    z.string(),
    z.number().min(0, "El valor no puede ser negativo")
  ),
  nroMesa: z.string().min(1, "El número de mesa es requerido"),
});

export type ConteoFormValues = z.infer<typeof conteoSchema>;
