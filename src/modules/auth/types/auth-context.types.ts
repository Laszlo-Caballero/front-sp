import { UserAuthData, LoginSuccessResponse } from "../types/auth.types";

export interface AuthContextType {
  user: UserAuthData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: LoginSuccessResponse) => void;
  logout: () => void;
}
