import React from 'react'

const DashHeading = ({Title}: {Title: string}) => {
  return (
    <div>
        <h1 className='lg:text-2xl text-gray-700 font-semibold mb-3 pb-2 border-b-2'>{Title}</h1>
    </div>
  )
}

export default DashHeading