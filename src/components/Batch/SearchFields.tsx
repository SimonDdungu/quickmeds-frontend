import React from 'react'
interface TextSearchField {
  label: string;
  name: string;
  value?: string
  onChange: (value: string) => void
}

interface NumberSearchField {
  label: string;
  name: string;
  value?: number
  onChange: (value: number | undefined) => void
}

interface DateSearchField {
  label: string;
  name: string;
  value?: string
  onChange: (value: string) => void
}

const TextSearchFields = ({label, name, value, onChange}: TextSearchField) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm'>{label}</label>
        <input id={name} name={name} type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className='px-2 py-1 w-50 bg-white rounded-lg border border-gray-300 focus:border-blue-800 outline-none text-sm'/>
    </div>
  )
}

export default TextSearchFields

export const NumberSearchFields = ({label, name, value, onChange}: NumberSearchField) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm'>{label}</label>
        <input id={name} name={name} type="tel" value={value ?? ""} 
        onChange={(e) => /^\d*$/.test(e.target.value) && onChange(e.target.value === "" ? undefined : Number(e.target.value))}
        className='px-2 py-1 w-50 bg-white rounded-lg border border-gray-300 focus:border-blue-800 outline-none text-sm'/>
    </div>
  )
}

export const DateSearchFields = ({label, name, value, onChange}: DateSearchField) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm'>{label}</label>
        <input id={name} name={name} type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className='px-2 py-1 w-50 bg-white rounded-lg border border-gray-300 focus:border-blue-800 outline-none text-sm'/>
    </div>
  )
}