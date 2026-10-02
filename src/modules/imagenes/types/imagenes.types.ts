export interface ActaImagenExistente {
  IdImagen: number;
  NumeroMesa: string;
  RutaArchivo: string;
  NombreOriginal: string;
  FechaSubida: string;
}

export interface EvidenciaImagenItem {
  id: string;
  file?: File;
  previewUrl: string;
  titulo: string;
  subtitulo: string;
  isExisting?: boolean;
}

export interface TransmitirActaSuccessResponse {
  message: string;
}

export interface TransmitirActaErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}
