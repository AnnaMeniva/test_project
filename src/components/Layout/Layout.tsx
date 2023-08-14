import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import Navbar from "../Navbar/Navbar";

import s from './Layout.module.css'

const Layout: React.FC = () =>{
    return(
        <div className={s.contentWrapper}>
    <Header />
    <Outlet/>
    <Navbar/>  
      </div>
    )
    
}
export default Layout