import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useDosageForms() {
    
  return useQuery({
    queryKey: ["dosage_forms"],
    queryFn: async () => {
      const res = await api.get(`${inventoryAPI}/dosage_form/`)
      return res.data as { value: string; dosage: string }[]
    },
    staleTime: 1000 * 60 * 60,
  })
}
}