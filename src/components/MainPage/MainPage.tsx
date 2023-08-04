import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { HeaderMainPage } from "../Header/HeaderMainPage";
import s from "./MainPage.module.css"


export const MainPage: React.FC = ()=>{
    return(
    <>
    <HeaderMainPage/>
        <div className={s.mainPain}>
                <div className={s.mainPageTitleWrapper}>
                    <h1>RivalCMS</h1>
                    <h2>Fresh new way to build sites</h2>
                        <button className={s.mainPageButton}>
                            <Link to={'/login'}>Get started free</Link>
                        </button>
                        <h6>*na card needed</h6>
                </div>
        </div>    
    <Footer /> 
    </>
   )
}