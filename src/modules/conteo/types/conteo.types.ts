export interface Partido {
  IdPartido: number;
  NombrePartido: string;
  Siglas: string;
}

export interface RegistroVotosSuccessResponse {
  message: string;
}

export interface RegistroVotosErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}
