import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage, handlePageClick, totalPages }) => {
  const [gotoPage, setGotoPage] = useState("");

  return totalPages > 1 ? (
    <div className="flex justify-between items-center mt-5 flex-wrap">
      {/* Pagination controls */}
      <ReactPaginate
        breakLabel="..."
        breakLinkClassName="btn btn-sm md:btn-md"
        forcePage={currentPage}
        pageLinkClassName="btn join-item btn-sm md:btn-md"
        className="flex space-x-3  md:space-x-5 join mt-3 "
        activeLinkClassName="bg-blue-500 p-2  text-white btn-sm md:btn-md"
        previousLinkClassName={`btn  text-blue-500 join-item btn-sm md:btn-md ${currentPage === 0 ? "hidden" : ""}`}
        nextLinkClassName={`btn join-item btn-sm md:btn-md text-blue-500 ${currentPage === totalPages - 1 ? "hidden" : ""}`}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
      {/* Go to page input */}
      {totalPages > 1 && (
        <div className="flex items-center mt-3 space-x-2">
          <input
            type="text"
            className="input w-20 md:w-28 join-item input-sm md:input-md border border-blue-500"
            placeholder="Page"
            maxLength={totalPages.toString().length}
            value={gotoPage}
            onChange={(e) => {
              let val = e.target.value;
              if (parseInt(val, 10) <= totalPages || val === "") {
                setGotoPage(val);
              }
            }}
          />
          <button
            className="btn btn-primary join-item btn-sm md:btn-md bg-blue-500 p-1 text-white"
            onClick={() => {
              if (gotoPage && parseInt(gotoPage, 10) > 0 && parseInt(gotoPage, 10) <= totalPages) {
                handlePageClick({ selected: parseInt(gotoPage, 10) - 1 });
              }
            }}
          >
            Go
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default Pagination;
