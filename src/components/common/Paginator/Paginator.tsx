import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { posts } from "../../../redux/Redux-store";
import s from './Paginator.module.css'

const Paginator: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(0)

    const postPrePage = 5 
    const pageActive = pageNumber * postPrePage
    posts.slice(pageActive, pageActive + postPrePage)

    const pageCount = Math.ceil(posts.length / postPrePage)
    const onChangePage = ({selected}: any)=>{
            setPageNumber(selected)
        }
    return( 
    <div className={s.paginatorWrapper}>
            
            <ReactPaginate
             
                pageCount={pageCount}
                onPageChange = {onChangePage}
                previousLabel="<"
                nextLabel={'>'}
                containerClassName={'paginationButtons'}
                previousClassName={'preButton'}
                nextClassName={'nextButton'}
                activeClassName={'paginationActive'}
                disabledClassName={'paginationDisabled'}
               />
        </div>
    )
}

export default Paginator