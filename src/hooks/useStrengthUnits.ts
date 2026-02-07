import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useStrengthUnits() {
    
  return useQuery({
    queryKey: ["strength_unit"],
    queryFn: async () => {
      const res = await api.get(`${inventoryAPI}/strength_unit/`)
      return res.data as { value: string; strength_unit: string }[]
    },
    staleTime: 1000 * 60 * 60,
  })
}
