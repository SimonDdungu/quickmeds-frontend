import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env"

const inventoryAPI = env.inventoryApi

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