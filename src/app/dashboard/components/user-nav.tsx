"use client"

import Link from "next/link";
import { useContext } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContext";

export function UserNav() {
  const { user, signOut } = useContext(AuthContext);

  const avatarFallback = (userName: string | undefined) => {
    if (userName) {
      return userName.split(' ').map(x => x[0]).join('')
    }
    return "U";
  }

  async function handleLogout() {
    signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* TODO: Get user avatar image */}
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>{avatarFallback(user!.userName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user!.userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user!.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href="/dashboard/customers/edit/me" >
          <DropdownMenuItem>
            Perfil
          </DropdownMenuItem>
        </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
