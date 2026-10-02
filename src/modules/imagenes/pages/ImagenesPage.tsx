import { getActasService } from "../services/imagenes.service";
import { ImagenesForm } from "../components/ImagenesForm";
import { ActaImagenExistente } from "../types/imagenes.types";
import { getCookie } from "@/lib/jwt-cookie";

export default async function ImagenesPage() {
  let initialActas: ActaImagenExistente[] = [];
  try {
    const token = await getCookie();
    if (token) {
      initialActas = await getActasService(token);
    }
  } catch {
    initialActas = [];
  }

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4">
      <ImagenesForm initialActas={initialActas} />
    </main>
  );
}
