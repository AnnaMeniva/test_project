import React, { useEffect, useRef, useState } from "react";
import s from "./ViewSitePage.module.scss";
import ReactPaginate from "react-paginate";
import submenuImg from "../../common/Image/three-dots.svg";
import addFile from "../../common/Image/icons8-add-file-64.png";
import Submenu from "./Submenu/Submenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  noSort,
  sortByAuthorABCReducer,
  sortByAuthorReverseReducer,
  sortByDateReducer,
  sortByDateReverseReducer,
  sortByStatusFalseFirstreducer,
  sortByStatusTrueFirstReducer,
  sortByTitlePageABCReducer,
  sortByTitlePageReverseReducer,
  updatePageTitleName,
} from "../../../redux/postsSlice";
import Moment from "react-moment";
import SortMenu from "./Sort/SortMenu";
import CommonButtonTitleColoms from "./CommonButtonTitleColoms";

const ViewSitePage: React.FC = () => {
  const posts = useSelector((state: any) => state.posts);

  const [submenu, setSubmenu] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [edit, setActiveEdit] = useState(false);
  const [sortMenuPageTitle, setSortMenuPageTitle] = useState(false);
  const [sortMenuAuthor, setSortMenuAuthor] = useState(false);
  const [sortMenuDate, setSortMenuDate] = useState(false);
  const [sortMenuStatus, setSortMenuStatus] = useState(false);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const postPrePage = 5;
  const pageActive = pageNumber * postPrePage;
  const pageCount = Math.ceil(posts.length / postPrePage);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setActiveEdit(false);
        setPageTitle("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit]);

  const activateSubMenu = () => {
    setSubmenu(true);
  };
  const onChangePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const addNewFile = () => {
    navigate("/create_page");
  };
  const changePageTitle = (e: any) => {
    setActiveEdit(true);
  };
  const onPageTitleChange = (
    setPageTitle: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedRow(id);
    setPageTitle(event.currentTarget.value);
    dispatch(updatePageTitleName({ id, PageTitle: event.target.value }));
  };

  const activateMenuSortTitle = () => {
    setSortMenuPageTitle(true);
  };
  const activateMenuSortAuthor = () => {
    setSortMenuAuthor(true);
  };
  const sortStatusClick = () => {
    setSortMenuStatus(true);
  };
  const sortDateClick = () => {
    setSortMenuDate(true);
  };

  const sortByDateABC = () => {
    dispatch(sortByDateReducer());
    setSortMenuDate(false);
  };
  const sortByDateReverse = () => {
    dispatch(sortByDateReverseReducer());
    setSortMenuDate(false);
  };
  const sortByTitleABC = () => {
    dispatch(sortByTitlePageABCReducer());
    setSortMenuPageTitle(false);
  };
  const sortByTitleReverse = () => {
    dispatch(sortByTitlePageReverseReducer());
    setSortMenuPageTitle(false);
  };
  const sortByAuthorABC = () => {
    dispatch(sortByAuthorABCReducer());
    setSortMenuAuthor(false);
  };
  const sortByAuthorReverse = () => {
    dispatch(sortByAuthorReverseReducer());
    setSortMenuAuthor(false);
  };
  const sortByStatusTrueFirst = () => {
    dispatch(sortByStatusTrueFirstReducer());
    setSortMenuStatus(false);
  };
  const sortByStatusFalseFirst = () => {
    dispatch(sortByStatusFalseFirstreducer());
    setSortMenuStatus(false);
  };
  const noSortPage = () => {
    dispatch(noSort());
    setSortMenuDate(false);
    setSortMenuPageTitle(false);
    setSortMenuAuthor(false);
    setSortMenuStatus(false);
  };

  return (
    <div className={s.viewSitePageWrapper}>
      <table>
        <thead className={s.tableHeader}>
          <tr>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={activateMenuSortTitle}
                title={"Page title"}
              />
              {sortMenuPageTitle ? (
                <SortMenu
                  sortMenu={sortMenuPageTitle}
                  setSortMenu={setSortMenuPageTitle}
                  sortABC={sortByTitleABC}
                  sortCBA={sortByTitleReverse}
                  noSortPage={noSortPage}
                  contentABC={"A-z"}
                  contentCBA={"Z-a"}
                />
              ) : null}
            </td>

            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={sortDateClick}
                title={"Created"}
              />
              {sortMenuDate ? (
                <SortMenu
                  sortMenu={sortMenuDate}
                  setSortMenu={setSortMenuDate}
                  sortABC={sortByDateABC}
                  sortCBA={sortByDateReverse}
                  noSortPage={noSortPage}
                  contentABC={"New posts first"}
                  contentCBA={"Old posts first"}
                />
              ) : null}
            </td>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={sortStatusClick}
                title={"Status"}
              />
              {sortMenuStatus ? (
                <SortMenu
                  sortMenu={sortMenuStatus}
                  setSortMenu={setSortMenuStatus}
                  sortABC={sortByStatusTrueFirst}
                  sortCBA={sortByStatusFalseFirst}
                  noSortPage={noSortPage}
                  contentABC={"Published first"}
                  contentCBA={"Unpublished first"}
                />
              ) : null}
            </td>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={activateMenuSortAuthor}
                title={"Author"}
              />
              {sortMenuAuthor ? (
                <SortMenu
                  sortMenu={sortMenuAuthor}
                  setSortMenu={setSortMenuAuthor}
                  sortABC={sortByAuthorABC}
                  sortCBA={sortByAuthorReverse}
                  noSortPage={noSortPage}
                  contentABC={"A-z"}
                  contentCBA={"Z-a"}
                />
              ) : null}
            </td>
            <td>
              <button className={s.buttonAddNew} onClick={addNewFile}>
                <img className={s.imgAddFile} src={addFile} alt="addFile" />
                Add new file
              </button>
            </td>
          </tr>
          <tr></tr>
        </thead>

        <tbody className={s.tableBody}>
          {posts.length ? (
            posts.slice(pageActive, pageActive + postPrePage).map((item: any) =>
              item ? (
                <tr key={item.id}>
                  <td className={s?.columnPageTitle}>
                    {selectedRow === item.id && edit === true ? (
                      <input
                        type="text"
                        name="edit"
                        placeholder={item.PageTitle}
                        value={pageTitle}
                        ref={inputRef as any}
                        onChange={(e) =>
                          onPageTitleChange(setPageTitle, e, item.id)
                        }
                      />
                    ) : (
                      item.PageTitle
                    )}
                  </td>

                  <td className={s.columnCreatedAt}>
                    <Moment fromNow>{item.CreatedAt}</Moment>
                  </td>

                  <td className={s.columnStatus}>
                    <button
                      className={
                        item.Status ? s.buttonStatusActive : s.buttonStatus
                      }
                    >
                      {item.Status ? "Published" : "Unpublished"}
                    </button>
                  </td>

                  <td className={s.columnAuthor}>
                    {item.Author}
                    <button className={s.buttonAuthor}>Admin</button>
                  </td>
                  <td className={s.columnSubmenu}>
                    <button
                      className={s.buttonSubmenu}
                      onClick={(event) => {
                        setSelectedRow(item.id);
                        activateSubMenu();
                      }}
                    >
                      <img src={submenuImg} alt="submenu" />
                    </button>

                    <div className={s.submenuWrapper}>
                      {selectedRow === item.id && submenu === true ? (
                        <Submenu
                          submenu={submenu}
                          setSubmenu={setSubmenu}
                          changePageTitle={changePageTitle}
                          id={item.id}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <div className={s.infoTable}>No files</div>
          )}
        </tbody>
      </table>
      {posts.length > 5 ? (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={onChangePage}
          previousLabel=""
          nextLabel=""
          containerClassName={s.paginationButtons}
          previousClassName={s.preButton}
          nextClassName={s.nextButton}
          activeClassName={s.paginationActive}
          disabledClassName={s.paginationDisabled}
        />
      ) : null}
    </div>
  );
};

export default ViewSitePage;
