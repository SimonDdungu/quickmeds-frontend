import * as zod from "zod"

export const medicineSchema = zod.object({
  name: zod.string().nonempty({ message: "Name is required" }).max(100, { message: "Name can't be more than 100 characters" }),
  generic_name: zod.string().max(100, { message: "Generic Name can't be more than 100 characters" }).optional(),
  dosage_form: zod.string().max(50, { message: "Dosage Form can't be more than 50 characters" }).optional(),
  strength: zod.number().optional(),
  strength_unit: zod.string().max(20, { message: "Strength unit can't be more than 20 characters" }).optional(),
  description: zod.string().max(200, { message: "Description can't be more than 200 characters" }).optional(),
  manufacturer: zod.string().nonempty({ message: "Manufacturer is required" }).max(100, { message: "Manufacturer can't be more than 100 characters" }),
  image: zod.instanceof(File).optional(),
})

export type MedicineFormData = zod.infer<typeof medicineSchema>
