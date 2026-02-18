"use client"
import { useCountries } from '@/hooks/useCountries'
import { Controller, Control, FieldErrors, useForm } from "react-hook-form";
import Select from 'react-select';

interface DropdownList {
  name: string;
  label: string;
  required?: boolean;
  register?: any;
  placeholder?: string;
  errors?: FieldErrors
  control?: Control<any>;
  gender?: string | undefined;
  setGender?: (gender: string | undefined) => void;
  form?: boolean
}



const GenderDropDown = ({required, name, label, control, errors, register, gender, form=false,  setGender, placeholder = ""}: DropdownList) => {

      const error = errors?.[name]
      const options = [ 
        { label: "Male", value: "male" }, 
        { label: "Female", value: "female" } ];
    
  return (
     <div className={`relative ${form ? "pb-2" : ""} min-w-40`}>
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
                <Select
                  options={options ?? []}   
                  placeholder={placeholder}
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    console.log("i have selected this gender value: ", val)
                    onChange(val);       
                  }}
                  isClearable
                />
          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default GenderDropDown