'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField, NumberField, Dropdown, DateField, ReactNumberField } from "../Global/Form"
import { BatchType, MedicineType, WholesalerType } from "@/interfaces"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useState } from "react"
import { toast } from "sonner"
import { BatchFormData, batchSchema } from "@/schema/batchSchema"
import { useMedicines } from "@/hooks/inventory/useMedicine"
import { useWholesalers } from "@/hooks/inventory/useWholesalers"
import { useAddBatch } from "@/hooks/inventory/useBatch"


interface AddBatchFormProps {
  defaultValues?: Partial<BatchFormData>
  onCancel: () => void
  onSave: () => void
}

export default function AddBatch({ defaultValues, onCancel, onSave }: AddBatchFormProps) {
  const [medicineName, setMedicineName] = useState<string | undefined>(undefined)
  const [wholesalerName, setWholesalerName] = useState<string | undefined>(undefined)
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<BatchFormData>({
    defaultValues,
    resolver: zodResolver(batchSchema),
  })

  const addBatch = useAddBatch()
  const {data: Medicine, isLoading: Medicine_loading} = useMedicines({search: medicineName})
  const {data: Wholesaler, isLoading: Wholesaler_loading} = useWholesalers({name: wholesalerName})

  
  const medicine = Medicine?.results
  const medicine_options = medicine?.map((m: MedicineType) => ({
    label: `${m.name} | ${m.generic_name}`,
    value: m.id ?? "",
  }));

  const wholesaler = Wholesaler?.results
  const wholesaler_options = wholesaler?.map((w: WholesalerType) => ({
    label: w.name,
    value: w.id ?? "",
  }));


const onSubmit = async (data: BatchType) => {

  console.log("creating data: ", data)

    addBatch.mutate(data, {
        onSuccess: () => {
          toast.success("Batch added successfully")
           onSave()
          },
        onError: (error) => {
          toast.error("Batch was not added!")
          ShowErrorMessage(true)
        }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addBatch.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

            <div className="flex flex-row gap-x-5">
              <InputField label="Batch Number" name="batch_number" placeholder="Enter medicine name" register={register} errors={errors} required={true}/>
              <Dropdown
                required ={true}
                name="medicine"
                label="Medicine"
                control={control}
                options={medicine_options ?? []}
                isLoading={Medicine_loading}
                onSearch={setMedicineName}
                placeholder="Select Medicine..."
                errors={errors}
              />

              <Dropdown
                required={true}
                name="wholesaler"
                label="Wholesaler"
                control={control}
                options={wholesaler_options ?? []}
                isLoading={Wholesaler_loading}
                onSearch={setWholesalerName}
                placeholder="Select a Wholesaler..."
                errors={errors}
              />
            </div>

            

            <div className="flex flex-row gap-x-5">
              <ReactNumberField control={control} required ={true} label="Purchase Price" name="purchase_price" placeholder="Enter Total Purchase Price" register={register} errors={errors}/>
              <NumberField required ={true} label="Quantity Received" name="quantity_received" placeholder="Enter Quantity received" register={register} errors={errors} />
              <ReactNumberField control={control} required ={true} label="Selling Price Per Unit" name="selling_price_per_unit" placeholder="Enter Selling Price Per Unit" register={register} errors={errors}/>
            </div>



            <DateField required ={true} label="Expiry Date" name="expiry_date" placeholder="Enter Expiry Date" register={register} errors={errors} />
      

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={addBatch.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>
        
      </form>
  )
}
