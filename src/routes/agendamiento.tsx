import { createFileRoute } from '@tanstack/react-router';
import { AgendamientoPage } from '../app/features/agendamiento/AgendamientoPage';

export const Route = createFileRoute('/agendamiento')({
  component: AgendamientoPage,
});

