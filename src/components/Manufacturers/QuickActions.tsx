'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import AddManufacturers from './AddManufacturers'
import EditManufacturers from './EditManufacturers '
import { ManufacturersType } from '@/interfaces'
import { Trash } from "lucide-react"

interface EditManufacturesDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  manufacturer: ManufacturersType | null
}

interface DeleteManufacturesDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  manufacturer: ManufacturersType | null
}

export function AddManufacturesDialog() {
  const [open, setOpen] = useState(false)

  const handleSave = (data: any) => {
    console.log("Manufacturer saved:", data)
    setOpen(false) 
  }

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Add Manufacturer
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Manufacturer</DialogTitle>
          </DialogHeader>

          <AddManufacturers
            onCancel={() => setOpen(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditManufacturesDialog({ open, setOpen, manufacturer }: EditManufacturesDialogProps) {

  const handleSave = (data: any) => {
    console.log("Manufacturer saved:", data)
    setOpen(false) 
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Manufacturer</DialogTitle>
          </DialogHeader>

          <EditManufacturers
            defaultValues={manufacturer ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteManufacturesDialog({ open, setOpen, manufacturer }: DeleteManufacturesDialogProps) {

  const handleSave = (data: any) => {
    console.log("Manufacturer saved:", data)
    setOpen(false) 
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Manufacturer</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this manufacturer?</p>
            </div>
              <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg bg-red-700 text-white hover:bg-red-800 text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
    
  )
}