"use client"
import api from "@/lib/api";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useEffect, useState } from "react";

export default async function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {

        const getCustomers = async () => {
            try {
                const response = await api.get("users/clients"); 
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
                setCustomers([]);
            }
        }

        getCustomers();
    }, [])

    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-3xl font-bold tracking-tight">Alunos</h2>
                <p className="text-muted-foreground">
                    Realize buscas para visualizar ou editar dados dos seus alunos.
                </p>
            </div>
            <DataTable data={customers} columns={columns} />
        </>
    )
}