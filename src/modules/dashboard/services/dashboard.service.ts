import { instance } from "@/lib/axios";
import { ResumenVotosResponse } from "../types/dashboard.types";

export interface GetResumenParams {
  page?: number;
  limit?: number;
  nroMesa?: string;
}

export async function getResumenVotosService(
  params: GetResumenParams,
  token?: string
): Promise<ResumenVotosResponse> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.nroMesa) queryParams.append("nroMesa", params.nroMesa);

  const response = await instance.get<ResumenVotosResponse>(
    `/votos/resumen?${queryParams.toString()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  );
  return response.data;
}
