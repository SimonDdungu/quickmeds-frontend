import React from 'react'
import { Control, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
interface TextSearchField {
  label: string;
  name: string;
  value?: string
  onChange: (value: string) => void
}

interface ContactSearchField {
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

interface ReactNumber {
  label: string
  name: string
  value?: number
  onChange: (value: number | undefined) => void
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

export const ReactNumberSearchField = ({ label, name, value, onChange}: ReactNumber) => {

  return (
    <div>
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
      </label>
          <NumericFormat
            value={value ?? ""}
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale={false}
            allowNegative={false}
            onValueChange={(values) => {
              onChange?.(values.floatValue ?? undefined);
            }}
            className='px-2 py-1 w-50 bg-white rounded-lg border border-gray-300 focus:border-blue-800 outline-none text-sm'
          /> 
    </div>
  )
}



export function ContactSearchField({ label, name, value, onChange }: ContactSearchField) {

  return (
    <div className="relative">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
      </label>

      <input 
        id={name}
        type="text"
        value={value ?? ""}
        onChange={(e) => {
            const value = e.target.value
              .replace(/[^\d+]/g, "") 
              .replace(/(?!^)\+/g, "")
              .slice(0, 15);
            e.target.value = value;
            onChange(value)
          }}
        className='px-2 py-1 w-50 bg-white rounded-lg border border-gray-300 focus:border-blue-800 outline-none text-sm'/>
    </div>
  )
}
