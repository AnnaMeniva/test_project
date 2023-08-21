import React, { useRef, useState } from "react";
import s from "./DragDropFilesPageForm.module.css";
import { useDispatch } from "react-redux";
import { addFile } from "../../redux/fileSlice";

export const DragDropFilesPageForm: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      dispatch(addFile(e.dataTransfer.files));
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      dispatch(addFile(e.target.files));
      handleFiles(e.target.files);
    }
  };

  const onClick = () => {
    inputRef.current.click();
  };

  const handleFiles = (e: any) => {
    alert("File added");
  };

  return (
    <form
      className={s.formAddFileWrapper}
      onDrop={(e) => handleDrop(e)}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg, .webp, .mp4, .mp3, .pdf"
        onChange={handleChange}
      />
      <label htmlFor="file">
        <div className={s.labelFormAdd}>
          <button className={s.buttonFormAdd} onClick={onClick}>
            click to upload
          </button>
          <p>Drag & drop multiple files to upload</p>
        </div>
      </label>
      {dragActive && (
        <div
          className={s.active}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};
