import { UserAuthData, LoginSuccessResponse } from "../types/auth.types";
import { MesaDetails } from "@/modules/mesa/types/mesa.types";

export interface AuthContextType {
  user: UserAuthData | null;
  token: string | null;
  selectedMesa: MesaDetails | null;
  nroMesa: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: LoginSuccessResponse) => void;
  logout: () => void;
  setMesaSelected: (mesa: MesaDetails) => void;
  clearMesaSelected: () => void;
}
