'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import AddManufacturers from './AddManufacturers'

export default function QuickActions() {
  const [open, setOpen] = useState(false)

  const handleSave = (data: any) => {
    console.log("Manufacturer saved:", data)
    setOpen(false) 
  }

  return (
    <div className='ml-auto'>
      {/* Dialog Trigger */}
      <button
        className='cursor-pointer block w-max px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}
      >
        Add Manufacturer
      </button>

      {/* Dialog itself */}
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
