import React from 'react'
import {AddManufacturesDialog} from './QuickActions'
import DataTable from './DataTable'
import {data} from "./data"
import AddManufacturers from './AddManufacturers'

const Main = () => {
  return (
    <div>
        <div className="p-6">
            <div className='flex mb-5'>
                <AddManufacturesDialog />
            </div>
            <DataTable data={data} />
        </div>
    </div>
  )
}

export default Main