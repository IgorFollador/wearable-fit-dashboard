import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import { useRouter } from "next/router";

const sidebarNavItems = [
  {
    title: "Informações de saúde",
    href: "/healthInformation",
  },
  {
    title: "Metas de saúde",
    href: "/healthGoals",
  },
  {
    title: "Notificações e avisos",
    href: "/notifications",
  },
  {
    title: "Dados de cadastro",
    href: "/",
  },
];

interface EditCustomerLayoutProps {
    children: React.ReactNode,
    params: {
        id: number
    }
}

export default function EditCustomerLayout({ children, params }: EditCustomerLayoutProps) {

  return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Alunos</h2>
                <p className="text-muted-foreground">
                    Visualize ou modifique as informações do seu aluno.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} customerId={params.id} />
                </aside>
                <div className="flex-1 lg:max-w-full">{children}</div>
            </div>
        </>
    );
}
