'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactField, InputField, NumberField, Dropdown } from "../Global/Form"
import { useManufacturers } from "@/hooks/inventory/useManufacturers"
import { CreateMedicineType } from "@/interfaces"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useState } from "react"
import { toast } from "sonner"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { useAddMedicine } from "@/hooks/inventory/useMedicine"
import { useDosageForms } from "@/hooks/useDosageForms"
import { useStrengthUnits } from "@/hooks/useStrengthUnits"


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
  const { data: dosage_forms, isLoading: dosage_loading } = useDosageForms()
  const { data: strength_unit, isLoading: strength_unit_loading } = useStrengthUnits()
  
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
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addMedicine.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

        <div className="flex flex-row gap-x-5">
          <InputField label="Name" name="name" placeholder="Enter medicine name" register={register} errors={errors} />
          <InputField label="Generic Name" name="generic_name" placeholder="Enter generic name" register={register} errors={errors} />
        <Dropdown
          name="dosage_form"
          label="Dosage Form"
          control={control}
          options={dosage_forms ?? []}
          placeholder="Select dosage Form..."
        />
        </div>

        <Dropdown
          name="manufacturer"
          label="Manufacturer"
          control={control}
          options={options ?? []}
          isLoading={isLoading}
          onSearch={setSearchQuery}
          onSelect={setSelectedId}
          placeholder="Select a Manufacturer..."
        />


        <div className="flex flex-row gap-x-5">
          <NumberField label="Strength" name="strength" placeholder="Enter strength" register={register} errors={errors} />
          <Dropdown
            name="strength_unit"
            label="Strength Unit"
            control={control}
            options={strength_unit ?? []}
            isLoading={strength_unit_loading}
            placeholder="Select strength unit..."
          />
        </div>

        

        <InputField label="Description" name="description" placeholder="Enter description" register={register} errors={errors} />

        
        
        
        {/* <Dropdown onSearch={setSearchQuery} onSelect={setSelectedId} placeholder="Select a Manufacturer" options={options ?? []} value={selectedOption}/> */}

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
