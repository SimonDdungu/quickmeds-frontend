'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField, NumberField, Dropdown, TextField, ImageField, DateField, ReactNumberField } from "../Global/Form"
import { useState } from "react"
import { BatchType, MedicineType, WholesalerType } from "@/interfaces"
import { toast } from "sonner"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useMedicines } from "@/hooks/inventory/useMedicine"
import { BatchFormData, batchSchema } from "@/schema/batchSchema"
import { useBatch, useUpdateBatch } from "@/hooks/inventory/useBatch"
import { useWholesalers } from "@/hooks/inventory/useWholesalers"
import Image from "next/image"

interface EditBatchFormProps {
  defaultValues?: Partial<BatchType>
  onCancel: () => void
  onSave: () => void
}

export default function ViewBatch({ defaultValues, onCancel, onSave }: EditBatchFormProps) {

  const { register, handleSubmit, control, formState: { errors } } = useForm<BatchFormData>({
    defaultValues,
    resolver: zodResolver(batchSchema),
  })

  const {data: batch, isLoading} = useBatch(defaultValues?.id ?? "");

  return (
      <div>
        <div className="mb-4 text-sm">
          <h3 className="border-b mb-3 text-base font-semibold">Medicine Details</h3>
          <div className="flex justify-start gap-x-10">

            <div className="size-50 rounded-lg overflow-hidden border-2 border-gray-200 mb-2 relative">
              <Image src={defaultValues?.medicine_details?.image ?? ""} alt={defaultValues?.medicine_details?.name ?? ""} fill className='w-full h-full object-cover' unoptimized/>
            </div>

            <div className="space-y-1">
              <p><span className="font-semibold">Manufacturer: </span>{defaultValues?.medicine_details?.manufacturer_detail?.name}</p>
              <p><span className="font-semibold">Name: </span>{defaultValues?.medicine_details?.name}</p>
              <p><span className="font-semibold">Generic Name: </span>{defaultValues?.medicine_details?.generic_name}</p>
              <p><span className="font-semibold">Dosage Form: </span>{defaultValues?.medicine_details?.dosage_form}</p>
              <p><span className="font-semibold">Strength: </span>{Number(defaultValues?.medicine_details?.strength).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p><span className="font-semibold">Strength Unit: </span>{defaultValues?.medicine_details?.strength_unit}</p>
              <p><span className="font-semibold">Expiry Date: </span>{defaultValues?.expiry_date}</p>
            </div>

          </div>
        </div>

        <div className="mb-4 text-sm">
          <h3 className="border-b mb-3 font-semibold">Batch Details</h3>
          <div className="space-y-1">
          <p><span className="font-semibold">Batch Number: </span>{defaultValues?.batch_number}</p>
          <p><span className="font-semibold">Quantity Received: </span>{Number(defaultValues?.quantity_received).toLocaleString('en-US')}</p>
          <p><span className="font-semibold">Quantity Remaining: </span>{Number(defaultValues?.quantity_remaining).toLocaleString('en-US')}</p>
          <p><span className="font-semibold">Purchase Price: </span>UGX {Number(defaultValues?.purchase_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p><span className="font-semibold">Selling Price Per Unit: </span>UGX {Number(defaultValues?.selling_price_per_unit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="text-sm">
          <h3 className="border-b mb-3 text-base font-semibold">Wholesaler Details</h3>
          <div className="space-y-1">
            <p><span className="font-semibold">Name: </span>{defaultValues?.wholesaler_details?.name}</p>
            <p><span className="font-semibold">Country: </span>{defaultValues?.wholesaler_details?.country}</p>
            <p><span className="font-semibold">Email: </span>{defaultValues?.wholesaler_details?.email}</p>
            <p><span className="font-semibold">Contact: </span>{defaultValues?.wholesaler_details?.contact}</p>
            <p><span className="font-semibold">Address: </span>{defaultValues?.wholesaler_details?.address}</p>
          </div>
        </div>

      </div>
  )
}
