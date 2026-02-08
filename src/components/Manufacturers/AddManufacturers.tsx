'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { manufacturerSchema, ManufacturerFormData } from "../../schema/manufacturerSchema"
import { ContactField, InputField } from "../Global/Form"
import { useAddManufacturer } from "@/hooks/inventory/useManufacturers"
import { ManufacturersType } from "@/interfaces"
import CountryDropDown from "../Global/Form/CountryDropDown"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useState } from "react"
import { toast } from "sonner"

interface AddManufacturerFormProps {
  defaultValues?: Partial<ManufacturerFormData>
  onCancel?: () => void
  onSave?: () => void
}

export default function AddManufacturers({ defaultValues, onCancel, onSave }: AddManufacturerFormProps) {
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<ManufacturerFormData>({
    defaultValues,
    resolver: zodResolver(manufacturerSchema),
  })

  const addManufacturer = useAddManufacturer();

const onSubmit = async (data: ManufacturersType) => {
    addManufacturer.mutate(data, {
        onSuccess: () => {
          toast("Manufacturer added successfully")
           onSave
          },
        onError: (error) => {
          toast.error("Manufacturer was not added!")
          ShowErrorMessage(true)
        }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full max-w-md mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addManufacturer.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}
        <InputField label="Name" name="name" placeholder="Enter manufacturer name" register={register} errors={errors} required={true}/>
        <CountryDropDown control={control} label="Country" name="country" placeholder="Select a country" errors={errors} />
        <InputField label="Email" name="email" placeholder="Enter email" register={register} errors={errors} />
        <ContactField label="Contact" name="contact" placeholder="Enter contact number" register={register} errors={errors} />
        <InputField label="Address" name="address" placeholder="Enter address" register={register} errors={errors} />

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={addManufacturer.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>
        
      </form>
  )
}
