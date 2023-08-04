import React from "react";
import s from './CreatePage.module.css'
import book from '../common/Image/icons8-open-book-50.png'
import eye from '../common/Image/icons8-eye-24.png'
import { DragDropCreatePageForm } from "./DragDropCreatePageForm";



export const CreatePage: React.FC<{}> = ()=>{
    return(
     
            <div className={s.createPageWrapper}>
                <div className={s.inputPageTitleWrapper}>
                    <img className={s.imgPageTitle} src={book} alt="book" />
                    <input  type="text" placeholder="Page title"/>
                </div>

                <div className={s.autorInfoWrapper}>
                    <p>Author</p>
                    <button className={s.buttonAuthor}>Admin</button>
                </div>

                <div className={s.buttonAddNewFileWrapper}>
                    <button className={s.buttonAddNew}>
                        <img className={s.imgAddFile}src={eye} alt="eye" /> Add page
                    </button>
                </div>

                <div className={s.inputAddFileWrapper}>
                    <DragDropCreatePageForm />
                </div>
           
            </div>
            
            
    )
}