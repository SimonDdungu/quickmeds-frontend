'use client'

import { PaginationState} from '@tanstack/react-table'
import {columns} from './Columns'
import { ManufacturerSearchQuery, ManufacturersType, MedicineSearchQuery, MedicineType, WholesalerType } from '@/interfaces'
import {ManufacturesDummydata} from "./data"
import { useState } from 'react'
import { AddMedicineDialog } from './QuickActions'
import TextSearchFields, { NumberSearchFields, ReactNumberSearchField } from './SearchFields'
import { Search, XCircle } from 'lucide-react'

import Datatable from '../Global/Datatable'
import { useMedicines } from '@/hooks/inventory/useMedicine'
import { ReactNumberField } from '../Global/Form'

export default function MedicineTable() {
  const [name, setName] = useState<string | undefined>(undefined)
  const [generic_name, setGeneric_name] = useState<string | undefined>(undefined)
  const [dosage_form, setDosageForm] = useState<string | undefined>(undefined)
  const [strength, setStrength] = useState<number | undefined>(undefined)
  const [strength_min, setStrengthMin] = useState<number | undefined>(undefined)
  const [strength_max, setStrengthMax] = useState<number | undefined>(undefined)
  const [strength_unit, setStrengthUnit] = useState<string | undefined>(undefined)
  const [manufacturer, setManufacturer] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<MedicineSearchQuery>({name: undefined, generic_name: undefined, dosage_form: undefined, strength: undefined, strength_unit: undefined, manufacturer: undefined, strength_min: undefined, strength_max: undefined});
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
  const { data, isLoading, isError } = useMedicines({page: pagination.pageIndex + 1, ...searchQuery})
  const medicine: MedicineType[] = data?.results ?? []
  const totalItems = data?.count ?? 0

  console.log("MEDICINE DATA: ", medicine)

  const clearSearchQueries = () => {
    setName(undefined)
    setGeneric_name(undefined)
    setDosageForm(undefined)
    setStrength(undefined)
    setStrengthMin(undefined)
    setStrengthMax(undefined)
    setStrengthUnit(undefined)
    setManufacturer(undefined)

    setSearchQuery({ name: undefined, generic_name: undefined, dosage_form: undefined, strength: undefined, strength_unit: undefined, manufacturer: undefined, strength_min: undefined, strength_max: undefined })
  }

  return (
    <div>
          <div className='flex justify-between items-end mb-5'>
              <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({name, generic_name, dosage_form, strength, manufacturer, strength_max, strength_min, strength_unit})}} className='flex flex-col gap-x-3 gap-y-5'>
                <div className='flex flex-wrap gap-3  items-end'>
                  <TextSearchFields label='Name' name='name' value={name} onChange={setName}/>
                  <TextSearchFields label='Generic Name' name='generic_name' value={generic_name} onChange={setGeneric_name}/>
                  <TextSearchFields label='Dosage Form' name='dosage_form' value={dosage_form} onChange={setDosageForm}/>
                  <ReactNumberSearchField label='Strength' name='strength' value={strength} onChange={setStrength}/>
                  <TextSearchFields label='Strength Unit' name='strength_unit' value={strength_unit} onChange={setStrengthUnit}/>
                  <ReactNumberSearchField label='Strength Min' name='strength_min' value={strength_min} onChange={setStrengthMin}/>
                  <span className='mb-1'>{"-"} </span>
                  <ReactNumberSearchField label='Strength Max' name='strength_max' value={strength_max} onChange={setStrengthMax}/>
                  <TextSearchFields label='Manufacturer' name='manufacturer' value={manufacturer} onChange={setManufacturer}/>


                  <div className='ml-5 flex gap-x-3'>
                    <button type='submit' className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <Search size={22}/>
                    </button>
                    <button type='button' onClick={clearSearchQueries} className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <XCircle size={22}/>
                    </button>
                </div>
                </div>

                
              </form>
                <AddMedicineDialog />
            </div>
            
          <Datatable data={medicine} columns={columns} isLoading={isLoading} pagination={pagination} setPagination={setPagination} totalItems={totalItems}/>

    </div>
  )
}
