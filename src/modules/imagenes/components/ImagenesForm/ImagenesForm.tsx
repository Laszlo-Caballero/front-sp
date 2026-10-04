"use client";

import { useRef } from "react";
import Link from "next/link";
import { useImagenesForm } from "../../hooks/useImagenesForm";
import { ActaImagenExistente } from "../../types/imagenes.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ShieldCheck,
  Camera,
  Upload,
  CloudUpload,
  Trash2,
  ListRestart,
  Building2,
  LogOut,
  AlertCircle,
} from "lucide-react";

export interface ImagenesFormProps {
  initialActas?: ActaImagenExistente[];
}

export function ImagenesForm({ initialActas }: ImagenesFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const {
    user,
    selectedMesa,
    imagenes,
    activeImagen,
    selectedImageIndex,
    setSelectedImageIndex,
    handleFileChange,
    removeImagen,
    isLoadingInitial,
    isSubmitting,
    isConfirmOpen,
    handleOpenConfirm,
    handleCloseConfirm,
    onSubmit,
    logout,
    handleCambiarMesa,
  } = useImagenesForm(initialActas);

  const mesaNumero = selectedMesa?.Numero_Mesa || user?.mesa?.Numero_Mesa || "Sin seleccionar";
  const localNombre = selectedMesa?.Nombre_Local || user?.mesa?.Nombre_Local || "Local no especificado";

  const triggerGallery = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const nuevasImagenesCount = imagenes.filter((img) => !img.isExisting).length;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 pb-24">
      <header className="bg-slate-950 text-white rounded-2xl p-3 shadow-lg flex items-center justify-between sticky top-2 z-20">
        <div className="flex items-center gap-2.5">
          <Link href="/">
            <Button variant="ghost" size="icon" className="size-9 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-white uppercase">Evidencia Gráfica</span>
            <span className="text-[11px] text-slate-400 font-medium">Captura de Acta</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCambiarMesa}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold px-2.5 h-8"
          >
            <Building2 className="size-3.5 text-blue-400" />
            <span className="hidden sm:inline">Cambiar Mesa</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold px-2.5 h-8"
          >
            <LogOut className="size-3.5 text-red-400" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      <div className="bg-blue-950 text-white rounded-xl p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 text-blue-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold tracking-wide">Mesa N° {mesaNumero}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 px-1">
        <div className="size-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
          <Building2 className="size-6 text-blue-400" />
        </div>
        <div className="flex flex-col justify-center min-h-[44px]">
          <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
            Evidencia de Acta - Mesa N° {mesaNumero}
          </h1>
        </div>
      </div>

      <Card className="border-slate-200/90 shadow-md rounded-2xl bg-slate-900 text-white overflow-hidden relative min-h-[300px]">
        {isLoadingInitial ? (
          <div className="p-8 flex flex-col items-center justify-center gap-3 min-h-[300px]">
            <Skeleton className="size-16 rounded-2xl bg-slate-800" />
            <Skeleton className="h-4 w-48 bg-slate-800" />
          </div>
        ) : activeImagen ? (
          <div className="relative w-full h-[340px] flex items-center justify-center bg-slate-950">
            <img
              src={activeImagen.previewUrl}
              alt="Preview Acta"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-slate-700/60 flex items-center gap-1.5">
              <Camera className="size-3.5 text-blue-400" />
              <span>
                PÁGINA {selectedImageIndex + 1}{" "}
                {activeImagen.isExisting ? "(REGISTRADA)" : "(NUEVA)"}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2 text-[11px] text-slate-300">
              <button
                type="button"
                onClick={() => removeImagen(activeImagen.id)}
                className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 bg-red-950/60 px-2 py-1 rounded-lg border border-red-800/40"
              >
                <Trash2 className="size-3.5" />
                <span>Quitar</span>
              </button>
            </div>
          </div>
        ) : (
          <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-3 min-h-[300px] bg-slate-900/90">
            <div className="size-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
              <Camera className="size-8 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-white">Sin fotografías capturadas</span>
              <p className="text-xs text-slate-400 max-w-xs">
                Utilice la cámara o suba archivos desde su galería.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-900">
            Fotografías Registradas ({imagenes.length})
          </span>
          <span className="text-[11px] font-medium text-blue-600">Toca una para ver</span>
        </div>

        {imagenes.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {imagenes.map((img, idx) => {
              const isActive = selectedImageIndex === idx;
              return (
                <button
                  type="button"
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative flex flex-col gap-1.5 p-2 rounded-2xl border transition-all text-left bg-white shadow-2xs ${
                    isActive
                      ? "border-blue-600 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img src={img.previewUrl} alt={img.titulo} className="w-full h-full object-cover" />
                    <Badge
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : img.isExisting
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900/80 text-slate-200"
                      }`}
                    >
                      {isActive
                        ? "ACTIVA"
                        : img.isExisting
                        ? "GUARDADA"
                        : `PÁG ${idx + 1}`}
                    </Badge>
                  </div>
                  <div className="flex flex-col px-1">
                    <span className="text-xs font-bold text-slate-900">{img.titulo}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{img.subtitulo}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={triggerCamera}
          variant="outline"
          className="h-12 bg-white border-slate-300 text-slate-900 font-bold text-xs rounded-xl shadow-2xs gap-2 hover:bg-slate-50"
        >
          <Camera className="size-4 text-blue-600" />
          <span>Tomar Nueva Foto</span>
        </Button>

        <Button
          type="button"
          onClick={triggerGallery}
          variant="outline"
          className="h-12 bg-white border-slate-300 text-slate-900 font-bold text-xs rounded-xl shadow-2xs gap-2 hover:bg-slate-50"
        >
          <Upload className="size-4 text-blue-600" />
          <span>Subir desde Galería</span>
        </Button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5 mt-2">
          <Button
            type="button"
            disabled={nuevasImagenesCount === 0 || isSubmitting}
            onClick={handleOpenConfirm}
            className="h-13 w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md gap-2 transition-all"
          >
            <CloudUpload className="size-5 text-blue-400" />
            <span>{isSubmitting ? "GUARDANDO..." : "CONFIRMAR Y TRANSMITIR ACTA"}</span>
          </Button>

          <Link href="/" className="w-full">
            <Button
              type="button"
              variant="ghost"
              className="h-11 w-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-xs rounded-xl gap-2"
            >
              <ListRestart className="size-4 text-slate-500" />
              <span>Volver a Conteo de Votos</span>
            </Button>
          </Link>
        </div>
      </form>

      <Dialog open={isConfirmOpen} onOpenChange={(open) => !open && handleCloseConfirm()}>
        <DialogContent className="max-w-md bg-white border-slate-200 rounded-2xl p-6">
          <DialogHeader className="flex flex-col gap-2 items-center text-center">
            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <AlertCircle className="size-6" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-slate-900">
              ¿Confirmar transmisión de acta?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Está a punto de transmitir <strong className="font-bold text-slate-800">{nuevasImagenesCount}</strong> fotografía(s) de evidencia para la Mesa N° {mesaNumero}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-xl shadow-md gap-2"
            >
              <span>{isSubmitting ? "ENVIANDO..." : "CONFIRMAR Y ENVIAR"}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={handleCloseConfirm}
              className="h-10 w-full text-slate-600 hover:bg-slate-100 font-semibold text-xs rounded-xl"
            >
              <span>Cancelar</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
