import { instance } from "@/lib/axios";
import { MesaDetails } from "../types/mesa.types";

export interface CreateMesaDto {
  nroMesa: string;
  distrito: string;
  capacidad: number;
}

export async function getMesaByNroService(
  nroMesa: string,
  token?: string
): Promise<MesaDetails> {
  const response = await instance.get<MesaDetails>(`/mesa/${nroMesa}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}

export async function createMesaService(
  payload: CreateMesaDto,
  token?: string
): Promise<MesaDetails> {
  const response = await instance.post<MesaDetails>("/mesa", payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}

