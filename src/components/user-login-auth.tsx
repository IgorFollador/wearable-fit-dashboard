"use client";
import { cn } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AuthContext } from "../contexts/AuthContext";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormValues = {
  email: string
  password: string
}

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSignIn(data: FormValues) {
    setIsLoading(true);
    
    try {
      console.log(data);
      await signIn(data);

    } catch (error) {
      console.log(error);
      alert("Email ou senha incorretos!");
      toast({
        title: "Ooops...",
        description: "Email ou senha incorretos!",
        variant: "destructive",
        action: (
          <ToastAction altText="ente Novamente">Tente Novamente</ToastAction>
        ),
      });
    }

    setIsLoading(false);
  }
  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...register('password')}
              id="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
            />
          </div>
          <Button disabled={isLoading} className="mt-3">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}