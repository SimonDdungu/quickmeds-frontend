'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TopMedicineDataType } from '@/interfaces'

export const columns: ColumnDef<TopMedicineDataType>[] = [
  {
    accessorKey: 'name',
    header: 'Brand',
  },
  {
    accessorKey: 'generic_name',
    header: 'Name',
  },
  {
    accessorKey: 'sold',
    header: 'Sold',
  },
]
