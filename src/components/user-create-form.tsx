"use client"

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserCreateForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();

  async function validateEmail() {
    setIsLoading(true)

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(email)) {
      try {
        const response = await api.post("users/validate-email", { email: email });
        if (response.data.validated) {
          setOpenDialog(true);
        } else {
          toast({
            description: `Digite um email válido!` 
          });
        }
      } catch (error: any) {
          console.log(error);
          
          toast({
            title: "Ops... ocorreu um erro!",
            variant: "destructive",
            description: error.getMessage()
          });
          
          setOpenDialog(false);
        }
    } else {
      toast({
        description: `Digite um email válido!` 
      });
      setOpenDialog(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000)
    }
    setIsLoading(false);
  }

  const handleRegistration = async () => {
    try {
      if (termsAccepted) {
        const response = await api.post('/users', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          isProfessional: isProfessional
        });

        console.log(response);

        toast({
          description: `Usuário cadastrado com sucesso!` 
        });
        
        router.push("/login");
      }
    } catch (error: any) {
      toast({
        title: "Ops... ocorreu um erro!",
        variant: "destructive",
        description: error.getMessage()
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={validateEmail} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continuar
          </Button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro na plataforma Wearable FIT</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Input
              placeholder="Primeiro Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Último Nome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={true}
            />
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={isProfessional}
                onChange={(e) => setIsProfessional(e.target.checked)}
                className="mr-4"
              />
              Sou um profissional
            </label>
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-4"
              />
              Aceito os Termos de Uso e Política de Privacidade
            </label>
            <Button onClick={handleRegistration} disabled={!termsAccepted}>
              Cadastrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}