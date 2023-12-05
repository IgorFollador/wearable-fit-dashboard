"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import api from "@/lib/api";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & { id?: string }>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  async function removeBind(userId: any) {
    try {
      const response = await api.put(`/users/disassociate/client/${userId}`);
      console.log(response);
      toast({
        description: `Usuário desvinculado com sucesso!` 
      });
      window.location.reload();
      return
    } catch (error: any) {
      toast({
        title: "Ops... ocorreu um erro!",
        variant: "destructive",
        description: error.getMessage()
      });
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link
          href={"customers/edit/" + row.original.id}
        >
          <DropdownMenuItem>
            Editar
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => removeBind(row.original.id)}>
          Remover Vínculo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
