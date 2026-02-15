import { error } from "console"
import * as zod from "zod"

export const batchSchema = zod.object({
  batch_number: zod.string().nonempty({ message: "Batch number is required" }).max(100, { message: "Batch can't be more than 100 characters" }),
  medicine: zod.string().nonempty({ message: "Medicine is required" }).max(100, { message: "Medicine can't be more than 100 characters" }),
  wholesaler: zod.string().nonempty({ message: "Wholesaler is required" }).max(100, { message: "Wholesaler can't be more than 100 characters" }),
  purchase_price: zod.number({error: "Purchase price is required"}),
  selling_price_per_unit: zod.number({error: "Selling price is required"}),
  quantity_received: zod.number({error: "Quantity received is required"}),
  expiry_date: zod.string().nonempty({error: "Expiry Date is required"})
})

export type BatchFormData = zod.infer<typeof batchSchema>
