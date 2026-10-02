import { instance } from "@/lib/axios";
import { getCookie } from "@/lib/jwt-cookie";
import ConteoPage from "@/modules/conteo/pages/ConteoPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookie = await getCookie();

  const {
    data: { nroMesa },
  } = await instance.get<{ nroMesa: number }>("/votos/ver-acta-cerrada", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (nroMesa !== 0) {
    redirect("/imagenes");
  }

  return <ConteoPage />;
}
