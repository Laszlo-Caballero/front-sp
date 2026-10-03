export interface ResumenGeneralVoto {
  Numero_Mesa: string;
  Nombre_Local: string;
  Distrito: string;
  Electores_Por_Mesa: number | null;
  APRA: number;
  "Avanza País": number;
  PP: number;
  PP1: number;
  PPP: number;
  RP: number;
  "Somos Perú": number;
  "Tierra Verde": number;
  VotosBlancos: number;
  VotosNulos: number;
  VotosImpugnados: number;
  TotalVotosValidos: number;
  TotalCiudadanosVotaron: number | null;
  EstadoActa: string | null;
}

export interface ResumenGeneralFilters {
  busqueda: string;
  distrito: string;
  estadoActa: string;
}

export interface ResumenGeneralResumen {
  totalMesas: number;
  totalElectores: number;
  totalCiudadanosVotaron: number;
  totalVotosValidos: number;
}
