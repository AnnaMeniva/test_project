import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../common/Image/icons8-sorting-24.png";
import { useDispatch } from "react-redux";
import {
  noSort,
  sortAuthorCBA,
  sortAuthorABC,
} from "../../../redux/postsSlice";

interface PropsType {
  sortMenuAuthor: boolean;
  setSortMenuAuthor: any;
}
const SortAuthorSubmenu: React.FC<PropsType> = ({
  sortMenuAuthor,
  setSortMenuAuthor,
}) => {
  const dispatch = useDispatch();

  const sortAuthorMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sortAuthorMenuRef.current &&
        !sortAuthorMenuRef.current.contains(event.target as Node)
      ) {
        setSortMenuAuthor(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuAuthor, setSortMenuAuthor]);

  const sortPageABC = () => {
    dispatch(sortAuthorABC());
    setSortMenuAuthor(false);
  };
  const sortPageCBA = () => {
    dispatch(sortAuthorCBA());
    setSortMenuAuthor(false);
  };
  const noSortPage = () => {
    dispatch(noSort());
    setSortMenuAuthor(false);
  };

  return (
    <div className={s.submenuSortWrapper} ref={sortAuthorMenuRef}>
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

export default SortAuthorSubmenu;
