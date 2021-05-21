import React from "react";

function Pagination({
  setPageHandler,
  totalPages,
  activePageNumber,
  currentPage,
  setCurrentPage,
  setActivePageNumber,
}) {
  const increasePageNumber = () => {
    if (currentPage < totalPages.length) {
      setCurrentPage(currentPage + 1);
      setActivePageNumber(currentPage + 1);
    }
  };

  const decreasePageNumber = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setActivePageNumber(currentPage - 1);
    }
  };

  return (
    <>
      <div className="paginations">
        <ul>
          <li>
            <button onClick={decreasePageNumber}>
              <i class="fas fa-chevron-left"></i>
            </button>
          </li>
          {totalPages.map((number) => (
            <li className={activePageNumber === number && "active"}>
              <button onClick={() => setPageHandler(number)}>{number}</button>
            </li>
          ))}

          <li>
            <button onClick={increasePageNumber}>
              <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Pagination;
