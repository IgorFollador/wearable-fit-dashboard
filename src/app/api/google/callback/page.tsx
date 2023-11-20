"use client"

import api from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { 'wearablefit.token': token } = parseCookies();
        console.log(token);
        const { code } = req.searchParams;
        // const { 'wearablefit.token': token } = parseCookies();
        // const response = await api.get(`/google/authCallback?code=${code}`);
        // console.log(response);
        // console.log(code, token);
        // if (code && token) {
        //     const response = await api.get(`/google/authCallback?code=${code}`);
        //     console.log(response);
        // }

        // Você pode redirecionar o usuário ou enviar uma resposta
        // return NextResponse.json(code, {
        //     status: 200,
        //   });
    } catch (error) {
        console.error('Erro ao processar o código:', error);
    }
}