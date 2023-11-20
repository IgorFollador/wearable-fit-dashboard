import { Metadata } from "next";

import Link from "next/link";
import UserLoginForm from "@/components/user-login-auth";
import Image from "next/image";
import logo from "@/../public/assets/logo.svg";

export const metadata: Metadata = {
  title: "Autenticação - Wearable FIT",
  description:
    "Página de autenticação na plataforma Wearable FIT",
};

export default function Login() {
  return (
    <div className="container lg:py-48 md:py-0  h-full flex-col items-center justify-center md:grid">
      <div className=" h-full">
        <div className="w-full flex justify-center">
          <Image
            src={logo}
            alt="Wearable FIT Icon"
            width={300}
            priority
          />
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
            <p className="text-sm text-muted-foreground">
              Entre com seus dados de Login
            </p>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Verifique nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}