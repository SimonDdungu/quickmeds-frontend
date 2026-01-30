'use client'

import {flexRender,getCoreRowModel, getPaginationRowModel, useReactTable,} from '@tanstack/react-table'
import {columns} from './Columns'
import { ManufacturerSearchQuery, ManufacturersType } from '@/interfaces'
import {ManufacturesDummydata} from "./data"
import { useState } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useManufacturers } from '@/hooks/inventory/useManufacturers'
import { AddManufacturesDialog } from './QuickActions'
import TextSearchFields from './SearchFields'
import { Search } from 'lucide-react'

export default function DataTable() {
  const [page, setPage] = useState(1)
  const [name, setName] = useState<string | undefined>(undefined)
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [contact, setContact] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<ManufacturerSearchQuery>({name: undefined, country: undefined, email: undefined, contact: undefined});
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10})

  const { data, isLoading, isError } = useManufacturers({page: pagination.pageIndex + 1, ...searchQuery})
  const manufacturers: ManufacturersType[] = data?.results ?? []
  const totalItems = data?.count ?? ManufacturesDummydata.length


  const table = useReactTable({
    data: manufacturers,
    columns,
    state: {pagination},
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  console.log("Data: ", data)
  console.log("FETCHED DATA: ", manufacturers)

  return (
    <div>
          <div className='flex justify-between mb-5 items-center'>
              <div className='flex gap-x-3 items-center'>
                <TextSearchFields label='Name' name='name' value={name} onChange={setName}/>
                <TextSearchFields label='Country' name='country' value={country} onChange={setCountry}/>
                <TextSearchFields label='Email' name='email' value={email} onChange={setEmail}/>
                <TextSearchFields label='Contact' name='contact' value={contact} onChange={setContact}/>

                <div onClick={() => setSearchQuery({name, country, email, contact})} className='mt-auto cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                  <Search size={22}/>
                </div>
              </div>
                <AddManufacturesDialog />
            </div>
            
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

              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="wrap-break-word whitespace-normal px-2 py-1 text-sm border border-gray-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
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
