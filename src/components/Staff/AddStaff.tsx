'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField, ImageField, ContactField } from "../Global/Form"
import LoadingSpinner from "../Global/LoadingSpinner"
import { useState } from "react"
import { toast } from "sonner"
import { UserFormData, CreateUserSchema } from "@/schema/createUserSchema"
import { useAddUser } from "@/hooks/users/useUsers"
import GenderDropDown from "../Global/Form/GenderDropdown"
import RolesDropDown from "../Global/Form/RolesDropDown"
import { User } from "@/interfaces"


interface AddUserFormProps {
  defaultValues?: Partial<UserFormData>
  onCancel: () => void
  onSave: () => void
}

export default function AddUser({ defaultValues, onCancel, onSave }: AddUserFormProps) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const [image, setImage] = useState<File>();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<UserFormData>({
    defaultValues,
    resolver: zodResolver(CreateUserSchema),
  })

  const addUser = useAddUser();
 

const onSubmit = async (data: User) => {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  if(image){
    formData.append("image", image)
  }

  console.log("creating data: ", formData)

    addUser.mutate(formData, {
        onSuccess: () => {
          toast.success("User created successfully")
           onSave()
          },
        onError: (error) => {
          toast.error("User was not created!")
          ShowErrorMessage(true)
        }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addUser.isPending && <LoadingSpinner />}
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
              <RolesDropDown required={true} label="Role" name="group" placeholder="Select a role" control={control} register={register} errors={errors}/>
            </div>

            <InputField required={true} label="Password" name="password" placeholder="Enter password" register={register} errors={errors} />
            <InputField required={true} label="Confirm Password" name="confirmPassword" placeholder="Enter password again" register={register} errors={errors} />

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
          <button type="submit" disabled={addUser.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>


        
      </form>
  )
}
