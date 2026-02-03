import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"

const SortableHeader = ({ column, title }: { column: any; title: string }) => {
  const s = column.getIsSorted()
  return (
    <button
      onClick={() => {
        if (!s) {column.toggleSorting(false)} else if(s === "asc") {column.toggleSorting(true)} else column.clearSorting()
      }}
      className="flex items-center gap-1 select-none w-full h-full">
      <span className={`${s === "asc" || s === "desc" ? "text-blue-600" : ""}`}>{title}</span>
      {s === "asc" ? <ArrowUp className="h-4 w-4 ml-auto text-blue-600" /> : s === "desc" ? <ArrowDown className="h-4 w-4 ml-auto text-blue-600" /> : <ArrowUpDown className="h-4 w-4 opacity-50 ml-auto" />}
    </button>
  )
}


export default SortableHeader