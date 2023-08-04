import React from "react";
import { Link } from "react-router-dom";
import s from './Header.module.css'
import logo from '../common/Image/icons8-assassins-creed-logo.svg'
import { users } from "../../redux/Redux-store";

export const Header: React.FC = ()=>{

    return(
     
            <div className={s.headerWrapper}>
                    <img className={s.headerLogo} src={logo} alt="logo" />
                    <h1>RivalCMS</h1>

                    
                    <button className={s.headerButton}>
                      <Link to={'/login'}>Pro Plan</Link>
                    </button>

                    <img className={s.avatar} src={users[1].avatar} alt="avatar" />
            </div>
           
    )
}