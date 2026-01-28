'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import AddManufacturers from './AddManufacturers'
import EditManufacturers from './EditManufacturers '
import { ManufacturersType } from '@/interfaces'

interface EditManufacturesDialogProps {
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
      <button className='cursor-pointer block w-max px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
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