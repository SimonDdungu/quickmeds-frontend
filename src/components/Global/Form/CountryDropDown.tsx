"use client"
import { useCountries } from '@/hooks/useCountries'
import { Controller, Control, FieldErrors } from "react-hook-form";
import Select from 'react-select';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownList {
  name: string;
  label: string;
  required?: boolean;
  control: Control<any>;
  // options: DropdownOption[];
  //value: DropdownOption | null;
  isLoading?: boolean;
  placeholder?: string;
  errors?: FieldErrors
  onSearch?: (inputValue: string) => void;     // Fires every time the user types in the dropdown
  onSelect?: (id: string | null) => void;   // Fires when the user clicks an option
}

// import { FieldErrors } from "react-hook-form"

interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  register: any
  errors?: FieldErrors
  required?: boolean
}

//{ label, required, name, placeholder, register, errors }: FormInputProps

const CountryDropDown = ({required, name, label, control, errors, onSelect,  onSearch, placeholder = "Search..."}: DropdownList) => {

    const { data: countries, isLoading } = useCountries()
    const error = errors?.[name]
    
  return (
     <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* <select {...register(name)} className={`w-full border rounded px-3 py-2 text-sm focus:border-blue-800 outline-none ${error ? "border-red-500" : "border-gray-300"}`}
        defaultValue="">
            <option value="">Select a country</option>
                    {countries.map(c => (
                        <option key={c.value} value={c.value}>{c.country}</option>
                    ))}
      </select>
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>} */}


      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
                <Select
                  options={countries ?? []}
                  isLoading={isLoading}
                  onInputChange={onSearch}   
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    onChange(val);       
                  }}
                  placeholder={placeholder || "Select an option"}
                  isClearable
                />
          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default CountryDropDown