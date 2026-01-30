"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from "react";
import Logo from "@/assets/Logo/Logo.png"
import Profile_Pic from "@/assets/profile pics/dummy-pic.webp"

const DateAndTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
        setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const monthName = now.toLocaleDateString("en-US", { month: "long" });
    const day = now.getDate();
    const year = now.getFullYear();
    const time = now.toLocaleTimeString();

    return (
        <div className='flex flex-col items-center cursor-default text-sm'>
            <p>{dayName}, {day}, {monthName}, {year}</p>
            <p>{time}</p>
        </div>
    );
};


const NavBar = () => {
  return (
    <div className='bg-white shadow-xs flex items-center justify-between py-2 px-5 z-9999'>
        <div className='flex items-center gap-x-2'>
            <div className='size-10'>
                <Image src={Logo} alt='QuickMeds Logo' className='w-full h-full object-contain'/>
            </div>
            <h3>QuickMeds</h3>
        </div>

        <DateAndTime/>

        <div>
            <div className='flex items-center gap-x-4 pl-4 rounded-full bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors'>
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