"use client"

import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from 'next/navigation'

import { SignInResponseData, recoverUserInformation, signInRequest } from "@/lib/api";

type User = {
    userName: string;
    email: string;
    isProfessional: boolean;
}

type AuthContextType = {
    user: User;
    isAuthenticated: boolean;
    signIn: (data: SignInRequestData) => Promise<void>;
    signOut: () => void;
}

type SignInRequestData = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {   
    const defaultUser = {
        userName: "", 
        email:"", 
        isProfessional: false
    } 
    const [user, setUser] = useState<User>(defaultUser);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const router = useRouter()

    useEffect(() => {
        const { 'wearablefit.token': token } = parseCookies();

        if (token) {
            setIsAuthenticated(true);
            recoverUserInformation().then(response => {
                const user: User = {
                    userName: response.userName,
                    email: response.email,
                    isProfessional: response.isProfessional
                }
                console.log(response, user);
                setUser(user);
            })
        } else {
            setIsAuthenticated(false);
        }
      }, [])

    async function signIn(data: SignInRequestData) {
        const { token, userName, email, isProfessional }: SignInResponseData  = await signInRequest(data);

        if (token) {
            setCookie(undefined, 'wearablefit.token', token, {
                maxAge: 60 * 60 * 24, // 24 hours
            })
    
            setIsAuthenticated(true);
            setUser({ userName, email, isProfessional });
            
            if (isProfessional) {
                router.push('/dashboard');
            } else {
                router.push('/dashboard/customers/edit/me')
            }
        }
    }

    function signOut() {
        destroyCookie(undefined, 'wearablefit.token');
        setIsAuthenticated(false);
        setUser(defaultUser);
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}