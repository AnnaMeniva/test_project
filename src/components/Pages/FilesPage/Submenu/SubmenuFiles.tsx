import React, { useEffect, useRef } from "react";
import s from "../../VIewSitePage/Submenu/Submenu.module.css";
import edit from "../../../common/Image/icons8-edit-64.png";
import trash from "../../../common/Image/icons8-trash-64.png";
import { Form } from "react-router-dom";

interface SubmenuProps {
  submenu: boolean;
  setSubmenu: any;
  id: number;
  setActiveEdit: (e: any) => void;
}
const SubmenuFiles: React.FC<SubmenuProps> = ({
  submenu,
  setSubmenu,
  setActiveEdit,
  id,
}) => {


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
            setActiveEdit(true);
            setSubmenu(false);
          }}
        >
          <img className={s.itemImg} src={edit} alt="edit" /> Edit file name
        </button>
        <Form method="delete" action="/files">
          <button
            className={s.itemSubmenu}
            type="submit"
            name="id"
            value={id}
          onSubmit={() => {
              setSubmenu(false);
              //if (window.confirm("Delete this file?"))
            }}
          >
            <img className={s.itemImg} src={trash} alt="trash" /> Delete file
          </button>
        </Form>
      </div>
    </div>
  );
};
export default SubmenuFiles;
