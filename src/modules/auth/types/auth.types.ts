import { MesaDetails } from "../../mesa/types/mesa.types";

export interface UserAuthData {
  DNI: string;
  NombreCompleto: string;
  Celular: string;
  mesa?: MesaDetails;
}

export interface LoginSuccessResponse {
  token: string;
  user: UserAuthData;
}

export interface LoginErrorResponse {
  body: null;
  message: string;
  status: number;
}
