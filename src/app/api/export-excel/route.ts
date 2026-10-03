import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { ResumenGeneralVoto } from "@/modules/resumen-general/types/resumen-general.types";

export async function POST(req: NextRequest) {
  try {
    const data: ResumenGeneralVoto[] = await req.json();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Resumen General");

    worksheet.columns = [
      { header: "Mesa", key: "Numero_Mesa", width: 14 },
      { header: "Local de Votación", key: "Nombre_Local", width: 35 },
      { header: "Distrito", key: "Distrito", width: 22 },
      { header: "Electores", key: "Electores_Por_Mesa", width: 14 },
      { header: "APRA", key: "APRA", width: 12 },
      { header: "Avanza País", key: "Avanza País", width: 14 },
      { header: "PP", key: "PP", width: 10 },
      { header: "PP1", key: "PP1", width: 10 },
      { header: "PPP", key: "PPP", width: 10 },
      { header: "RP", key: "RP", width: 10 },
      { header: "Somos Perú", key: "Somos Perú", width: 14 },
      { header: "Tierra Verde", key: "Tierra Verde", width: 14 },
      { header: "Votos Blancos", key: "VotosBlancos", width: 16 },
      { header: "Votos Nulos", key: "VotosNulos", width: 14 },
      { header: "Votos Impugnados", key: "VotosImpugnados", width: 18 },
      { header: "Total Válidos", key: "TotalVotosValidos", width: 16 },
      {
        header: "Total Ciudadanos Votaron",
        key: "TotalCiudadanosVotaron",
        width: 24,
      },
      { header: "Estado Acta", key: "EstadoActa", width: 16 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0F172A" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    const totals = data.reduce(
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
      },
    );

    data.forEach((item) => {
      const row = worksheet.addRow({
        Numero_Mesa: item.Numero_Mesa || "-",
        Nombre_Local: item.Nombre_Local || "-",
        Distrito: item.Distrito || "-",
        Electores_Por_Mesa: item.Electores_Por_Mesa ?? 0,
        APRA: item.APRA ?? 0,
        "Avanza País": item["Avanza País"] ?? 0,
        PP: item.PP ?? 0,
        PP1: item.PP1 ?? 0,
        PPP: item.PPP ?? 0,
        RP: item.RP ?? 0,
        "Somos Perú": item["Somos Perú"] ?? 0,
        "Tierra Verde": item["Tierra Verde"] ?? 0,
        VotosBlancos: item.VotosBlancos ?? 0,
        VotosNulos: item.VotosNulos ?? 0,
        VotosImpugnados: item.VotosImpugnados ?? 0,
        TotalVotosValidos: item.TotalVotosValidos ?? 0,
        TotalCiudadanosVotaron: item.TotalCiudadanosVotaron ?? 0,
        EstadoActa: item.EstadoActa || "SIN ESTADO",
      });

      row.alignment = { vertical: "middle" };
    });

    const totalRow = worksheet.addRow({
      Numero_Mesa: "TOTAL GENERAL",
      Nombre_Local: "",
      Distrito: "",
      Electores_Por_Mesa: totals.Electores_Por_Mesa,
      APRA: totals.APRA,
      "Avanza País": totals.AvanzaPais,
      PP: totals.PP,
      PP1: totals.PP1,
      PPP: totals.PPP,
      RP: totals.RP,
      "Somos Perú": totals.SomosPeru,
      "Tierra Verde": totals.TierraVerde,
      VotosBlancos: totals.VotosBlancos,
      VotosNulos: totals.VotosNulos,
      VotosImpugnados: totals.VotosImpugnados,
      TotalVotosValidos: totals.TotalVotosValidos,
      TotalCiudadanosVotaron: totals.TotalCiudadanosVotaron,
      EstadoActa: "-",
    });

    worksheet.mergeCells(`A${totalRow.number}:C${totalRow.number}`);
    totalRow.font = { bold: true, color: { argb: "FFFFFF" } };
    totalRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0F172A" },
    };
    totalRow.alignment = { vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="Resumen_General_Votos.xlsx"',
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Error al generar el archivo Excel" },
      { status: 500 },
    );
  }
}
