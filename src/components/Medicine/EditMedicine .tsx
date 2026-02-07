'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { manufacturerSchema, ManufacturerFormData } from "../../schema/manufacturerSchema"
import { ContactField, InputField } from "../Global/Form"
import { useState } from "react"
import { useUpdateManufacturer } from "@/hooks/inventory/useManufacturers"
import { CreateMedicineType, ManufacturersType, WholesalerType } from "@/interfaces"
import { toast } from "sonner"
import LoadingSpinner from "../Global/LoadingSpinner"
import CountryDropDown from "../Global/Form/CountryDropDown"
import { WholesalerFormData, wholesalerSchema } from "@/schema/wholesalerSchema"
import { useUpdateWholesaler } from "@/hooks/inventory/useWholesalers"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { useUpdateMedicine } from "@/hooks/inventory/useMedicine"

interface EditMedicineFormProps {
  defaultValues?: Partial<CreateMedicineType>
  onCancel: () => void
  onSave: () => void
}

export default function EditMedicine({ defaultValues, onCancel, onSave }: EditMedicineFormProps) {
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MedicineFormData>({
    defaultValues,
    resolver: zodResolver(medicineSchema),
  })

  const editMedicine = useUpdateMedicine();

const onSubmit = async (data: CreateMedicineType) => {
  const updatedData = { ...data, id: defaultValues?.id }
  console.log("Data being updated: ", updatedData)
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
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full max-w-md mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {editMedicine.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}
        <InputField label="Name" name="name" placeholder="Enter manufacturer name" register={register} errors={errors} />
        <CountryDropDown label="Country" name="country" placeholder="Enter country" register={register} errors={errors} />
        <InputField label="Email" name="email" placeholder="Enter email" register={register} errors={errors} />
        <ContactField label="Contact" name="contact" placeholder="Enter contact number" register={register} errors={errors} />
        <InputField label="Address" name="address" placeholder="Enter address" register={register} errors={errors} />

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
