"use client";

import Link from "next/link";
import { useDashboardTable } from "../../hooks/useDashboardTable";
import { DashboardTableSkeleton } from "../DashboardTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShieldCheck,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Building2,
  FileSpreadsheet,
  Image as ImageIcon,
  LogOut,
  UserCheck,
  BarChart3,
} from "lucide-react";

export function DashboardTable() {
  const {
    data,
    metadata,
    page,
    searchInput,
    setSearchInput,
    isLoading,
    selectedMesa,
    setSelectedMesa,
    handleSearchSubmit,
    handleClearSearch,
    goToPage,
    user,
    logout,
  } = useDashboardTable("02802");

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 pb-12">
      <header className="bg-slate-950 text-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="size-6 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-white uppercase">
              Resumen por Mesa
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Panel de Control
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-white">
              {user?.NombreCompleto || "Usuario"}
            </span>
            <span className="text-[11px] text-slate-400">
              DNI: {user?.DNI || "--------"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 rounded-xl text-xs font-semibold"
          >
            <LogOut className="size-4 text-red-400" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-6 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FileSpreadsheet className="size-6 text-blue-600" />
                Resumen de Escrutinio por Mesa
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/dashboard/general">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl px-4 flex items-center gap-2 transition-all shadow-xs"
                >
                  <BarChart3 className="size-4 text-blue-600" />
                  <span>Resumen General</span>
                </Button>
              </Link>

              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2"
              >
                <div className="relative flex items-center">
                  <Search className="absolute left-3 size-4 text-slate-400 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Buscar N° de Mesa..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-9 pr-8 h-10 w-56 bg-slate-50 border-slate-200 text-xs font-bold focus-visible:ring-blue-600 rounded-xl"
                  />
                  {searchInput ? (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="size-4" />
                    </button>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl px-4"
                >
                  Buscar
                </Button>
              </form>
            </div>
          </div>

          {/* Table section */}
          {isLoading ? (
            <DashboardTableSkeleton />
          ) : data.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-2xl border border-slate-200/80">
              <Building2 className="size-10 text-slate-400" />
              <span className="text-sm font-bold text-slate-800">
                No se encontraron mesas
              </span>
              <p className="text-xs text-slate-500">
                Pruebe ingresando otro número de mesa en el buscador.
              </p>
            </div>
          ) : (
            <div className="w-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
              <Table>
                <TableHeader className="bg-slate-950">
                  <TableRow className="hover:bg-slate-950 border-slate-800">
                    <TableHead className="text-white font-extrabold text-xs">
                      MESA N°
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs">
                      LOCAL DE VOTACIÓN
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs">
                      DISTRITO
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs text-center">
                      ELECTORES
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs text-center">
                      ESTADO ACTA
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs text-center">
                      EVIDENCIAS
                    </TableHead>
                    <TableHead className="text-white font-extrabold text-xs text-right">
                      DETALLES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => {
                    const escrutinio = item.escrutinioMesa;
                    const imagenesCount = item.imagenesPlanillones?.length || 0;
                    const isProcesado = escrutinio?.EstadoActa === "PROCESADO";

                    return (
                      <TableRow
                        key={item.Numero_Mesa}
                        className="hover:bg-slate-50/80 border-b border-slate-100 transition-colors"
                      >
                        {/* Mesa N° */}
                        <TableCell className="font-extrabold text-slate-900 text-sm">
                          {item.Numero_Mesa}
                        </TableCell>

                        {/* Local */}
                        <TableCell>
                          <div className="flex flex-col min-w-[200px]">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {item.Nombre_Local}
                            </span>
                            <span className="text-[11px] text-slate-500 truncate">
                              {item.Direccion}
                            </span>
                          </div>
                        </TableCell>

                        {/* Distrito */}
                        <TableCell className="font-semibold text-xs text-slate-700">
                          {item.Distrito}
                        </TableCell>

                        {/* Electores */}
                        <TableCell className="text-center font-bold text-xs text-slate-800">
                          {item.Electores_Por_Mesa}
                        </TableCell>

                        {/* Estado Acta */}
                        <TableCell className="text-center">
                          {isProcesado ? (
                            <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex gap-1 items-center">
                              <CheckCircle2 className="size-3 text-emerald-600" />
                              PROCESADO
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex gap-1 items-center">
                              <Clock className="size-3 text-amber-600" />
                              PENDIENTE
                            </Badge>
                          )}
                        </TableCell>

                        {/* Evidencias */}
                        <TableCell className="text-center">
                          {imagenesCount > 0 ? (
                            <Badge
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex gap-1"
                            >
                              <ImageIcon className="size-3 text-blue-600" />
                              {imagenesCount} Fotos
                            </Badge>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">
                              Sin fotos
                            </span>
                          )}
                        </TableCell>

                        {/* Acciones */}
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMesa(item)}
                            className="h-8 text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-100 rounded-xl gap-1"
                          >
                            <Eye className="size-3.5 text-blue-600" />
                            <span>Ver</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 font-medium">
            <span>
              Mostrando <strong>{metadata.itemCount}</strong> de{" "}
              <strong>{metadata.totalItems}</strong> mesas encontradas
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1 || isLoading}
                className="h-9 border-slate-200 rounded-xl gap-1 text-xs font-bold text-slate-700"
              >
                <ChevronLeft className="size-4" />
                <span>Anterior</span>
              </Button>

              <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-extrabold text-xs">
                Pág. {metadata.currentPage} de {metadata.totalPages || 1}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page >= metadata.totalPages || isLoading}
                className="h-9 border-slate-200 rounded-xl gap-1 text-xs font-bold text-slate-700"
              >
                <span>Siguiente</span>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Detail Dialog */}
      <Dialog
        open={Boolean(selectedMesa)}
        onOpenChange={(open) => !open && setSelectedMesa(null)}
      >
        <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 gap-6 border border-slate-200 shadow-2xl">
          <DialogHeader className="pb-3 border-b border-slate-100">
            <DialogTitle className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="size-6 text-blue-600 shrink-0" />
              <span>Detalle de Mesa N° {selectedMesa?.Numero_Mesa}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedMesa ? (
            <div className="flex flex-col gap-6 text-sm text-slate-700">
              {/* Info Local */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1.5 shadow-2xs">
                <span className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                  {selectedMesa.Nombre_Local}
                </span>
                <span className="text-slate-600 font-semibold">
                  {selectedMesa.Direccion}
                </span>
                <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wide">
                  {selectedMesa.Distrito} • {selectedMesa.Local}
                </span>
              </div>

              {/* Resumen Escrutinio Cabecera */}
              <div className="flex flex-col gap-3">
                <span className="font-extrabold text-slate-900 text-sm">
                  Resumen de Sufragio:
                </span>
                {selectedMesa.escrutinioMesa ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-100/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        Votaron
                      </span>
                      <span className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedMesa.escrutinioMesa.TotalCiudadanosVotaron}
                      </span>
                    </div>
                    <div className="bg-slate-100/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        Blancos
                      </span>
                      <span className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedMesa.escrutinioMesa.VotosBlancos}
                      </span>
                    </div>
                    <div className="bg-slate-100/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        Nulos
                      </span>
                      <span className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedMesa.escrutinioMesa.VotosNulos}
                      </span>
                    </div>
                    <div className="bg-slate-100/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        Impugnados
                      </span>
                      <span className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedMesa.escrutinioMesa.VotosImpugnados}
                      </span>
                    </div>
                    <div className="bg-slate-100/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        Impugnados De Somos Perú
                      </span>
                      <span className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedMesa.escrutinioMesa.votosImpugnadosSp}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 italic">
                    No se ha registrado escrutinio para esta mesa.
                  </p>
                )}
              </div>

              {/* Votos por Candidato / Partido */}
              {selectedMesa.escrutinioMesa?.votosCandidatoes &&
              selectedMesa.escrutinioMesa.votosCandidatoes.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Votos por Candidato y Agrupación:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedMesa.escrutinioMesa.votosCandidatoes.map(
                      (voto) => (
                        <div
                          key={voto.IdVoto}
                          className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                              <UserCheck className="size-5" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="font-bold text-xs sm:text-sm text-slate-900 truncate leading-snug">
                                {voto.candidato.NombreCompleto}
                              </span>
                              <span className="text-xs text-slate-500 truncate font-medium">
                                {voto.candidato.partidosPolitico.NombrePartido}{" "}
                                ({voto.candidato.partidosPolitico.Siglas})
                              </span>
                            </div>
                          </div>

                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-900 border border-slate-200 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shrink-0"
                          >
                            {voto.CantidadVotos} Votos
                          </Badge>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ) : null}

              {/* Imagenes Grid */}
              <div className="flex flex-col gap-3 pt-1">
                <span className="font-extrabold text-slate-900 text-sm">
                  Evidencias Gráficas ({selectedMesa.imagenesPlanillones.length}
                  ):
                </span>
                {selectedMesa.imagenesPlanillones.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedMesa.imagenesPlanillones.map((img) => (
                      <a
                        key={img.IdImagen}
                        href={img.RutaArchivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100 group block shadow-2xs"
                      >
                        <img
                          src={img.RutaArchivo}
                          alt={img.NombreOriginal}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5">
                          <Eye className="size-5" />
                          <span>Ver Acta</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">
                    No existen fotografías registradas.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
