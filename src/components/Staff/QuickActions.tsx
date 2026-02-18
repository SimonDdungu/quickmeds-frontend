'use client'
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from '@/interfaces'
import { Trash } from "lucide-react"
import { toast } from 'sonner'
import EditMedicine from './EditStaff'
import AddUser from './AddStaff'
import { useDeleteUser } from '@/hooks/users/useUsers'

interface EditUserDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  user: User | null
}

interface DeleteUserDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  user: User | null
}

export function AddUserDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Create User
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-6xl ">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>

          <AddUser
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditUserDialog({ open, setOpen, user }: EditUserDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-6xl ">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <EditMedicine
            defaultValues={user ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteUserDialog({ open, setOpen, user }: DeleteUserDialogProps) {

  const deleteUser = useDeleteUser()

  const handleDelete = () => {
    if (!user?.id) return

     deleteUser.mutate(user.id, {
        onSuccess: () => {
          toast.success("User deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("User was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this user?</p>
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