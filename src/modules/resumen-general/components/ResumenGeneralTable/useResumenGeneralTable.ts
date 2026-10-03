"use client";

import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ResumenGeneralTableProps } from "./ResumenGeneralTable.types";

export function useResumenGeneralTable({ data }: ResumenGeneralTableProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 12,
  });

  const totals = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc.Electores_Por_Mesa += item.Electores_Por_Mesa || 0;
        acc.APRA += item.APRA || 0;
        acc.AvanzaPais += item["Avanza País"] || 0;
        acc.PP += item.PP || 0;
        acc.PP1 += item.PP1 || 0;
        acc.PPP += item.PPP || 0;
        acc.RP += item.RP || 0;
        acc.SomosPeru += item["Somos Perú"] || 0;
        acc.TierraVerde += item["Tierra Verde"] || 0;
        acc.VotosBlancos += item.VotosBlancos || 0;
        acc.VotosNulos += item.VotosNulos || 0;
        acc.VotosImpugnados += item.VotosImpugnados || 0;
        acc.TotalVotosValidos += item.TotalVotosValidos || 0;
        acc.TotalCiudadanosVotaron += item.TotalCiudadanosVotaron || 0;
        return acc;
      },
      {
        Electores_Por_Mesa: 0,
        APRA: 0,
        AvanzaPais: 0,
        PP: 0,
        PP1: 0,
        PPP: 0,
        RP: 0,
        SomosPeru: 0,
        TierraVerde: 0,
        VotosBlancos: 0,
        VotosNulos: 0,
        VotosImpugnados: 0,
        TotalVotosValidos: 0,
        TotalCiudadanosVotaron: 0,
      }
    );
  }, [data]);

  return {
    parentRef,
    rowVirtualizer,
    virtualItems: rowVirtualizer.getVirtualItems(),
    totalSize: rowVirtualizer.getTotalSize(),
    totals,
  };
}

