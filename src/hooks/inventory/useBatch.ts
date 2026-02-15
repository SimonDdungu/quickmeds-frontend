import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { BatchSearchQuery, BatchType, PaginatedResponse } from "@/interfaces"

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useBatches(params: BatchSearchQuery) {
  return useQuery({
    queryKey: ["batches", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<BatchType>>(`${inventoryAPI}/batches/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useBatch(id: string) {
  return useQuery({
    queryKey: ["batches", id],
    queryFn: async () => {const res = await api.get<BatchType>(`${inventoryAPI}/batches/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post<BatchType>(`${inventoryAPI}/batches/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["batches"] })
    },
  })
}

export function useUpdateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BatchType) => {const res = await api.put<BatchType>(`${inventoryAPI}/batches/${data.id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["batches"] })
      queryClient.invalidateQueries({ queryKey: ["batches", data.id] })
    },
  })
}

export function useDeleteBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${inventoryAPI}/batches/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["batches"] })
      queryClient.invalidateQueries({ queryKey: ["batches", id] })
    },
  })
}
