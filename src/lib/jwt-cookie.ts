import { cookies } from "next/headers";

export async function getCookie() {
  const cookiesStore = await cookies();
  return cookiesStore.get("token")?.value || "";
}
