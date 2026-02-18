'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField, NumberField, Dropdown, TextField, ImageField, ReactNumberField, ContactField } from "../Global/Form"
import { manufacturerSchema, ManufacturerFormData } from "../../schema/manufacturerSchema"
import { useState } from "react"
import { CreateMedicineType, User } from "@/interfaces"
import { toast } from "sonner"
import LoadingSpinner from "../Global/LoadingSpinner"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { useUpdateMedicine } from "@/hooks/inventory/useMedicine"
import { useAddMedicine } from "@/hooks/inventory/useMedicine"
import { useDosageForms } from "@/hooks/inventory/useDosageForms"
import { useStrengthUnits } from "@/hooks/inventory/useStrengthUnits"
import { useManufacturers } from "@/hooks/inventory/useManufacturers"
import { useUpdateUser } from "@/hooks/users/useUsers"
import RolesDropDown from "../Global/Form/RolesDropDown"
import GenderDropDown from "../Global/Form/GenderDropdown"
import { EditUserFormData } from "@/schema/editUserSchema"
import { EditUserSchema } from "@/schema/editUserSchema"
import IsActiveDropDown from "../Global/Form/Is_ActiveDropDown"

interface EditUserFormProps {
  defaultValues?: Partial<User>
  onCancel: () => void
  onSave: () => void
}

export default function EditStaff({ defaultValues, onCancel, onSave }: EditUserFormProps) {
  const [image, setImage] = useState<File | string | undefined>(defaultValues?.profile_image ?? undefined);
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const { register, handleSubmit, control, formState: { errors } } = useForm<EditUserFormData>({
    defaultValues: {...defaultValues, profile_image: undefined, role: defaultValues?.groups?.[0]},
    resolver: zodResolver(EditUserSchema),
  })

  const editUser = useUpdateUser();


const onSubmit = async (data: User) => {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  if(image && image instanceof File){
    formData.append("image", image)
  }data

  console.log("Updated Data: ", formData)


  editUser.mutate({id: defaultValues?.id, data: formData}, {
    
      onSuccess: () => {
        toast.success("User updated successfully")
          
          onSave()
        },
      onError: (error) => {
        toast.error("User was not updated!")
        ShowErrorMessage(true)
      }
  }
  )
}

console.log("Errors:", errors)

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {editUser.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

       
        <div className="flex justify-start items-center">

          <div className="border-r pr-4 gap-y-4 flex flex-col">
          
            <div className="flex flex-row gap-x-5">
              <InputField required={true} label="First Name" name="first_name" placeholder="Enter first name" register={register} errors={errors} />
              <InputField required={true} label="Last Name" name="last_name" placeholder="Enter last name" register={register} errors={errors} />
              <InputField required={true} label="Username" name="username" placeholder="Enter username" register={register} errors={errors} />
            </div>

            <div className="flex flex-row gap-x-5">
              <InputField label="Email" name="email" placeholder="Enter email" register={register} errors={errors} />
              <ContactField label="Phone Number" name="phone_number" placeholder="Enter phone number" register={register} errors={errors} />
            </div>

            <div className="flex flex-row gap-x-5">
              <GenderDropDown control={control} required={true} label="Gender" placeholder="Select a gender" name="gender" errors={errors}/>
              <RolesDropDown required={true} label="Role" name="role" placeholder="Select a role" control={control} register={register} errors={errors}/>
              <IsActiveDropDown required={true} label="Status" name="is_active" placeholder="Select a status" control={control} register={register} errors={errors}/>
            </div>


          </div>

            <div className="mx-auto">
                 <ImageField value={image} onChange={setImage} placeholder="Select a profile picture"/>
            </div>

        
        
        </div>
        
        {/* <Dropdown onSearch={setSearchQuery} onSelect={setSelectedId} placeholder="Select a Manufacturer" options={options ?? []} value={selectedOption}/> */}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={editUser.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>


        
      </form>
  )
}
