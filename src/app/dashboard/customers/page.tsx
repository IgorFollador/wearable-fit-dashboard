"use client"
import api from "@/lib/api";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function getCustomers() {
    try {
        const response = await api.get("users/clients"); 
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function CustomersPage() {
    const customers = await getCustomers();
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-3xl font-bold tracking-tight">Alunos</h2>
                <p className="text-muted-foreground">
                    Realize buscas para visualizar ou editar dados dos seus Alunos.
                </p>
            </div>
            <DataTable data={customers} columns={columns} />
        </>
    )
}