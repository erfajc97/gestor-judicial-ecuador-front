import { useMutation, useQueryClient } from '@tanstack/react-query'
import { juiciosService } from '../services/juicios.service'
import { juiciosKeys } from '../../../queries/juicios.queries'
import { ToastResponse } from '@/components/ToastResponse'

export const useDeleteJuicio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => juiciosService.delete(id),
    onSuccess: (_, deletedId) => {
      // Invalidar la lista de juicios
      queryClient.invalidateQueries({ queryKey: juiciosKeys.all })
      // Eliminar la query del detalle del juicio eliminado del caché
      queryClient.removeQueries({ queryKey: juiciosKeys.detail(deletedId) })
      ToastResponse('Juicio eliminado exitosamente', 'success')
    },
    onError: (error) => {
      console.error('Error al eliminar juicio:', error)
      ToastResponse(
        'Error al eliminar el juicio. Por favor, intente nuevamente.',
        'error',
      )
    },
  })
}
