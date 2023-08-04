import React from "react";
import s from './Footer.module.css'
import logo from "../common/Image/icons8-assassins-creed-logo.svg"

export const Footer: React.FC = ()=>{
    return(
        <div className={s.footerWrapper}>
            <div className={s.footerButtons}>
                <button>Register</button>
                <button>Terms & conditioms</button>
                <button>Privacy policy</button>
                <button>Documentation</button>
                <button>Pricing</button>
                <button>Our blog</button>
            </div>
        
                <div className={s.footerlogo}>
                    <img className={s.imgLogo} src={logo} alt="logo" />
                </div>
        </div>
    )
}