import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { CreateMedicineType, MedicineSearchQuery, MedicineType, PaginatedResponse } from "@/interfaces"
import { env } from "@/config/env"

const inventoryAPI = env.inventoryApi

export function useMedicines(params: MedicineSearchQuery) {
  return useQuery({
    queryKey: ["medicine", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<MedicineType>>(`${inventoryAPI}/medicine/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useMedicine(id: string) {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: async () => {const res = await api.get<MedicineType[]>(`${inventoryAPI}/medicine/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post<MedicineType>(`${inventoryAPI}/medicine/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["medicine"] })
    },
  })
}

export function useUpdateMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, data}: {id: string | undefined, data: any}) => {const res = await api.put<MedicineType>(`${inventoryAPI}/medicine/${id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["medicine"] })
      queryClient.invalidateQueries({ queryKey: ["medicine", data.id] })
    },
  })
}

export function useDeleteMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${inventoryAPI}/medicine/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["medicine"] })
      queryClient.invalidateQueries({ queryKey: ["medicine", id] })
    },
  })
}
