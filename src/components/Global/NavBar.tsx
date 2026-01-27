import React from 'react'
import Image from 'next/image'
import Logo from "@/assets/Logo/Logo.png"
import Profile_Pic from "@/assets/profile pics/dummy-pic.webp"


const NavBar = () => {
  return (
    <div className='bg-white shadow-xs flex items-center justify-between py-2 px-5'>
        <div className='flex items-center gap-x-2'>
            <div className='size-10'>
                <Image src={Logo} alt='QuickMeds Logo' className='w-full h-full object-contain'/>
            </div>
            <h3>QuickMeds</h3>
        </div>

        <div>
            <div className='flex items-center gap-x-4 pl-4 rounded-full bg-blue-50'>
            <h6 className='text-sm'>Simon Chainbers</h6>
            <div className='rounded-full size-10 overflow-hidden'>
                <Image src={Profile_Pic} alt='Simon Chainbers' className='w-full h-full'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar