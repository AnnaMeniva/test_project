import React, { useRef, useState } from "react";
import s from "./DragDropFilesPageForm.module.css";
import { Form, useNavigate} from "react-router-dom";
import { instance } from "../../../api/api";

export const DragDropFilesPageForm: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const fileSelected = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    setFile(file);
    setDragActive(false);
  };

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    //@ts-ignore
    formData.append("file", file);

    await instance.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("File added");
    navigate("/files");
    setFile(null);
  };

  return (
    <div
      className={s.formAddFileWrapper}
      onDrop={(e) => handleDrop(e)}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
    >
      <div className={s.labelFormAdd}>
        <Form onSubmit={submit}>
          <input
            ref={inputRef}
            type="file"
            name="file"
            accept="image/*"
            onChange={(event) => fileSelected(event)}
          />
          {file ? (
            <button className={s.buttonCreateFile} type="submit">
              Create
            </button>
          ) : null}
        </Form>
        {!file ? (
          <button
            className={s.buttonFormAdd}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            click to upload
          </button>
        ) : null}
        <p>Drag & drop multiple files to upload</p>
      </div>
    </div>
  );
};
