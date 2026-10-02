import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTableSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-slate-900">
          <TableRow className="hover:bg-slate-900 border-slate-800">
            <TableHead className="text-white font-bold text-xs">MESA</TableHead>
            <TableHead className="text-white font-bold text-xs">LOCAL DE VOTACIÓN</TableHead>
            <TableHead className="text-white font-bold text-xs">DISTRITO</TableHead>
            <TableHead className="text-white font-bold text-xs text-center">ELECTORES</TableHead>
            <TableHead className="text-white font-bold text-xs text-center">ESTADO ACTA</TableHead>
            <TableHead className="text-white font-bold text-xs text-center">EVIDENCIAS</TableHead>
            <TableHead className="text-white font-bold text-xs text-right">ACCIONES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="border-b border-slate-100">
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-6 w-24 mx-auto rounded-full" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-6 w-20 mx-auto rounded-full" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
