import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../common/Image/icons8-sorting-24.png";
import { useDispatch } from "react-redux";
import {
  noSort, sortStatusFalseFirst, sortStatusTrueFirst,
} from "../../../redux/postsSlice";

interface PropsType {
    sortMenuStatus: boolean;
    setSortMenuStatus: any;
}
const SortStatusSubmenu: React.FC<PropsType> = ({
    sortMenuStatus,
    setSortMenuStatus,
}) => {
  const dispatch = useDispatch();

  const sortStatusMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sortStatusMenuRef.current &&
        !sortStatusMenuRef.current.contains(event.target as Node)
      ) {
        setSortMenuStatus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuStatus, setSortMenuStatus]);

  const sortTrueFirst = () => {
    dispatch(sortStatusTrueFirst());
    setSortMenuStatus(false);
  };
  const sortFalseFirst = () => {
    dispatch(sortStatusFalseFirst());
    setSortMenuStatus(false);
  };
  const noSortPage = () => {
    dispatch(noSort());
    setSortMenuStatus(false);
  };

  return (
    <div className={s.submenuSortWrapper} ref={sortStatusMenuRef}>
      <button className={s.itemSubmenuSort} onClick={sortTrueFirst}>
        <img className={s.imgSubmenuSort} src={sortDown} alt="sortDown" />
        Sort by: Published first
      </button>

      <button className={s.itemSubmenuSort} onClick={sortFalseFirst}>
        <img className={s.imgSubmenuSort} src={sortUp} alt="sortUp" />
        Sort by: Unpublished first
      </button>

      <button className={s.itemSubmenuSort} onClick={noSortPage}>
        <img className={s.imgSubmenuSort} src={sortDefault} alt="sortDefault" />
        Don`t sort
      </button>
    </div>
  );
};

export default SortStatusSubmenu;
