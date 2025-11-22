import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participantesService } from '../services/participantes.service';
import type { UpdateParticipanteDto } from '../types';
import { participantesKeys } from '../../../queries/participantes.queries';

export const useUpdateParticipante = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateParticipanteDto }) =>
      participantesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: participantesKeys.all });
      queryClient.invalidateQueries({
        queryKey: participantesKeys.detail(variables.id),
      });
    },
  });
};

