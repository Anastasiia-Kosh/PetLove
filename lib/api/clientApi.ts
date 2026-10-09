import { User } from "@/types/user";
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