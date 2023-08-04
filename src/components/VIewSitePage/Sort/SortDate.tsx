import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../common/Image/icons8-sorting-24.png";
import { useDispatch } from "react-redux";
import {
  noSort, sortDate, sortDateReverse,

} from "../../../redux/postsSlice";

interface PropsType {
    sortMenuDate: boolean;
    setSortMenuDate: any;
}
const SortDateSubmenu: React.FC<PropsType> = ({
    sortMenuDate,
    setSortMenuDate,
}) => {
  const dispatch = useDispatch();

  const sortDateMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sortDateMenuRef.current &&
        !sortDateMenuRef.current.contains(event.target as Node)
      ) {
        setSortMenuDate(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuDate, setSortMenuDate]);

  const sortPageABC = () => {
    dispatch(sortDate());
    setSortMenuDate(false);
  };
  const sortPageCBA = () => {
    dispatch(sortDateReverse());
    setSortMenuDate(false);
  };
  const noSortPage = () => {
    dispatch(noSort());
    setSortMenuDate(false);
  };

  return (
    <div className={s.submenuSortWrapper} ref={sortDateMenuRef}>
      <button className={s.itemSubmenuSort} onClick={sortPageABC}>
        <img className={s.imgSubmenuSort} src={sortDown} alt="sortDown" />
        Sort by: newer
      </button>

      <button className={s.itemSubmenuSort} onClick={sortPageCBA}>
        <img className={s.imgSubmenuSort} src={sortUp} alt="sortUp" />
        Sort by: older
      </button>

      <button className={s.itemSubmenuSort} onClick={noSortPage}>
        <img className={s.imgSubmenuSort} src={sortDefault} alt="sortDefault" />
        Don`t sort
      </button>
    </div>
  );
};

export default SortDateSubmenu;
