import { FC, useState } from "react"
import './Pagination.css'
export const Pagination: FC<{
    totalPages: number,
    currentPage: number,
    handlePageChange: Function,
    disableButton: boolean
}> = ({ totalPages, currentPage, handlePageChange, disableButton }) => {
    const [inputValue, setinputValue] = useState('1');
    return <div className="pagination">
        <div className="showing-text">Showing {currentPage} of {totalPages}</div>
        <div className="goto-container">
            <button
                className="page-button"
                onClick={() => handlePageChange(inputValue)}
                disabled={disableButton || !(parseInt(inputValue) >= 1 && parseInt(inputValue) <= totalPages)}>
                Go To
            </button>
            <input
                className="page-input"
                value={inputValue}
                onChange={(e) => {
                    const { value } = e.target;
                    if ((parseInt(value) >= 1 && parseInt(value) <= totalPages) || value === '') {
                        setinputValue(e.target.value)
                    }
                }}
                type="number"
                min={0}
                max={totalPages}
            />
        </div>
    </div>
}