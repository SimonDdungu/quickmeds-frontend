import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { PaginatedResponse, WholesalerSearchQuery, WholesalerType } from "@/interfaces"

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useWholesalers(params: WholesalerSearchQuery) {
  return useQuery({
    queryKey: ["wholesalers", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<WholesalerType>>(`${inventoryAPI}/wholesalers/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useWholesaler(id: string) {
  return useQuery({
    queryKey: ["wholesaler", id],
    queryFn: async () => {const res = await api.get<WholesalerType>(`${inventoryAPI}/wholesalers/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddWholesaler() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: WholesalerType) => {
      const res = await api.post<WholesalerType>(`${inventoryAPI}/wholesalers/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["wholesalers"] })
        queryClient.invalidateQueries({ queryKey: ["wholesaler", data.id] })
    },
  })
}

export function useUpdateWholesaler() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: WholesalerType) => {const res = await api.put<WholesalerType>(`${inventoryAPI}/wholesalers/${data.id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wholesalers"] })
      queryClient.invalidateQueries({ queryKey: ["wholesaler", data.id] })
    },
  })
}

export function useDeleteWholesaler() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${inventoryAPI}/wholesalers/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["wholesalers"] })
      queryClient.invalidateQueries({ queryKey: ["wholesaler", id] })
    },
  })
}
