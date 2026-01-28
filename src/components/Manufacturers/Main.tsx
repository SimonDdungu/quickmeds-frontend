import React from 'react'
import QuickActions from './QuickActions'
import DataTable from './DataTable'
import {data} from "./data"

const Main = () => {
  return (
    <div>
        <div className="p-6">
            <div className='flex mb-5'>
                <QuickActions />
            </div>
            <DataTable data={data} />
        </div>
    </div>
  )
}

export default Main