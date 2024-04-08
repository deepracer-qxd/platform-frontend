import User from "@/model/User";
import { api } from "@/services/axios";

export async function recoverUserInfo(token: string){
  const response = await api.get<User>('/profile')

  return response.data
}