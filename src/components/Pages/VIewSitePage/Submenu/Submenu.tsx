import React, { useEffect, useRef } from "react";
import s from "./Submenu.module.css";
import edit from "../../../common/Image/icons8-edit-64.png";
import trash from "../../../common/Image/icons8-trash-64.png";
import book from "../../../common/Image/icons8-open-book-50.png";
import { updateStatus } from "../../../../redux/postsSlice";
import { useDispatch } from "react-redux";

import { Form } from "react-router-dom";

interface SubmenuProps {
  submenu: boolean;
  ref?: any;
  setSubmenu?: any;
  id: number;
  changePageTitle:()=>void
}

const Submenu: React.FC<SubmenuProps> = ({
  submenu,
  setSubmenu,
  changePageTitle,
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
    <div className={s.submenuWrapper} ref={menuRef as any}>
      <p>Manage</p>
      <div className={s.submenuButton}>
        <button
          type="submit"
          className={s.itemSubmenu}
          onClick={() => {
            changePageTitle()
            setSubmenu(false);
          }}
        >
          <img className={s.itemImg} src={edit} alt="edit" /> Edit file name
        </button>

        <button
          className={s.itemSubmenu}
          onClick={() => {
            dispatch(
              updateStatus({
                id,
                Status: false,
              })
            );
            setSubmenu(false);
          }}
        >
          <img className={s.itemImg} src={book} alt="book" /> Change status
        </button>
        <Form method="delete" action="/pages">
          <button
            className={s.itemSubmenu}
            type="submit"
            name="id"
            value={id}
            onSubmit={() => {
              setSubmenu(false);
              // if (window.confirm("Delete this post?")) {
              //   dispatch(deleteItem({ id }));
              // }
            }}
          >
            <img className={s.itemImg} src={trash} alt="trash" /> Delete page
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Submenu;
