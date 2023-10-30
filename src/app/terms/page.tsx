import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

import Link from "next/link";
export const metadata: Metadata = {
  title: "Wearable FIT - Termos de Serviço",
  description:
    "Termos de serviço da aplicação Wearable FIT",
};

export default function Terms() {
  return (
    <div className="container py-48 md:py-0  h-full flex-col items-center justify-center md:grid">
      <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <h1 className="text-center text-xl font-semibold tracking-tight">Termos de Serviço</h1>
            <div>
              <h2 className="text-xl">1. Aceitação dos Termos de Serviço</h2>
              <p className="text-justify">
                Ao utilizar a aplicação Wearable Fit, você concorda e aceita integralmente os termos e condições aqui apresentados. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossa aplicação.
              </p>
            </div>
            <div>
              <h2 className="text-xl">2. Uso da Aplicação</h2>
              <p className="text-justify">
                2.1. <strong>Registro de Conta</strong>: 
                Para utilizar a aplicação, você precisará criar uma conta. Você é responsável por fornecer informações precisas e atualizadas durante o processo de registro. Mantenha a senha da sua conta em sigilo e não a compartilhe com terceiros.
              </p>
              <br />
              <p className="text-justify">
                2.2. <strong>Integração com o Google Fit</strong>: 
                Wearable Fit retira informações da sua conta Google conectada através do Google Fit API para fornecer funcionalidades de acompanhamento de saúde.
              </p>
            </div>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Home
            </Link>
          </div>
      </div>
    </div>
  );
}