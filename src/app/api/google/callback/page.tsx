"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { parseCookies } from "nookies";
import api from '@/lib/api';

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams!.get('code');

  useEffect(() => {
    const { 'wearablefit.token': token } = parseCookies();
    
    console.log(searchParams);
    if (code) {
      handleAuthorizationCode(code, token);
    }
  }, []);

  const handleAuthorizationCode = async (code: any, token: any) => {
    console.log(code, token);
    const protocol = window.location.protocol;
    const host = window.location.host;

    try {
        const response = await api.get(`google/authorization?code=${code}&host=${protocol}//${host}/api`, {
            headers: {
                Authorization: token
            }
        })
        console.log(response);
        alert('Conectado com o Google FIT!')
        router.push("/dashboard/settings");
    } catch (error) {
        console.error(error);
        alert(error)
    }
  };

  return <div>Autorização em andamento...</div>;
};

export default Callback;