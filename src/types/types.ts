export interface IUserData {
  email: string;
  password: string;
  fullName?: string;
}
export interface IUserLogin {
  id: number;
  email: string;
  token: string;
}

export interface IUser {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  fullName: string | undefined;
  avatarUrl?: string | undefined;
  createAt: Date | undefined;
  role: boolean | undefined;
}

export interface IResponseUserData {
  user: IUser;
  token: string;
}
