"use client"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserCreateForm } from "@/components/user-create-form";
import Image from "next/image";
import logo from "@/../public/assets/icon-white.svg";
import { Carousel } from "@/components/carousel";

export default function HomePage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src={logo}
              alt="Wearable FIT Icon"
              width={40}
              className="m-4"
              priority
            />
            Wearable FIT
          </div>
          <div className="z-20 h-full">
              <Carousel />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Se o conhecimento pode criar problemas, não é através da ignorância que podemos solucioná-los.&rdquo;
              </p>
              <footer className="text-sm">Isaac Asimov</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seu email para criar uma conta
              </p>
            </div>
            <UserCreateForm />
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
    </>
  )
}