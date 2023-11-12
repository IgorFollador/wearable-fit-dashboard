import axios from 'axios';
import { parseCookies } from "nookies";

type SignInRequestData = {
  email: string;
  password: string;
}

type SignInResponseData = {
  token: string;
  userName: string;
  isProfessional: boolean;
}

type recoverUserInformationResponseData = {
  userName: string;
  isProfessional: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

const { 'wearablefit.token': token } = parseCookies();

api.interceptors.request.use(config => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
})

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await api.post<SignInResponseData>("/auth", data);

    api.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`;

    return response.data;
  } catch (error) {
    throw new Error("Email ou senha incorretos!");
  }
}

export async function recoverUserInformation() {
  const response = await api.get<recoverUserInformationResponseData>("/users/recoverInformation");
  return response.data;
}

export default api;