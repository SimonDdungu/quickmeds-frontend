'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ManufacturersType, MedicineType } from '@/interfaces'
import { ActionsButton } from './ActionsButton'
import { format, parseISO } from "date-fns";
import SortableHeader from '../Global/SortableHeader'

export const columns: ColumnDef<MedicineType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'generic_name',
    header: ({ column }) => <SortableHeader column={column} title="Generic Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'dosage_form',
    header: ({ column }) => <SortableHeader column={column} title="Dosage Form" />,
    enableSorting: true,
  },
  {
    accessorKey: 'strength',
    header: ({ column }) => <SortableHeader column={column} title="Strength" />,
    enableSorting: true,
  },
  {
    accessorKey: 'strength_unit',
    header: 'Strength Unit',
  },
    {
    accessorKey: 'description',
    header: 'Description',
  },
    {
    accessorKey: 'manufacturer_detail.name',
    header: ({ column }) => <SortableHeader column={column} title="Manufacturer" />,
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
      return format(date, "MMM dd, yyyy HH:mm"); // e.g., Jan 26, 2026 07:24
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
