'use client'

import { Controller, Control, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";


interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  register: any
  errors?: FieldErrors
  required?: boolean
}

interface ReactNumber {
  label: string
  name: string
  register: any
  errors?: FieldErrors
  required?: boolean
  control: Control<any>
  placeholder: string
}

export default function ReactNumberField({ label, required, errors, register, name, control, placeholder}: ReactNumber) {
  const error = errors?.[name]

  return (
    <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

     <Controller
      name={name}
      control={control}
      render={({ field }) => (
          <NumericFormat
            value={field.value ?? ""}
            placeholder={placeholder}
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale={false}
            allowNegative={false}
            onValueChange={(values) => {
               field.onChange(values.floatValue ?? undefined);
            }}
            className={`w-full border rounded px-3 py-2  focus:border-blue-800 text-sm ${error ? "border-red-500" : "border-gray-300"} outline-none`}
          />
        )}
      />

      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}

      {/* <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...register(name, {setValueAs: (input: string | null) => (input === "" || input === null ? undefined : Number(input))}   )}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        }}
        className={`w-full border rounded px-3 py-2  focus:border-blue-800 text-sm
            ${error ? "border-red-500" : "border-gray-300"} outline-none`}/> */}
      
    </div>
  )
}
