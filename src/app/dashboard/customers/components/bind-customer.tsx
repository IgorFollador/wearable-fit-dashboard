import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons"
import api from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function BindCustomer() {
    const [ userId, setUserId ] = useState(null);
    const [ userName, setUserName ] = useState("");
    const [ disableBindButton, setDisableBindButton ] = useState(true);

    useEffect(() => {
        try {
            const getUserById = async () => {
                try {
                    const response = await api.get(`/users/${userId}`);
                    setUserName(`${response.data.firstName} ${response.data.lastName}`);
                    setDisableBindButton(!!response.data.binded);

                    if (response.data.binded) {
                        toast({
                            description: `Este usuário já está vinculado ao profissional!` 
                        });
                    }
                    
                } catch (error) {
                    setUserName("Usuário não encontrado!");
                    setDisableBindButton(false);
                }
            }
            
            if (userId) {
                getUserById();
            }

        } catch (error) {
            console.log(error);
            setUserName("Usuário não encontrado!");
        }
    }, [userId]);

    async function bindUser () {
        try {
            const response = await api.put(`/users/associate/client/${userId}`);
            console.log(response);
            toast({
              description: `Novo usuário vinculado!` 
            });
            window.location.reload();
          } catch (error: any) {
            toast({
              title: "Ops... ocorreu um erro!",
              variant: "destructive",
              description: error.getMessage()
            });
          }
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                className="mr-5 hidden h-8 lg:flex"
            >
                <PlusIcon className="mr-2 h-4 w-4" />
                Vincular aluno
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Vincular aluno</DialogTitle>
            <DialogDescription>
                Vincule-se como profissional do seu aluno ou paciente. 
            </DialogDescription>
            </DialogHeader>
            <div className="flex w-full items-center gap-4 justify-center">
                <span className="text-center">{ (userName == "" || userName == null) ? "Pesquise um aluno!" : userName }</span>
            </div>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="userId" className="text-right">
                Código do usuário
                </Label>
                <Input
                id="userId"
                className="col-span-3"
                onChange={(e: any) => setUserId(e.target.value)}
                />
            </div>
            </div>
            <DialogFooter>
            <Button onClick={bindUser} type="submit" disabled={disableBindButton}>Vincular</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
