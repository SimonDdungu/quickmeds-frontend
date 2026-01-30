import React from 'react'
interface TextSearchField {
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