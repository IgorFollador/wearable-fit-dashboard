"use client"

import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from 'next/navigation'

import { recoverUserInformation, signInRequest } from "@/lib/api";

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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const router = useRouter()

    useEffect(() => {
        const { 'wearablefit.token': token } = parseCookies();

        if (token) {
            setIsAuthenticated(true);
            recoverUserInformation().then(response => {
            const user: User = {
                userName: response.userName,
                isProfessional: response.isProfessional
            }
                setUser(user);
            })
        } else {
            setIsAuthenticated(false);
        }
      }, [])

    async function signIn(data: SignInRequestData) {
        const { token, userName, isProfessional }: SignInResponseData  = await signInRequest(data);

        if (token) {
            setCookie(undefined, 'wearablefit.token', token, {
                maxAge: 60 * 60 * 24, // 24 hours
            })
    
            setIsAuthenticated(true);
            setUser({ userName, isProfessional });
            router.push('/dashboard')
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}