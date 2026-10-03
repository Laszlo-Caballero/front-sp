import { instance } from "@/lib/axios";
import { ResumenGeneralVoto } from "../types/resumen-general.types";

export async function getResumenGeneralService(token?: string): Promise<ResumenGeneralVoto[]> {
  const response = await instance.get<ResumenGeneralVoto[]>("/votos/resumen-general", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}
