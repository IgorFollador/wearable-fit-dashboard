import axios from 'axios';

type SignInRequestData = {
  email: string;
  password: string;
}

type SignInResponseData = {
  token: string;
  userName: string;
  isProfessional: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await api.post<SignInResponseData>("/auth", data);
    console.log(response);
    api.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    throw new Error("Email ou senha incorretos!");
  }
}

export async function recoverUserInformation(token: string) {
  throw new Error("Email ou senha incorretos!");
}

export default api;