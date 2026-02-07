import { Pencil } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ManufacturersType, WholesalerType } from "@/interfaces"
import { useState } from "react"
import { DeleteWholesalerDialog, EditWholesalersDialog } from "./QuickActions"

interface ActionMenuProps {
  rowData: ManufacturersType
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedWholesaler, setSelectedWholesaler] = useState<WholesalerType | null>(null)
return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <button className="text-blue-600 hover:text-blue-800 hover:bg-gray-200 rounded-full cursor-pointer p-2 transition-colors">
                    <Pencil size={16} />
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="end"
                className="w-32 p-2 flex flex-col gap-1">
                <button
                className="text-sm text-blue-600 hover:bg-blue-50 rounded px-2 py-1 text-left cursor-pointer"
                onClick={() => {setEditOpen(true); setSelectedWholesaler(rowData);} }>
                    Edit
                </button>

                <button
                className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1 text-left cursor-pointer"
                onClick={() => {setDeleteOpen(true); setSelectedWholesaler(rowData);}}>
                    Delete
                </button>
            </PopoverContent>
        </Popover>

         <EditWholesalersDialog open={editOpen} setOpen={setEditOpen}  wholesaler={selectedWholesaler}/>
         <DeleteWholesalerDialog open={deleteOpen} setOpen={setDeleteOpen}  wholesaler={selectedWholesaler}/>
    </div>
    )
}
