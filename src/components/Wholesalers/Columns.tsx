'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ManufacturersType } from '@/interfaces'
import { ActionsButton } from './ActionsButton'
import { format, parseISO } from "date-fns";
import SortableHeader from '../Global/SortableHeader'

export const columns: ColumnDef<ManufacturersType>[] = [
  {
    accessorKey: 'name',
    // header: 'Name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'country',
    //header: 'Country',
    header: ({ column }) => <SortableHeader column={column} title="Country" />,
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    //header: 'Email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    enableSorting: true,
  },
  {
    accessorKey: 'contact',
    //header: 'Contact',
    header: ({ column }) => <SortableHeader column={column} title="Contact" />,
    enableSorting: true,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'created_at',
    //header: 'Created At',
    header: ({ column }) => <SortableHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.created_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm"); // e.g., Jan 26, 2026 07:24
    },
  },
  {
    accessorKey: 'updated_at',
    //header: 'Updated At',
    header: ({ column }) => <SortableHeader column={column} title="Updated At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.updated_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm"); // e.g., Jan 26, 2026 07:24
    },
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
