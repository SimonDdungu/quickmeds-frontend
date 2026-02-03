import * as zod from "zod"

export const wholesalerSchema = zod.object({
  name: zod.string().nonempty({ message: "Name is required" }).max(100, { message: "Name must be at most 100 characters" }),
  country: zod.string().nonempty("Country is required"),
  email: zod.email({ message: "Invalid email address" }).or(zod.literal("")),
  contact: zod.string().max(15, { message: "Contact must be at most 15 characters" }).optional(),
  address: zod.string().max(200, { message: "Address must be at most 200 characters" }).optional(),
})

export type WholesalerFormData = zod.infer<typeof wholesalerSchema>
