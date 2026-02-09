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
  manufacturer: string
  manufacturer_detail?: ManufacturersType
  image?: File | null
}

export type MedicineSearchQuery = {
  page?: number
  name?: string
  generic_name?: string
  dosage_form?: string
  strength?: number
  strength_min?: number
  strength_max?: number
  strength_unit?: string
  manufacturer?: string
}