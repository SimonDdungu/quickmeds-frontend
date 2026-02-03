'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { WholesalerType } from '@/interfaces'
import { Trash } from "lucide-react"
import { toast } from 'sonner'
import { useDeleteWholesaler } from '@/hooks/inventory/useWholesalers'
import AddWholesalers from './AddManufacturers'
import EditWholesalers from './EditManufacturers '

interface EditManufacturesDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  wholesaler: WholesalerType | null
}

interface DeleteManufacturesDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  wholesaler: WholesalerType | null
}

export function AddWholesalerDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Add Wholesaler
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Wholesaler</DialogTitle>
          </DialogHeader>

          <AddWholesalers
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditWholesalersDialog({ open, setOpen, wholesaler }: EditManufacturesDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Wholesaler</DialogTitle>
          </DialogHeader>

          <EditWholesalers
            defaultValues={wholesaler ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteWholesalerDialog({ open, setOpen, wholesaler }: DeleteManufacturesDialogProps) {

  const deleteWholesaler = useDeleteWholesaler()

  const handleDelete = () => {
    if (!wholesaler?.id) return

     deleteWholesaler.mutate(wholesaler.id, {
        onSuccess: () => {
          toast.success("Wholesaler deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("Wholesaler was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Wholesaler</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this wholesaler?</p>
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