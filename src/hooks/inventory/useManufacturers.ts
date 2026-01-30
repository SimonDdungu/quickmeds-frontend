import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { ManufacturersType, ManufacturerSearchQuery, PaginatedResponse } from "@/interfaces"

const inventoryAPI = process.env.NEXT_PUBLIC_INVENTORY_API

export function useManufacturers(params: ManufacturerSearchQuery) {
  return useQuery({
    queryKey: ["manufacturers", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<ManufacturersType>>(`${inventoryAPI}/manufacturers/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useManufacturer(id: number) {
  return useQuery({
    queryKey: ["manufacturer", id],
    queryFn: async () => {const res = await api.get<ManufacturersType[]>(`${inventoryAPI}/manufacturers/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddManufacturer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ManufacturersType) => {const res = await api.post<ManufacturersType>(`${inventoryAPI}/manufacturers/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
        queryClient.invalidateQueries({ queryKey: ["manufacturer", data.id] })
    },
  })
}

export function useUpdateManufacturer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ManufacturersType) => {const res = await api.put<ManufacturersType>(`${inventoryAPI}/manufacturers/${data.id}`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
      queryClient.invalidateQueries({ queryKey: ["manufacturer", data.id] })
    },
  })
}

export function useDeleteManufacturer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {const res = await api.delete(`${inventoryAPI}/manufacturers/${id}`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
      queryClient.invalidateQueries({ queryKey: ["manufacturer", id] })
    },
  })
}
