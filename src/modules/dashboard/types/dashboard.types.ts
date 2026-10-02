export interface ImagenPlanillon {
  IdImagen: number;
  NumeroMesa: string;
  RutaArchivo: string;
  NombreOriginal: string;
  FechaSubida: string;
}

export interface PartidoPolitico {
  IdPartido: number;
  NombrePartido: string;
  Siglas: string;
}

export interface CandidatoInfo {
  IdCandidato: number;
  NombreCompleto: string;
  IdPartido: number;
  CargoPostulacion: string;
  partidosPolitico: PartidoPolitico;
}

export interface VotoCandidato {
  IdVoto: number;
  NumeroMesa: string;
  IdCandidato: number;
  CantidadVotos: number;
  candidato: CandidatoInfo;
}

export interface EscrutinioMesa {
  NumeroMesa: string;
  VotosBlancos: number;
  VotosNulos: number;
  VotosImpugnados: number;
  TotalCiudadanosVotaron: number;
  EstadoActa: string;
  FechaRegistro: string;
  UsuarioRegistro: string;
  votosImpugnadosSp: number;
  votosCandidatoes?: VotoCandidato[];
}

export interface MesaResumenItem {
  Local: string;
  Distrito: string;
  Nombre_Local: string;
  Direccion: string;
  Numero_Mesa: string;
  Electores_Por_Mesa: number;
  DNI_Personero: string | null;
  escrutinioMesa: EscrutinioMesa | null;
  imagenesPlanillones: ImagenPlanillon[];
}

export interface ResumenMetadata {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ResumenVotosResponse {
  data: MesaResumenItem[];
  metadata: ResumenMetadata;
}
