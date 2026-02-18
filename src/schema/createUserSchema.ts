import { error } from "console"
import * as zod from "zod"

export const CreateUserSchema = zod.object({
  first_name: zod.string().nonempty({ message: "First Name is required" }).max(100, { message: "First Name must be at most 100 characters" }),
  last_name: zod.string().nonempty({ message: "Last Name is required" }).max(100, { message: "Last Name must be at most 100 characters" }),
  username: zod.string().nonempty({ message: "Username is required" }).max(100, { message: "Username must be at most 100 characters" }),
  email: zod.email({ message: "Invalid email address" }).or(zod.literal("")),
  gender: zod.string().nonempty({error: "Please select a gender"}),
  group: zod.string().nonempty({error: "Please select a role"}),
  phone_number: zod.string().max(15, { message: "Phone Number must be at most 15 characters" }).optional(),
  profile_image: zod.union([zod.instanceof(File), zod.string()]).nullable().optional(),
  password: zod.string().nonempty({error: "Password is required"})
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password cannot be longer than 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: zod.string().nonempty({ message: "Confirm password is required" })

}).refine((data) => data.password === data.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"]})
  

export type UserFormData = zod.infer<typeof CreateUserSchema>
