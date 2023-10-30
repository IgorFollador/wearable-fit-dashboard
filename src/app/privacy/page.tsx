import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

import Link from "next/link";
export const metadata: Metadata = {
  title: "Wearable FIT - Política de Privacidade",
  description:
    "Política de privacidade da aplicação Wearable FIT",
};

export default function Terms() {
  return (
    <div className="container py-48 md:py-0  h-full flex-col items-center justify-center md:grid">
      <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <h1 className="text-center text-xl font-semibold tracking-tight">Política de Privacidade</h1>
            <div>
              <p className="text-justify">
                Esta Política de Privacidade descreve como a aplicação "Wearable Fit" coleta, utiliza e protege informações pessoais dos usuários. Ao utilizar nossa aplicação, você concorda com as práticas descritas nesta política.
              </p>
            </div>
            <div>
              <h2 className="text-xl">1. Informações Coletadas</h2>
              <p className="text-justify">
                1.1. <strong>Dados do Google Fit</strong>: 
                A aplicação "Wearable Fit" obtém informações da conta Google conectada, incluindo dados de saúde e fitness do Google Fit API. Esses dados podem incluir informações sobre atividade física, batimentos cardíacos, passos, entre outros.
              </p>
            </div>
            <div>
              <h2 className="text-xl">2. Uso das Informações</h2>
              <p className="text-justify">
                2.1. <strong>Fornecimento de Serviços</strong>: 
                Utilizamos os dados do Google Fit para fornecer funcionalidades de acompanhamento de saúde, como monitoramento de atividade física e gerenciamento de metas de saúde.
              </p>
              <br />
              <p className="text-justify">
                2.2. <strong>Melhorias na Aplicação</strong>: 
                As informações coletadas nos ajudam a aprimorar nossa aplicação e oferecer uma experiência mais personalizada aos usuários.
              </p>
              <br />
              <p className="text-justify">
                2.2.1 <strong>Proteção de Dados</strong>: 
                Nós tomamos medidas para proteger suas informações pessoais, incluindo:
                <br />
                <ul>
                  <li><strong>Segurança</strong>: Implementamos medidas de segurança para proteger os dados contra acesso não autorizado, alteração ou divulgação.</li>
                  <li><strong>Acesso Limitado</strong>: Apenas funcionários autorizados têm acesso às informações do usuário.</li>
                </ul>
              </p>
              <br />
              <p className="text-justify">
                2.2.2 <strong>Compartilhamento de Informações</strong>: 
                Não compartilhamos informações pessoais com terceiros, a menos que seja necessário para o funcionamento da aplicação ou exigido por lei.
              </p>
              <br />
              <p className="text-justify">
                2.2.3 <strong>Menores de Idade</strong>: 
                Nossa aplicação não é destinada a menores de 18 anos. Não coletamos intencionalmente informações de menores de idade. Se soubermos que informações pessoais foram coletadas de um menor, as informações serão excluídas.
              </p>
              <br />
              <p className="text-justify">
                2.2.4 <strong>Alterações na Política de Privacidade</strong>: 
                Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. Alterações serão comunicadas aos usuários por meio da aplicação.
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