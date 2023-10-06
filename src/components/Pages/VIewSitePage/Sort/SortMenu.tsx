import React, { useEffect, useRef } from "react";
import s from "./SortPageTitle.module.css";
import sortDown from "..//../../common/Image/icons8-descending-sorting-30.png";
import sortUp from "..//../../common/Image/icons8-sort-amount-up-32.png";
import sortDefault from "..//../../common/Image/icons8-sorting-24.png";
import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";

interface PropsType {
  sortMenu: boolean;
  setSortMenu: any;
  contentCBA: string;
  contentABC: string;
  sortBy: string;
}
const SortMenu: React.FC<PropsType> = ({
  sortMenu,
  setSortMenu,
  contentABC,
  contentCBA,
  sortBy,
}) => {
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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
  }, [sortMenu]);

  return (
    <div className={s.submenuSortWrapper} ref={sortMenuRef}>
      <CommonButton
        onClick={() => {
          navigate(`/pages?${sortBy}=asc`);
          setSortMenu(false);
        }}
        imageClassName={s.imgSubmenuSort}
        buttonClassName={s.itemSubmenuSort}
        altButton={"sortDown"}
        image={sortDown}
        content={contentABC}
      />
      <CommonButton
        onClick={() => {
          navigate(`/pages?${sortBy}=desc`);
          setSortMenu(false);
        }}
        imageClassName={s.imgSubmenuSort}
        buttonClassName={s.itemSubmenuSort}
        altButton={"sortUp"}
        image={sortUp}
        content={contentCBA}
      />
      <CommonButton
        onClick={() => {
          navigate("/pages");
          setSortMenu(false);
        }}
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
