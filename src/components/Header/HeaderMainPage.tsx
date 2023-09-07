import React from "react";
import { Link } from "react-router-dom";
import s from "./HeaderMainPage.module.css";

export const HeaderMainPage: React.FC = () => {
  return (
    <div className={s.headerWrapper}>
      <button className={s.headerButton}>Pricing</button>
      <button className={s.headerButton}>About</button>
      <button className={s.headerButton}>
        <Link to={"/user"}>Sing in</Link>
      </button>
    </div>
  );
};
