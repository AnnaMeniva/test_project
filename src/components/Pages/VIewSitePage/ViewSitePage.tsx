import React, { useEffect, useRef, useState } from "react";
import s from "./ViewSitePage.module.scss";
import ReactPaginate from "react-paginate";
import submenuImg from "../../common/Image/three-dots.svg";
import addFile from "../../common/Image/icons8-add-file-64.png";
import Submenu from "./Submenu/Submenu";
import {
  Form,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  switch (request.method) {
    case "PATCH": {
      const formData = await request.formData();
      const page = {
        id: formData.get("id"),
        title: formData.get("title") ? formData.get("title") : undefined,
        status: formData.get("status")
          ? formData.get("status") === "unpublished"
            ? "published"
            : "unpublished"
          : undefined,
      };
      await instance.patch(`/pages/${page.id}`, page);

      return null;
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
  const pages = useLoaderData() as IPage[];
  const [data, setData] = useState  <IPage[]>(pages);

  const [params, setParams] = useSearchParams();
  const [submenu, setSubmenu] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [edit, setActiveEdit] = useState(false);

  const [sortMenuPageTitle, setSortMenuPageTitle] = useState(false);
  const [sortMenuAuthor, setSortMenuAuthor] = useState(false);
  const [sortMenuDate, setSortMenuDate] = useState(false);
  const [sortMenuStatus, setSortMenuStatus] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const postPrePage = 5;
  const pageActive = pageNumber * postPrePage;
  const pageCount = Math.ceil(data.length / postPrePage);

  useEffect(() => {
    fetchPosts();
    setData(pages);
  }, [pages]);

  const fetchPosts = async () => {
    await instance
      .get<IPage[]>(`/pages?${params}`)
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
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

  return (
    <div className={s.viewSitePageWrapper}>
      <table>
        <thead className={s.tableHeader}>
          <tr>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={() => {
                  setSortMenuPageTitle(true);
                }}
                title={"Page title"}
              />
              {sortMenuPageTitle ? (
                <SortMenu
                  sortMenu={sortMenuPageTitle}
                  setSortMenu={setSortMenuPageTitle}
                  sortBy={"title"}
                  contentABC={"A-z"}
                  contentCBA={"Z-a"}
                />
              ) : null}
            </td>

            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={() => setSortMenuDate(true)}
                title={"Created"}
              />
              {sortMenuDate ? (
                <SortMenu
                  sortMenu={sortMenuDate}
                  setSortMenu={setSortMenuDate}
                  sortBy={"createAt"}
                  contentABC={"Old posts first"}
                  contentCBA={"New posts first"}
                />
              ) : null}
            </td>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={() => setSortMenuStatus(true)}
                title={"Status"}
              />
              {sortMenuStatus ? (
                <SortMenu
                  sortMenu={sortMenuStatus}
                  setSortMenu={setSortMenuStatus}
                  sortBy={"status"}
                  contentABC={"Published first"}
                  contentCBA={"Unpublished first"}
                />
              ) : null}
            </td>
            <td>
              <CommonButtonTitleColoms
                className={s.buttonFilter}
                onClick={() => setSortMenuAuthor(true)}
                title={"Author"}
              />
              {sortMenuAuthor ? (
                <SortMenu
                  sortMenu={sortMenuAuthor}
                  setSortMenu={setSortMenuAuthor}
                  sortBy={"fullName"}
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
          {data?.length ? (
            data
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
                            autoFocus
                          />

                          <input type="hidden" name="id" value={page.id} />
                          <button ref={buttonRef as any} type="submit">
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
                          page.status === "unpublished"
                            ? s.buttonStatus
                            : s.buttonStatusActive
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
                        onClick={() => {
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
                            status={page.status}
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
