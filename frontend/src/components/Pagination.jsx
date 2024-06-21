import React from 'react';
import { Pagination as ReactPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageClick = (page) => {
    if (page < 1){
      page = 1;
    }
    if (page > totalPages){
      page = totalPages;
    }
    onPageChange(page);
  };

  return (
    <ReactPagination>
        <ReactPagination.First onClick={() => handlePageClick(1)} />
        <ReactPagination.Prev onClick={() => handlePageClick(currentPage - 1)} />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <ReactPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </ReactPagination.Item>
      ))}
        <ReactPagination.Next onClick={() => handlePageClick(currentPage + 1)} />
        <ReactPagination.Last onClick={() => handlePageClick(totalPages)} />
    </ReactPagination>
  );
};

export default Pagination;