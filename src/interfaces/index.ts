import { StaticImageData } from "next/image";

export interface SidebarLink {
  link_name: string;
  link?: string;
  icon: StaticImageData
  isActive?: boolean;
  options?: {link_name: string, link: string}[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}


export type TopMedicineDataType = {
    id: number,
    name: string,
    generic_name: string,
    sold: number,
    created_at: string
}

export type ManufacturersType = {
  id?: string
  name: string
  country?: string
  email?: string
  contact?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export type ManufacturerSearchQuery = {
  page?: number
  name?: string
  country?: string
  email?: string
  contact?: string
}

export type WholesalerType = {
  id?: string
  name: string
  country?: string
  email?: string
  contact?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export type WholesalerSearchQuery = {
  id?: string
  page?: number
  name?: string
  country?: string
  email?: string
  contact?: string
}

export type MedicineType = {
  id?: string
  name: string
  generic_name?: string
  dosage_form?: string
  strength?: number
  strength_unit?: string
  description?: string
  manufacturer_detail: ManufacturersType
  image?: StaticImageData
  created_at?: string
  updated_at?: string
}

export type CreateMedicineType = {
  id?: string
  name: string
  generic_name?: string
  dosage_form?: string | null
  strength?: number
  strength_unit?: string | null
  description?: string
  manufacturer?: string
  manufacturer_detail?: ManufacturersType
  image?: File | string | null
}

export type MedicineSearchQuery = {
  id?: string
  page?: number
  name?: string
  generic_name?: string
  dosage_form?: string
  strength?: number
  strength_min?: number
  strength_max?: number
  strength_unit?: string
  manufacturer?: string
  search?: string
}


export type BatchType = {
  id?: string
  batch_number: string
  medicine?: string
  medicine_details?: Partial<MedicineType>
  wholesaler?: string
  wholesaler_details?: Partial<WholesalerType>
  selling_price_per_unit: number
  purchase_price: number
  quantity_received: number
  quantity_remaining?: number
  expiry_date: string
  created_at?: string
  updated_at?: string
}

export type BatchSearchQuery = {
  page?: number
  search?: string
  batch_number?: string
  medicine?: string
  medicine_generic?: string
  wholesaler?: string
  selling_price_per_unit?: number
  selling_price_minimum?: number
  selling_price_maximum ?: number
  purchase_price?: number
  purchase_price_minimum?: number
  purchase_price_maximum?: number
  quantity_received?: number
  quantity_received_min?: number
  quantity_received_max?: number
  quantity_remaining?: number
  quantity_remaining_min?: number
  quantity_remaining_max?: number
  expiry_date?: string
  expiry_date_from?: string
  expiry_date_to?: string
}

export type User = {
  id?: string
  username: string
  first_name: string
  last_name: string
  email?: string
  profile_image?: File | string | null
  phone_number?: string
  gender?: "male" | "female"
  created_at?: string
  updated_at?: string
}

export type UserSearchQuery = {
  page?: number
  search?: string
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  phone_number?: string
  gender?: "male" | "female" | string | null
}