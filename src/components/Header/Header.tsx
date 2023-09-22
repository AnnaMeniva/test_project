import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../common/Image/icons8-assassins-creed-logo.svg";
import avatar from "../common/Image/three-dots.svg";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const Header: React.FC = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const lodoutHeandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    navigate("/home");
  };

  return (
    <div className={s.headerWrapper}>
      <img className={s.headerLogo} src={logo} alt="logo" />
      <h1>RivalCMS</h1>

      {isAuth ? (
        <>
          <button className={s.headerButton} onClick={() => lodoutHeandler()}>
            Log out
          </button>
          <NavLink to={"/auth/profile"}>
            <img className={s.userAvatar} src={avatar} alt="avatar" />
          </NavLink>
        </>
      ) : (
        <button className={s.headerButtonSingIn}>
          <Link to={"/user"}>Sing in</Link>
        </button>
      )}
    </div>
  );
};
