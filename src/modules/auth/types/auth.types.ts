import { MesaDetails } from "../../mesa/types/mesa.types";

export interface UserAuthData {
  DNI: string;
  role: string;
  NombreCompleto?: string;
  Celular?: string;
  mesa?: MesaDetails;
}

export interface LoginSuccessResponse {
  token: string;
}

export interface LoginErrorResponse {
  body: null;
  message: string;
  status: number;
}

