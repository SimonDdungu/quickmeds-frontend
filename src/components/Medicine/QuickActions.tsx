'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { CreateMedicineType, MedicineType } from '@/interfaces'
import { Trash } from "lucide-react"
import { toast } from 'sonner'
import AddMedicine from './AddMedicine'
import { useDeleteMedicine } from '@/hooks/inventory/useMedicine'
import EditMedicine from './EditMedicine '

interface EditMedicineDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  medicine: CreateMedicineType | null
}

interface DeleteMedicineDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  medicine: MedicineType | null
}

export function AddMedicineDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Add Medicine
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-3xl ">
          <DialogHeader>
            <DialogTitle>Add Medicine</DialogTitle>
          </DialogHeader>

          <AddMedicine
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditWholesalersDialog({ open, setOpen, medicine }: EditMedicineDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
          </DialogHeader>

          <EditMedicine
            defaultValues={medicine ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteWholesalerDialog({ open, setOpen, medicine }: DeleteMedicineDialogProps) {

  const deleteMedicine = useDeleteMedicine()

  const handleDelete = () => {
    if (!medicine?.id) return

     deleteMedicine.mutate(medicine.id, {
        onSuccess: () => {
          toast.success("Medicine deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("Medicine was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Medicine</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this medicine?</p>
            </div>
              <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" onClick={handleDelete} className="px-5 py-1 cursor-pointer rounded-lg bg-red-700 text-white hover:bg-red-800 text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
    
  )
}