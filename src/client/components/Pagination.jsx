import React from 'react';
import ReactDom from 'react-dom';

export default function Pagination(props) {
    const { currentPage, pages, handlePrevPage, handleNextPage, handlePageChanged } = props;

    let prevLink = currentPage === 1
        ? (<li onClick={handlePrevPage} className="disabled" id="prevPage"><a href="" className="inactive" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
        : (<li onClick={handlePrevPage} id="prevPage"><a href="" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>);

    let nextLink = currentPage === pages
        ? (<li onClick={handleNextPage} className="disabled" id="nextPage"><a href="" className="inactive" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>)
        : (<li onClick={handleNextPage} id="nextPage"><a href="" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>);

    let pagesArr = Array.from(new Array(pages), (val, index) => index + 1);
    let pageLinks = pagesArr.map(page => {
        return (page === currentPage)
            ? (<li onClick={handlePageChanged} key={page} className="active"><a className="pageLink" href="" >{page}<span className="sr-only">(current)</span></a></li>)
            : (<li onClick={handlePageChanged} key={page} ><a className="pageLink" href="">{page}<span className="sr-only">(current)</span></a></li>)
    });

    return (
        <div className="text-center">
            <nav aria-label="pagination">
                <ul className="pagination">
                    {prevLink}
                    {pageLinks}
                    {nextLink}
                </ul>
            </nav>
        </div>
    )
}