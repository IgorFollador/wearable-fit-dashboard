"use client"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const disableLink = !user.isProfessional;
  }, [])

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={
          cn(
            "text-sm font-medium transition-colors hover:text-primary", 
            pathname != "/dashboard" && "text-muted-foreground"
          )
        }
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/customers"
        className={
          cn(
            "text-sm font-medium transition-colors hover:text-primary", 
            !pathname.includes("/dashboard/customers") && "text-muted-foreground"
          )
        }
      >
        Alunos
      </Link>
      <Link
        href="/dashboard/settings"
        className={
          cn(
            "text-sm font-medium transition-colors hover:text-primary", 
            !pathname.includes("/dashboard/settings") && "text-muted-foreground"
          )
        }
      >
        Configurações
      </Link>
    </nav>
  )
}
