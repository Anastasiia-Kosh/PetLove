import { User } from "@/app/types/user";
import { nextServerInstance } from "./api";

export interface RegisterRequest {
    name: string;
  email: string;
  password: string;
}
export const register = async (registerData: RegisterRequest) => {
  const { data } = await nextServerInstance.post<User>(
    `/user/signup`,
    registerData,
  );
  return data;
};