"use client"
import React, { useState } from 'react';
import { Controller, Control, FieldErrors } from "react-hook-form";
import Select from 'react-select';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownList {
  defaultValue?: DropdownOption | null
  name: string;
  label: string;
  required?: boolean;
  control: Control<any>;
  options: DropdownOption[];
  //value: DropdownOption | null;
  isLoading?: boolean;
  placeholder?: string;
  errors?: FieldErrors
  onSearch?: (inputValue: string) => void;     // Fires every time the user types in the dropdown
  onSelect?: (id: string | null) => void;   // Fires when the user clicks an option
}

// import {Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList} from "@/components/ui/combobox"

// interface Dropdown {
//   placeholder: string
//   empty: string
//   List: string[]
//   value?: string | null     // selected value
//   onChange?: (value: string | null) => void     // user clicks/selects → updates selected value
//   onInputChange?: (val: string) => void   // user types -> triggers backend fetch
// }

// export function Dropdown({placeholder, empty, List, value, onChange, onInputChange}: Dropdown) {
  
//   return (
//     <Combobox items={List}  value={value} onValueChange={(val) => {onChange?.(val); onInputChange?.("")}}>
//       <ComboboxInput placeholder={placeholder} onChange={(e) => onInputChange?.(e.target.value)}/>
//       <ComboboxContent>
//         <ComboboxEmpty>{empty}</ComboboxEmpty>
//         <ComboboxList>
//           {(item) => (
//             <ComboboxItem key={item} value={item}>
//               {item}
//             </ComboboxItem>
//           )}
//         </ComboboxList>
//       </ComboboxContent>
//     </Combobox>
//   )
// }

export default function Dropdown({options, required, name, label, control, errors, onSelect, defaultValue, onSearch,  isLoading = false, placeholder = "Search..."}: DropdownList) {
  const error = errors?.[name]
  
  return (
    <div className="relative pb-2 min-w-50">

        <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label> 
         
        <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
                <Select
                  options={options}
                  isLoading={isLoading}
                  onInputChange={onSearch}   
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    onChange(val);       
                  }}
                  placeholder={placeholder || "Select an option"}
                  menuPortalTarget={document.body} 
                  menuPosition="absolute"             
                  menuPlacement="auto"    
                  styles={{ menuPortal: (base) => ({...base, zIndex: 999, pointerEvents: "auto"}), menu: base => ({ ...base, maxHeight: '300px', overflowY: 'auto' })}}
                  isClearable
                  defaultValue={defaultValue}
                />
          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}

    </div>
  );
}