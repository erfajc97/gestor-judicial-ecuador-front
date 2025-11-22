import { createFileRoute } from '@tanstack/react-router';
import { ParticipantesPage } from '../app/features/participantes/ParticipantesPage';

export const Route = createFileRoute('/participantes')({
  component: ParticipantesPage,
});

