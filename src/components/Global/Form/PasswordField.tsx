'use client'

import { useState } from "react"
import { FieldErrors } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  register: any
  errors?: FieldErrors
  required?: boolean
}

export default function PasswordField({ label, name, required, placeholder, register, errors }: FormInputProps) {
  const error = errors?.[name]
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder}
          {...register(name)}
          className={`w-full border rounded px-3 py-2  focus:border-blue-800 text-sm
              ${error ? "border-red-500" : "border-gray-300"} outline-none`}/>

          <div onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
      </div>
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}
