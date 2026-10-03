import { instance } from "@/lib/axios";
import { TransmitirActaSuccessResponse, ActaImagenExistente } from "../types/imagenes.types";

export async function getActasService(nroMesa: number, token?: string): Promise<ActaImagenExistente[]> {
  const response = await instance.get<ActaImagenExistente[]>(`/votos/get-actas/${nroMesa}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}

export async function subirActasService(
  nroMesa: number,
  formData: FormData,
  token?: string
): Promise<TransmitirActaSuccessResponse> {
  const response = await instance.post<TransmitirActaSuccessResponse>(`/votos/subir-actas/${nroMesa}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.data;
}
