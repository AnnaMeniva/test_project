import React, { useRef, useState } from "react";
import add from "../common/Image/icons8-add-50.png";
import s from "./DragDropCreatePageForm.module.css";

export const DragDropCreatePageForm: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
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
        multiple={true}
        onChange={handleChange}
      />
      <label htmlFor="file">
        <div className={s.labelFormAdd}>
          <button className={s.buttonFormAdd} onClick={onClick}>
            <img className={s.imgInputButton} src={add} alt="add" />
            Add new section
          </button>
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
