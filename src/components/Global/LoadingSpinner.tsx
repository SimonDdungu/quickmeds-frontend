import React from 'react'
import {BarLoader} from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 z-30'>
        <BarLoader color="#193cb8"/>
    </div>
  )
}

export default LoadingSpinner