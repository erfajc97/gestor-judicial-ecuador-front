import { useMutation, useQueryClient } from '@tanstack/react-query'
import { agendamientoService } from '../services/agendamiento.service'
import type { AgendamientoData } from '../types'
import { juiciosKeys } from '@/app/queries/juicios.queries'

export const useAgendarJuicio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgendamientoData) => agendamientoService.agendar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: juiciosKeys.all })
    },
  })
}
