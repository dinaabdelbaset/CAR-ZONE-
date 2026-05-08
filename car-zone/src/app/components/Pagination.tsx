import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  console.log("🚀 ~ Pagination ~ totalPages:", totalPages);
  console.log("🚀 ~ Pagination ~ currentPage:", currentPage);
  //   if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log("🚀 ~ Pagination ~ pages:", pages);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-2 leading-tight border border-gray-300 ${
                page === currentPage
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
