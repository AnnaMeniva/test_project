import React, { useEffect, useRef } from "react";
import s from "../../VIewSitePage/Submenu/Submenu.module.css";
import edit from "../../common/Image/icons8-edit-64.png";
import trash from "../../common/Image/icons8-trash-64.png";
import { deleteItem } from "../../../redux/fileSlice";
import { useDispatch } from "react-redux";

interface SubmenuProps {
  submenu: boolean;
  setSubmenu: any;
  id: number;
  changeFileTitle: (e: any) => void;
}
const SubmenuFiles: React.FC<SubmenuProps> = ({
  submenu,
  setSubmenu,
  changeFileTitle,
  id,
}) => {
  const dispatch = useDispatch();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSubmenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSubmenu, submenu]);

  return (
    <div className={s.submenuFilesWrapper} ref={menuRef as any}>
      <p>Manage</p>
      <div className={s.submenuButton}>
        <button
          className={s.itemSubmenu}
          onClick={(e) => {
            changeFileTitle(e);
            setSubmenu(false);
          }}
        >
          <img className={s.itemImg} src={edit} alt="edit" /> Edit file name
        </button>
        <button
          className={s.itemSubmenu}
          onClick={() => {
            setSubmenu(false);
            if (window.confirm("Delete this file?")) {
              dispatch(deleteItem({ id }));
            }
          }}
        >
          <img className={s.itemImg} src={trash} alt="trash" /> Delete file
        </button>
      </div>
    </div>
  );
};
export default SubmenuFiles;
