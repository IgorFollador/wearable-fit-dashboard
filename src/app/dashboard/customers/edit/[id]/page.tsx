"use client"

import { Separator } from "@radix-ui/react-dropdown-menu";
import { AccountForm } from "./account-form";

export default function EditCustomerPage({ params }: { params: { id: number } }) {
    
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Informaçoes de cadastro</h2>
                <p className="text-muted-foreground">
                    Dados do pessoais do usuário.
                </p>
                <Separator />
                <AccountForm />
            </div>
        </>
    );
}
