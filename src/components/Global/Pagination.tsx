import React from 'react'

interface PaginationProps {
    page: number
    onPageChange: (page: number) => void
    totalCount: number
    pageSize: number
}
const Pagination = ({page, onPageChange, totalCount, pageSize}: PaginationProps) => {

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

  return (
    <div className="mt-10 flex items-center justify-center gap-x-10">
          
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </div>

              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Next
              </button>

        </div>
  )
}

export default Pagination