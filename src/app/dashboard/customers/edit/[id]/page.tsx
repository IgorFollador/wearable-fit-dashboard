"use client"

import { Separator } from "@radix-ui/react-dropdown-menu";
import { AccountForm } from "./account-form";
import { useParams } from "next/navigation";

export default function EditCustomerPage(parent: {params: {id: number | string}}) {
    
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Informaçoes de cadastro</h2>
                <p className="text-muted-foreground">
                    Dados do pessoais do usuário.
                </p>
                <Separator />
                <AccountForm id={parent.params.id} />
            </div>
        </>
    );
}
