"use client"
import React, { useState } from 'react'
import {flexRender,getCoreRowModel, getPaginationRowModel, useReactTable, getSortedRowModel, SortingState, ColumnDef, PaginationState, Updater} from '@tanstack/react-table'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import LoadingSpinner from '../Global/LoadingSpinner'

interface DataTableTypes<T>{
    data: T[] 
    columns: ColumnDef<T>[];
    isLoading: boolean
    pagination: PaginationState
    setPagination: (updater: Updater<PaginationState>) => void;
    totalItems: number
}
const Datatable = <T,>({data, columns, isLoading, pagination, setPagination,totalItems}: DataTableTypes<T>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    
    const table = useReactTable({
        data: data,
        columns,
        state: {pagination, sorting},
        manualPagination: true,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        onSortingChange: setSorting,
        enableSortingRemoval: true, 
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })
  return (
    <div>

        <div className="overflow-x-auto ">
            <Table className="table-auto border border-gray-200 bg-white">
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id} className="wrap-break-word whitespace-normal px-2 py-1 text-sm bg-gray-200 border border-gray-300">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              {isLoading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="text-center p-4 relative">
                      <LoadingSpinner />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ): (
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} className="hover:bg-blue-100">
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="wrap-break-word whitespace-normal px-2 py-1 text-sm border border-gray-300">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>

                )}
            </Table>

        </div>


        <div className="mt-10 flex items-center justify-center gap-x-10">
          
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-2 text-sm disabled:opacity-50 cursor-pointer hover:bg-blue-900 transition-colors"
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
                className="rounded-lg bg-blue-800 text-white shadow px-5 py-2 text-sm disabled:opacity-50 cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Next
              </button>

        </div>


    </div>
  )
}

export default Datatable