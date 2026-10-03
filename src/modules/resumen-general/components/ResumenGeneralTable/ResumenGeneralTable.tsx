"use client";

import { Badge } from "@/components/ui/badge";
import { ResumenGeneralTableProps } from "./ResumenGeneralTable.types";
import { useResumenGeneralTable } from "./useResumenGeneralTable";

export function ResumenGeneralTable({ data }: ResumenGeneralTableProps) {
  const { parentRef, virtualItems, totalSize } = useResumenGeneralTable({
    data,
  });

  if (data.length === 0) {
    return (
      <div className="w-full border border-border/60 rounded-xl p-12 text-center bg-card shadow-xs">
        <p className="text-muted-foreground text-sm font-medium">
          No se encontraron registros de mesas con los filtros seleccionados.
        </p>
      </div>
    );
  }

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <div className="w-full border border-border/60 rounded-xl overflow-hidden bg-card shadow-xs">
      <div
        ref={parentRef}
        className="overflow-auto h-[600px] relative w-full"
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-muted/90 backdrop-blur text-muted-foreground uppercase tracking-wider font-semibold border-b border-border/60 sticky top-0 z-10">
            <tr>
              <th className="p-3 w-24">N° Mesa</th>
              <th className="p-3 min-w-[220px]">Local de Votación</th>
              <th className="p-3 min-w-[130px]">Distrito</th>
              <th className="p-3 text-right">Electores</th>
              <th className="p-3 text-right">APRA</th>
              <th className="p-3 text-right">Avanza País</th>
              <th className="p-3 text-right">PP</th>
              <th className="p-3 text-right">PP1</th>
              <th className="p-3 text-right">PPP</th>
              <th className="p-3 text-right">RP</th>
              <th className="p-3 text-right">Somos Perú</th>
              <th className="p-3 text-right">Tierra Verde</th>
              <th className="p-3 text-right">Blancos</th>
              <th className="p-3 text-right">Nulos</th>
              <th className="p-3 text-right">Impugnados</th>
              <th className="p-3 text-right">Válidos</th>
              <th className="p-3 text-right">Total Votaron</th>
              <th className="p-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} colSpan={18} />
              </tr>
            )}
            {virtualItems.map((virtualRow) => {
              const item = data[virtualRow.index];
              return (
                <tr
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  className="h-[44px] hover:bg-muted/40 border-b border-border/30 transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-foreground">
                    {item.Numero_Mesa}
                  </td>
                  <td className="p-3 font-medium text-foreground truncate max-w-[260px]">
                    {item.Nombre_Local}
                  </td>
                  <td className="p-3 text-muted-foreground">{item.Distrito}</td>
                  <td className="p-3 text-right font-medium">
                    {item.Electores_Por_Mesa ?? "-"}
                  </td>
                  <td className="p-3 text-right">{item.APRA}</td>
                  <td className="p-3 text-right">{item["Avanza País"]}</td>
                  <td className="p-3 text-right">{item.PP}</td>
                  <td className="p-3 text-right">{item.PP1}</td>
                  <td className="p-3 text-right">{item.PPP}</td>
                  <td className="p-3 text-right">{item.RP}</td>
                  <td className="p-3 text-right">{item["Somos Perú"]}</td>
                  <td className="p-3 text-right">{item["Tierra Verde"]}</td>
                  <td className="p-3 text-right text-muted-foreground">
                    {item.VotosBlancos}
                  </td>
                  <td className="p-3 text-right text-muted-foreground">
                    {item.VotosNulos}
                  </td>
                  <td className="p-3 text-right text-muted-foreground">
                    {item.VotosImpugnados}
                  </td>
                  <td className="p-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.TotalVotosValidos}
                  </td>
                  <td className="p-3 text-right font-semibold text-primary">
                    {item.TotalCiudadanosVotaron ?? "-"}
                  </td>
                  <td className="p-3 text-center">
                    {item.EstadoActa ? (
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                        {item.EstadoActa}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 opacity-60">
                        Pendiente
                      </Badge>
                    )}
                  </td>
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} colSpan={18} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-muted/40 border-t border-border/60 px-4 py-2 text-xs text-muted-foreground flex justify-between items-center">
        <span>
          Mostrando <strong className="text-foreground">{data.length}</strong> mesas registradas
        </span>
        <span className="text-[11px] opacity-70">
          Tabla virtualizada activada
        </span>
      </div>
    </div>
  );
}
