"use client"

import axios from 'axios';
import { parseCookies } from 'nookies';

type SignInRequestData = {
  email: string;
  password: string;
}

export type SignInResponseData = {
  token: string;
  email: string;
  userName: string;
  isProfessional: boolean;
}

export type RecoverUserInformationResponseData = {
  userName: string;
  email: string;
  isProfessional: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

const { 'wearablefit.token': token } = parseCookies();

api.interceptors.request.use(config => {
  if (token) {
    config.headers["Cache-Control"] = "no-cache",
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return config;
})

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await api.post<SignInResponseData>("/auth", data);


    return response.data;
  } catch (error) {
    throw new Error("Email ou senha incorretos!");
  }
}

export async function recoverUserInformation() {
  const response = await api.get<RecoverUserInformationResponseData>("/users/recoverInformation");
  return response.data;
}

export default api;