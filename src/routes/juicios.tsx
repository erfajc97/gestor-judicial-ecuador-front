import { createFileRoute } from '@tanstack/react-router';
import { JuiciosPage } from '../app/features/juicios/JuiciosPage';

export const Route = createFileRoute('/juicios')({
  component: JuiciosPage,
});

