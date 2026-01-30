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

