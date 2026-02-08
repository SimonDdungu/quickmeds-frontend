'use client'

import { FieldErrors } from "react-hook-form"

interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  register: any
  errors?: FieldErrors
  required?: boolean
}

export default function ContactField({ label, required, name, placeholder, register, errors }: FormInputProps) {
  const error = errors?.[name]

  return (
    <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...register(name)}
        onChange={(e) => {
            const value = e.target.value
              .replace(/[^\d+]/g, "") 
              .replace(/(?!^)\+/g, "")
              .slice(0, 15);
            e.target.value = value;
          }}
        className={`w-full border rounded px-3 py-2  focus:border-blue-800 text-sm
            ${error ? "border-red-500" : "border-gray-300"} outline-none`}/>
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}
