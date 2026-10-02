import { instance } from "@/lib/axios";
import { LoginFormValues } from "../schemas/login.schema";
import { LoginSuccessResponse } from "../types/auth.types";

export async function loginService(payload: LoginFormValues): Promise<LoginSuccessResponse> {
  const response = await instance.post<LoginSuccessResponse>("/auth/login", payload);
  return response.data;
}
