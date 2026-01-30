import React from 'react'
import {BarLoader} from "react-spinners"

const loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-100'>
        <BarLoader color="#193cb8"/>
    </div>
  )
}

export default loading