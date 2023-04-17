import React from 'react'

export default function Pagination({ itemsPerPage, totalItems, paginate }) {
    const pageNumber = []

    for (let index = 1; index < Math.ceil(totalItems / itemsPerPage); index++) {
        pageNumber.push(index)
    }
    return (
        <div className="pagination-wrap">
            <div className="row align-items-center">
                <div className="col-12 col-md-12">
                    <nav className="navigation pagination" aria-label=" ">
                        <h2 className="screen-reader-text"> </h2>
                        <div className="nav-links">
                            {/* <span aria-current="page" className="page-numbers current">
                                1
                            </span> */}
                            {pageNumber.map(number => <a key={number} className="page-numbers page-number-clicked" onClick={() => paginate(number)}>
                                {number}
                            </a>)}
                            <a className="next page-numbers" onClick={() => {let i = 1; paginate(pageNumber[i]+1)}}>
                                »
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}