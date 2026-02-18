'use client'

import { ColumnDef } from '@tanstack/react-table'
import {  User } from '@/interfaces'
import { ActionsButton } from './ActionsButton'
import { format, parseISO } from "date-fns";
import SortableHeader from '../Global/SortableHeader'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'first_name',
    header: ({ column }) => <SortableHeader column={column} title="First Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => <SortableHeader column={column} title="Last Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <SortableHeader column={column} title="Username" />,
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <SortableHeader column={column} title="Gender" />,
    enableSorting: true,
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <SortableHeader column={column} title="Active" />,
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <SortableHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.created_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm");
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => <SortableHeader column={column} title="Updated At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.updated_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm"); 
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
