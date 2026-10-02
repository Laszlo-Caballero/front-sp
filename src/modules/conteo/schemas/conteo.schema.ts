import { z } from "zod";

export const conteoSchema = z.object({
  totalCiudadanos: z.coerce.number().min(0, "El valor debe ser positivo"),
  votosBlanco: z.coerce.number().min(0, "El valor no puede ser negativo"),
  votosNulos: z.coerce.number().min(0, "El valor no puede ser negativo"),
  votosImpugnados: z.coerce.number().min(0, "El valor no puede ser negativo"),
  votosImpugnadosSp: z.coerce.number().min(0, "El valor no puede ser negativo"),
  votosPartidos: z.record(
    z.string(),
    z.coerce.number().min(0, "El valor no puede ser negativo")
  ),
});

export type ConteoFormValues = z.infer<typeof conteoSchema>;
