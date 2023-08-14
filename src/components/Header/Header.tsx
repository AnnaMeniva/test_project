import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../common/Image/icons8-assassins-creed-logo.svg";
import { useSelector } from "react-redux";

export const Header: React.FC = () => {
  const user = useSelector((state: any) => state.users);
  const currentUser = user.filter((el: any) => el.isAuth === true);

console.log(333, currentUser.isAuth)

  return (
    <div className={s.headerWrapper}>
      <img className={s.headerLogo} src={logo} alt="logo" />
      <h1>RivalCMS</h1>

      {currentUser.isAuth ? (
        <button className={s.headerButtonSingIn}>
          <Link to={"/login"}>Sing in</Link>
        </button>
      ) : (
        <>
          <button className={s.headerButton}>
            <Link to={"/login"}>Pro Plan</Link>
          </button>
          <img
            className={s.userAvatar}
            src={currentUser[0]?.avatar}
            alt="avatar"
          />
        </>
      )}
    </div>
  );
};
