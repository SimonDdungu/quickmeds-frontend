import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { UserSearchQuery, User, PaginatedResponse } from "@/interfaces"
import { env } from "@/config/env"

const usersAPI = env.usersApi

export function useUsers(params: UserSearchQuery) {
  return useQuery({
    queryKey: ["users", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<User>>(`${usersAPI}/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {const res = await api.get<User>(`${usersAPI}/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: User) => {
      const res = await api.post<User>(`${usersAPI}/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: User) => {const res = await api.put<User>(`${usersAPI}/${data.id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user", data.id] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${usersAPI}/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user", id] })
    },
  })
}
