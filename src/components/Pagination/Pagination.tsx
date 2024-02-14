import { FC, useState } from "react"
import './Pagination.css'
export const Pagination: FC<{
    currentPage: number,
    handlePaginationClick: Function,
    disableButton: boolean,
    paginationUrls: {
        first: string,
        last: string,
        next: string,
        prev: string
    }
}> = ({ currentPage, handlePaginationClick, disableButton, paginationUrls }) => {
    return <div className="pagination">
        {paginationUrls.first && <span
            className={`first-page pagination-btn${disableButton ? ' disbale-btn' : ''}`}
            onClick={() => handlePaginationClick('first')}
        >
            First
        </span>}
        {paginationUrls.prev && <span
            className={`previous-page pagination-btn${disableButton ? ' disbale-btn' : ''}`}
            onClick={() => handlePaginationClick('prev')}
        >
            Previous
        </span>}
        <span className="page-number">{currentPage}</span>
        {paginationUrls.next && <span
            className={`next-page pagination-btn${disableButton ? ' disbale-btn' : ''}`}
            onClick={() => handlePaginationClick('next')}
        >
            Next
        </span>}
        {paginationUrls.last && <span
            className={`last-page pagination-btn${disableButton ? ' disbale-btn' : ''}`}
            onClick={() => handlePaginationClick('last')}
        >
            Last
        </span>}
    </div>
}