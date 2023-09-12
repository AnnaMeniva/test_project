import React, { useEffect, useRef, useState } from "react";
import s from "./ViewSitePage.module.scss";
import ReactPaginate from "react-paginate";
import submenuImg from "../../common/Image/three-dots.svg";
import addFile from "../../common/Image/icons8-add-file-64.png";
import Submenu from "./Submenu/Submenu";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
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
import { instance } from "../../../api/api";
import { IPage } from "../../../types/types";

export const pageLoader = async () => {
  const { data } = await instance.get<IPage>("/pages");
  return data;
};

export const pageAction = async ({ request }: any) => {
  console.log(33333, request);
  switch (request.method) {
    case "PATCH": {
      const formData = await request.formData();
      console.log(77777, formData);
      const page = {
        id: formData.get("id"),
        title: formData.get("title"),
      };
      await instance.patch(`/pages/${page.id}`, page);

      return page;
    }
    case "DELETE": {
      const formData = await request.formData();
      const pageId = formData.get("id");
      await instance.delete(`pages/${pageId}`);
      return null;
    }
  }
};

const ViewSitePage: React.FC = () => {
  //const posts = useSelector((state: any) => state.posts);
  const pages = useLoaderData() as IPage[];
  console.log(pages);

  const [submenu, setSubmenu] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

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
  const pageCount = Math.ceil(pages.length / postPrePage);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setActiveEdit(false);
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
  const changePageTitle = () => {
    setActiveEdit(true);
  };

  // const onPageTitleChange = (
  //   setPageTitle: React.Dispatch<React.SetStateAction<string>>,
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   id: number
  // ) => {
  //   setSelectedRow(id);
  //   setPageTitle(event.currentTarget.value);

  // };

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
          {pages.length ? (
            pages
              .slice(pageActive, pageActive + postPrePage)
              .map((page: IPage) =>
                page ? (
                  <tr key={page.id}>
                    <td className={s?.columnPageTitle}>
                      {selectedRow === page.id && edit === true ? (
                        <Form
                          method="patch"
                          action="/pages"
                          onSubmit={() => {
                            setActiveEdit(false);
                          }}
                        >
                          <input
                            type="text"
                            name="title"
                            placeholder={page.title}
                            ref={inputRef as any}
                          />
                          <input type="hidden" name="id" value={page.id} />
                          <button
                            name="id"
                            type="submit"
                            onClick={() => {
                              setActiveEdit(false);
                              setSelectedRow(page.id);
                              
                            }}
                          >
                            ok
                          </button>
                        </Form>
                      ) : (
                        page.title
                      )}
                    </td>

                    <td className={s.columnCreatedAt}>
                      <Moment fromNow>{page.createAt}</Moment>
                    </td>

                    <td className={s.columnStatus}>
                      <button
                        className={
                          page.status ? s.buttonStatus : s.buttonStatusActive
                        }
                      >
                        {page.status}
                      </button>
                    </td>

                    <td className={s.columnAuthor}>
                      {page.user?.fullName}
                      <button className={s.buttonAuthor}>
                        {page.user?.role}
                      </button>
                    </td>
                    <td className={s.columnSubmenu}>
                      <button
                        className={s.buttonSubmenu}
                        onClick={(event) => {
                          setSelectedRow(page.id);
                          activateSubMenu();
                        }}
                      >
                        <img src={submenuImg} alt="submenu" />
                      </button>

                      <div className={s.submenuWrapper}>
                        {selectedRow === page.id && submenu === true ? (
                          <Submenu
                            submenu={submenu}
                            setSubmenu={setSubmenu}
                            id={page.id}
                            changePageTitle={changePageTitle}
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
      {pages.length > 5 ? (
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
