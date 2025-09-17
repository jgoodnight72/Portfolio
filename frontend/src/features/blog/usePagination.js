import { useState } from 'react';

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getCurrentItems = (items) => items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pageNumbers,
    getCurrentItems,
    handlePageChange,
    indexOfFirstItem,
    indexOfLastItem
  };
}
