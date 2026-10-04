"use client";

import { useAuth } from "@/modules/auth";
import { MesaSelectorModal } from "@/modules/mesa/components/MesaSelectorModal";
import ConteoPage from "@/modules/conteo/pages/ConteoPage";
import { useEffect, useState } from "react";
import { verActaCerradaService } from "@/modules/conteo/services/conteo.service";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { selectedMesa, token, isLoading: isAuthLoading } = useAuth();
  const [isVerificandoActa, setIsVerificandoActa] = useState(true);
  const router = useRouter();

  const nroMesa = selectedMesa ? selectedMesa.Numero_Mesa : null;

  useEffect(() => {
    if (isAuthLoading) return;

    if (!nroMesa) {
      setIsVerificandoActa(false);
      return;
    }

    async function checkActa() {
      try {
        setIsVerificandoActa(true);
        const res = await verActaCerradaService(nroMesa!, token || undefined);
        console.log("Verificando acta cerrada:", res);
        if (res.nroMesa !== "") {
          router.push("/imagenes");
          return;
        }
      } catch {
      } finally {
        setIsVerificandoActa(false);
      }
    }

    checkActa();
  }, [nroMesa, token, isAuthLoading, router]);

  if (isAuthLoading || isVerificandoActa) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="size-14 rounded-2xl bg-slate-200" />
          <Skeleton className="h-4 w-48 bg-slate-200" />
        </div>
      </main>
    );
  }

  return (
    <>
      <MesaSelectorModal isOpen={!selectedMesa} canClose={false} />
      {selectedMesa && <ConteoPage />}
    </>
  );
}
