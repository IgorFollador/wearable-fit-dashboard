"use client"

import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from 'next/navigation'

import { signInRequest } from "@/lib/api";

type User = {
    userName: string;
    isProfessional: boolean;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInRequestData) => Promise<void>;
}

type SignInRequestData = {
    email: string;
    password: string;
}

type SignInResponseData = {
    token: string;
    userName: string;
    isProfessional: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'weareablefit.token': token } = parseCookies();

        if (!token) {
            router.push('/login')
        }

    }), [];

    async function signIn(data: SignInRequestData) {
        const { token, userName, isProfessional }: SignInResponseData  = await signInRequest(data);

        setCookie(undefined, 'weareablefit.token', token, {
            maxAge: 60 * 60 * 24, // 24 hours
        })

        setUser({ userName, isProfessional });
        router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}