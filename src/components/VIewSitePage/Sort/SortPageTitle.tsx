import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../common/Image/icons8-sorting-24.png";
import { useDispatch } from "react-redux";
import {
  noSort,
  sortTitlePageABC,
  sortTitlePageCBA,
} from "../../../redux/postsSlice";

interface PropsType {
  sortMenuPageTitle: boolean;
  setSortMenuPageTitle: any;
}
const SortPageTitpeSubmenu: React.FC<PropsType> = ({
  sortMenuPageTitle,
  setSortMenuPageTitle,
}) => {
  const dispatch = useDispatch();

  const sortTitleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sortTitleMenuRef.current &&
        !sortTitleMenuRef.current.contains(event.target as Node)
      ) {
        setSortMenuPageTitle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSortMenuPageTitle, sortMenuPageTitle]);

  const sortPageABC = () => {
    dispatch(sortTitlePageABC());
    setSortMenuPageTitle(false);
  };
  const sortPageCBA = () => {
    dispatch(sortTitlePageCBA());
    setSortMenuPageTitle(false);
  };
  const noSortPage = () => {
    dispatch(noSort());
    setSortMenuPageTitle(false);
  };

  return (
    <div className={s.submenuSortWrapper} ref={sortTitleMenuRef}>
      <button className={s.itemSubmenuSort} onClick={sortPageABC}>
        <img className={s.imgSubmenuSort} src={sortDown} alt="sortDown" />
        Sort by: A to z
      </button>

      <button className={s.itemSubmenuSort} onClick={sortPageCBA}>
        <img className={s.imgSubmenuSort} src={sortUp} alt="sortUp" />
        Sort by: Z to a
      </button>

      <button className={s.itemSubmenuSort} onClick={noSortPage}>
        <img className={s.imgSubmenuSort} src={sortDefault} alt="sortDefault" />
        Don`t sort
      </button>
    </div>
  );
};

export default SortPageTitpeSubmenu;
