'use client'

import {flexRender,getCoreRowModel, getPaginationRowModel, useReactTable,} from '@tanstack/react-table'
import { TopMedicineDataType } from '@/interfaces'
import { useState } from 'react'
import { columns } from './Columns'

export default function DataTable({ data }: { data: TopMedicineDataType[] }) {

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
          <div className="overflow-x-auto border border-gray-300 max-w-fit">
            <table className="border border-gray-200 border-collapse bg-white text-sm">
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
    </div>
  )
}
