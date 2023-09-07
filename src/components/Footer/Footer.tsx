import React from "react";
import s from './Footer.module.scss'
import logo from "../common/Image/icons8-assassins-creed-logo.svg"
import { Link } from "react-router-dom";

export const Footer: React.FC = ()=>{
    return(
        <div className={s.footerWrapper}>
            <div className={s.footerButtons}>
                <Link to={"/auth/login"}>Register</Link>
                <Link to={""}>Terms & conditioms</Link>
                <Link to={""}>Privacy policy</Link>
                <Link to={""}>Documentation</Link>
                <Link to={""}>Pricing</Link>
                <Link to={""}>Our blog</Link>
            </div>
        
                <div className={s.footerlogo}>
                    <img className={s.imgLogo} src={logo} alt="logo" />
                </div>
        </div>
    )
}