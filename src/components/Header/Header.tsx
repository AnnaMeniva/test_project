import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../common/Image/icons8-assassins-creed-logo.svg";
import { useSelector } from "react-redux";

export const Header: React.FC = () => {
  const users = useSelector((state: any) => state.users);
  const [user, setUser] = useState(users)
 
  console.log(111, users.avatar);
 

  return (
    <div className={s.headerWrapper}>
      <img className={s.headerLogo} src={logo} alt="logo" />
      <h1>RivalCMS</h1>

     
          <button className={s.headerButton}>
            <Link to={"/login"}>Pro Plan</Link>
          </button>
     
          <img className={s.avatar} src={""} alt="avatar" />
         
          
  
      
      <button className={s.headerButtonSingIn}>
        <Link to={"/login"}>Sing in</Link>
      </button>
      
    </div>
  );
};
