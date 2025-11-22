import { useMutation, useQueryClient } from '@tanstack/react-query';
import { juiciosService } from '../services/juicios.service';
import { juiciosKeys } from '../../../queries/juicios.queries';

export const useDeleteJuicio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => juiciosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: juiciosKeys.all });
    },
  });
};

