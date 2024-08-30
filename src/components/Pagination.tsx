import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isCurrentPage = (page: number) => page === currentPage;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200 
          ${currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200
            ${isCurrentPage(page) ? 'bg-primary text-white border-primary' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200 
          ${currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
