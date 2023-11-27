"use client"

import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from 'next/navigation';
import api from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function GoogleFitIntegration() {
    const [isConfigured, setIsConfigured] = useState(false);

    useEffect(() => {
        try {
            const getConfigurationData = async () => {
                const response = await api.get("/users/settings");
                setIsConfigured(response.data.isConfigured);
            }

            getConfigurationData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const authorizeGoogleFit = async () => {
        try {
            const protocol = window.location.protocol;
            const host = window.location.host;
            const response = await api.get(`/auth/google?host=${protocol}//${host}/api`);
            console.log(`${protocol}//${host}/api`, response.data.url);
            toast({
                description: "Você está sendo redirecitonado para a tela de autorização do Google!",
            });
            window.location.assign(response.data.url)
        } catch (error) {
            console.log(error);
            toast({
                title: "Ooops...",
                description: "Ocorreu um erro ao redirecionar você para o Google FIT!",
                variant: "destructive",
                action: (
                  <ToastAction onClick={authorizeGoogleFit} altText="Tente Novamente">Tente Novamente</ToastAction>
                ),
              });
        }
    }
    return (
        <>
            <div className="w-full flex grid grid-cols-1 gap-4">
                { !isConfigured  ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Integração com o Google FIT</CardTitle>
                            <CardDescription>
                                Integre sua conta com o Google FIT para que o profissional responśavel tenha acesso aos seus dados.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mr-5 hidden h-8 lg:flex"
                                onClick={authorizeGoogleFit}
                            >
                                <FaGoogle />&nbsp; Conectar
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Integração com o Google FIT</CardTitle>
                            <CardDescription>
                                Integre sua conta com o Google FIT para que o profissional responśavel tenha acesso aos seus dados.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Sua conta já esta integrada com o Google FIT.
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    )
}