import { instance } from "@/lib/axios";
import { Partido, RegistroVotosSuccessResponse } from "../types/conteo.types";
import { ConteoFormValues } from "../schemas/conteo.schema";

export async function getPartidosService(token?: string): Promise<Partido[]> {
  const response = await instance.get<Partido[]>("/partidos", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}

export async function registrarVotosService(
  payload: ConteoFormValues,
  token?: string
): Promise<RegistroVotosSuccessResponse> {
  const response = await instance.post<RegistroVotosSuccessResponse>("/votos/registrar", payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}

export async function verActaCerradaService(
  nroMesa: number,
  token?: string
): Promise<{ nroMesa: number }> {
  const response = await instance.get<{ nroMesa: number }>(`/votos/ver-acta-cerrada/${nroMesa}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}
