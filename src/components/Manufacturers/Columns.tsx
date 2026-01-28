'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { ManufacturersType } from '@/interfaces'
import { ActionsButton } from './ActionsButton'

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
          <div className="flex justify-center">
            <ActionsButton rowData={row.original} />
          </div>
    ),
  },
]
