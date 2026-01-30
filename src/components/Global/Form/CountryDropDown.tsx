"use client"
import { useCountries } from '@/hooks/useCountries'
import { api } from '@/lib/axios'
import React, { useEffect, useState } from 'react'

import { FieldErrors } from "react-hook-form"

interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  register: any
  errors?: FieldErrors
}

const CountryDropDown = ({ label, name, placeholder, register, errors }: FormInputProps) => {

    const { data: countries = [], isLoading } = useCountries()
    const error = errors?.[name]
    
  return (
     <div className="relative pb-2">
      <label className="block text-sm mb-1 font-medium text-gray-700">{name}</label>
      <select {...register(name)} className={`w-full border rounded px-3 py-2 text-sm focus:border-blue-800 outline-none ${error ? "border-red-500" : "border-gray-300"}`}
        defaultValue="">
            <option value="">Select a country</option>
                    {countries.map(c => (
                        <option key={c.value} value={c.value}>{c.country}</option>
                    ))}
      </select>
      {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default CountryDropDown