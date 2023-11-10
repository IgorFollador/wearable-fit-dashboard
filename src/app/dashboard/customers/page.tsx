import api from "@/lib/api";
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { customerSchema } from "./data/schema";

async function getCustomers() {
    // const data = await api.get('users/clients') 
    const data = await fs.readFile(
        path.join(process.cwd(), "src/app/dashboard/customers/data/customers.json")
    )
    const customers = JSON.parse(data.toString());
    return z.array(customerSchema).parse(customers);
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