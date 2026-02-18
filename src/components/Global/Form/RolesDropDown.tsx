"use client"
import { useCountries } from '@/hooks/useCountries'
import { useUserRoles } from '@/hooks/users/useUsers';
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
  register?: any;
  // options: DropdownOption[];
  //value: DropdownOption | null;
  isLoading?: boolean;
  placeholder?: string;
  errors?: FieldErrors;
  onSearch?: (inputValue: string) => void;     // Fires every time the user types in the dropdown
  onSelect?: (id: string | null) => void;   // Fires when the user clicks an option
}


const RolesDropDown = ({required, name, label, control, errors, register, onSelect,  onSearch, placeholder = "Select a role"}: DropdownList) => {

    const { data: roles, isLoading } = useUserRoles()
    const Roles = roles?.roles
  
    const options = Roles?.map((r: any) => ({
      label: r,
      value: r,
    }));
    
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
        render={({ field: { onChange, value } }) => (
                <Select
                  options={options ?? []}
                  isLoading={isLoading} 
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    onChange(val);       
                  }}
                  placeholder={placeholder || "Select an option"}
                  isClearable
                  defaultValue={options?.find((option: any) => option.value === value) ?? null}
                />
          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default RolesDropDown