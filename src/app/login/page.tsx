'use client'

import { Metadata } from "next";

import Link from "next/link";
import UserLoginForm from "@/components/user-login-auth";

export const metadata: Metadata = {
  title: "Autenticação",
  description:
    "Página de autenticação na plataforma Wearable FIT",
};

export default function Login() {
  return (
    <div className="container py-48 md:py-0  h-full flex-col items-center justify-center md:grid">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
            <p className="text-sm text-muted-foreground">
              Entre com seus dados de Login
            </p>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Clicando para continuar, você aceita com nossos{" "}
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