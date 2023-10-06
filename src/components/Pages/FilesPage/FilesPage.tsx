import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import s from "./FilesPage.module.scss";
import submenuImg from "../../common/Image/three-dots.svg";
import { DragDropFilesPageForm } from "./DragDropFilesPageForm";
import search from "../../common/Image/icons8-search-30.png";
import Moment from "react-moment";
import SubmenuFiles from "./Submenu/SubmenuFiles";
import debounce from "lodash.debounce";
import CommonButtonFilterFiles from "./CommonButtonFilter/CommonButtonFilterFiles";
import { instance } from "../../../api/api";
import { IFile } from "../../../types/types";
import { Form, useLoaderData } from "react-router-dom";

interface IFileProps {
  limit: number;
}
export const filesLoader = async () => {
  const { data } = await instance.get<IFile[]>("/files");
  return data;
};

export const filesAction = async ({ request }: any) => {
  switch (request.method) {
    case "PATCH": {
      const formData = await request.formData();
      const file = {
        id: formData.get("id"),
        title: formData.get("title") ? formData.get("title") : undefined,
      };
      await instance.patch(`/files/${file.id}`, file);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const fileId = formData.get("id");
      await instance.delete(`files/${fileId}`);

      return null;
    }
  }
};
const FilesPage: React.FC<IFileProps> = ({ limit =5}) => {
  const files = useLoaderData() as IFile[];

  const [data, setData] = useState<IFile[]>(files);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

 // const [pageNumber, setPageNumber] = useState(0);

  const [selectedRow, setSelectedRow] = useState(0);
  const [submenu, setSubmenu] = useState(false);
  const [edit, setActiveEdit] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  console.log(222, files);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // const postPrePage = 5;
  // const pageActive = pageNumber * postPrePage;
  // const pageCount = Math.ceil(data.length / postPrePage);

  const fetchFiles = async (page: number) => {
    const response = await instance.get(`files?page=${page}&limit=${limit}`);
    setData(response.data);
    setTotalPage(Math.ceil(files.length / limit));
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

 
  useEffect(() => {
    setData(files);
  }, [files]);
  useEffect(() => {
    fetchFiles(currentPage);
  }, [currentPage, files]);
  const onChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const activateSubMenu = () => {
    setSubmenu(true);
  };

  const OnClickVideoList = () => {
    setData(files.filter((file) => file.type === "video"));
  };
  const OnClickImageList = () => {
    const listImages = files.filter((file) => file.type === "image");
    setData(listImages);
  };
  const OnClickFileList = () => {
    const listFiles = files.filter((file) => file.type === "file");
    setData(listFiles);
  };
  const OnClickAudioList = () => {
    const listAudios = files.filter((file) => file.type === "audio");
    setData(listAudios);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    const regex = new RegExp(event.target.value, "i");
    setData(files.filter((el: any) => regex.test(el.name)));
  };
  const debouncedChangeHandler = useCallback(debounce(handleChange, 2000), [
    handleChange,
    2000,
  ]);

  return (
    <div className={s.filesPageWrapper}>
      <div className={s.dragDropWrapper}>
        <DragDropFilesPageForm />
      </div>
      <div className={s.headerTable}>
        <div className={s.inputSearchWrapper}>
          <img className={s.imgSearch} src={search} alt="search" />
          <input
            className={s.inputSearch}
            type="search"
            placeholder="Search for file"
            onChange={debouncedChangeHandler}
          />
        </div>
        <div className={s.buttonsFilterWrapper}>
          <p>Filter</p>

          <CommonButtonFilterFiles
            className={s.buttonFilter}
            onClick={OnClickImageList}
            context={"Image"}
          />
          <CommonButtonFilterFiles
            className={s.buttonFilter}
            onClick={OnClickFileList}
            context={"Files"}
          />
          <CommonButtonFilterFiles
            className={s.buttonFilter}
            onClick={OnClickAudioList}
            context={"Audio"}
          />
          <CommonButtonFilterFiles
            className={s.buttonFilter}
            onClick={OnClickVideoList}
            context={"Video"}
          />
        </div>
      </div>
      <div className={s.tableWrapper}>
        <table>
          <tbody className={s.tableBody}>
            {data.length ? (
              // data
              //.slice(pageActive, pageActive + postPrePage)
              data.map((file: IFile) => (
                <tr key={file.id}>
                  <td className={s.columnImageURL}>
                    <img
                      className={s.usersImg}
                      src={file.signedUrl}
                      alt="file"
                    />
                  </td>
                  <td className={s.columnFileName}>
                    {selectedRow === file.id && edit === true ? (
                      <Form
                        method="patch"
                        action="/files"
                        onSubmit={() => setActiveEdit(false)}
                      >
                        <input
                          type="text"
                          name="title"
                          placeholder={file.title}
                          ref={inputRef as any}
                          autoFocus
                        />
                        <input type="hidden" name="id" value={file.id} />
                        <button type="submit" ref={buttonRef as any}>
                          ok
                        </button>
                      </Form>
                    ) : (
                      file.title
                    )}
                  </td>
                  <td className={s.columnCreatedAt}>
                    <Moment fromNow>{file.createdDate}</Moment>
                  </td>
                  <td className={s.columnSubmenu}>
                    <button
                      className={s.buttonSubmenu}
                      onClick={(event) => {
                        setSelectedRow(file.id);
                        activateSubMenu();
                      }}
                    >
                      <img src={submenuImg} alt="submenu" />
                    </button>
                    <div className={s.submenuWrapper}>
                      {selectedRow === file.id && submenu === true ? (
                        <SubmenuFiles
                          submenu={submenu}
                          setSubmenu={setSubmenu}
                          setActiveEdit={setActiveEdit}
                          id={file.id}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div>no files</div>
            )}
          </tbody>
        </table>

        <ReactPaginate
          pageCount={totalPage}
          onPageChange={onChangePage}
          previousLabel=""
          nextLabel=""
          containerClassName={s.paginationButtons}
          previousClassName={s.preButton}
          nextClassName={s.nextButton}
          activeClassName={s.paginationActive}
          disabledClassName={s.paginationDisabled}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
        />
      </div>
    </div>
  );
};
export default FilesPage;
