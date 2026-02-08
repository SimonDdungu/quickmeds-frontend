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

export default function TextField({ label, required, name, placeholder, register, errors }: FormInputProps) {
  const error = errors?.[name]

  return (
    <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full border rounded px-3 py-2 focus:border-blue-800 text-sm ${error ? "border-red-500" : "border-gray-300"} outline-none resize-none`}
          rows={4}
      />
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}
