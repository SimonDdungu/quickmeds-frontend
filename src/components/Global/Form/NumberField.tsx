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

export default function NumberField({ label, required, name, placeholder, register, errors }: FormInputProps) {
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
        {...register(name, {setValueAs: (input: string | null) => (input === "" || input === null ? undefined : Number(input))}   )}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        }}
        className={`w-full border rounded px-3 py-2  focus:border-blue-800 text-sm
            ${error ? "border-red-500" : "border-gray-300"} outline-none`}/>
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}
