import React from 'react'
import DashBoardVector from "@/assets/dashboard/quickmeds-dash-1.jpg"
import Image from 'next/image'
import KpiCard from './KPICard'
import POS_icon from "@/assets/Icons/pos.png"
import Cash from "@/assets/Icons/cash-1.png"
import Medicine from "@/assets/Icons/medicine-2.png"
import Expired from "@/assets/Icons/poison.png"

const WelcomeScreen = () => {
  return (
    <div className='bg-white rounded-lg shadow p-6 flex flex-col lg:flex-row justify-between'>
        <div>
          <h6 className='text-sm'>Welcome Back</h6>
          <h1 className='lg:text-2xl capitalize text-blue-500 lg:mt-2 font-semibold'>Simon Chainbers</h1>
          <h6 className='text-xs'>Admin</h6>

          <div className='flex flex-col md:flex-row gap-x-5 mt-10 justify-center lg:justify-start'>
              <KpiCard label="Today's Revenue" value={"550,000"} icon={Cash} bgColor='bg-(--light-purple)' textColor='text-blue-600' isMoney={true}/>
              <KpiCard label='Items Sold' value={"28"} icon={Medicine} bgColor='bg-(--light-green)' textColor='text-green-800'/>
              <KpiCard label='Expired Batches' value={"10"} icon={Expired} bgColor='bg-red-200' textColor='text-red-500'/>
          </div>
        </div>

        <div className='w-100 mx-auto lg:mx-0'>
          <Image src={DashBoardVector} alt='Dashboard' className='w-full object-contain'/>
        </div>
    </div>
  )
}

export default WelcomeScreen