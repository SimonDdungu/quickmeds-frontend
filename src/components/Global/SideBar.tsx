"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react"
import { SidebarLink } from '@/interfaces'
import Logo from "@/assets/Logo/Logo-2.png"
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
    {link_name: "Dashboard", link: "/", icon: Dashboard_icon, isActive: true},
    {link_name: "Point Of Sale", icon: POS_icon, 
        options: [
            {link_name: "Sale", link: "#"},
            {link_name: "Sale History", link: "#"},
        ]
    },
    {link_name: "Inventory", link: "#", icon: Inventory_icon},
    {link_name: "Medicine", link: "#", icon: Medicine_icon},
    {link_name: "Wholesalers", link: "#", icon: Wholesale_icon},
    {link_name: "Manufacturers", link: "/manufacturers", icon: Manufacturers_icon},
    {link_name: "Reports", link: "#", icon: Reports_icon},
    {link_name: "Administration", icon: Admin_icon,
        options: [
            {link_name: "Staff", link: "#"},
            {link_name: "Roles", link: "#"},
        ]
    },
    {link_name: "Settings", link: "#", icon: Settings_icon},
]

const SideBarLinks = ({link_name, link, icon, isActive, options}: SidebarLink) => {
    const [open, setOpen] = useState(false)
    const hasDropDownList = options && options.length > 0


    return (

            <div className="block">
                {/* Parent item */}
                <div onClick={() => hasDropDownList ? setOpen(!open) : null} 
                    className={`min-w-50 flex flex-row gap-x-3 items-center justify-start ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} 
                    cursor-pointer py-2 px-3 rounded-lg transition-colors`}>
                        <div className="size-6">
                            <Image src={icon} alt={link_name} className="object-contain w-full h-full" />
                        </div>

                    {link ? (
                    <Link href={link} className="lg:text-xs m xl:text-sm capitalize flex-1 w-full">
                        {link_name}
                    </Link>
                    ) : (
                    <p className="lg:text-xs m xl:text-sm capitalize flex-1">{link_name}</p>
                    )}

                    {/* Dropdown arrow */}
                    {hasDropDownList && (
                    <span className={`text-xs transition-transform ${open ? "rotate-90" : ""}`}>
                        ▶
                    </span>
                    )}
                </div>

                {/* Dropdown children */}
                {hasDropDownList && (
                    <div className={` ml-10 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                        {options.map((option) => (
                        <Link key={option.link_name} href={option.link}>
                            <div className="text-sm py-1 px-2 rounded-md hover:bg-gray-100">
                            {option.link_name}
                            </div>
                        </Link>
                        ))}
                    </div>
                    )}

            </div>


        // <Link href={link} className='block'>
        //     <div className={`min-w-50 flex flex-row gap-x-3 items-center justify-start ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} cursor-pointer py-2 pl-3 rounded-lg transition-colors`}>
        //         <div className='size-6'>
        //             <Image src={icon} alt='Dashboard' className='object-contain w-full h-full'/>
        //         </div>
        //         <p className='capitalize text-sm'>{link_name}</p>
        //     </div>
        // </Link>
    )
}

const SideBar = () => {
  return (
    <div className='px-4 py-10 w-58 shadow h-screen  bg-white hidden lg:block fixed top-0 left-0 overflow-y-auto scrollbar-hide'>
        <div className='flex flex-col items-center mb-8 cursor-default'>
            <div className='mb-4 overflow-hidden rounded-lg border-3 border-white md:size-25 xl:size-30 shadow'>
                <Image src={Logo} alt='Simon Chainers' className='w-full h-full'/>
            </div>
            <h5 className='capitalize font-semibold md:text-sm xl:text-base'>QuickMeds System</h5>
            <h6 className='capitalize lg:text-xs xl:text-sm'>Admin</h6>
        </div>

        <div className='space-y-5'>
            {SideBarNav.map((nav, index) => (
                <SideBarLinks  key={index} link_name={nav.link_name} link={nav.link} icon={nav.icon} isActive={nav.isActive ?? false} options={nav.options}/>
            ))}
        </div>
        
    </div>
  )
}

export default SideBar