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
  createAt: string ;
  role: boolean | undefined;
}

export interface IResponseUserData {
  user: IUser;
  token: string;
}

export interface IPage {
  title: string;
  createAt: string;
  updateAt: string;
  id: number;
  user: IUser;
  status: string;
}

export interface IFile {
  title: string
  createdDate: string
  id: number
  signedUrl: string
  type: string
}