import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useCountries() {
    
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await api.get(`${inventoryAPI}/countries/`)
      return res.data as { value: string; label: string }[]
    },
    staleTime: 1000 * 60 * 60,
  })
}