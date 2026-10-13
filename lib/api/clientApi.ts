import { CurrentFullResponse, CurrentResponse, User } from "@/types/user";
import { apiInstance } from "./api";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export const registerUser = async (registerData: RegisterRequest) => {
  const { data } = await apiInstance.post<User>(`/users/signup`, registerData);
  return data;
};
export interface LoginRequest {
  email: string;
  password: string;
}
export const loginUser = async (loginData: LoginRequest) => {
  const { data } = await apiInstance.post<User>(`/users/signin`, loginData);
  return data;
};


export const currentUserInfo = async () => {
  const { data } = await apiInstance.get<CurrentResponse>(`/users/current`)
  return data;
};

export const currentUserFullInfo = async (token: string) => {
  const { data } = await apiInstance.get<CurrentFullResponse>("/users/current/full",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export interface ServerSession {
   message: string;
}
export const logoutUser = async () => {
  const { data } = await apiInstance.post<ServerSession>(`/users/signout`);
  return data;
};