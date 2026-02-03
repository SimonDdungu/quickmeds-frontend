import React from 'react'
import {AddManufacturesDialog} from './QuickActions'
import ManufacturerTable from './DataTable'

import AddManufacturers from './AddManufacturers'
import SearchFields from './SearchFields'

import { Search } from "lucide-react"

const Main = () => {
  return (
    <div>
        <div>
            <ManufacturerTable />
        </div>
    </div>
  )
}

export default Main