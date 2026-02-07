'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactField, InputField } from "../Global/Form"
import { useAddManufacturer, useManufacturers } from "@/hooks/inventory/useManufacturers"
import { CreateMedicineType, ManufacturersType, MedicineType, WholesalerType } from "@/interfaces"
import CountryDropDown from "../Global/Form/CountryDropDown"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useState } from "react"
import { toast } from "sonner"
import { WholesalerFormData, wholesalerSchema } from "@/schema/wholesalerSchema"
import { useAddWholesaler } from "@/hooks/inventory/useWholesalers"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { useAddMedicine } from "@/hooks/inventory/useMedicine"
import {Dropdown} from "../Global/Form"

interface AddMedicineFormProps {
  defaultValues?: Partial<MedicineFormData>
  onCancel: () => void
  onSave: () => void
}

export default function AddMedicine({ defaultValues, onCancel, onSave }: AddMedicineFormProps) {
  //const [name, setName] = useState<string | null>("")
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors } } = useForm<MedicineFormData>({
    defaultValues,
    resolver: zodResolver(medicineSchema),
  })

  const addMedicine = useAddMedicine();
  const { data, isLoading, isError } = useManufacturers({ name: searchQuery})
  
  const manufacturers = data?.results
  const options = manufacturers?.map((m: any) => ({
    label: m.name,
    value: m.id,
  }));

  const handleInputChange = (inputValue: string) => {
    setSearchQuery(inputValue); // update the search query
  };

const onSubmit = async (data: CreateMedicineType) => {
  console.log("DATA: ", data)
    addMedicine.mutate(data, {
        onSuccess: () => {
          toast("Medicine added successfully")
           onSave()
          },
        onError: (error) => {
          toast.error("Medicine was not added!")
          ShowErrorMessage(true)
        }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full max-w-md mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addMedicine.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}
        <InputField label="Name" name="name" placeholder="Enter manufacturer name" register={register} errors={errors} />
        
        <Dropdown
          name="manufacturerId"
          control={control}
          options={options ?? []}
          isLoading={isLoading}
          onSearch={setSearchQuery}
          onSelect={setSelectedId}
          placeholder="Select a Manufacturer..."
        />
        
        {/* <Dropdown onSearch={setSearchQuery} onSelect={setSelectedId} placeholder="Select a Manufacturer" options={options ?? []} value={selectedOption}/> */}
        <InputField label="Email" name="email" placeholder="Enter email" register={register} errors={errors} />
        <ContactField label="Contact" name="contact" placeholder="Enter contact number" register={register} errors={errors} />
        <InputField label="Address" name="address" placeholder="Enter address" register={register} errors={errors} />

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={addMedicine.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>
        
      </form>
  )
}
