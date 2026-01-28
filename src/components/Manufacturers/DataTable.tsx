'use client'

import {flexRender,getCoreRowModel, getPaginationRowModel, useReactTable,} from '@tanstack/react-table'
import {columns} from './Columns'
import { ManufacturersType } from '@/interfaces'
import { useState } from 'react'

export default function DataTable({ data }: { data: ManufacturersType[] }) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
    pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
          <div className="overflow-x-auto border border-gray-300">
            <table className="min-w-full border border-gray-200 border-collapse bg-white text-sm">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-b border-gray-300 bg-gray-50"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-600 border-b border-r border-gray-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="mt-10 flex items-center justify-between">
          
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-1 text-sm disabled:opacity-50 cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-600">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-1 text-sm disabled:opacity-50 cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Next
              </button>

          </div>
    </div>
  )
}
