import { ResumenGeneralFilters } from "../../types/resumen-general.types";

export interface ResumenGeneralFiltersProps {
  distritos: string[];
  estadosActa: string[];
  onFilterChange: (filters: ResumenGeneralFilters) => void;
  onRefresh: () => void;
  onExportExcel: () => void;
  isLoading: boolean;
  isExporting: boolean;
}

