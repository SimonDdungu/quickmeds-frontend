'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { BatchType, CreateMedicineType, MedicineType } from '@/interfaces'
import { Trash } from "lucide-react"
import { toast } from 'sonner'
import AddBatch from './AddBatch'
import { useDeleteMedicine } from '@/hooks/inventory/useMedicine'
import EditMedicine from './EditBatch'
import { useDeleteBatch } from '@/hooks/inventory/useBatch'
import EditBatch from './EditBatch'

interface EditBatchDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  batch: Partial<BatchType>
}

interface DeleteBatchDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  batch: Partial<BatchType>
}

export function AddBatchDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Add Batch
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-4xl ">
          <DialogHeader>
            <DialogTitle>Add Batch</DialogTitle>
          </DialogHeader>

          <AddBatch
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditBatchDialog({ open, setOpen, batch }: EditBatchDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-6xl ">
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
          </DialogHeader>

          <EditBatch
            defaultValues={batch ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteBatchDialog({ open, setOpen, batch }: DeleteBatchDialogProps) {

  const deleteBatch = useDeleteBatch()

  const handleDelete = () => {
    if (!batch?.id) return

     deleteBatch.mutate(batch.id, {
        onSuccess: () => {
          toast.success("Batch deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("Batch was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Batch</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this batch?</p>
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