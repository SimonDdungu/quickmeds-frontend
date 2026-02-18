import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env"

const inventoryAPI = env.inventoryApi

export function useStrengthUnits() {
    
  return useQuery({
    queryKey: ["strength_unit"],
    queryFn: async () => {
      const res = await api.get(`${inventoryAPI}/strength_unit/`)
      return res.data as { value: string; label: string }[]
    },
    staleTime: 1000 * 60 * 60,
  })
}
