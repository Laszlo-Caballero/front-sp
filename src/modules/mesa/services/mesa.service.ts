import { instance } from "@/lib/axios";
import { MesaDetails } from "../types/mesa.types";

export async function getMesaByNroService(
  nroMesa: string,
  token?: string
): Promise<MesaDetails> {
  const response = await instance.get<MesaDetails>(`/mesa/${nroMesa}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}
