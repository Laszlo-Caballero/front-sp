import { Skeleton } from "@/components/ui/skeleton";

export function ResumenGeneralSkeletonTable() {
  return (
    <div className="w-full border border-border/60 rounded-xl overflow-hidden bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-muted/60 text-muted-foreground uppercase tracking-wider font-semibold border-b border-border/60">
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
          <tbody className="divide-y divide-border/40">
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="h-11">
                <td className="p-3"><Skeleton className="h-4 w-16" /></td>
                <td className="p-3"><Skeleton className="h-4 w-48" /></td>
                <td className="p-3"><Skeleton className="h-4 w-24" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
                <td className="p-3 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
                <td className="p-3 text-center"><Skeleton className="h-5 w-20 mx-auto rounded-full" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
