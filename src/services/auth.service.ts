import { instance } from "../api/api";
import { IResponseUserData, IUserData, IUserLogin } from "../types/types";

export const AuthService = {
  async registration(
    userData: IUserData
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>("user", userData);
    return data;
  },
  async login(userData: IUserData): Promise<IUserLogin | undefined> {
    const { data } = await instance.post<IUserLogin>("auth/login", userData);
    return data;
  },
  async getProfile(): Promise<IUserLogin | undefined> {
    const { data } = await instance.get<IUserLogin>("auth/profile");
    if (data) return data;
  },
};
