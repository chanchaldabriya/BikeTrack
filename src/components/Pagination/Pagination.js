import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, perPage, setPage, loading=false, records=[], error=false }) => {
  const numPages = Math.ceil(records / perPage);

  const isFirstPage = currentPage === 1,
    isLastPage = currentPage === numPages;

  /**
   * Helper method for creating a range of numbers
   * range(1, 5) => [1, 2, 3, 4, 5]
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const handlePageClick = (event) => {
    const newPage = event.target.dataset.page;
    switch (newPage) {
      case "first":
        setPage(1);
        break;

      case "last":
        setPage(numPages);
        break;
      default:
        setPage(newPage);
    }
  };

  const errorText = "Couldn't load pages due to some error",
    loadingText = "Loading...";

  const placeholderText = error ? (
    <span className="Pagination-error">{errorText}</span>
  ) : (
    <span className="Pagination-loading">{loadingText}</span>
  );

  return (
    <div className="Pagination-container">
      {loading || error ? (
        <div className="Pagination-placeholder">
          {placeholderText}
        </div>
      ) : (
        <div className="Pagination">
          <button
            className="Pagination-item"
            data-page="first"
            onClick={handlePageClick}
            disabled={isFirstPage}
          >
            {"<< First"}
          </button>

          <button
            className="Pagination-item"
            data-page="prev"
            onClick={handlePageClick}
            disabled={isFirstPage}
          >
            {"< Prev"}
          </button>

          {range(1, numPages).map((page) => (
            <button
              key={`page-${page}`}
              className="Pagination-item"
              data-page={page}
              onClick={handlePageClick}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}

          <button
            className="Pagination-item"
            data-page="next"
            onClick={handlePageClick}
            disabled={isLastPage}
          >
            {"Next >"}
          </button>

          <button
            className="Pagination-item"
            data-page="last"
            onClick={handlePageClick}
            disabled={isLastPage}
          >
            {"Last >>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
