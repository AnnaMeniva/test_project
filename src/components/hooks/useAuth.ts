import { useAppSelector } from "../../redux/hooks";


export const useAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.users.isAuth);
  return isAuth;
};
