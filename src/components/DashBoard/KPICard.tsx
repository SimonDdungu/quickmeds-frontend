import React from "react"
import Image, { StaticImageData } from "next/image"
type KpiCardProps = {
  label: string
  value: string | number
  icon: StaticImageData
  bgColor?: string
  textColor?: string
  isMoney?: boolean
}

const KpiCard = ({ label, value, icon, bgColor, textColor, isMoney }: KpiCardProps) => {
  return (
    <div className={`flex flex-row gap-x-4 items-center justify-center rounded-xl ${bgColor ? bgColor : "bg-white"} px-6 py-3 w-max cursor-pointer hover:-translate-y-1 transition-all`}>
      <div className="size-10 xl:size-15">
        <Image
          src={icon}
          alt={label}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-700 font-semibold">{label}</span>
        <p className={`xl:text-2xl font-semibold ${textColor ? textColor : "text-black"}`}>{value} <span className="text-black">{isMoney && "Shs"}</span></p>
      </div>
    </div>
  )
}

export default KpiCard
