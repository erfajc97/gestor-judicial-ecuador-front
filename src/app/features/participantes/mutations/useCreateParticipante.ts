import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participantesService } from '../services/participantes.service';
import type { CreateParticipanteDto } from '../types';
import { participantesKeys } from '../../../queries/participantes.queries';

export const useCreateParticipante = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateParticipanteDto) => participantesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: participantesKeys.all });
    },
  });
};

