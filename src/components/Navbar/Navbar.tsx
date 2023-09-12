import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import book from "../common/Image/icons8-open-book-50.png";
import file from "../common/Image/icons8-file-64.png";
import cup from "../common/Image/icons8-tea-cup-50.png";
import lightning from "../common/Image/icons8-lightning-50.png";
import cube from "../common/Image/icons8-cube-24.png";
import users from "../common/Image/icons8-users-64.png";
import pen from "../common/Image/icons8-pen-50.png";
import home from "../common/Image/icons8-home-page-32.png";
import add from "../common/Image/icons8-add-file-32.png";
import trash from "../common/Image/icons8-trash-64.png";

const activeLink: any= ({ isActive }: any) =>
  isActive
    ? {
        fontWeight: "bold",
      }
    : {};

const Navbar: React.FC = () => {
  return (
    <div className={s.menu}>
      <div className={s.menuTitle}>
        <p> Manage </p>
      </div>
      <div className={s.item}>
        <NavLink to="/pages" style={activeLink}>
          <img className={s.navItems} src={home} alt="home" /> View site
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/create_page" style={activeLink}>
          <img className={s.navItems} src={add} alt="add" /> Create page
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/blog_articles" style={activeLink}>
          <img className={s.navItems} src={pen} alt="pen" /> Blog articles
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/files" style={activeLink}>
          <img className={s.navItems} src={file} alt="file" /> Files
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" style={activeLink}>
          <img className={s.navItems} src={users} alt="users" /> Users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/subscriptions" style={activeLink}>
          <img className={s.navItems} src={lightning} alt="lightning" />
          Subscriptions
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/archived_pages" style={activeLink}>
          <img className={s.navItems} src={trash} alt="trash" /> Archived pages
        </NavLink>
      </div>
      <div className={s.menuTitle}>
        <p> Pro features </p>
      </div>
      <div className={s.item}>
        <NavLink to="/themes" style={activeLink}>
          <img className={s.navItems} src={book} alt="book" /> Themes
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/plugins" style={activeLink}>
          <img className={s.navItems} src={cube} alt="cube" /> Plugins
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/upgrade_plans" style={activeLink}>
          <img className={s.navItems} src={cup} alt="cup" /> Upgrade plans
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
