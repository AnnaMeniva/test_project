import React, { useEffect, useRef, useState } from "react";
import s from "./ViewSitePage.module.css";
import ReactPaginate from "react-paginate";
import submenuImg from "../common/Image/three-dots.svg";
import addFile from "../common/Image/icons8-add-file-64.png";
import Submenu from "./Submenu/Submenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePageTitleName } from "../../redux/postsSlice";
import SortPageTitpeSubmenu from "./Sort/SortPageTitle";
import SortAuthorSubmenu from "./Sort/SortAuthor";
import Moment from "react-moment";
import SortDateSubmenu from "./Sort/SortDate";
import SortStatusSubmenu from "./Sort/SortStatus";

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
  return (
    <div className={s.viewSitePageWrapper}>
      <table>
        <thead className={s.tableHeader}>
          <tr>
            <td>
              <button
                className={s.buttonFilter}
                onClick={activateMenuSortTitle}
              >
                Page title
              </button>
              {sortMenuPageTitle ? (
                <SortPageTitpeSubmenu
                  sortMenuPageTitle={sortMenuPageTitle}
                  setSortMenuPageTitle={setSortMenuPageTitle}
                />
              ) : null}
            </td>

            <td>
              <button className={s.buttonFilter} onClick={sortDateClick}>
                Created
              </button>
              {sortMenuDate ? (
                <SortDateSubmenu
                  sortMenuDate={sortMenuDate}
                  setSortMenuDate={setSortMenuDate}
                />
              ) : null}
            </td>
            <td>
              <button className={s.buttonFilter} onClick={sortStatusClick}>
                Status
              </button>
              {sortMenuStatus ? (
                <SortStatusSubmenu
                  sortMenuStatus={sortMenuStatus}
                  setSortMenuStatus={setSortMenuStatus}
                />
              ) : null}
            </td>
            <td>
              <button
                className={s.buttonFilter}
                onClick={activateMenuSortAuthor}
              >
                Author
              </button>
              {sortMenuAuthor ? (
                <SortAuthorSubmenu
                  sortMenuAuthor={sortMenuAuthor}
                  setSortMenuAuthor={setSortMenuAuthor}
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
