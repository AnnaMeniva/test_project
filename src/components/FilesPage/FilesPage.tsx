import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import s from "./FilesPage.module.css";
import submenuImg from "../common/Image/three-dots.svg";
import { DragDropFilesPageForm } from "./DragDropFilesPageForm";
import search from "../common/Image/icons8-search-30.png";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import SubmenuFiles from "./Submenu/SubmenuFiles";
import { updateFileName } from "../../redux/fileSlice";
import debounce from "lodash.debounce";

const FilesPage: React.FC = () => {
  const files = useSelector((state: any) => state.files);

  const [tableFiles, setTableFiles] = useState(files);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedRow, setSelectedRow] = useState(0);
  const [submenu, setSubmenu] = useState(false);
  const [edit, setActiveEdit] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");
  

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const postPrePage = 5;
  const pageActive = pageNumber * postPrePage;
  const pageCount = Math.ceil(tableFiles.length / postPrePage);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setActiveEdit(false);
        setFileTitle("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit, fileTitle]);

  useEffect(() => {
    setTableFiles(files);
  }, [files]);

  const onChangePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const onFileNameChange = (
    setFileTitle: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedRow(id);
    setFileTitle(event.currentTarget.value);
    dispatch(updateFileName({ id, name: event.target.value }));
  };

  const changeFileTitle = (e: any) => {
    setActiveEdit(true);
  };

  const activateSubMenu = () => {
    setSubmenu(true);
  };

  const OnClickVideoList = () => {
    setTableFiles(files.filter((el: any) => el.type === "video"));
  };
  const OnClickImageList = () => {
    setTableFiles(files.filter((el: any) => el.type === "image"));
  };
  const OnClickFileList = () => {
    setTableFiles(files.filter((el: any) => el.type === "file"));
  };
  const OnClickAudioList = () => {
    setTableFiles(files.filter((el: any) => el.type === "audio"));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    const regex = new RegExp(event.target.value, "i");
    setTableFiles(files.filter((el: any) => regex.test(el.name)));
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
          <button className={s.buttonFilter} onClick={OnClickImageList}>
            Image
          </button>
          <button className={s.buttonFilter} onClick={OnClickFileList}>
            Files
          </button>
          <button className={s.buttonFilter} onClick={OnClickAudioList}>
            Audio
          </button>
          <button className={s.buttonFilter} onClick={OnClickVideoList}>
            Video
          </button>
        </div>
      </div>
      <div className={s.tableWrapper}>
        <table>
          <tbody className={s.tableBody}>
            {tableFiles.length ? (
              tableFiles
                .slice(pageActive, pageActive + postPrePage)
                .map((item: any) => (
                  <tr key={item.id}>
                    <td className={s.columnImageURL}>
                      <img
                        className={s.usersImg}
                        src={item.imageURL}
                        alt="file"
                      />
                    </td>
                    <td className={s.columnFileName}>
                      {selectedRow === item.id && edit === true ? (
                        <input
                          type="text"
                          name="edit"
                          placeholder={item.name}
                          value={fileTitle}
                          ref={inputRef as any}
                          onChange={(e) =>
                            onFileNameChange(setFileTitle, e, item.id)
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className={s.columnCreatedAt}>
                      <Moment fromNow>{item.createdAt}</Moment>
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
                          <SubmenuFiles
                            submenu={submenu}
                            setSubmenu={setSubmenu}
                            changeFileTitle={changeFileTitle}
                            id={item.id}
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

        {tableFiles.length > 5 ? (
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
    </div>
  );
};
export default FilesPage;
