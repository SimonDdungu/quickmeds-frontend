import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SidebarLink } from '@/interfaces'
import Profile_Pic from "@/assets/profile pics/dummy-pic.webp"
import Dashboard_icon from "@/assets/Icons/dashboard.png"
import POS_icon from "@/assets/Icons/pos.png"
import Inventory_icon from "@/assets/Icons/inventory.png"
import Wholesale_icon from "@/assets/Icons/wholesale.png"
import Medicine_icon from "@/assets/Icons/medicine.png"
import Manufacturers_icon from "@/assets/Icons/manufacturers-2.png"
import Reports_icon from "@/assets/Icons/reports.png"
import Admin_icon from "@/assets/Icons/admin-2.png"
import Settings_icon from "@/assets/Icons/settings-2.png"

const SideBarNav: SidebarLink[]  = [
    {link_name: "Dashboard", link: "#", icon: Dashboard_icon, isActive: true},
    {link_name: "Point Of Sale", link: "#", icon: POS_icon},
    {link_name: "Inventory", link: "#", icon: Inventory_icon},
    {link_name: "Medicine", link: "#", icon: Medicine_icon},
    {link_name: "Wholesalers", link: "#", icon: Wholesale_icon},
    {link_name: "Manufacturers", link: "#", icon: Manufacturers_icon},
    {link_name: "Reports", link: "#", icon: Reports_icon},
    {link_name: "Administration", link: "#", icon: Admin_icon},
    {link_name: "Settings", link: "#", icon: Settings_icon},
]

const SideBarLinks = ({link_name, link, icon, isActive}: SidebarLink) => {
    return (
        <Link href={link} className='block'>
            <div className={`min-w-50 flex flex-row gap-x-3 items-center justify-start ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} cursor-pointer py-2 pl-3 rounded-lg transition-colors`}>
                <div className='size-6'>
                    <Image src={icon} alt='Dashboard' className='object-contain w-full h-full'/>
                </div>
                <p className='capitalize text-sm'>{link_name}</p>
            </div>
        </Link>
    )
}

const SideBar = () => {
  return (
    <div className='px-4 py-10 max-w-fit shadow h-screen bg-gray-50'>
        <div className='flex flex-col items-center mb-8 cursor-pointer'>
            <div className='mb-4 overflow-hidden rounded-lg border-3 border-white size-30 shadow'>
                <Image src={Profile_Pic} alt='Simon Chainers' className='w-full h-full'/>
            </div>
            <h5 className='capitalize font-semibold'>Simon Chainbers</h5>
            <h6 className='capitalize text-sm'>Admin</h6>
        </div>

        <div className='space-y-5'>
            {SideBarNav.map((nav, index) => (
                <SideBarLinks  key={index} link_name={nav.link_name} link={nav.link} icon={nav.icon} isActive={nav.isActive ?? false}/>
            ))}
        </div>
        
    </div>
  )
}

export default SideBar