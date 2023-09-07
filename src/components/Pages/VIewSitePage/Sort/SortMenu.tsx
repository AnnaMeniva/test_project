import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../../common/Image/icons8-sorting-24.png";
import CommonButton from "./CommonButton";

interface PropsType {
  sortMenu: boolean;
  setSortMenu: any;
  contentCBA: string;
  contentABC: string;
  sortABC: () => void;
  sortCBA: () => void;
  noSortPage: () => void;
}
const SortMenu: React.FC<PropsType> = ({
  sortMenu,
  setSortMenu,
  sortABC,
  sortCBA,
  noSortPage,
  contentABC,
  contentCBA
}) => {


  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenu, setSortMenu]);

  return (
    <div className={s.submenuSortWrapper} ref={sortMenuRef}>
      <CommonButton
        onClick={sortABC}
        imageClassName={s.imgSubmenuSort}
        buttonClassName={s.itemSubmenuSort}
        altButton={"sortDown"}
        image={sortDown}
        content={contentABC}
      />
      <CommonButton
        onClick={sortCBA}
        imageClassName={s.imgSubmenuSort}
        buttonClassName={s.itemSubmenuSort}
        altButton={"sortUp"}
        image={sortUp}
        content={contentCBA}
      />
      <CommonButton
        onClick={noSortPage}
        imageClassName={s.imgSubmenuSort}
        buttonClassName={s.itemSubmenuSort}
        altButton={"sortDefault"}
        image={sortDefault}
        content={"Don`t sort"}
      />
    </div>
  );
};

export default SortMenu;
