import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { getTokenFromLocalStorage } from "./components/helpers/localstorage.helper";
import { useAppDispatch } from "./hooks";
import { login, logout } from "./redux/userSlice";
import { AuthService } from "./services/auth.service";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <RouterProvider router={router} />;
};
export default App;
