"use client";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { user, signIn } = useContext(AuthContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const { 'wearablefit.token': token } = parseCookies();
    if (token) {
      if (user.isProfessional) {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/customers/edit/me");
      }
    }
  },[]);

  async function handleSignIn(data: any) {
    setIsLoading(true);
    
    try {
      console.log(data);
      await signIn(data);
      toast({
        description: "Usuário autenticado!",
      });

    } catch (error) {
      console.log(error);
      toast({
        title: "Ooops...",
        description: "Email ou senha incorretos!",
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
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