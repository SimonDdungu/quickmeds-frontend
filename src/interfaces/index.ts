import { StaticImageData } from "next/image";

export interface SidebarLink {
  link_name: string;
  link?: string;
  icon: StaticImageData
  isActive?: boolean;
  options?: {link_name: string, link: string}[]
}