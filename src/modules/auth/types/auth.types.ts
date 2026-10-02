export interface MesaInfo {
  Local: string;
  Distrito: string;
  Nombre_Local: string;
  Direccion: string;
  Numero_Mesa: string;
  Electores_Por_Mesa: number;
  DNI_Personero: string;
}

export interface UserAuthData {
  DNI: string;
  NombreCompleto: string;
  Celular: string;
  mesa: MesaInfo;
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
