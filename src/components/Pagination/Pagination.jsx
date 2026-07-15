import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_LIMIT_OPTIONS } from "../../constants";

const Pagination = ({ currentPage, totalPages, totalCount, limit, onPageChange, onLimitChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-1">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{startItem}</span>–<span className="font-medium text-gray-700">{endItem}</span> of <span className="font-medium text-gray-700">{totalCount}</span> users
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all" aria-label="Previous page">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {getPageNumbers().map((page) => (
          <button key={page} onClick={() => onPageChange(page)} className={`w-9 h-9 text-sm rounded-lg font-medium transition-all ${page === currentPage ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`}>
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all" aria-label="Next page">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap">Rows per page:</label>
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))} className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer">
          {PAGE_LIMIT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </div>
  );
};

export default Pagination;