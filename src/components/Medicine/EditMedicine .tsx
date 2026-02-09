'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField, NumberField, Dropdown, TextField } from "../Global/Form"
import { manufacturerSchema, ManufacturerFormData } from "../../schema/manufacturerSchema"
import { useState } from "react"
import { CreateMedicineType } from "@/interfaces"
import { toast } from "sonner"
import LoadingSpinner from "../Global/LoadingSpinner"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { useUpdateMedicine } from "@/hooks/inventory/useMedicine"
import { useAddMedicine } from "@/hooks/inventory/useMedicine"
import { useDosageForms } from "@/hooks/useDosageForms"
import { useStrengthUnits } from "@/hooks/useStrengthUnits"
import { useManufacturers } from "@/hooks/inventory/useManufacturers"

interface EditMedicineFormProps {
  defaultValues?: Partial<CreateMedicineType>
  onCancel: () => void
  onSave: () => void
}

export default function EditMedicine({ defaultValues, onCancel, onSave }: EditMedicineFormProps) {
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const { register, handleSubmit, control, formState: { errors } } = useForm<MedicineFormData>({
    defaultValues: {...defaultValues,manufacturer: defaultValues?.manufacturer_detail?.id},
    resolver: zodResolver(medicineSchema),
  })

  const editMedicine = useUpdateMedicine();
  const { data, isLoading } = useManufacturers({ name: searchQuery})
  const { data: dosage_forms, isLoading: dosage_loading } = useDosageForms()
  const { data: strength_unit, isLoading: strength_unit_loading } = useStrengthUnits()

  const manufacturers = data?.results
  const options = manufacturers?.map((m: any) => ({
    label: m.name,
    value: m.id,
  }));

const onSubmit = async (data: CreateMedicineType) => {
  const updatedData = { ...data, id: defaultValues?.id }
  editMedicine.mutate(updatedData, {
      onSuccess: () => {
        toast.success("Medicine updated successfully")
          onSave()
        },
      onError: (error) => {
        toast.error("Medicine was not updated!")
        ShowErrorMessage(true)
      }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {editMedicine.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

        

        <div className="flex flex-row gap-x-5">
          <InputField label="Name" name="name" placeholder="Enter medicine name" register={register} errors={errors} required={true}/>
          <InputField label="Generic Name" name="generic_name" placeholder="Enter generic name" register={register} errors={errors} />
          <Dropdown
            name="dosage_form"
            label="Dosage Form"
            control={control}
            isLoading={dosage_loading}
            options={dosage_forms ?? []}
            placeholder="Select dosage Form..."
            defaultValue={defaultValues?.dosage_form ? dosage_forms?.find(option => option.value === defaultValues.dosage_form) : null}
          />
        </div>

        <Dropdown
          required={true}
          name="manufacturer"
          label="Manufacturer"
          control={control}
          options={options ?? []}
          isLoading={isLoading}
          onSearch={setSearchQuery}
          placeholder="Select a Manufacturer..."
          errors={errors}
          defaultValue={defaultValues?.manufacturer_detail ? {label: defaultValues?.manufacturer_detail?.name, value: defaultValues?.manufacturer_detail?.id ?? ""} : null}
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
            defaultValue={defaultValues?.strength_unit ? strength_unit?.find(option => option.value === defaultValues.strength_unit) : null}
          />
        </div>

        

        <TextField label="Description" name="description" placeholder="Enter description of the medicine..." register={register} errors={errors} />

        
        
        
        {/* <Dropdown onSearch={setSearchQuery} onSelect={setSelectedId} placeholder="Select a Manufacturer" options={options ?? []} value={selectedOption}/> */}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={editMedicine.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>
        
      </form>
  )
}
