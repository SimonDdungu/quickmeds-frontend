'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { ManufacturersType } from '@/interfaces'

export const columns: ColumnDef<ManufacturersType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <button
          onClick={() => console.log('Edit:', row.original)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <Pencil size={18} />
        </button>
      </div>
    ),
  },
]
