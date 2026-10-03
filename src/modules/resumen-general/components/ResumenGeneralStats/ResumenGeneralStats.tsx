import { Card, CardContent } from "@/components/ui/card";
import { Vote, Users, CheckCircle2, Building2 } from "lucide-react";
import { ResumenGeneralStatsProps } from "./ResumenGeneralStats.types";

export function ResumenGeneralStats({ stats }: ResumenGeneralStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-border/50 bg-card/60 backdrop-blur shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Mesas
            </p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">
              {stats.totalMesas.toLocaleString("es-PE")}
            </h3>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/60 backdrop-blur shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Electores Hábiles
            </p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">
              {stats.totalElectores.toLocaleString("es-PE")}
            </h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/60 backdrop-blur shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ciudadanos Votaron
            </p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">
              {stats.totalCiudadanosVotaron.toLocaleString("es-PE")}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Vote className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/60 backdrop-blur shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Votos Válidos
            </p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">
              {stats.totalVotosValidos.toLocaleString("es-PE")}
            </h3>
          </div>
          <div className="p-3 bg-violet-500/10 text-violet-500 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
